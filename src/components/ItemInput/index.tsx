import React, { useContext, useState, useEffect } from 'react';
import { Input, InputNumber, Select } from 'antd';
import { InputConfig, SelectConfig } from '@/components/ItemInput/entity';
import { context } from '../context';
import ColorPicker from './ColorPicker/index';
import TextInput from './TextInput';

const { Option } = Select;

interface Props {
  data: Comp.StyleProps;
}

function ItemInput(props: Props) {
  const { data } = props;
  const { updateElementStyle } = useContext(context);
  const [inValue, setInValue] = useState<any>(data.value);

  useEffect(() => {
    setInValue(inValue);
  }, [data.value]);

  /**
   * 输入框 处理值
   */
  function handleEventChange(event: any) {
    const value: string = event.target.value;
    handleValueChange(value);
  }

  /**
   * 数字类型 处理值
   */
  function handleNumberChange(value?: number) {
    if (data.key && value !== undefined) {
      handleValueChange(value);
    }
  }

  /**
   * 选择类型 处理值
   */
  function handleSelectChange(value: string) {
    handleValueChange(value);
  }

  /**
   * 触发值改变
   */
  function handleValueChange(value: any) {
    if (data.key && value !== undefined) {
      updateElementStyle(data.key, value);
      setInValue(value);
    }
  }

  let inputContent = <Input />;

  // 文本类型输入框
  if (data.type === InputConfig.String) {
    inputContent = <Input value={inValue} onChange={handleEventChange} />;
  }

  // 数字类型输入框
  else if (data.type === InputConfig.Number) {
    inputContent = <InputNumber value={inValue} min={0} onChange={handleNumberChange} />;
  }

  // 颜色类型选择框
  else if (data.type === InputConfig.Color) {
    inputContent = <ColorPicker value={inValue} onChange={handleValueChange} />;
  }

  // 富文本类型输入框
  else if (data.type === InputConfig.Text) {
    inputContent = <TextInput value={inValue} onChange={handleValueChange} />;
  }

  // 图片类型选择框
  else if (data.type === InputConfig.Image) {
    inputContent = <Input value={inValue} onChange={handleEventChange} />;
  }

  // 其他类型选择框
  else {
    inputContent = (
      <Select value={inValue} className="w100" onChange={handleSelectChange}>
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
