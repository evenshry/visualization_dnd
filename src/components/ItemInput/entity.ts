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
  SolidType: 'SolidType';
} = {
  String: 'String',
  Number: 'Number',
  Color: 'Color',
  Text: 'Text',
  Image: 'Image',
  HAlign: 'HAlign',
  VAlign: 'VAlign',
  Boolean: 'Boolean',
  SolidType: 'SolidType',
};

/**
 * 属性选择框配置
 */
export const SelectConfig: { [key: string]: Array<{ value: string; label: string }> } = {
  [InputConfig.HAlign]: [
    { value: 'left', label: '左边' },
    { value: 'center', label: '中间' },
    { value: 'right', label: '右边' },
  ],
  [InputConfig.VAlign]: [
    { value: 'top', label: '顶部' },
    { value: 'middle', label: '中间' },
    { value: 'bottom', label: '底部' },
  ],
  [InputConfig.Boolean]: [
    { value: 'true', label: '是' },
    { value: 'false', label: '否' },
  ],
  [InputConfig.SolidType]: [
    { value: 'solid', label: '实线' },
    { value: 'dashed', label: '虚线' },
    { value: 'dotted', label: '点线' },
  ],
};
