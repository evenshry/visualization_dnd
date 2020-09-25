import React, { useContext } from 'react';
import { setLocale, getLocale, formatMessage } from 'umi-plugin-locale';
import { context } from '@/components/context';
import { Select, Button } from 'antd';
import router from 'umi/router';
import styles from './style.less';

const { Option } = Select;

const LocaleConfig = [
  {
    value: 'en-US',
    label: 'English'
  },
  {
    value: 'zh-CN',
    label: '简体中文'
  }
];

function Headers() {
  const { updateElementMode } = useContext(context);

  function handleSelectChange(value: string) {
    setLocale(value);
  }

  function handlePreview() {
    updateElementMode(false);
    router.push('/preview');
  }

  return (
    <section className={styles.header}>
      <section className={styles.navContainer}>
        <section className={styles.logo}>{formatMessage({ id: 'app.name' })}</section>
      </section>

      <section className={styles.buttons}>
        <Button onClick={handlePreview}>{formatMessage({ id: 'button.preview' })}</Button>
      </section>

      <section className={styles.switchLocale}>
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
