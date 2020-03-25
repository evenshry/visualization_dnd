import IConfig from 'umi-types';

const routes: IConfig.IRoute[] = [
  {
    path: '/',
    title: 'app.index',
    component: '../layouts/index',
    routes: [
      { path: '/', title: 'app.home', component: '../pages/Index/index' },
      { path: '/preview', title: 'app.preview', component: '../pages/Preview/index' },
      { path: '/test', component: '../pages/Test/memo' },
    ],
  },
];
export default routes;
