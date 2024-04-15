import request from '@/utils/request'

export function isToken() {
  return request({
    method: 'get',
    url: '/user/verify',
  })
}

export async function getUserInfoByToken() {
  return request({
    method: 'get',
    url: '/user/queryuser',
  })
}