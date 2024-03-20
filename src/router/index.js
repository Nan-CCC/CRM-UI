import { createRouter, createWebHashHistory } from "vue-router";
import customer from './module/customer';
import first from "./module/first";
import sale from "./module/sale";
import market from './module/market';
import service from './module/service'
// 创建路由器router
export default createRouter({
  history: createWebHashHistory(), //hash模式
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/login',
      hidden: true,
      component: () => import('@/views/Login/index.vue')
    },
    ...first,
    ...customer,
    ...sale,
    ...market,
    ...service
  ]
})

