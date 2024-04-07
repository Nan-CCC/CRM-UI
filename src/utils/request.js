//二次封装axios
import axios from "axios";
import { useUserStore } from "@/store/user";
import { getError } from '@/utils/tips';
import router from "@/router";
//创建axios实例
const service = axios.create({
  //vue.config.js
  baseURL: '/api',
  timeout: 5000
});

//请求拦截器
service.interceptors.request.use(
  config => {

    console.log('-----正确请求拦截器------')

    const userStore = useUserStore()

    if (userStore.userInfo.data) {
      //加入token信息
      const token = userStore.userInfo.data
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  },
  //错误信息处理
  error => {
    console.log('-----错误请求拦截器------')
    return Promise.reject(error)
  })

//响应拦截器
service.interceptors.response.use(
  response => {
    console.log('-----正确响应拦截器------')
    return response.data
  },
  error => {
    console.log('-----错误响应请求拦截器------')
    const userStore = useUserStore()

    //console.log(error);
    getError(error.response.data.msg)
    //console.log(error.response)
    //清除本地用户数据
    //跳转到登录
    if (error.response.status === 401) {
      userStore.clearUserInfo()
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default service