import React, { CSSProperties, useContext } from 'react';
import { useDrop } from 'react-dnd';
import { Droppable } from 'react-beautiful-dnd';
import { bgDraggingOver } from '@/components/elements/base';
import { ItemConfig } from '@/components/ItemPort/entity';
import ItemPort from '@/components/ItemPort';
import { context } from '@/components/context';

interface Props {
  data: Comp.Element;
}

function Background(props: Props) {
  const { data } = props;
  const { appendElementToTree, moveElementOnTree } = useContext(context);

  const [{ isOverCurrent }, drop] = useDrop<Comp.Element, unknown, any>({
    accept: ItemConfig.BACKGROUND,
    drop(item, monitor) {
      const didDrop = monitor.didDrop();
      if (didDrop || item.id === data.id) {
        return;
      }
      if (item.id) {
        moveElementOnTree(item.id, data.id);
      } else {
        appendElementToTree(item.type as string, data.id);
      }
    },
    collect: monitor => ({
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  let style: CSSProperties = {};
  if (data.props && data.props.style) {
    const styleConfig = data.props.style;
    style = {
      // width: styleConfig.size.width.value + 'px',
      // height: styleConfig.size.height.value + 'px',
      backgroundColor: styleConfig.background.color.value,
      borderWidth: styleConfig.border.width.value + 'px',
      borderStyle: styleConfig.border.solid.value,
      borderColor: styleConfig.border.color.value,
    };
  }

  return (
    <Droppable droppableId={data.id} type={data.id}>
      {(provided, snapshot) => (
        <section ref={provided.innerRef} {...provided.droppableProps} className="background">
          <section
            ref={drop}
            className="background"
            style={isOverCurrent ? { ...style, ...bgDraggingOver } : style}
          >
            {data.children && data.children.length > 0
              ? data.children.map((item, index) => (
                  <ItemPort data={item} key={index} index={index} />
                ))
              : null}
            {provided.placeholder}
          </section>
        </section>
      )}
    </Droppable>
  );
}

export default Background;
