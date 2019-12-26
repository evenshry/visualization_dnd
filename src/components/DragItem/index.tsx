import React from 'react';
import { useDrag } from 'react-dnd';

interface Props {
  data: Comp.EleType;
}

function DragItem(props: Props) {
  const { data } = props;
  const [collectedProps, drag] = useDrag({ item: { type: data.type } });
  return (
    <section ref={drag} className="navItem">
      {data.name}
    </section>
  );
}

export default DragItem;
