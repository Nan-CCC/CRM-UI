import { defineStore } from "pinia";
import { computed, reactive, ref } from 'vue'
import { getError, getSuccess } from "@/utils/tips";
import { useRouter } from 'vue-router';
// 导入请求登录的接口
import { loginAPI } from "@/api/login";
export const useUserStore = defineStore('user', () => {
  //定义管理用户数据的state
  const userInfo = ref({})
  const router = useRouter()
  // 定义获取接口数据的action函数
  const getUserInfo = async (data) => {
    const res = await loginAPI(data)

    userInfo.value = res.data
    //console.log(res);
    if (res.code == '200') {
      getSuccess(res.msg)
      router.push('/index')
    }
    else if (res.code == '400') {
      getError(res.msg)
    }
  }
  // 退出时清除用户信息
  const clearUserInfo = () => {
    userInfo.value = {}
  }
  // 以对象的形式把state和action return出去
  return { userInfo, getUserInfo }
}, {
  //持久化
  persist: {
    enabled: true,
  },
})
