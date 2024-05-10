import request from '@/utils/request'

export function selectLast() {
  return request({
    method: 'get',
    url: '/log/last',
  })
}