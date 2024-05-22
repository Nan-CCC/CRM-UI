import request from '@/utils/request'

export async function getMenuAPI() {
  return request({
    method: 'post',
    url: '/menu/queryall',
    headers: {
      Authorization: sessionStorage.getItem('token')
    }
  })
}
export function getMenuAll() {
  return request({
    method: 'get',
    url: 'menu/selectAll'
  })
}
export function getMenuById(id) {
  return request({
    method: 'get',
    url: 'menu/selectByid',
    params: {
      id
    }
  })
}
export function getMenuListById(id) {
  return request({
    method: 'get',
    url: '/menu/selectMenuByid',
    params: {
      id
    }
  })
}