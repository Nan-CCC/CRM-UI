import { ElMessage } from 'element-plus'

//错误提示
export function getError(info) {
  ElMessage({
    message: info,
    type: 'error',
  })
}

//警告提示
export function getWarning(info) {
  ElMessage({
    message: info,
    type: 'warning',
  })
}

//成功提示
export function getSuccess(info) {
  ElMessage({
    message: info,
    type: 'success',
  })
}