//二次封装axios
import axios from "axios";
import { getWarning, getError } from '@/utils/tips';
import { useRouter, useRoute } from "vue-router";

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
    if (!config.data) {
      config.data = true // 解决请求没有参数时添加不上Content-Type问题
    }
    let token = sessionStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    //console.log(config.headers)
    return config;
  },
  //错误信息处理
  error => {
    console.log('-----错误请求拦截器------')
    console.log(error);
    return Promise.reject(error)
  })

//响应拦截器
service.interceptors.response.use(
  response => {
    console.log('-----正确响应拦截器------')
    if (response.data.code == '401') {
      getWarning(response.data.msg)
      return response.data
    }
    else if (response.data.code == '400') {
      getError(response.data.msg)
    }
    else if (response.data.code == '200') {
      return response.data
    }

  },
  error => {
    console.log('-----错误响应拦截器------')
    console.log(error.message);
    getError(error.message)
    return Promise.resolve(error.response)
    //这种会出报错页面
    //return Promise.reject(error)
  }
)

export default service