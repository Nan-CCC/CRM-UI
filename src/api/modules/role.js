import request from '@/utils/request'
export function roleList() {
  return request({
    method: 'get',
    url: 'role/selectAll',
  })
}

export function addRole(role, mids) {
  return request({
    method: 'post',
    url: 'role/addById',
    data: {
      id: "",
      name: role.name,
      rstatus: role.rstatus,
      mids: mids
    }
  })
}

export function updateRole(role, mids) {
  return request({
    method: 'post',
    url: 'role/updateById',
    data: {
      id: role.id,
      name: role.name,
      rstatus: role.rstatus,
      mids: mids
    }
  })
}

export function deleteRole(id) {
  return request({
    method: 'delete',
    url: 'role/deleteById',
    params: {
      id: id
    }
  })
}