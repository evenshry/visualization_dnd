import React, { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';
import { DraggableLocation } from 'react-beautiful-dnd';
import { useDebounceFn } from '@umijs/hooks';
import { elementsTypeConfig } from './DragItem/entity';
import { ItemConfig } from './ItemPort/entity';
import { uuid } from '@/utils';
import {
  recursionUpdateAllNode,
  updateElementProps,
  recursionUpdateNode,
  recursionRemoveNode,
} from './contextUtil';

import { elementsProps as BackgroundProps } from './elements/Background/entity';
import { elementsProps as TitleProps } from './elements/MyTitle/entity';
import { elementsProps as ParagraphProps } from './elements/Paragraph/entity';

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
  appendElementToTree: (compTyle: string, index: number, nodeId?: string) => void;
  moveElementOnTree: (sourceId: string, index: number, targetId?: string) => void;
  updateElementSortOnTree: (source: DraggableLocation, destination: DraggableLocation) => void;
  removeElementFromTree: (id: string) => void;
  updateElementStyle: (key: string, value: string) => void;
  updateElementMode: (edit: boolean) => void;
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
  const appendElementToTree = (compTyle: string, index: number, nodeId?: string) => {
    let element: any = null;
    switch (compTyle) {
      case ItemConfig.BACKGROUND:
        element = JSON.parse(JSON.stringify(BackgroundProps));
        break;
      case ItemConfig.TITLE:
        element = JSON.parse(JSON.stringify(TitleProps));
        break;
      case ItemConfig.PARAGRAPH:
        element = JSON.parse(JSON.stringify(ParagraphProps));
        break;
    }
    element.id = uuid();
    element.editMode = true;
    if (nodeId) {
      // 放置到指定节点之指定位置
      const newTree = recursionUpdateNode(elementsTree, nodeId, node => {
        if (node.children && node.children.length > 0) {
          node.children.splice(index, 0, element);
        } else {
          node.children = [element];
        }
        return node;
      });
      setElementsTree([...newTree]);
    } else {
      // 放置到根节点之指定位置
      if (elementsTree.length > 0) {
        elementsTree.splice(index, 0, element);
      } else {
        elementsTree.push(element);
      }
      setElementsTree([...elementsTree]);
    }
  };

  /**
   * 移动元素在组件节点树
   */
  const moveElementOnTree = (sourceId: string, index: number, targetId?: string) => {
    // 找到原节点 并删除
    let sourceNode: any = null;
    const tempTree = recursionRemoveNode(elementsTree, sourceId, node => {
      sourceNode = node;
      return node;
    });
    if (sourceNode) {
      if (targetId) {
        // 放置到指定节点之指定位置
        const newTree = recursionUpdateNode(tempTree, targetId, node => {
          if (node.children && node.children.length > 0) {
            node.children.splice(index, 0, sourceNode);
          } else {
            node.children = [sourceNode];
          }
          return node;
        });
        setElementsTree([...newTree]);
      } else {
        // 放置到根节点之指定位置
        if (tempTree.length > 0) {
          tempTree.splice(index, 0, sourceNode);
        } else {
          tempTree.push(sourceNode);
        }
        setElementsTree([...tempTree]);
      }
    }
  };
  /**
   * 更新节点顺序（针对单个节点的子集）
   * @param source 原节点位置
   * @param destination 目标位置
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
   * @param sourceId 原节点ID
   */
  const removeElementFromTree = (sourceId: string) => {
    const newTree = recursionRemoveNode(elementsTree, sourceId);
    setElementsTree([...newTree]);
  };

  /**
   * 更新当前节点元素属性
   * 防抖包装
   * @param key 属性
   * @param value 属性值
   */
  const { run: updateElementStyle } = useDebounceFn((key: string, value: string) => {
    if (currtntElement) {
      const targetId = currtntElement.id;
      const newTree = recursionUpdateNode(elementsTree, targetId, node => {
        node.props = updateElementProps(node, key, value);
        return node;
      });
      setElementsTree([...newTree]);
    }
  }, 500);

  /**
   * 更新节点编辑模式
   * @param edit 是否编辑
   */
  const updateElementMode = (edit: boolean) => {
    if (elementsTree.length > 0) {
      const newTree = recursionUpdateAllNode(elementsTree, node => {
        node.editMode = edit;
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
    updateElementMode,
  };

  return <context.Provider value={value}>{children}</context.Provider>;
}
