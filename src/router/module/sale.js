export default [
  {
    path: '/',
    redirect: '/index',
    component: () => import('@/views/Layout/index.vue'),
    meta: {
      icon: 'DataAnalysis',
      name: '销售管理'
    },
    children: [
      {
        path: 'addorder',
        component: () => import('@/views/Sale/Addorder.vue'),
        meta: {
          name: '增加订单'
        }
      },
      {
        path: 'person',
        component: () => import('@/views/Sale/Person.vue'),
        meta: {
          name: '个人业绩'
        }
      },
      {
        path: 'chance',
        component: () => import('@/views/Sale/Chance.vue'),
        meta: {
          name: '查看机会'
        }
      },
      {
        path: 'contact',
        component: () => import('@/views/Sale/Contact.vue'),
        meta: {
          name: '联系客户'
        }
      }
    ]
  }
]