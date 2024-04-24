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