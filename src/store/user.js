import { defineStore } from "pinia";
import { ref } from 'vue'
import { getError, getSuccess } from "@/utils/tips";
import { useRouter } from 'vue-router';
// 导入请求登录的接口
import { loginAPI } from "@/api/login";
import { getUserInfoByToken } from "@/api/modules/user";
import { useMenuStore } from "@/store/menu"

export const useUserStore = defineStore('user', () => {
  //定义管理用户数据的state
  const userInfo = ref({})

  const router = useRouter()
  // 定义获取接口数据的action函数
  const getUserInfo = async (data) => {
    const res = await loginAPI(data)
    if (res.code == '200') {
      //登录成功
      getSuccess(res.msg)
      //设置token
      sessionStorage.setItem("token", res.data)
      //获取用户信息
      let res2 = await getUserInfoByToken()
      userInfo.value = res2.data
      //获取菜单
      const menuStore = useMenuStore()
      await menuStore.getMenuInfo(userInfo.value.authority)
      router.push({ name: 'Home' })
    }
  }
  // 退出时清除用户信息
  const clearUserInfo = () => {
    sessionStorage.removeItem('token')
    userInfo.value = {}
  }
  // 以对象的形式把state和action return出去
  return { userInfo, getUserInfo, clearUserInfo }
},
  {
    //持久化
    persist: {
      enabled: true,
    },
  }
)
