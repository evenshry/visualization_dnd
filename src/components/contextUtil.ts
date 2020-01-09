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
    if (item.id === nodeId) {
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
 * 递归更新所有节点
 * @return 新节点树
 */
function recursionUpdateAllNode(data: Array<Comp.Element>, callback: RecursionCallback) {
  data.map(item => {
    item = callback(item);
    if (item.children && item.children.length > 0) {
      item.children = recursionUpdateAllNode(item.children, callback);
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
    if (item.id === nodeId) {
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

export { updateElementProps, recursionUpdateNode, recursionUpdateAllNode, recursionRemoveNode };
