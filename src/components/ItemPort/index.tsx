import React, { useContext } from 'react';
import { useDrag } from 'react-dnd';
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
  const [collectedProps, drag, preview] = useDrag<Comp.Element, unknown, any>({ item: data });

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
      <section ref={preview} className="editSection">
        <section className="handler" ref={drag}>
          <section className="title">
            <Button icon="drag" type="link" />
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
    );
  } else {
    return children;
  }
}

export default ItemPort;
