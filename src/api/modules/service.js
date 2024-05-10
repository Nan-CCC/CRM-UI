import request from '@/utils/request'

export function selectAll(c, s, status, type) {
  return request({
    method: 'post',
    url: 'service/queryall',
    params: {
      c: c,
      size: s,
      status: status,
      type: type
    }
  })
}

export function updateById(id, status) {
  return request({
    method: 'put',
    url: '/service/update',
    params: {
      id: id,
      status: status
    }
  })
}

export function getContent(sid) {
  return request({
    method: 'get',
    url: 'service/getContent',
    params: {
      sid
    }
  })
}
//新增服务过程内容
export function addSContent(sid, uid, content) {
  return request({
    method: 'post',
    url: 'service/addContent',
    data: {
      changeTime: "",
      cid: "",
      content: content,
      id: 0,
      sid: sid,
      uid: uid
    }
  })
}

//客户历史
export function getHistoryService(cid, type) {
  return request({
    method: 'post',
    url: '/service/endHistory',
    params: {
      cid: cid,
      type: type
    }
  })
}