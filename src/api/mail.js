import request from '@/utils/request'
export function sendMail(to, subject, text) {
  return request({
    method: 'post',
    url: 'mail/sendTextMail',
    params: {
      to,
      subject,
      text
    }
  })
}