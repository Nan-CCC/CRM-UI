export default [
  {
    path: '/',
    component: () => import('@/views/Layout/index.vue'),
    meta: {
      icon: 'HomeFilled',
      name: '首页'
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/Index/index.vue')
      },
    ]
  },
]