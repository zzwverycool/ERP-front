import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/product',
    component: Layout,
    name: 'product',
    redirect: '/product/index.vue',
    meta: {
      title: '产品',
      // icon: shallowRef(DashboardIcon),
    },
    children: [
      {
        path: 'index',
        name: 'ProductDetail',
        component: () => import('@/pages/product/index.vue'),
        meta: {
          title: '产品详情',
        },
      },
    ],
  },
];
