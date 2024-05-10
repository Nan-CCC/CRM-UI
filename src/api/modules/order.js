import request from '@/utils/request'
export function addOrder(data) {
  return request({
    method: 'post',
    url: '/order/add',
    data: {
      status: data.status,
      province: data.province,
      city: data.city,
      district: data.district,
      address: data.address,
      uid: data.uid,
      cid: data.cid,
      proList: data.proList
    }
  })
}

export function getOrderByStatus(status, current, size, uid) {
  return request({
    method: 'post',
    url: '/order/orderbystatus',
    params: {
      status: status,
      current: current,
      size: size,
      uid: uid
    }
  })
}

//根据订单编号修改状态
export function updateStatus(oid, status) {
  return request({
    method: 'put',
    url: '/order/updateStatus',
    params: {
      oid: oid,
      status: status
    }
  })
}

export function deleteOrderById(oid) {
  return request({
    method: 'delete',
    url: 'order/delete',
    params: {
      id: oid
    }
  })
}

//搜索
export function searchByColumn(current, size, status, column, like, uid) {
  return request({
    method: 'post',
    url: 'order/orderbylike',
    params: {
      current,
      size,
      status,
      column,
      like,
      uid
    }
  })
}

//产品列表，计算统计
export function getProList(date, uid) {
  return request({
    method: 'post',
    url: '/order/selectByMonth',
    params: {
      date,
      uid
    }
  })
}

//获取表数据
export function getDataByLine(list, column, uid) {
  return request({
    method: 'post',
    url: '/order/selectbychart',
    params: {
      column,
      uid
    },
    data: list
  })
}

//判断是否有过订单
//true-没有-新客户
export function getHaveOrder(cid) {
  return request({
    method: 'get',
    url: 'order/isOld',
    params: {
      cid
    }
  })
}

//查询历史订单
export function getHistory(cid, oid) {
  return request({
    method: 'get',
    url: 'order/history',
    params: {
      cid,
      oid
    }
  })
}