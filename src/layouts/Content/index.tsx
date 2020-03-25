import React, { useContext, useRef } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useDropElement } from '@/hooks/useDropElement';
import { bgDraggingOver } from '@/components/elements/base';
import { context } from '@/components/context';
import ItemPort from '@/components/ItemPort';
import styles from './style.less';

function Content() {
  const { elementsTree } = useContext(context);

  const ref = useRef<HTMLDivElement>(null);

  const { isOverCurrent } = useDropElement(ref);

  return (
    <Droppable droppableId="root" type="content" ignoreContainerClipping={true}>
      {(provided, snapshot) => (
        <section ref={provided.innerRef} {...provided.droppableProps} className={styles.drapCanvas}>
          <section ref={ref} className={styles.drapCanvasInner} style={isOverCurrent ? bgDraggingOver : {}}>
            {elementsTree && elementsTree.length > 0
              ? elementsTree.map((item, index) => <ItemPort data={item} key={index} index={index} />)
              : null}
            {provided.placeholder}
          </section>
        </section>
      )}
    </Droppable>
  );
}

export default Content;
