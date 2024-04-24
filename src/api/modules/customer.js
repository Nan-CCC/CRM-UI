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
    params: data,
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