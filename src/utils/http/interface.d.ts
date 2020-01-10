import { AxiosRequestConfig } from 'axios';

declare namespace Http {
  /**
   * server端返回的数据格式
   */
  interface ServerResponse<T> {
    readonly success: boolean;
    readonly status: number;
    readonly data: T;
    readonly message: string;
    readonly timestamp: number;
  }

  /**
   * 配置
   */
  interface HttpRequestConfig extends AxiosRequestConfig {
    /**
     * 不验证
     */
    withOutAuth?: boolean;
  }
}
