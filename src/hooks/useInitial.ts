import { useEffect, useState } from 'react';
import { Http } from '@/utils/http/interface';

type APIFunc<T, P> = (params: P) => Http.PrNormal<T>;

/**
 * @param {api} —api.ts件中封装的接口请求方法
 * @param {defaultData} 页面初始化时接口数据的默认值
 * @param {params} 接口所需要的参数
 * @param {switchOn} 当该值为false时，接口不请求
 */
export function useInitial<T, P>(api: APIFunc<T, P>, defaultData: T, params: P) {
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(true);
  const [errMsg, setErrMsg] = useState<string>('');
  const [data, setData] = useState<T>(defaultData);

  useEffect(() => {
    if (!refreshing) {
      return;
    }

    setLoading(true);
    setRefreshing(true);

    api(params)
      .then(response => {
        setData(response.data);
        setErrMsg('');
        setRefreshing(false);
        setLoading(false);
      })
      .catch(error => {
        setData(defaultData);
        setErrMsg(error.message);
        setRefreshing(false);
        setLoading(false);
      });
  }, [refreshing]);

  return {
    refreshing,
    errMsg,
    data,
    setData,
    setRefreshing,
    setErrMsg,
    loading,
  };
}
