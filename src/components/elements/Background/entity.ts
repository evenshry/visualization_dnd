import { InputConfig } from '@/components/ItemInput/entity';

export const elementsProps: Comp.Element = {
  id: '',
  type: 'background',
  name: 'background',
  editMode: false,
  children: [],
  props: {
    style: {
      base: {
        content: {
          type: InputConfig.Text,
          name: '标题',
          value: '',
        },
      },
      background: {
        color: {
          type: InputConfig.Color,
          name: '背景颜色',
          value: 'rgba(108, 113, 117, 0.3)',
        },
      },
      size: {
        width: {
          type: InputConfig.Number,
          name: '尺寸宽度',
          value: 1024,
        },
        height: {
          type: InputConfig.Number,
          name: '尺寸高度',
          value: 768,
        },
      },
      border: {
        width: {
          type: InputConfig.Number,
          name: '边框宽度',
          value: 0,
        },
        solid: {
          type: InputConfig.SolidType,
          name: '边框样式',
          value: 'solid',
        },
        color: {
          type: InputConfig.Color,
          name: '边框颜色',
          value: 'rgba(200, 200, 200, 1)',
        },
      },
    },
  },
};
