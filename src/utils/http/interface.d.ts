import { AxiosRequestConfig } from 'axios';

declare namespace Http {
  /**
   * server端返回的数据格式
   */
  interface ServerResponse<T> {
    readonly data: T;
    readonly message: string;
    readonly success: boolean;
  }

  /**
   * 配置
   */
  interface HttpRequestConfig extends AxiosRequestConfig {
    /**
     * 不验证
     */
    noAuth?: boolean;
  }

  // 一般返回数据格式
  type PrNormal<T> = Promise<Http.ServerResponse<T>>;

  // 分页返回数据格式
  type PrPage<T> = Promise<Http.ServerResponse<Common.PageResult<T>>>;
}
