export default [
	{
		path: '/home',
		redirect: '/',
	},
	{
		path: '/',
		name: 'Home',
		meta: {
			title: '首页',
			keepAlive: true, // 需要被缓存
			showTabbar: true, // 是否显示底部导航栏
			showSlideCoupon: true, // 是否需要显示侧边优惠券
			// showFbMsg: true, // 是否显示Fb聊天
		},
		component: () => import(/* webpackChunkName: "home" */ '@/views/home/index'),
	},
	{
		path: '/category',
		name: 'category',
		meta: {
			title: '商品类目',
			keepAlive: true,
			showTabbar: true,
			// showSlideCoupon: true,
		},
		component: () => import(/* webpackChunkName: "category" */ '@/views/category/index'),
	},
	{
		path: '/category/:categoryTitle',
		name: 'goodsFilter',
		meta: {
			title: '商品筛选列表',
			keepAlive: true,
			// showSlideCoupon: true,
			// showFbMsg: true, // 是否显示Fb聊天
		},
		component: () => import(/* webpackChunkName: "categoryList" */ '@/views/goods_filter/index'),
	},
	{
		path: '/product/:productNo',
		name: 'goodsDetail',
		meta: {
			title: '商品详情',
			keepAlive: true,
			// showSlideCoupon: true,
			// showFbMsg: true, // 是否显示Fb聊天
		},
		component: () => import(/* webpackChunkName: "product" */ '@/views/goods_detail/index'),
	},
	{
		path: '/goodsSize',
		name: 'goodsSize',
		meta: {
			title: 'Size Guide',
		},
		component: () => import('@/views/goods_detail/SizeGuide'),
	},
	{
		path: '/shopping_car',
		name: 'shoppingCar',
		meta: {
			title: '购物车',
			keepAlive: true,
			// showTabbar: true,
			// showSlideCoupon: true,
		},
		component: () => import('@/views/shopping_car/index'),
	},
	{
		path: '/search',
		name: 'search',
		meta: {
			title: '搜索',
			keepAlive: true,
			// showSlideCoupon: true,
		},
		component: () => import('@/views/search/index'),
	},
	{
		path: '/no-network',
		name: 'noNetwor',
		meta: {
			title: 'No Network',
		},
		component: () => import('@/views/NoNetwork'),
	},
]
