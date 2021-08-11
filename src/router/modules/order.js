export default [
	{
		path: '/order',
		name: 'order',
		meta: {
			title: 'myOrders',
			showHeader: true,
			goBackUrl: 'my',
		},
		component: () => import('@/views/order/index'),
	},
	{
		path: '/orderDetail',
		name: 'orderDetail',
		meta: {
			title: 'orderDetails',
			showHeader: true,
			goBackUrl: '',
		},
		component: () => import('@/views/order/detail'),
	},
	{
		path: '/myReview',
		name: 'MyReview',
		meta: {
			title: 'My Review',

			showHeader: true,
		},
		component: () => import('@/views/order/myReview'),
	},
	{
		path: '/orderReview',
		name: 'orderReview',
		meta: {
			title: 'writeReview',
			showHeader: true,
		},
		component: () => import('@/views/order/review'),
	},
	{
		path: '/orderConfirm',
		name: 'orderConfirm',
		meta: {
			title: 'OrderConfirmation',
			showHeader: true,
			// goBackUrl: 'shoppingCar',
			keepAlive: true,
		},
		component: () => import('@/views/order/orderConfirm'),
	},
]
