import request from '@/utils/request'
//新增
export function addContract(file, oid, date, newDate) {
  return request({
    method: 'post',
    url: '/contract/add',
    Headers: { 'Content-Type': 'multipart/form-data' },
    data: file,
    params: {
      oid: oid,
      date: date,
      status: newDate
    }
  })
}

