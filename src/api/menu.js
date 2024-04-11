import request from '@/utils/request'

export async function getMenuAPI(val) {
  return request({
    method: 'post',
    url: '/menu/queryall',
    params: { role: val }
  })

}