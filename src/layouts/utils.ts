import { RefObject } from 'react';

/**
 * 根据偏移位置 获取节点序号
 * @param ref 父节点
 * @param offset 偏移位置
 * @return 节点序号
 */
export function getNodeIndexByOffset(ref: RefObject<HTMLDivElement>, offset: any): number {
  if (offset && ref.current && ref.current.childElementCount > 0) {
    const nodes = ref.current.children;
    let height = 0;
    for (let i = 0; i < nodes.length; i++) {
      const nodeItem = nodes.item(i);
      if (nodeItem) {
        // @ts-ignore
        height += nodes.item(i)?.offsetHeight;
        // 比较时 加上 鼠标偏移量
        if (offset.y < height + 50) {
          return i;
        }
      }
    }
    // 比较时 加上 鼠标偏移量
    if (offset.y >= height + 50) {
      return nodes.length;
    }
  } else {
    return 0;
  }
  return 0;
}

/**
 * 添加放置位置指示器
 * @param ref 父节点
 * @param index 位置
 */
export function appendDropPlaceholder(ref: RefObject<HTMLDivElement>, index: number): void {
  if (ref.current) {
    removeDropPlaceholder(ref);
    const nodes = ref.current.children;
    const placeholder = document.createElement('div');
    placeholder.className = 'dropPlaceholder';
    if (nodes && nodes.length > 0) {
      if (index < nodes.length) {
        const nodeItem = nodes.item(index);
        if (nodeItem) nodeItem.insertAdjacentElement('beforebegin', placeholder);
      } else {
        ref.current.insertAdjacentElement('beforeend', placeholder);
      }
    } else {
      ref.current.insertAdjacentElement('afterbegin', placeholder);
    }
  }
}

/**
 * 移除放置位置指示器
 * @param ref 父节点
 */
export function removeDropPlaceholder(ref: RefObject<HTMLDivElement>): void {
  if (ref.current) {
    const placeholder = ref.current.querySelector('.dropPlaceholder');
    if (placeholder) {
      placeholder.remove();
    }
  }
}

// 超时计时器
let removeWhenOutTimer: any = null;

/**
 * 超时移除 位置指示器
 * @param ref 父节点
 */
export function removePlaceholderWhenOut(ref: RefObject<HTMLDivElement>, delay: number): void {
  if (removeWhenOutTimer) {
    clearTimeout(removeWhenOutTimer);
  }
  removeWhenOutTimer = setTimeout(() => {
    removeDropPlaceholder(ref);
  }, delay);
}
