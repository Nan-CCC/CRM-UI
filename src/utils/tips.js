import { ElMessage } from 'element-plus'

//错误提示
export function getError(info) {
  ElMessage({
    message: info,
    type: 'error',
  })
}