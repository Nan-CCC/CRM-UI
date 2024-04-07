import request from '@/utils/request'

export async function loginAPI(data) {
  return request({
    method: 'post',
    url: '/user/login',
    params: {
      id: data.user,
      password: data.password,
      verify: data.verify
    }
  })
}