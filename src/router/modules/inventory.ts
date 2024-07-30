import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/inventory',
    name: 'inventory',
    component: Layout,
    redirect: '/inventory/in/index.vue',
    meta: {
      title: '库存',
      // icon: 'layers',
    },
    children: [
      {
        path: 'in',
        name: 'inventory_in',
        component: () => import('@/pages/inventory/in/index.vue'),
        meta: {
          title: '入库存',
        },
      },
      {
        path: 'out',
        name: 'inventory_out',
        component: () => import('@/pages/inventory/out/index.vue'),
        meta: {
          title: '出库存',
        },
      },
    ],
  },
];
