import { IConfig } from 'umi-types';
import routes from './routes';
import path from 'path';

// ref: https://umijs.org/config/
const config: IConfig = {
  routes,
  treeShaking: false,
  exportStatic: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: false,
        dynamicImport: {
          webpackChunkName: true,
        },
        title: {
          defaultTitle: 'Vsl',
          separator: ' | ',
          useLocale: true,
        },
        dll: false,
        locale: {
          enable: true,
          default: 'zh-CN',
        },
        routes: {
          exclude: [/components\//],
        },
      },
    ],
  ],
  // chainWebpack(config, { webpack }) {},
  alias: {
    '@': path.resolve(__dirname, '../src'),
  },
};

export default config;
