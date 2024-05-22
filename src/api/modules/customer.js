import request from '@/utils/request'

//获取客户
export function getCustomer(page, size, uid) {
  return request({
    method: 'post',
    url: '/customer/queryall',
    params: {
      c: page,
      size: size,
      uid: uid
    }
  })
}
//获取客户详情
export function getInfoById(data) {
  return request({
    method: 'post',
    url: '/customer/query',
    params: {
      id: data
    }
  })
}
//新增客户
export function addCustomer(data) {
  return request({
    method: 'post',
    url: '/customer/add',
    params: data,
  })
}
//修改客户
export function updateCustomer(data) {
  return request({
    method: 'put',
    url: '/customer/update',
    data: data,
  })
}

//修改客户拥有者
export function updateOwner(cid, uid) {
  return request({
    method: 'put',
    url: '/customer/updateowner',
    params: {
      cid: cid,
      uid: uid
    }
  })
}
//搜素
export function search(current, size, column, like, owner) {
  return request({
    method: 'post',
    url: '/customer/search',
    params: {
      current: current,
      size: size,
      column: column,
      like: like,
      owner: owner // 0-公海
    }
  })
}

export function getCustomerList(id) {
  return request({
    method: 'get',
    url: '/customer/selectList',
    params: {
      uid: id
    }
  })
}

export function getNoOrder(id) {
  return request({
    method: 'get',
    url: 'customer/noOrderList',
    params: {
      uid: id
    }
  })
}

export function getPieData(uid, pid) {
  return request({
    method: 'get',
    url: 'customer/pie',
    params: {
      uid: uid,
      pid: pid
    }
  })
}

export function setLastContact(id, date, way) {
  return request({
    method: 'put',
    url: 'customer/putlast',
    params: {
      id,
      date,
      way
    }
  })
}

export function setMarket(cid, mid, pid) {
  return request({
    method: 'put',
    url: 'customer/putMarket',
    params: {
      cid,
      mid,
      pid
    }
  })
}

//获取客户列表
export function getCustomerAll() {
  return request({
    method: 'get',
    url: 'customer/allList'
  })
}

export function delectCustomer(id) {
  return request({
    method: 'delete',
    url: 'customer/delete',
    params: {
      ids: id
    }
  })
}