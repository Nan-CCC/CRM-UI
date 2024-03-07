export default [
  {
    path: '/',
    redirect: '/index',
    component: () => import('@/views/Layout/index.vue'),
    meta: {
      icon: 'Avatar',
      name: '客户数据'
    },
    children: [
      {
        path: 'data',
        component: () => import('@/views/Customer/Data.vue'),
        meta: {
          name: '客户信息'
        }
      },
      {
        path: 'analysis',
        component: () => import('@/views/Customer/Analysis.vue'),
        meta: {
          name: '客户分析'
        }
      }
    ]
  }
]
