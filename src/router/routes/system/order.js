const orderRoute = {
  path: '/system/order',
  name: 'system-order',
  component: resolve => require(['@/pages/system/order/order'], resolve),
  children: [{
      path: '/system/order/list',
      name: 'order-list',
      meta: {
        menu: 'order|order-list',
        name: '订单列表',
        index: 2
      },
      component: resolve => require(['@/pages/system/order/order-list'], resolve)
    },
    {
      path: '/system/order/refund',
      name: 'order-refund',
      meta: {
        menu: 'order|order-refund',
        name: '退换单列表',
        index: 2
      },
      component: resolve => require(['@/pages/system/order/order-refund'], resolve)
    }
  ]
}
export default orderRoute
