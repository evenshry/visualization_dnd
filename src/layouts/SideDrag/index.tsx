import React, { useContext } from 'react';
import { context } from '../../components/context';
import DragItem from '@/components/DragItem';

function SideDrag() {
  const { elementsType } = useContext(context);

  return (
    <section className="sideDrag">
      <section className="navContainer">
        {elementsType.map(item => (
          <DragItem data={item} key={item.id} />
        ))}
      </section>
    </section>
  );
}

export default SideDrag;
