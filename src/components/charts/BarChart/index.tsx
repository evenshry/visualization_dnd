import React, { CSSProperties } from 'react';
import { getStyleByProps } from '@/components/elements/base';
import { getOptionByProps } from '@/components/charts/base';
import ReactEcharts from 'echarts-for-react';

interface Props {
  data: Comp.Element;
}

function BarChart(props: Props) {
  const { data } = props;

  const style: CSSProperties = getStyleByProps(data);
  const options: CSSProperties = getOptionByProps(data);

  return (
    <section style={style}>
      <ReactEcharts option={options} opts={{ width: 'auto', height: 'auto' }} />
    </section>
  );
}

export default BarChart;
