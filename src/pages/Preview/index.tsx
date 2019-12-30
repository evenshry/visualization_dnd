import React from 'react';
import { CtxProvider } from '@/components/context';
import Headers from '@/layouts/Headers';
import Content from '@/layouts/Content';
import SideBar from '@/layouts/SideBar';

function Index() {
  return (
    <section className="preview">
      <Headers />
      <section className="container">
        <Content />
        <SideBar />
      </section>
    </section>
  );
}
export default () => (
  <CtxProvider>
    <Index />
  </CtxProvider>
);
