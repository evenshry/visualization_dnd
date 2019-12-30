import React, { CSSProperties } from 'react';
import { getStyleByProps } from '@/components/elements/base';

interface Props {
  data: Comp.Element;
}

function MyTitle(props: Props) {
  const { data } = props;

  const style: CSSProperties = getStyleByProps(data);
  let content = '';
  if (data.props && data.props.style) {
    const styleConfig = data.props.style;
    if (styleConfig.content && styleConfig.content.title.value) {
      content = styleConfig.content.title.value;
    }
  }

  return (
    <section className="titleContainer" style={style}>
      <section className="title">{content}</section>
    </section>
  );
}

export default MyTitle;
