import { CSSProperties } from 'react';
import { InputConfig } from '@/components/ItemInput/entity';
import { recursionExtendProp } from '@/utils';

export const bgDraggingOver: CSSProperties = {
  backgroundColor: '#dedede',
};

/**
 * 基础属性
 */
export const BaseProps: Comp.Element = {
  id: '',
  type: '',
  editMode: false,
  children: [],
  props: {
    style: {
      background: {
        color: {
          type: InputConfig.Color,
          name: '背景颜色',
          value: 'rgba(108, 113, 117, 0.3)',
        },
      },
      size: {
        minHeight: {
          type: InputConfig.Number,
          name: '最小高度',
          value: 300,
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

/**
 * 继承基础属性
 */
export function extendBaseProps(element: Comp.Element) {
  recursionExtendProp(BaseProps, element);
  return element;
}
