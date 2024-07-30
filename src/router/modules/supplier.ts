import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/supplier',
    component: Layout,
    name: 'supplier',
    redirect: '/supplier/index.vue',
    meta: {
      title: '供应商',
      // icon: shallowRef(DashboardIcon),
    },
    children: [
      {
        path: 'index',
        name: 'SupplierDetail',
        component: () => import('@/pages/supplier/index.vue'),
        meta: {
          title: '供应商详情',
        },
      },
    ],
  },
];
