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
        path: 'myorder',
        name: 'Myorder',
        redirect: 'myorder/addorder',
        component: () => import('@/views/Sale/Myorder.vue'),
        meta: {
          name: '增加订单'
        },
        children: [
          {
            path: 'orders',
            name: 'Orders',
            component: () => import('@/views/Sale/myorder/Orders.vue'),
          },
          {
            path: 'addorder',
            name: 'Addorder',
            component: () => import('@/views/Sale/myorder/Addorder.vue'),
          },
          {
            path: 'ordering',
            name: 'Ordering',
            component: () => import('@/views/Sale/myorder/Ordering.vue')
          }
        ]
      },
      {
        path: 'person',
        name: 'Person',
        component: () => import('@/views/Sale/Person.vue'),
        meta: {
          name: '个人业绩'
        }
      },
      {
        path: 'chance',
        name: 'Chance',
        component: () => import('@/views/Sale/Chance.vue'),
        meta: {
          name: '查看机会'
        }
      },
      {
        path: 'contact',
        name: 'Contact',
        component: () => import('@/views/Sale/Contact.vue'),
        meta: {
          name: '联系客户'
        }
      }
    ]
  }
]