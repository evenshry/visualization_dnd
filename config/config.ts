import { IConfig } from 'umi-types';
import routes from './routes';
import path from 'path';

// ref: https://umijs.org/config/
const config: IConfig = {
  routes,
  treeShaking: true,
  history: 'hash',
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
          exclude: [/assets\//, /components\//, /hooks\//, /stores\//, /utils\//],
        },
      },
    ],
  ],
  
  chainWebpack(config) {
    // console.log(webpack);
    // 设置 alias
    config.resolve.alias.set('@', path.resolve(__dirname, '../src'));
    // 判断环境
    const isDev = process.env.NODE_ENV === 'development';
    // 打包js到 js文件夹下
    const hash = !isDev ? '.[contenthash:8]' : '';
    config.output.chunkFilename(`js/[name]${hash}.async.js`);
    // 打包css到 css文件夹下
    config.plugin('extract-css').tap(args => [
      {
        ...args[0],
        chunkFilename: `css/[name]${hash}.chunk.css`,
      },
    ]);
  },
};

export default config;
