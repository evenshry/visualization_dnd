import axios from 'axios';
import { Http } from './interface';
import { message } from 'antd';
import router from 'umi/router';

type req = Http.HttpRequestConfig;

let host = 'https://api.sloveg.store'; // 服务地址

// if (process.env.UMI_ENV) {
//   if (process.env.UMI_ENV === 'pub') {
//     host = 'http://localhost'; // 测试地址
//   } else {
//     host = 'https://sloveg.store/sg_server'; // 正式地址
//   }
// }

// 请求地址
const ApiURL = `${host}/`;
axios.defaults.baseURL = ApiURL;

/**
 * 请求头信息拦截调整
 */
axios.interceptors.request.use(
  async (config: req): Promise<req> => {
    if (!config.timeout) {
      config.timeout = 30 * 1000;
    }
    // 给每个请求新增时间戳
    // config.params = Object.assign({ _s: Date.now() }, config.params);
    // 添加Token
    if (!config.noAuth) {
      const token = localStorage.getItem('TOKEN');
      config.headers['authorization'] = token;
    }
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    }
    return config;
  },
);

// 错误枚举
const ERROR_MSG: { [key: number]: string } = {
  500: '500, 服务器异常，请稍后再试',
  502: '502, 网关异常，请稍后再试',
  503: '抱歉，当前服务器异常，请稍后再试',
  504: '服务器响应超时',

  401: '抱歉，您还未登录',
  403: '抱歉，您没有权限访问该页面',
  404: '抱歉，请求走丢了',
};

/**
 * 请求头信息拦截调整
 */
axios.interceptors.response.use(
  (response): any => {
    const result = response.data || {};
    // 非成功状态提示
    if (!result.success) {
      const msg = result.message || '出错了，请重试！';
      message.error(msg);
      const error = new Error(msg);
      return Promise.reject(error);
    }
    return result;
  },
  error => {
    // console.log('error', error);
    if (error.data && !error.data.message) {
      const code: number = error.status || 404;
      error.data.message = ERROR_MSG[code] || '发生了预期之外的错误';
    }
    const result = error.response.data || {};
    message.error(result.message || '出错了，请重试！');
    if (result.status === 401) {
      router.push('/login');
    }
    return Promise.reject(error);
  },
);

export function get<T>(url: string, config?: req): Promise<Http.ServerResponse<T>> {
  return axios.get(url, config);
}

export function post<T>(url: string, params: any, config?: req): Promise<Http.ServerResponse<T>> {
  return axios.post(url, params, config);
}

export function put<T>(url: string, params: any, config?: req): Promise<Http.ServerResponse<T>> {
  return axios.put(url, params, config);
}

export function _delete<T>(url: string, config?: req): Promise<Http.ServerResponse<T>> {
  return axios.delete(url, config);
}

const http = {
  ApiURL,
  host,
  get,
  post,
  put,
  delete: _delete,
};

export default http;
