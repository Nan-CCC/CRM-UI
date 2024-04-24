//校验规则

//手机号码
export function isPhone(rule, value, callack) {
  const reg = /^1[3456789]\d{9}$/
  return reg.test(value)
}

//客户编号
export function isCustomer(rule, value, callack) {

  if (value.length != 8 || value.substring(0, 2) !== 'KH') {
    callack(new Error('请输入正确的客户编号'))
  } else {
    callack()
  }

}
