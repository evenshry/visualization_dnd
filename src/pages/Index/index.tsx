import React, { useContext } from 'react';
import { formatMessage, setLocale } from 'umi-plugin-locale';
import { DndProvider } from 'react-dnd';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Backend from 'react-dnd-html5-backend';
import { CtxProvider, context } from '../../components/context';
import Headers from '@/layouts/Headers';
import Content from '@/layouts/Content';
import SideBar from '@/layouts/SideBar';

function Index() {
  const { updateElementSortOnTree } = useContext(context);

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (destination) {
      if (source.index !== destination.index) {
        updateElementSortOnTree(source, destination);
      }
      return;
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DndProvider backend={Backend}>
        <Headers />
        <section className="container">
          <Content />
          <SideBar />
        </section>
      </DndProvider>
    </DragDropContext>
  );
}
export default () => (
  <CtxProvider>
    <Index />
  </CtxProvider>
);
