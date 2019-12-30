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
};
