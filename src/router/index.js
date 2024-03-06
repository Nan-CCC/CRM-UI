import { createRouter, createWebHashHistory } from "vue-router";
// 创建路由器router
const router = createRouter({
  history: createWebHashHistory(), //hash模式
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/',
      component: () => import('@/views/Contain/Container.vue'),
      children: [
        {
          path: 'index',
          component: () => import('@/views/Index/index.vue')
        },
        {
          path: 'data',
          component: () => import('@/views/Customer/Data.vue')
        }
      ]
    }


  ]
})
export default router
