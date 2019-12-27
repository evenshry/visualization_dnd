import React, { CSSProperties, useRef } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useDropElement } from '@/hooks/useDropElement';
import { bgDraggingOver } from '@/components/elements/base';
import ItemPort from '@/components/ItemPort';

interface Props {
  data: Comp.Element;
}

function Background(props: Props) {
  const { data } = props;

  const ref = useRef<HTMLDivElement>(null);

  const { isOverCurrent } = useDropElement(ref, data);

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
    <Droppable droppableId={data.id} type={data.id} ignoreContainerClipping={true}>
      {(provided, snapshot) => (
        <section ref={provided.innerRef} {...provided.droppableProps} className="background">
          <section
            ref={ref}
            className="backgroundInner"
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
