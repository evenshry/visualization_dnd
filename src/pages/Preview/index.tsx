import React, { useContext } from 'react';
import { context } from '@/components/context';
import ItemPort from '@/components/ItemPort';
import { Button } from 'antd';
import router from 'umi/router';
import styles from './style.less';

export default function() {
  const { elementsTree, updateElementMode } = useContext(context);

  function handleHome() {
    updateElementMode(true);
    router.push('/');
  }

  return (
    <section className={styles.preview}>
      <section className={styles.buttons}>
        <Button icon="home" type="link" onClick={handleHome} />
      </section>

      {elementsTree && elementsTree.length > 0
        ? elementsTree.map((item, index) => <ItemPort data={item} key={index} index={index} />)
        : null}
    </section>
  );
}
