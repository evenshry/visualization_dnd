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
          value: 10,
        },
        bottom: {
          type: InputConfig.Number,
          name: formatMessage({ id: 'style.padding.bottom' }),
          value: 10,
        },
        left: {
          type: InputConfig.Number,
          name: formatMessage({ id: 'style.padding.left' }),
          value: 10,
        },
        right: {
          type: InputConfig.Number,
          name: formatMessage({ id: 'style.padding.right' }),
          value: 10,
        },
      },
      flex: {
        open: {
          type: InputConfig.Boolean,
          name: formatMessage({ id: 'style.flex.open' }),
          value: 'false',
        },
        direction: {
          type: InputConfig.FlexDirection,
          name: formatMessage({ id: 'style.flex.direction' }),
          value: 'row',
        },
        justifyContent: {
          type: InputConfig.JustifyContent,
          name: formatMessage({ id: 'style.flex.justifyContent' }),
          value: 'center',
        },
        alignItems: {
          type: InputConfig.AlignItems,
          name: formatMessage({ id: 'style.flex.alignItems' }),
          value: 'center',
        },
      },
    },
  },
});
