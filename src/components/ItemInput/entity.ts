import { formatMessage } from 'umi-plugin-locale';

/**
 * 属性输入框类型
 */
export const InputConfig: {
  String: 'String';
  Number: 'Number';
  Color: 'Color';
  Text: 'Text';
  Image: 'Image';
  HAlign: 'HAlign';
  VAlign: 'VAlign';
  Boolean: 'Boolean';
  BorderStyle: 'BorderStyle';
  FlexDirection: 'FlexDirection';
  AlignItems: 'AlignItems';
  JustifyContent: 'JustifyContent';
} = {
  String: 'String',
  Number: 'Number',
  Color: 'Color',
  Text: 'Text',
  Image: 'Image',
  HAlign: 'HAlign',
  VAlign: 'VAlign',
  Boolean: 'Boolean',
  BorderStyle: 'BorderStyle',
  FlexDirection: 'FlexDirection',
  AlignItems: 'AlignItems',
  JustifyContent: 'JustifyContent',
};

/**
 * 属性选择框配置
 */
export const SelectConfig: { [key: string]: Array<{ value: string; label: string }> } = {
  [InputConfig.HAlign]: [
    { value: 'left', label: formatMessage({ id: 'select.HAlign.left' }) },
    { value: 'center', label: formatMessage({ id: 'select.center' }) },
    { value: 'right', label: formatMessage({ id: 'select.HAlign.left' }) },
  ],
  [InputConfig.VAlign]: [
    { value: 'top', label: formatMessage({ id: 'select.VAlign.top' }) },
    { value: 'middle', label: formatMessage({ id: 'select.center' }) },
    { value: 'bottom', label: formatMessage({ id: 'select.VAlign.bottom' }) },
  ],
  [InputConfig.Boolean]: [
    { value: 'true', label: formatMessage({ id: 'select.boolean.true' }) },
    { value: 'false', label: formatMessage({ id: 'select.boolean.false' }) },
  ],
  [InputConfig.BorderStyle]: [
    { value: 'solid', label: formatMessage({ id: 'select.border.style.solid' }) },
    { value: 'dashed', label: formatMessage({ id: 'select.border.style.dashed' }) },
    { value: 'dotted', label: formatMessage({ id: 'select.border.style.dotted' }) },
  ],
  [InputConfig.FlexDirection]: [
    { value: 'column', label: formatMessage({ id: 'select.flex.column' }) },
    { value: 'row', label: formatMessage({ id: 'select.flex.row' }) },
  ],
  [InputConfig.JustifyContent]: [
    { value: 'flex-start', label: formatMessage({ id: 'select.flex.start' }) },
    { value: 'center', label: formatMessage({ id: 'select.center' }) },
    { value: 'flex-end', label: formatMessage({ id: 'select.flex.end' }) },
  ],
  [InputConfig.AlignItems]: [
    { value: 'flex-start', label: formatMessage({ id: 'select.flex.start' }) },
    { value: 'center', label: formatMessage({ id: 'select.center' }) },
    { value: 'flex-end', label: formatMessage({ id: 'select.flex.end' }) },
  ],
};
