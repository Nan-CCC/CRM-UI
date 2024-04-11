//通用路由
export const routes = [
  {
    name: 'Home',
    path: '/',
    component: () => import('@/layout/index.vue'),
    children: []
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/:path(.*)',
    component: () => import('../views/common/NotFound.vue')
  }
]
