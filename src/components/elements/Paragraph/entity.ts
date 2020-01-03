import { formatMessage } from 'umi-plugin-locale';
import { InputConfig } from '@/components/ItemInput/entity';
import { extendBaseProps } from '@/components/elements/base';
import { ItemConfig } from '@/components/ItemPort/entity';

export const elementsProps: Comp.Element = extendBaseProps({
  id: '',
  type: ItemConfig.PARAGRAPH,
  name: formatMessage({ id: 'drag.item.paragraph' }),
  props: {
    style: {
      font: {
        color: {
          type: InputConfig.Color,
          name: formatMessage({ id: 'style.font.color' }),
          value: '#666',
        },
        size: {
          type: InputConfig.Number,
          name: formatMessage({ id: 'style.font.size' }),
          value: 12,
        },
        weight: {
          type: InputConfig.Boolean,
          name: formatMessage({ id: 'style.font.weight' }),
          value: 'true',
        },
        lineHeight: {
          type: InputConfig.Number,
          name: formatMessage({ id: 'style.font.lineHeight' }),
          value: 30,
        },
        align: {
          type: InputConfig.HAlign,
          name: formatMessage({ id: 'style.font.align' }),
          value: 'left',
        },
      },
      content: {
        text: {
          type: InputConfig.Text,
          name: formatMessage({ id: 'style.content.text' }),
          value: '这里是段落内容',
        },
      },
    },
  },
});
