import React, { useContext } from 'react';
import { Input, InputNumber, Select } from 'antd';
import { InputConfig, SelectConfig } from '@/components/ItemInput/entity';
import ColorPicker from './ColorPicker';
import { context } from '../context';

const { Option } = Select;

interface Props {
  data: Comp.StyleProps;
}

function ItemInput(props: Props) {
  const { data } = props;
  const { updateElementStyle } = useContext(context);

  /**
   * 输入框 处理值
   */
  function handleInputChange(event: any) {
    const value: string = event.target.value;
    handleValueChange(value);
  }

  /**
   * 字符串类型 处理值
   */
  function handleValueChange(value: string) {
    if (data.key && value !== undefined) {
      updateElementStyle(data.key, value.toString());
    }
  }

  /**
   * 数字类型 处理值
   */
  function handleNumberChange(value?: number) {
    if (data.key && value !== undefined) {
      updateElementStyle(data.key, value.toString());
    }
  }

  /**
   * 选择类型 处理值
   */
  function handleSelectChange(value: string) {
    handleValueChange(value);
  }

  let inputContent = <Input />;

  // 文本类型输入框
  if (data.type === InputConfig.String) {
    inputContent = <Input value={data.value} onChange={handleInputChange} />;
  }

  // 数字类型输入框
  else if (data.type === InputConfig.Number) {
    inputContent = <InputNumber value={data.value} min={0} onChange={handleNumberChange} />;
  }

  // 颜色类型选择框
  else if (data.type === InputConfig.Color) {
    inputContent = <ColorPicker value={data.value} onChange={handleValueChange} />;
  }

  // 文本域类型输入框
  else if (data.type === InputConfig.Text) {
    inputContent = <Input.TextArea value={data.value} rows={2} onChange={handleInputChange} />;
  }

  // 图片类型选择框
  else if (data.type === InputConfig.Image) {
    inputContent = <Input value={data.value} onChange={handleInputChange} />;
  }

  // 其他类型选择框
  else {
    inputContent = (
      <Select value={data.value} className="w100" onChange={handleSelectChange}>
        {SelectConfig[data.type].map((item, index) => (
          <Option key={index} value={item.value}>
            {item.label}
          </Option>
        ))}
      </Select>
    );
  }

  return (
    <section className="inputRow">
      <section className="label">{data.name}：</section>
      <section className="value">{inputContent}</section>
    </section>
  );
}

export default ItemInput;
