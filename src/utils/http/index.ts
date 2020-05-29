import axios, { AxiosResponse, AxiosError } from 'axios';
import { Http } from './interface';
import { message } from 'antd';
import { createHashHistory } from 'history';

const history = createHashHistory();
type req = Http.HttpRequestConfig;

const URL = 'https://sloveg.store/sg_server/api';

// 请求地址
axios.defaults.baseURL = URL;

/**
 * 请求头信息拦截调整
 */
axios.interceptors.request.use(
  async (config: req): Promise<req> => {
    if (!config.timeout) {
      config.timeout = 30 * 1000;
    }
    // 给每个请求新增时间戳
    config.params = Object.assign({ _s: Date.now() }, config.params);

    if (!config.withOutAuth) {
      const token = localStorage.getItem('TOKEN');
      config.headers['Authorization'] = token;
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
  (response: AxiosResponse<Http.ServerResponse<any>>): any => {
    // console.log('success', response);
    const result = response.data;
    // 非成功状态提示
    if (!result.success) {
      const msg = result.message || '出错了，请重试！';
      const error = new Error(msg);
      message.error(msg);
      return Promise.reject(error);
    }
    return result;
  },
  (error: AxiosError<Http.ServerResponse<any>>) => {
    // console.log('error', error);
    const result = error.response?.data;
    message.error(
      (error.code && ERROR_MSG[Number(error.code)]) || result?.message || '出错了，请重试！',
    );
    if (result?.status === 401) {
      history.push('/login');
    }
    return Promise.reject(error);
  },
);

function get<T>(url: string, config?: req): Promise<Http.ServerResponse<T>> {
  return axios.get(url, config);
}

function post<T>(url: string, params: any, config?: req): Promise<Http.ServerResponse<T>> {
  return axios.post(url, params, config);
}

function put<T>(url: string, params: any, config?: req): Promise<Http.ServerResponse<T>> {
  return axios.put(url, params, config);
}

function _delete<T>(url: string, config?: req): Promise<Http.ServerResponse<T>> {
  return axios.delete(url, config);
}

export { URL, get, post, put, _delete as delete };
