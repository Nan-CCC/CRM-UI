export default [
  {
    path: '/',
    redirect: '/index',
    component: () => import('@/views/Layout/index.vue'),
    meta: {
      icon: 'HomeFilled',
      name: '首页'
    },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/Index/index.vue')
      },
    ]
  },
]