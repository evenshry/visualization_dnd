import { InputConfig } from '@/components/ItemInput/entity';
import { extendBaseProps } from '@/components/elements/base';

export const elementsProps: Comp.Element = extendBaseProps({
  id: '',
  type: 'background',
  name: 'background',
  props: {
    style: {
      size: {
        minHeight: {
          type: InputConfig.Number,
          name: '最小高度',
          value: 300,
        },
      },
      padding: {
        top: {
          type: InputConfig.Number,
          name: '上内边距',
          value: 20,
        },
        bottom: {
          type: InputConfig.Number,
          name: '下内边距',
          value: 20,
        },
        left: {
          type: InputConfig.Number,
          name: '左内边距',
          value: 20,
        },
        right: {
          type: InputConfig.Number,
          name: '右内边距',
          value: 20,
        },
      },
    },
  },
});
