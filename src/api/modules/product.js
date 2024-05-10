import request from '@/utils/request'
//查所有产品
export function getAllProduct() {
  return request({
    method: 'get',
    url: '/produce/queryall',
  })
}

//根据id查产品
export function getProductById(data) {
  return request({
    method: 'post',
    url: '/produce/query',
    params: {
      id: data
    }
  })
}

export function getCustomerTop() {
  return request({
    method: 'get',
    url: 'produce/top'
  })
}