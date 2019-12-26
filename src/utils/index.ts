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
