//工具

//日期增加天数
export function addDate(dateTemp, days) {
  var dateTemp = dateTemp.split("-");
  var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]); //转换为MM-DD-YYYY格式    
  var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);
  var rDate = new Date(millSeconds);
  var year = rDate.getFullYear();
  var month = rDate.getMonth() + 1;
  if (month < 10) month = "0" + month;
  var date = rDate.getDate();
  if (date < 10) date = "0" + date;
  return (year + "-" + month + "-" + date);
}
//计算 proList
//订单总额
export function getOrderSumPrice(list) {
  let sum = 0
  list.map(item => {
    sum += item.num * item.price
  })
  return sum
}
//计算订单数
export function getOrderSumNum(list) {
  let oidList = []
  list.map(item => {
    oidList.push(item.oid)
  })
  let newOidList = Array.from(new Set(oidList))
  return newOidList.length
}

//获取标准当前时间 YY-MM-dd hh:mm:ss
export function getTime(now) {
  var year = now.getFullYear();
  var month = (now.getMonth() + 1 < 10 ? '0' : '') + (now.getMonth() + 1);
  var day = (now.getDate() < 10 ? '0' : '') + now.getDate();
  var hour = (now.getHours() < 10 ? '0' : '') + now.getHours();
  var minute = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
  var second = (now.getSeconds() < 10 ? '0' : '') + now.getSeconds();

  var currentTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
  return currentTime
}