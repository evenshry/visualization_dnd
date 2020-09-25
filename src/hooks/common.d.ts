declare namespace Common {
  interface AnyObject {
    [key: string]: any;
  }

  /**
   * 分页参数
   */
  interface PageParams {
    pageIndex?: number;
    pageSize?: number;
  }

  /**
   * 分页结果
   */
  interface PageResult<T> {
    list?: T[];
    pageIndex?: number;
    pageSize?: number;
    total?: number;
  }
}
