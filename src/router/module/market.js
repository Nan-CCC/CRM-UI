export default [
  {
    path: '/',
    redirect: '/index',
    component: () => import('@/views/Layout/index.vue'),
    meta: {
      icon: 'Briefcase',
      name: '营销活动'
    },
    children: [
      {
        path: 'addactive',
        name: 'AddActive',
        component: () => import('@/views/Marketing/AddActive.vue'),
        meta: {
          name: '增加活动'
        },
      },
      {
        path: 'mymarket',
        name: 'MyMarket',
        component: () => import('@/views/Marketing/MyMarket.vue'),
        meta: {
          name: '我的活动'
        },
      },

      {
        path: 'marketanalysis',
        name: 'MarketAnalysis',
        component: () => import('@/views/Marketing/Analysis.vue'),
        meta: {
          name: '营销分析'
        },
      },
    ]
  },
]