import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/client',
    component: Layout,
    name: 'customer',
    redirect: '/client/index.vue',
    meta: {
      title: '客户',
      // icon: shallowRef(DashboardIcon),
    },
    children: [
      {
        path: 'index',
        name: 'CustomerDetail',
        component: () => import('@/pages/client/index.vue'),
        meta: {
          title: '客户详情',
        },
      },
    ],
  },
];
