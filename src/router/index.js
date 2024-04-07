import { createRouter, createWebHashHistory } from "vue-router";
import customer from './module/customer';
import first from "./module/first";
import sale from "./module/sale";
import market from './module/market';
import service from './module/service'
import { getError, getSuccess } from "@/utils/tips";
// 创建路由器router
const router = createRouter({
  history: createWebHashHistory(), //hash模式
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      hidden: true,
      component: () => import('@/views/Login/index.vue')
    },
    {
      path: '/:path(.*)',
      component: () => import('../views/Common/NotFound.vue')
    },
    ...first,
    ...customer,
    ...sale,
    ...market,
    ...service
  ]
})

router.beforeEach(async (to, from) => {
  var user = sessionStorage.getItem("user")
  var userInfo = JSON.parse(user)

  if (userInfo !== null) {
    if (
      // 检查用户是否已登录 token
      userInfo.userInfo === null &&
      // 避免无限重定向
      to.name !== 'Login'
    ) {
      getError('无token,请登录')
      // 将用户重定向到登录页面
      return { name: 'Login' }
    }
  }

})

export default router