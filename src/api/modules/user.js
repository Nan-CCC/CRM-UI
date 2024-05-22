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

export function deleteUser(id) {
  return request({
    method: 'delete',
    url: 'user/delete',
    params: {
      ids: id
    }
  })
}
export function updateUser(data) {
  return request({
    method: 'put',
    url: 'user/update',
    data: data
  })
}

export function insertUser(data) {
  return request({
    method: 'post',
    url: 'user/add',
    data: data
  })
}

export function selectPartUser(column, search) {
  return request({
    method: 'get',
    url: 'user/queryby',
    params: {
      column: column,
      select: search
    }
  })
}

export function insertInfo(data) {
  return request({
    method: 'post',
    url: 'user/addInfo',
    data: data
  })
}

export function selectInfo(toid) {
  return request({
    method: 'get',
    url: 'user/selectInfo',
    params: {
      toid
    }
  })
}

export function updateInfo(toid) {
  return request({
    method: 'put',
    url: 'user/updateInfo',
    params: {
      toid
    }
  })
}