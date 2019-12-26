import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';
import { Droppable } from 'react-beautiful-dnd';
import { bgDraggingOver } from '@/components/elements/base';
import { context } from '@/components/context';
import ItemPort from '@/components/ItemPort';
import { ItemConfig } from '@/components/ItemPort/entity';

function Content() {
  const { elementsTree, appendElementToTree, moveElementOnTree } = useContext(context);

  const [{ isOverCurrent }, drop] = useDrop<Comp.Element, unknown, any>({
    accept: ItemConfig.BACKGROUND,
    drop(item, monitor) {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      if (item.id) {
        moveElementOnTree(item.id);
      } else {
        appendElementToTree(item.type as string);
      }
    },
    collect: monitor => ({
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  return (
    <Droppable droppableId="root" type="content">
      {(provided, snapshot) => (
        <section ref={provided.innerRef} {...provided.droppableProps} className="drapCanvas">
          <section ref={drop} className="drapCanvas" style={isOverCurrent ? bgDraggingOver : {}}>
            {elementsTree && elementsTree.length > 0
              ? elementsTree.map((item, index) => (
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

export default Content;
