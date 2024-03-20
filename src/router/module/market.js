export default [
  {
    path: '/',
    name: 'index',
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
        path: 'activing',
        name: 'Activing',
        component: () => import('@/views/Marketing/Activing.vue'),
        meta: {
          name: '进行中活动'
        },
      },
      {
        path: 'actived',
        name: 'Actived',
        component: () => import('@/views/Marketing/Actived.vue'),
        meta: {
          name: '已完成活动'
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