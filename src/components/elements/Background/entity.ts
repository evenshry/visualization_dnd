import { formatMessage } from 'umi-plugin-locale';
import { InputConfig } from '@/components/ItemInput/entity';
import { extendBaseProps } from '@/components/elements/base';

export const elementsProps: Comp.Element = extendBaseProps({
  id: '',
  type: 'background',
  name: formatMessage({ id: 'drag.item.background' }),
  props: {
    style: {
      size: {
        minHeight: {
          type: InputConfig.Number,
          name: formatMessage({ id: 'style.size.minHeight' }),
          value: 300,
        },
      },
      padding: {
        top: {
          type: InputConfig.Number,
          name: formatMessage({ id: 'style.padding.top' }),
          value: 20,
        },
        bottom: {
          type: InputConfig.Number,
          name: formatMessage({ id: 'style.padding.bottom' }),
          value: 20,
        },
        left: {
          type: InputConfig.Number,
          name: formatMessage({ id: 'style.padding.left' }),
          value: 20,
        },
        right: {
          type: InputConfig.Number,
          name: formatMessage({ id: 'style.padding.right' }),
          value: 20,
        },
      },
    },
  },
});
