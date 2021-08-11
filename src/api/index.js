import { get, post } from '@/utils/request.js'
export default {
	home: {
		notices: data => get('/opt/getNotices', data), // 首页通知模块
		banner: (data, config) => get('/opt/getShopBanners', data, config), // 首页-banner模块
		beans: (data, config) => get('/opt/getShopBeans', data, config), // 首页-类别模块
		beansList: data => post('/opt/getBeanProducts', data), //首页-类别商品列表
		flashSaleList: data => get('/opt/getShopCurrentFlashSale', data), // 首页-闪购商品列表
		newIns: data => get('/opt/getShopNewIns', data), // 首页-新品模块
		newInsList: data => post('/opt/getNewInProducts', data), // 新品模块的商品
		// floors: data => get('/opt/getShopFloors', data), // 首页-楼层配置
		floors1: data => get('/opt/getShopFloor1s', data), // 首页-自定义模块1
		floors2: data => get('/opt/getShopFloor2s', data), // 首页-自定义模块2
		// floorsList: data => get('/opt/getFloorProducts', data), // 首页-楼层商品列表
		// index: data => get('/opt/getShopOpt', data), // 首页-全部配置信息
		findUs: data => get('/opt/getShopFindUs', data), // 首页--获取商店findUs 配置
		advertPic: data => get('/opt/getHomePageAdvertPic', data), // 获取首页广告图

		shipping: data => get('/shipping/getPostThresholdAmount', data), // 获取免邮费购物金额

		search: data => post('/product/pageCond', data), // 搜索-商品列表
		recommend: data => post('/product/recommendList', data), // 商品推荐
		adList: data => post('/opt/getAdvertisingProducts', data), // 获取广告列表
		topic: data => post('product/pageQueryByTopic', data), // 专题商品列表
		topicInfo: data => get('/topic/getTopicConfig', data), // 专题其他信息
	},
	category: {
		categoryLeft: (data, config) => get('/opt/getShopTopCategories', data, config), // 类目-左侧栏
		categoryRight: data => get('/opt/getShopCategoryRecurse', data), // 类目-右侧内容
		categoryGoodsList: data => get('/opt/getShopCategoryProducts', data), // 类目-三级商品列表（点击右侧内容）
		categoryShopsList: data => get('/opt/getShops', data), // 单独获取店铺列表
	},
	car: {
		carList: data => get('/cart/getUserCart', data), // 购物车列表
		carDeletes: data => post('/cart/deleteCartItems', data), // 删除商品
		carAdd: data => get('/cart/addCartItem', data), // 添加商品
		carAddItems: data => post('/cart/addCartItems', data), // 批量添加商品
		carChangeCount: data => get('/cart/changeCartItemNum', data), //修改数量
		carCheckAll: data => get('/cart/checkAll', data), // 全选
		carCheckSingle: data => get('/cart/checkSingle', data), // 单选
		carUnCheckAll: data => get('/cart/unCheckAll', data), // 取消-全选
		carUnCheckSingle: data => get('/cart/unCheckSingle', data), // 取消-单选
		carChangeSku: data => get('/cart/changeCartItemSku', data), // 修改购物车里的sku(即删除、添加)
		carCheckout: data => post('/cart/checkout', data), // 结账台
	},
	goodsDetailApi: {
		detail: data => post('/product/detail', data), // 商品详情
		size: data => get('/product/getProductSize', data), // 商品sizes信息
		shipping: data => get('/shipping/getShippings', data), // 快递方式
		recommendPic: data => get('/opt/getProductDetailRecommendPic', data), // 商品详情推荐图
		sizeConfig: data => get('/sizeConfig/getSizeConfigs', data), // sizes 配置信息
	},
	review: {
		evaluateList: data => post('/order/getUserEvaluateList', data), // 评论信息列表
		evaluateStatistics: data => post('/order/evaluateStatistics', data), // 评论统计
	},
	coupon: {
		newPeople: data => get('/userCoupon/getNewComerDiscountAmount', data),
		covert: data => post('/userCoupon/convertCoupon', data), // 兑换优惠券
		newCoupon: data => get('/userCoupon/getNewComerCampaignId', data), // 新用户活动
	},
}
