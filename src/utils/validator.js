//校验规则

//手机号码（好像不能空）
export function isPhone(rule, value, callack) {
  const reg = /^1[3456789]\d{9}$/
  return reg.test(value)
  //错误信息
  // callack(new Error('xxx不行'))
}
