import { InputConfig } from '@/components/ItemInput/entity';
import { extendBaseProps } from '@/components/elements/base';

export const elementsProps: Comp.Element = extendBaseProps({
  id: '',
  type: 'background',
  name: 'background',
  props: {
    style: {
      base: {
        content: {
          type: InputConfig.Text,
          name: '标题',
          value: '',
        },
      },
    },
  },
});
