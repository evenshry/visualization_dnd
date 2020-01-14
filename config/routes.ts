import IConfig from 'umi-types';

const routes: IConfig.IRoute[] = [
  {
    path: '/',
    title: 'app.index',
    component: '../layouts/index',
    routes: [
      { path: '/', title: 'app.home', component: '../pages/index' },
      { path: '/preview', title: 'app.preview', component: '../pages/preview' },
      { path: '/testMemo', component: '../pages/testMemo' },
    ],
  },
];
export default routes;
