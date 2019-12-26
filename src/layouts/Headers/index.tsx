import React, { useContext } from 'react';
import { context } from '../../components/context';
import DragItem from '@/components/DragItem';

function Headers() {
  const { elementsType } = useContext(context);
  return (
    <section className="header">
      {elementsType.map(item => (
        <DragItem data={item} key={item.id} />
      ))}
    </section>
  );
}

export default Headers;
