import React, { CSSProperties, useRef } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useDropElement } from '@/hooks/useDropElement';
import { bgDraggingOver, getStyleByProps } from '@/components/elements/base';
import ItemPort from '@/components/ItemPort';

interface Props {
  data: Comp.Element;
}

function Background(props: Props) {
  const { data } = props;

  const style: CSSProperties = getStyleByProps(data);

  if (data.editMode) {
    const ref = useRef<HTMLDivElement>(null);

    const { isOverCurrent } = useDropElement(ref, data);

    return (
      <Droppable droppableId={data.id} type={data.id} ignoreContainerClipping={true}>
        {(provided, snapshot) => (
          <section ref={provided.innerRef} {...provided.droppableProps}>
            <section ref={ref} style={isOverCurrent ? { ...style, ...bgDraggingOver } : style}>
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
  } else {
    return (
      <section style={style}>
        {data.children && data.children.length > 0
          ? data.children.map((item, index) => <ItemPort data={item} key={index} index={index} />)
          : null}
      </section>
    );
  }
}

export default Background;
