/**
 * 生成10位随机码
 */
const uuidConfig = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
export function uuid() {
  let result = '';
  for (let i = 0; i < 10; i++) {
    const pos = Math.round(Math.random() * (uuidConfig.length - 1));
    result += uuidConfig.charAt(pos);
  }
  return result;
}

/**
 * 判断值是否为对象
 * @param object 任何值
 */
export function isObject(object: any) {
  return (typeof object === 'object' || typeof object === 'function') && object !== null;
}

/**
 * 递归继承属性
 * @param 被继承对象
 * @param 继承对象
 */
export function recursionExtendProp(source: Common.AnyObject, target: Common.AnyObject) {
  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      if (isObject(source[key])) {
        if (!target[key]) {
          target[key] = Array.isArray(source[key]) ? [] : {};
        }
        recursionExtendProp(source[key], target[key]);
      } else {
        if (!target[key]) {
          target[key] = source[key];
        }
      }
    }
  }
}
