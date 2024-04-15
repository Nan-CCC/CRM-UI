//员工日程计划
import request from '@/utils/request'

export function addSchedule(data) {
  return request({
    method: 'post',
    url: '/schedule/add',
    data: {
      id: '',
      user: data.user,
      content: data.content,
      date: data.date
    }
  })
}

export async function getOneDay(uid, day) {
  return request({
    method: 'post',
    url: '/schedule/getToday',
    params: {
      uid: uid,
      day: day
    }
  })
}

export function queryAllSchedule(uid) {
  return request({
    method: 'post',
    url: '/schedule/queryall',
    params: {
      uid: uid
    }
  })
}

export function updateOneDay(uid, date, content) {
  return request({
    method: 'put',
    url: '/schedule/update',
    params: {
      uid: uid,
      date: date,
      content: content
    }
  })
}

export function updateStatus(id, status) {
  return request({
    method: 'put',
    url: '/schedule/update2',
    params: {
      id: id,
      status: status
    }
  })
}

export function daleteOneDay(uid, date) {
  return request({
    method: 'delete',
    url: '/schedule/delete',
    params: {
      uid: uid,
      date: date
    }

  })
}