import { InputConfig } from '@/components/ItemInput/entity';
import { extendBaseProps } from '@/components/elements/base';

export const elementsProps: Comp.Element = extendBaseProps({
  id: '',
  type: 'title',
  name: 'title',
  props: {
    style: {
      font: {
        color: {
          type: InputConfig.Color,
          name: '颜色',
          value: '#333',
        },
        size: {
          type: InputConfig.Number,
          name: '大小',
          value: 16,
        },
        weight: {
          type: InputConfig.Boolean,
          name: '加粗',
          value: 'true',
        },
        lineHeight: {
          type: InputConfig.Number,
          name: '行高',
          value: 40,
        },
        align: {
          type: InputConfig.HAlign,
          name: '对齐',
          value: 'center',
        },
      },
      content: {
        title: {
          type: InputConfig.Text,
          name: '标题',
          value: '标题',
        },
      },
    },
  },
});
