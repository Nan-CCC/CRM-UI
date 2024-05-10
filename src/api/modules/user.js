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

//全部用户
export function getAllUser() {
  return request({
    method: 'get',
    url: '/user/queryall'
  })
}

//查询用户
export function getUser(id) {
  return request({
    method: 'post',
    url: 'user/query',
    params: {
      id
    }
  })
}