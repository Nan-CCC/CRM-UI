import request from '@/utils/request'
//获取全部
export function getAll() {
  return request({
    method: 'get',
    url: 'platform/queryall',
  })
}
//根据id获取平台
export function getPlatform(id) {
  return request({
    method: 'post',
    url: '/platform/query',
    params: {
      id
    }
  })
}