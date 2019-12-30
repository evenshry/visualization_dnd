import React, { useContext } from 'react';
import { useDrag } from 'react-dnd';
import { Draggable } from 'react-beautiful-dnd';
import { context } from '../context';
import { ItemConfig } from './entity';
import { Button } from 'antd';

import Background from '@/components/elements/Background';
import MyTitle from '@/components/elements/MyTitle';

interface Props {
  data: Comp.Element;
  index: number;
}

function ItemPort(props: Props) {
  const { data, index } = props;
  const { setCurrtntElement, setVisibleSideBar, removeElementFromTree } = useContext(context);
  const [{ opacity }, drag, preview] = useDrag<Comp.Element, unknown, any>({
    item: { ...data, index },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  let children = <></>;
  switch (data.type) {
    case ItemConfig.BACKGROUND:
      children = <Background data={data} />;
      break;
    case ItemConfig.TITLE:
      children = <MyTitle data={data} />;
      break;
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
          <section ref={provided.innerRef} {...provided.draggableProps}>
            <section ref={preview} className="editSection" style={{ opacity }}>
              <section className="handler">
                <section className="icon" ref={drag}>
                  <Button icon="drag" type="link" />
                </section>

                <section className="title" {...provided.dragHandleProps}>
                  <span className="text">
                    id: {data.id}, name: {data.name}
                  </span>
                </section>

                <section className="toolBar">
                  <Button icon="form" type="link" onClick={edit} />
                  <Button icon="delete" type="link" onClick={remove} />
                </section>
              </section>
              {children}
            </section>
          </section>
        )}
      </Draggable>
    );
  } else {
    return children;
  }
}

export default ItemPort;
