export default [
	{
		path: '/geeMart/shop',
		name: 'geeMartShop',
		meta: {
			title: '店铺首页',
			showSlideCoupon: true,
		},
		component: () => import('@/views/home/ShopHome'),
	},
]
