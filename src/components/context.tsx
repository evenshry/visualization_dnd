import React, { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';
import { elementsTypeConfig } from './DragItem/entity';
import { ItemConfig } from './ItemPort/entity';
import { elementsProps as BackgroundProps } from './elements/Background/entity';
import { uuid } from '@/utils';
import { DraggableLocation } from 'react-beautiful-dnd';

interface Props {
  children?: ReactNode;
}

interface Injected {
  elementsType: Array<Comp.EleType>;
  setElementsType: Dispatch<SetStateAction<Array<Comp.EleType>>>;
  elementsTree: Array<Comp.Element>;
  setElementsTree: Dispatch<SetStateAction<Array<Comp.Element>>>;
  currtntElement?: Comp.Element;
  setCurrtntElement: Dispatch<SetStateAction<Comp.Element | undefined>>;
  visibleSideBar?: boolean;
  setVisibleSideBar: Dispatch<SetStateAction<boolean>>;
  appendElementToTree: (compTyle: string, nodeId?: string) => void;
  moveElementOnTree: (sourceId: string, targetId?: string) => void;
  updateElementSortOnTree: (source: DraggableLocation, destination: DraggableLocation) => void;
  removeElementFromTree: (id: string) => void;
  updateElementStyle: (key: string, value: string) => void;
}

export const context = createContext<Injected>({} as Injected);

export function CtxProvider({ children }: Props) {
  // 组件类型数据
  const [elementsType, setElementsType] = useState<Array<Comp.EleType>>(elementsTypeConfig);
  // 组件节点树数据
  const [elementsTree, setElementsTree] = useState<Array<Comp.Element>>([]);
  // 当前编辑节点
  const [currtntElement, setCurrtntElement] = useState<Comp.Element>();
  // 编辑框显示状态
  const [visibleSideBar, setVisibleSideBar] = useState<boolean>(false);

  /**
   * 添加元素到组件节点树
   */
  const appendElementToTree = (compTyle: string, nodeId?: string) => {
    let background: Comp.Element = { ...BackgroundProps };
    switch (compTyle) {
      case ItemConfig.BACKGROUND:
        background = { ...BackgroundProps };
        break;
    }
    background.id = uuid();
    background.editMode = true;
    if (nodeId) {
      // 放置到指定位置
      const newTree = recursionUpdateNode(elementsTree, nodeId, node => {
        if (node.children && node.children.length > 0) {
          node.children.push(background);
        } else {
          node.children = [background];
        }
        return node;
      });
      setElementsTree([...newTree]);
    } else {
      elementsTree.push(background);
      setElementsTree([...elementsTree]);
    }
  };

  /**
   * 移动元素在组件节点树
   */
  const moveElementOnTree = (sourceId: string, targetId?: string) => {
    // 找到原节点 并删除
    let sourceNode: any = null;
    const tempTree = recursionRemoveNode(elementsTree, sourceId, node => {
      sourceNode = node;
      return node;
    });
    if (sourceNode) {
      if (targetId) {
        // 放置到指定位置
        const newTree = recursionUpdateNode(tempTree, targetId, node => {
          if (node.children && node.children.length > 0) {
            node.children.push(sourceNode);
          } else {
            node.children = [sourceNode];
          }
          return node;
        });
        setElementsTree([...newTree]);
      } else {
        tempTree.push(sourceNode);
        setElementsTree([...tempTree]);
      }
    }
  };
  /**
   * 更新节点顺序
   */
  const updateElementSortOnTree = (source: DraggableLocation, destination: DraggableLocation) => {
    if (source.droppableId === 'root') {
      const sourceNode = elementsTree[source.index];
      elementsTree.splice(source.index, 1);
      elementsTree.splice(destination.index, 0, sourceNode);
      setElementsTree([...elementsTree]);
    } else {
      // 放置到指定位置
      const newTree = recursionUpdateNode(elementsTree, source.droppableId, node => {
        if (node.children && node.children.length > 0) {
          const sourceNode = node.children[source.index];
          node.children.splice(source.index, 1);
          node.children.splice(destination.index, 0, sourceNode);
          node.children = [...node.children];
        }
        return node;
      });
      setElementsTree([...newTree]);
    }
  };

  /**
   * 从组件节点树移除节点元素
   */
  const removeElementFromTree = (sourceId: string) => {
    const newTree = recursionRemoveNode(elementsTree, sourceId);
    setElementsTree([...newTree]);
  };

  /**
   * 更新当前节点元素属性
   */
  const updateElementStyle = (key: string, value: string) => {
    if (currtntElement) {
      const targetId = currtntElement.id;
      const newTree = recursionUpdateNode(elementsTree, targetId, node => {
        node.props = updateElementProps(node, key, value);
        return node;
      });
      setElementsTree([...newTree]);
    }
  };

  const value = {
    elementsType,
    setElementsType,
    elementsTree,
    setElementsTree,
    currtntElement,
    setCurrtntElement,
    visibleSideBar,
    setVisibleSideBar,
    appendElementToTree,
    moveElementOnTree,
    updateElementSortOnTree,
    removeElementFromTree,
    updateElementStyle,
  };

  return <context.Provider value={value}>{children}</context.Provider>;
}

// 递归中回调方法
type RecursionCallback = (element: Comp.Element) => Comp.Element;

/**
 * 更新节点元素的属性样式
 */
function updateElementProps(element: Comp.Element, key: string, value: string) {
  const props = element.props;
  if (props && props.style) {
    const styleConfig = props.style;
    for (let blockKey in styleConfig) {
      const propConfig = styleConfig[blockKey];
      for (let propKey in propConfig) {
        if (key === `${blockKey}.${propKey}`) {
          if (
            element.props &&
            element.props.style &&
            element.props.style[blockKey] &&
            element.props.style[blockKey][propKey]
          ) {
            element.props.style[blockKey][propKey].value = value;
          }
        }
      }
    }
  }
  return element.props;
}

/**
 * 递归更新某节点
 * @return 新节点树
 */
function recursionUpdateNode(
  data: Array<Comp.Element>,
  nodeId: string,
  callback: RecursionCallback,
) {
  data.map(item => {
    if (item.id == nodeId) {
      item = callback(item);
    } else {
      if (item.children && item.children.length > 0) {
        item.children = recursionUpdateNode(item.children, nodeId, callback);
      }
    }
    return item;
  });
  return data;
}

/**
 * 递归删除某节点
 * @return 新节点树
 */
function recursionRemoveNode(
  data: Array<Comp.Element>,
  nodeId: string,
  callback?: RecursionCallback,
) {
  let removeIndex = -1;
  data.map((item, index) => {
    if (item.id == nodeId) {
      removeIndex = index;
      callback && callback(item);
    }
    if (item.children && item.children.length > 0) {
      item.children = recursionRemoveNode(item.children, nodeId, callback);
    }
    return item;
  });
  if (removeIndex > -1) {
    data.splice(removeIndex, 1);
  }
  return data;
}
