import React, { useContext } from 'react';
import { useDrag } from 'react-dnd';
import { Draggable } from 'react-beautiful-dnd';
import Background from '@/components/elements/Background';
import { context } from '../context';
import { ItemConfig } from './entity';
import { Button } from 'antd';

interface Props {
  data: Comp.Element;
  index: number;
}

function ItemPort(props: Props) {
  const { data, index } = props;
  const { setCurrtntElement, setVisibleSideBar, removeElementFromTree } = useContext(context);
  const [drag, preview] = useDrag<Comp.Element, unknown, any>({
    item: { ...data, index },
  });

  let children = <></>;
  switch (data.type) {
    case ItemConfig.BACKGROUND:
      children = <Background data={data} />;
  }

  if (data.editMode) {
    function edit() {
      setCurrtntElement(data);
      setTimeout(() => {
        setVisibleSideBar(true);
      }, 10);
    }

    function remove() {
      removeElementFromTree(data.id);
      setVisibleSideBar(false);
      setTimeout(() => {
        setCurrtntElement(undefined);
      }, 500);
    }

    return (
      <Draggable key={data.id} draggableId={data.id} index={index}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.draggableProps}>
            <section ref={node => preview(node)} className="editSection">
              <section className="handler">
                <div ref={drag}>
                  <Button icon="drag" type="link" />
                </div>

                <section className="title" {...provided.dragHandleProps}>
                  <span className="text">
                    index:{index}, id:{data.id}
                  </span>
                </section>

                <section className="toolBar">
                  <Button icon="form" type="link" onClick={edit} />
                  <Button icon="delete" type="link" onClick={remove} />
                </section>
              </section>
              {children}
            </section>
          </div>
        )}
      </Draggable>
    );
  } else {
    return children;
  }
}

export default ItemPort;
