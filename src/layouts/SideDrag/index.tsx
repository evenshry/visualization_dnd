import React, { useContext } from 'react';
import { context } from '../../components/context';
import DragItem from '@/components/DragItem';
import styles from './style.less';

function SideDrag() {
  const { elementsType } = useContext(context);

  return (
    <section className={styles.sideDrag}>
      <section className={styles.navContainer}>
        {elementsType.map((item) => (
          <DragItem data={item} key={item.id} />
        ))}
      </section>
    </section>
  );
}

export default SideDrag;
