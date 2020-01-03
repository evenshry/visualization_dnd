import React, { CSSProperties } from 'react';
import { getStyleByProps } from '@/components/elements/base';

interface Props {
  data: Comp.Element;
}

function Paragraph(props: Props) {
  const { data } = props;

  const style: CSSProperties = getStyleByProps(data);
  let content = '';
  if (data.props && data.props.style) {
    const styleConfig = data.props.style;
    if (styleConfig.content && styleConfig.content.text.value) {
      content = styleConfig.content.text.value;
    }
  }

  return (
    <section style={style}>
      <span>{content}</span>
    </section>
  );
}

export default Paragraph;
