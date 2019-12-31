import React, { useContext } from 'react';
import { formatMessage } from 'umi-plugin-locale';
import { context } from '@/components/context';
import ItemPort from '@/components/ItemPort';
import { Button } from 'antd';
import router from 'umi/router';

function Index() {
  const { elementsTree, updateElementMode } = useContext(context);

  function handleHome() {
    updateElementMode(true);
    router.push('/');
  }

  return (
    <section className="preview">
      <section className="buttons">
        <Button onClick={handleHome}>{formatMessage({ id: 'button.home' })}</Button>
      </section>
      {elementsTree && elementsTree.length > 0
        ? elementsTree.map((item, index) => <ItemPort data={item} key={index} index={index} />)
        : null}
    </section>
  );
}
export default Index;
