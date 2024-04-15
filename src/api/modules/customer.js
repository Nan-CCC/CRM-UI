import request from '@/utils/request'
//获取公海
export function getPublicCustomer(page, size) {
  return request({
    method: 'post',
    url: '/customer/queryallpublic',
    params: {
      c: page,
      size: size
    }
  })
}
//获取客户
export function getCustomer(page, size, id) {
  return request({
    method: 'post',
    url: '/customer/queryalluser',
    params: {
      c: page,
      size: size,
      id: id
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