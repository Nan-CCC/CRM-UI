import request from '@/utils/request'


export function uploadFile(file) {
  return request({
    method: 'post',
    url: 'market/upload',
    Headers: { 'Content-Type': 'multipart/form-data' },
    data: file
  })
}

export function insert(data) {
  return request({
    method: 'post',
    url: 'market/add',
    data: {
      id: "",
      name: data.name,
      info: data.info,
      cost: data.cost,
      start: data.start,
      end: data.end,
      status: data.status,
      submit: data.submit,
      pidList: data.pidList,
      uidList: data.uidList
    }
  })
}

export function deleteMarket(data) {
  return request({
    method: 'delete',
    url: 'market/delete',
    params: {
      id: data
    }
  })
}

export function selectAll(c, s) {
  return request({
    method: 'post',
    url: 'market/queryall',
    params: {
      c: c,
      size: s
    }
  })
}

export function selectAllByStatus(c, s) {
  return request({
    method: 'post',
    url: 'market/queryallBystatus',
    params: {
      c: c,
      size: s
    }
  })
}

export function selectById(id) {
  return request({
    method: 'post',
    url: 'market/query',
    params: {
      id
    }
  })
}

export function selectAllList() {
  return request({
    method: 'get',
    url: 'market/queryall'
  })
}

export function updateMarket(data) {
  return request({
    method: 'put',
    url: 'market/update',
    data: data
  })
}

export function updateStatus(mid, status) {
  return request({
    method: 'put',
    url: 'market/updateStatus',
    params: {
      mid,
      status
    }
  })
}