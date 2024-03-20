export default [
  {
    path: '/',
    redirect: '/index',
    component: () => import('@/views/Layout/index.vue'),
    meta: {
      icon: 'List',
      name: '客户服务'
    },
    children: [
      {
        path: 'pending',
        name: 'Pending',
        component: () => import('@/views/Serve/Pending.vue'),
        meta: {
          name: '待处理服务'
        },
      },
      {
        path: 'processed',
        name: 'Processed',
        component: () => import('@/views/Serve/Processed.vue'),
        meta: {
          name: '已处理服务'
        },
      },
      {
        path: 'myserivce',
        name: 'MySerivce',
        component: () => import('@/views/Serve/MyService.vue'),
        meta: {
          name: '我的服务'
        },
      },

    ]
  }
]