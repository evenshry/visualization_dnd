import { ObjectMap } from 'echarts-for-react';

function getOptionByProps(element: Comp.Element): ObjectMap {
  let options: ObjectMap = {};
  if (element.props && element.props.style) {
    const styleConfig = element.props.style;
    // 背景
    if (styleConfig.background) {
      if (styleConfig.background.color && styleConfig.background.color.value) {
        options.backgroundColor = styleConfig.background.color.value;
      }
    }
  }
  let dataAxis = ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'];
  let data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
  let yMax = 500;
  let dataShadow = [];
  for (let i = 0; i < data.length; i++) {
    dataShadow.push(yMax);
  }
  options = {
    title: {
      text: '特性示例：渐变色 阴影 点击缩放',
      subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
    },
    xAxis: {
      data: dataAxis,
      axisLabel: {
        inside: true,
        textStyle: {
          color: '#fff'
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        textStyle: {
          color: '#999'
        }
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        // For shadow
        type: 'bar',
        itemStyle: {
          color: 'rgba(0,0,0,0.05)'
        },
        barGap: '-100%',
        barCategoryGap: '40%',
        data: dataShadow,
        animation: false
      },
      {
        type: 'bar',
        itemStyle: {
          color: '#ff0000'
        },
        emphasis: {
          itemStyle: {
            color: '#ff1100'
          }
        },
        data: data
      }
    ]
  };
  return options;
}

export { getOptionByProps };
