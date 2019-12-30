import React, { useContext } from 'react';
import { setLocale, getLocale } from 'umi-plugin-locale';
import { context } from '../../components/context';
import DragItem from '@/components/DragItem';
import { Select } from 'antd';

const { Option } = Select;

const LocaleConfig = [
  {
    value: 'en-US',
    label: 'English',
  },
  {
    value: 'zh-CN',
    label: '简体中文',
  },
];

function Headers() {
  const { elementsType } = useContext(context);

  function handleSelectChange(value: string) {
    setLocale(value);
  }

  return (
    <section className="header">
      <section className="navContainer">
        {elementsType.map(item => (
          <DragItem data={item} key={item.id} />
        ))}
      </section>

      <section className="switchLocale">
        <Select value={getLocale()} className="w100" onChange={handleSelectChange}>
          {LocaleConfig.map((item, index) => (
            <Option key={index} value={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
      </section>
    </section>
  );
}

export default Headers;
