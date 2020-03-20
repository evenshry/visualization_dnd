import React from 'react';
import { useDrag } from 'react-dnd';
import styles from './style.less';

interface Props {
  data: Comp.EleType;
}

function DragItem(props: Props) {
  const { data } = props;
  const [, drag] = useDrag({ item: { type: data.type } });
  return (
    <section ref={drag} className={styles.navItem}>
      {data.name}
    </section>
  );
}

export default DragItem;
