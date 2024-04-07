import request from '@/utils/request'

export function getUserInfoByToken(data) {
  return request({
    method: 'get',
    url: '/user/queryuser',
    headers: {
      Authorization: data
    },
  })
}