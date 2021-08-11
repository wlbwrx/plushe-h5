export default [
	{
		path: '/my',
		name: 'my',
		meta: {
			title: 'Mine',
			showTabbar: true,
			// keepAlive: true,
			showFbMsg: true, // 是否显示Fb聊天
		},
		component: () => import('@/views/my/index'),
	},
	{
		path: '/review_detail',
		name: 'reviewDetail',
		meta: {
			title: 'Reviews',
			// showHeader: true
		},
		component: () => import('@/views/review/Detail'),
	},
	// {
	// 	path: '/review_publish',
	// 	name: 'reviewPublish',
	// 	meta: {
	// 		title: 'Reviews',
	// 	},
	// 	component: () => import('@/views/review/Publish'),
	// },
	{
		path: '/coupon',
		name: 'coupon',
		meta: {
			title: 'MyCoupons',
			showHeader: true,
			keepAlive: true,
		},
		component: () => import('@/views/coupon/coupon'),
	},
	{
		path: '/receiveCoupon',
		name: 'receiveCoupon',
		meta: {
			title: 'Receive Coupons',
			showHeader: true,
		},
		component: () => import('@/views/coupon/receiveCoupon'),
	},
	{
		path: '/myCoupon',
		name: 'myCoupon',
		meta: {
			title: 'MyCoupons',
			showHeader: true,
		},
		component: () => import('@/views/coupon/myCoupon'),
	},
	{
		path: '/myAddress',
		name: 'myAddress',
		meta: {
			title: 'myAddresses',
			showHeader: true,
		},
		component: () => import('@/views/address/index'),
	},
	// {
	// 	path: '/selectCountry',
	// 	name: 'selectCountry',
	// 	meta: {
	// 		title: 'Shipping Address',
	// 		showHeader: true,
	// 	},
	// 	component: () => import('@/views/address/selectCountry'),
	// },
	{
		path: '/selectAddress',
		name: 'selectAddress',
		meta: {
			title: 'myAddresses',
			showHeader: true,
		},
		component: () => import('@/views/address/selectAddress'),
	},
	{
		path: '/shippingAddress',
		name: 'shippingAddress',
		meta: {
			title: 'pay.shippingAddress',
			showHeader: true,
			goBackUrl: '',
		},
		component: () => import('@/views/address/shippingAddress'),
	},
	{
		path: '/logistics',
		name: 'logistics',
		meta: {
			title: 'tracking',
			showHeader: true,
		},
		component: () => import('@/views/my/logistics'),
	},
	{
		path: '/logisticsDetail',
		name: 'logisticsDetail',
		meta: {
			title: 'my.Details',
			showHeader: true,
		},
		component: () => import('@/views/my/detail'),
	},
	{
		path: '/userSet',
		name: 'userSet',
		meta: {
			title: 'settings',
			showHeader: true,
		},
		component: () => import('@/views/my/userSet'),
	},
	{
		path: '/userEdit',
		name: 'userEdit',
		meta: {
			title: 'profile',
			showHeader: true,
		},
		component: () => import('@/views/my/userEdit'),
	},
	{
		path: '/about',
		name: 'about',
		meta: {
			title: 'other.name6',
			showHeader: true,
		},
		component: () => import('@/views/my/about'),
	},
	{
		path: '/connectToUs',
		name: 'connectToUs',
		meta: {
			title: 'other.title9',
			keepAlive: true,
			showFbMsg: true, // 是否显示Fb聊天
		},
		component: () => import('@/views/my/ConnectToUs'),
	},
	{
		path: '/otherInfo',
		name: 'otherInfo',
		meta: {
			title: '协议等静态页面',
			keepAlive: true,
		},
		component: () => import('@/views/my/OtherInfo'),
	},
]
