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
        path: 'public',
        name: 'Public',
        component: () => import('@/views/Customer/Public.vue'),
        meta: {
          name: '公海客户'
        },
      },
      {
        path: 'data',
        name: 'Data',
        component: () => import('@/views/Customer/Data.vue'),
        meta: {
          name: '客户信息'
        },
      },
      {
        path: 'analysis',
        name: 'Analysis',
        component: () => import('@/views/Customer/Analysis.vue'),
        meta: {
          name: '客户分析'
        }
      },
      {
        path: 'details/:id',
        name: 'Details',
        component: () => import('@/views/Customer/Details.vue'),
        meta: {
          name: '客户详情'
        },

      },

    ]
  }
]
