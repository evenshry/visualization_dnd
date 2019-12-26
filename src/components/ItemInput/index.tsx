import React, { FormEvent, useContext } from 'react';
import { Input, InputNumber, Select } from 'antd';
import { ChromePicker, ColorResult } from 'react-color';
import { InputConfig, SelectConfig } from '@/components/ItemInput/entity';
import { context } from '../context';

const { Option } = Select;

interface Props {
  data: Comp.StyleProps;
}

function ItemInput(props: Props) {
  const { data } = props;
  const { updateElementStyle } = useContext(context);

  function handleChange(event: any) {
    const value: string = event.target.value;
    data.key && updateElementStyle(data.key, value);
  }

  function handleValueChange(value?: number) {
    if (data.key && value !== undefined) {
      updateElementStyle(data.key, value.toString());
    }
  }

  function handleColorChange(color: ColorResult) {
    const rgba = color.rgb;
    const result = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
    data.key && updateElementStyle(data.key, result);
  }

  function handleSelectChange(value: string) {
    data.key && updateElementStyle(data.key, value);
  }

  let inputContent = <Input />;
  if (data.type === InputConfig.String) {
    inputContent = <Input value={data.value} onChange={handleChange} />;
  } else if (data.type === InputConfig.Number) {
    inputContent = <InputNumber value={data.value} min={0} onChange={handleValueChange} />;
  } else if (data.type === InputConfig.Color) {
    inputContent = (
      <Select
        suffixIcon={<div className="colorIcon" style={{ backgroundColor: data.value }} />}
        dropdownRender={() => (
          <ChromePicker color={data.value} onChangeComplete={handleColorChange} />
        )}
      />
    );
  } else if (data.type === InputConfig.Text) {
    inputContent = <Input.TextArea value={data.value} rows={2} onChange={handleChange} />;
  } else if (data.type === InputConfig.Image) {
    inputContent = <Input value={data.value} onChange={handleChange} />;
  } else {
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
