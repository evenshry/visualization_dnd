import { IConfig } from 'umi-types';
import routes from './routes';

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  routes,
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
};

export default config;
