import { CSSProperties } from 'react';
import { formatMessage } from 'umi-plugin-locale';
import { InputConfig } from '@/components/ItemInput/entity';
import { recursionExtendProp } from '@/utils';

/**
 * 拖动时改变背景颜色
 */
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
          name: formatMessage({ id: 'style.background.color' }),
          value: 'rgba(108, 113, 117, 0.3)',
        },
      },
      border: {
        width: {
          type: InputConfig.Number,
          name: formatMessage({ id: 'style.border.width' }),
          value: 0,
        },
        style: {
          type: InputConfig.BorderStyle,
          name: formatMessage({ id: 'style.border.style' }),
          value: 'solid',
        },
        color: {
          type: InputConfig.Color,
          name: formatMessage({ id: 'style.border.color' }),
          value: 'rgba(200, 200, 200, 1)',
        },
      },
      margin: {
        top: {
          type: InputConfig.Number,
          name: formatMessage({ id: 'style.margin.top' }),
          value: 0,
        },
        bottom: {
          type: InputConfig.Number,
          name: formatMessage({ id: 'style.margin.bottom' }),
          value: 0,
        },
        left: {
          type: InputConfig.Number,
          name: formatMessage({ id: 'style.margin.left' }),
          value: 0,
        },
        right: {
          type: InputConfig.Number,
          name: formatMessage({ id: 'style.margin.right' }),
          value: 0,
        },
      },
      padding: {
        top: {
          type: InputConfig.Number,
          name: formatMessage({ id: 'style.padding.top' }),
          value: 0,
        },
        bottom: {
          type: InputConfig.Number,
          name: formatMessage({ id: 'style.padding.bottom' }),
          value: 0,
        },
        left: {
          type: InputConfig.Number,
          name: formatMessage({ id: 'style.padding.left' }),
          value: 0,
        },
        right: {
          type: InputConfig.Number,
          name: formatMessage({ id: 'style.padding.right' }),
          value: 0,
        },
      },
    },
  },
};

/**
 * 继承基础属性
 * @param element Comp.Element
 * @returns Comp.Element
 */
export function extendBaseProps(element: Comp.Element) {
  recursionExtendProp(BaseProps, element);
  return element;
}

/**
 * 获取样式属性
 * @param element Comp.Element
 * @returns CSSProperties
 */
export function getStyleByProps(element: Comp.Element): CSSProperties {
  let style: CSSProperties = {};
  if (element.props && element.props.style) {
    const styleConfig = element.props.style;
    // 背景
    if (styleConfig.background) {
      if (styleConfig.background.color && styleConfig.background.color.value) {
        style.backgroundColor = styleConfig.background.color.value;
      }
    }
    // 尺寸
    if (styleConfig.size) {
      if (
        styleConfig.size.minHeight &&
        styleConfig.size.minHeight.value !== undefined
      ) {
        style.minHeight = styleConfig.size.minHeight.value + 'px';
      }
    }
    // 边框
    if (styleConfig.border) {
      if (styleConfig.border.borderWidth && styleConfig.border.borderWidth.value !== undefined) {
        style.borderWidth = styleConfig.border.borderWidth.value + 'px';
      }
      if (styleConfig.border.borderStyle && styleConfig.border.borderStyle.value) {
        style.borderStyle = styleConfig.border.borderStyle.value;
      }
      if (styleConfig.border.borderColor && styleConfig.border.borderColor.value) {
        style.borderColor = styleConfig.border.borderColor.value;
      }
    }
    // 外边距
    if (styleConfig.margin) {
      if (styleConfig.margin.top && styleConfig.margin.top.value !== undefined) {
        style.marginTop = styleConfig.margin.top.value + 'px';
      }
      if (styleConfig.margin.bottom && styleConfig.margin.bottom.value !== undefined) {
        style.marginBottom = styleConfig.margin.bottom.value + 'px';
      }
      if (styleConfig.margin.left && styleConfig.margin.left.value !== undefined) {
        style.marginLeft = styleConfig.margin.left.value + 'px';
      }
      if (styleConfig.margin.right && styleConfig.margin.right.value !== undefined) {
        style.marginRight = styleConfig.margin.right.value + 'px';
      }
    }
    // 内边距
    if (styleConfig.padding) {
      if (styleConfig.padding.top && styleConfig.padding.top.value !== undefined) {
        style.paddingTop = styleConfig.padding.top.value + 'px';
      }
      if (styleConfig.padding.bottom && styleConfig.padding.bottom.value !== undefined) {
        style.paddingBottom = styleConfig.padding.bottom.value + 'px';
      }
      if (styleConfig.padding.left && styleConfig.padding.left.value !== undefined) {
        style.paddingLeft = styleConfig.padding.left.value + 'px';
      }
      if (styleConfig.padding.right && styleConfig.padding.right.value !== undefined) {
        style.paddingRight = styleConfig.padding.right.value + 'px';
      }
    }
    // 字体
    if (styleConfig.font) {
      if (styleConfig.font.color && styleConfig.font.color.value) {
        style.color = styleConfig.font.color.value;
      }
      if (styleConfig.font.size && styleConfig.font.size.value !== undefined) {
        style.fontSize = styleConfig.font.size.value + 'px';
      }
      if (styleConfig.font.weight && styleConfig.font.weight.value) {
        style.fontWeight = styleConfig.font.weight.value === 'true' ? 'bolder' : 'normal';
      }
      if (styleConfig.font.lineHeight && styleConfig.font.lineHeight.value !== undefined) {
        style.lineHeight = styleConfig.font.lineHeight.value + 'px';
      }
      if (styleConfig.font.align && styleConfig.font.align.value) {
        style.textAlign = styleConfig.font.align.value;
      }
    }
  }
  return style;
}
