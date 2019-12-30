import { formatMessage } from 'umi-plugin-locale';
import { InputConfig } from '@/components/ItemInput/entity';
import { extendBaseProps } from '@/components/elements/base';

export const elementsProps: Comp.Element = extendBaseProps({
  id: '',
  type: 'title',
  name: formatMessage({ id: 'drag.item.title' }),
  props: {
    style: {
      font: {
        color: {
          type: InputConfig.Color,
          name: formatMessage({ id: 'style.font.color' }),
          value: '#333',
        },
        size: {
          type: InputConfig.Number,
          name: formatMessage({ id: 'style.font.size' }),
          value: 16,
        },
        weight: {
          type: InputConfig.Boolean,
          name: formatMessage({ id: 'style.font.weight' }),
          value: 'true',
        },
        lineHeight: {
          type: InputConfig.Number,
          name: formatMessage({ id: 'style.font.lineHeight' }),
          value: 40,
        },
        align: {
          type: InputConfig.HAlign,
          name: formatMessage({ id: 'style.font.align' }),
          value: 'center',
        },
      },
      content: {
        title: {
          type: InputConfig.Text,
          name: formatMessage({ id: 'style.content.title' }),
          value: '标题',
        },
      },
    },
  },
});
