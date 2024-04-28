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

export function getOrderByStatus(status, current, size) {
  return request({
    method: 'post',
    url: '/order/orderbystatus',
    params: {
      status: status,
      current: current,
      size: size
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
export function searchByColumn(current, size, status, column, like) {
  return request({
    method: 'post',
    url: 'order/orderbylike',
    params: {
      current,
      size,
      status,
      column,
      like
    }
  })
}