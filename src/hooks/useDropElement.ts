import { useState, RefObject, useContext } from 'react';
import { useDrop } from 'react-dnd';
import { context } from '@/components/context';
import { ItemConfigGroup } from '@/components/ItemPort/entity';
import { getNodeIndexByOffset } from '@/layouts/utils';

/**
 * 放置元素钩子函数
 * @param ref 放置的容器节点
 * @param data 放置的容器节点数据
 */
export function useDropElement<T, P>(ref: RefObject<HTMLDivElement>, data?: Comp.Element) {
  const { appendElementToTree, moveElementOnTree } = useContext(context);

  const [hoverIndex, setHoverIndex] = useState<number>(0);

  const [{ isOverCurrent }, connectDrop] = useDrop<Comp.Element, unknown, any>({
    accept: ItemConfigGroup,
    // 拖动完成 放置时
    drop(item, monitor) {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      if (item.id) {
        // 跨层级移动节点
        moveElementOnTree(item.id, hoverIndex, data && data.id);
      } else {
        // 添加节点
        appendElementToTree(item.type as string, hoverIndex, data && data.id);
      }
    },
    // 拖动时 获取到容器子元素的序号 以确定放置的位置
    hover(item, monitor) {
      const offset = monitor.getClientOffset();
      const index = getNodeIndexByOffset(ref, offset);
      if (index !== hoverIndex) {
        setHoverIndex(index);
      }
    },
    // 拖动覆盖到容器的状态
    collect: monitor => ({
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  connectDrop(ref);

  return {
    isOverCurrent,
  };
}
