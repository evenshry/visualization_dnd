import React from 'react';
import { CtxProvider } from '@/components/context';

interface Props {
  children: any;
}

export default function(props: Props) {
  return <CtxProvider>{props.children}</CtxProvider>;
}
