<template>
	<!-- 商品详情页 -->
	<div class="goods-detail">
		<top-header iconBack showDownPopup></top-header>
		<!-- 有效商品 -->
		<template v-if="!isInvalid">
			<van-tabs ref="tabs" :class="[{ show: isShowTabs }]" :offset-top="offsetTop" v-model="tabsActive" title-inactive-color="#666" title-active-color="#222" scrollspy sticky @scroll="scroll">
				<van-tab>
					<template #title>{{ $t('detail.product') }}</template>
					<van-swipe ref="vanSwipe" class="goods-detail__swipe" lazy-render :loop="false" :width="swipeWidth" @change="swipeChange">
						<van-swipe-item v-for="(item, index) of goodsDetail.swipeList" :key="index">
							<van-image class="goods-detail__swipe-pic" :src="goodsDetail.showDefaultImg ? item : $utils.imageHandler(1, item)" @click="previewSwipeImg(index)" fit="cover">
								<template v-slot:loading>
									<img width="100%" height="100%" :src="index == 0 ? goodsDetail.picUrl : $utils.platList('goodsDefaultImg', platformId)" alt="" />
								</template>
							</van-image>
						</van-swipe-item>
						<template #indicator>
							<div class="goods-detail__swipe-indicator" v-if="goodsDetail.swipeList && goodsDetail.swipeList.length">
								<span>{{ swipeIndex + 1 }}</span
								>/<span>{{ goodsDetail.swipeList.length }}</span>
							</div>
						</template>
					</van-swipe>
					<div class="goods-detail__goods">
						<div class="goods-info-box border-bottom">
							<p class="goods_title">
								<template v-if="goodsDetail.tagsMap && goodsDetail.tagsMap.length">
									<template v-if="goodsDetail.tagsMap.indexOf('flash_sale') > -1">
										<span v-if="goodsDetail.discountRate" class="goods_title-tag goods_title-tag2">-{{ Math.floor(goodsDetail.discountRate * 100) }}%</span>
									</template>
									<span v-else class="goods_title-tag">{{ $t('new') }}</span>
								</template>
								{{ goodsDetail.productName }}
							</p>
							<div class="goods-tit-box">
								<div :class="['goods_price ', { 'have-discount': goodsDetail.discountPrice && goodsDetail.price > goodsDetail.discountPrice }]">
									<span class="taxes_text">{{ filterPriceMethod(goodsDetail.discountPrice || goodsDetail.price) }}</span>
									<span class="goods_old-price" v-if="goodsDetail.discountPrice && goodsDetail.price > goodsDetail.discountPrice"> {{ filterPriceMethod(goodsDetail.price) }}</span>
								</div>
								<div v-show="!evaluateLoading">
									<div class="goods_star" v-if="reviewInfo.total" @click="toReviewsPosition">
										<rate :value="reviewInfo.evaluateStartPercentage"></rate>
										<span class="goods_star-total">({{ reviewInfo.total || 0 }})</span>
										<i class="icon icon-fanhui-copy"></i>
									</div>
									<div v-else class="goods_star-no">{{ $t('detail.noReviews') }}</div>
								</div>
							</div>
						</div>
						<color-size class="goods-info-box" :list="goodsDetail.list" :skus="goodsDetail.skus" @change="changeAttr" showGoSize @sizeGuide="goSizeGuide">
							<!-- 选中尺码对应的尺寸信息 -->
							<template v-if="sizeGuideInfoHtml">
								<div class="goods-size__info margin-bottom-10" v-html="sizeGuideInfoHtml"></div>
							</template>
						</color-size>
						<div class="goods-cart" ref="goodsCart" v-show="!goodsDetail.showDefaultImg">
							<van-button class="add-cart-btn" block color="#222" @click="addToBag('popup')" square>{{ $t('detail.addToCart') }}</van-button>
						</div>
					</div>
					<div class="gao-line"></div>
					<div class="goods-detail__model-info" v-if="goodsDetail.currentModes && goodsDetail.currentModes.length">
						<h3 class="goods-detail__title">{{ $t('detail.modelStats') }}</h3>
						<div class="model-info-cont" v-for="item of goodsDetail.currentModes" :key="item.id">
							<van-image class="model-info-avatar" :src="$utils.imageHandler(3, item.modelPic)"></van-image>
							<ul class="model-info-detail">
								<li class="model-info-item first">
									<span class="model-attname">{{ $t('detail.modelWear') }}: </span>
									<span class="model-attval">{{ item.modelSize }}</span>
								</li>
								<li class="model-info-item" v-show="item.heightCm">
									<span class="model-attname">{{ $t('detail.modelHeight') }}: </span>
									<span class="model-attval">{{ item.heightIn }}/{{ item.heightCm }}cm</span>
								</li>
								<li class="model-info-item" v-show="item.bustCm">
									<span class="model-attname">{{ $t('detail.modelBust') }}: </span>
									<span class="model-attval">{{ item.bustIn }}/{{ item.bustCm }}cm</span>
								</li>
								<li class="model-info-item" v-show="item.waistCm">
									<span class="model-attname">{{ $t('detail.modelWaist') }}: </span>
									<span class="model-attval">{{ item.waistIn }}/{{ item.waistCm }}cm</span>
								</li>
								<li class="model-info-item" v-show="item.hipsCm">
									<span class="model-attname">{{ $t('detail.modelHips') }}: </span>
									<span class="model-attval">{{ item.hipsIn }}/{{ item.hipsCm }}cm</span>
								</li>
							</ul>
						</div>
					</div>
					<div class="gao-line" v-if="goodsDetail.currentModes && goodsDetail.currentModes.length"></div>
					<van-collapse v-model="activeNames" :border="false" class="goods-detail__description" v-if="haveDescription || goodsDetail.productDesc">
						<van-collapse-item name="1">
							<template #title>
								<span class="goods-detail__title">{{ $t('detail.description') }}</span>
							</template>
							<div class="goods-desc-content">
								<div v-if="goodsDetail.productDesc" class="goods-desc-txt" v-html="goodsDetail.productDesc"></div>
								<ul class="goods-desc-attr" v-if="haveDescription">
									<template v-for="(item, j) in goodsDetail.additionalAttrList">
										<li v-show="(j > 4 && showMore) || j <= 4" class="description_item" :key="item.key">
											<span class="description_label">{{ item.key }}: </span>
											<p class="description_cont">{{ item.val }}</p>
										</li>
									</template>
								</ul>
								<span class="more-detail" v-show="!showMore && haveDescription && goodsDetail.additionalAttrList.length > 5" @click="showMore = true">{{ platformId == 3 ? '詳細' : 'More Details' }}</span>
							</div>
						</van-collapse-item>
					</van-collapse>
					<div class="gao-line" v-if="haveDescription || goodsDetail.productDesc"></div>
					<div class="goods-detail__shipping" @click="goShipping">
						<div class="shipping-wrapper">
							<img class="shipping-img" src="@/assets/images/icons/detail-wuliu.png" alt="" />
							<div class="shipping-wrap">
								<h3 class="shipping-title">
									<span>{{ $t('other.name1') }}</span>
								</h3>
								<p class="txt">{{ $t('other.desc1') }}</p>
							</div>
							<i class="van-icon van-icon-arrow"></i>
						</div>
					</div>
					<div class="goods-detail__shipping" @click="goReturnExchanges">
						<div class="shipping-wrapper return">
							<img class="shipping-img" src="@/assets/images/icons/detail-tuikuan.png" alt="" />
							<div class="shipping-wrap">
								<h3 class="shipping-title">
									<span>{{ $t('detail.return') }}</span>
								</h3>
								<p class="txt">{{ $t('other.desc2') }}</p>
							</div>
							<i class="van-icon van-icon-arrow"></i>
						</div>
					</div>
					<div class="gao-line"></div>
					<!-- 详情图片 -->
					<div class="goods-detail__pictures" v-if="goodsDetail.tipPicKey && goodsDetail.tipPicKey.length">
						<van-image class="pictures-item" v-for="(picKey, tipIndex) of goodsDetail.tipPicKey" :key="tipIndex" :src="$utils.imageHandler(1, picKey)"></van-image>
					</div>
				</van-tab>
				<van-tab :title="$t('detail.reviews')">
					<reviews :review="reviewInfo" @moreReviews="goReviews"></reviews>
				</van-tab>
				<van-tab :title="$t('detail.recommended')" id="recommend" ref="recommend">
					<goods-list :list="recommendList" showMore @showMore="getMoreRecommend" :isEnd="recommendIsEnd">
						<h3 class="detail-recommend-title" slot="title">{{ $t('cart.like') }}</h3>
					</goods-list>
					<footer-info></footer-info>
				</van-tab>
			</van-tabs>

			<div class="goods-detail__footer" v-show="isShowFooter">
				<div class="goods-detail__foot-placholder"></div>
				<div class="goods-detail__foot">
					<van-button class="goods-detail__footer-add" block color="#222" @click="addToBag" square>{{ $t('detail.addToCart') }}</van-button>
				</div>
			</div>
		</template>
		<!-- 失效商品时 -->
		<div class="goods-invalid" v-else>
			<div class="goods-invalid__kong">
				<img src="@/assets/images/goods_invalid2x.png" alt="" />
				<p>{{ $t('detail.notExist') }}</p>
			</div>
			<goods-list :title="$t('cart.like')" :list="recommendList" showMore @showMore="getMoreRecommend" :isEnd="recommendIsEnd"></goods-list>
			<footer-info></footer-info>
		</div>

		<!-- 提示选择尺码弹框 -->
		<van-popup class="add-popup" v-model="showSizePopup" position="bottom" closeable>
			<div class="add-popup-wrap">
				<h3 class="add-popup-tit">{{ $t('cart.preference1') }}</h3>
				<div class="add-popup-cont">
					<color-size :list="goodsDetail.list" :skus="goodsDetail.skus" @change="changeAttr" @sizeGuide="goSizeGuide">
						<!-- 选中尺码对应的尺寸信息 -->
						<template v-if="sizeGuideInfoHtml">
							<div class="goods-size__info" v-html="sizeGuideInfoHtml"></div>
						</template>
					</color-size>
					<van-button class="add-popup-btn" block @click="addToBag('popup')">{{ $t('detail.addToCart') }}</van-button>
				</div>
			</div>
		</van-popup>

		<!-- 加购成功弹框 -->
		<add-bag-success v-if="goodsDetail.skuNo" :show.sync="cartPopup" :goodsInfo="goodsDetail"></add-bag-success>
		<!-- 加购动画 -->
		<div :class="['detail__addcart-ant', { 'animate__animated animate__zoomOutUpRight': addcartAnt.ant }]" v-if="goodsDetail.swipeList">
			<img :src="$utils.imageHandler(1, goodsDetail.swipeList[0])" alt="" class="detail__addcart-img" />
		</div>

		<!-- line 聊天入口 -->
		<line-chat v-if="platformId == 3"></line-chat>
	</div>
</template>
<script>
import { Toast, ImagePreview } from 'vant'
import ColorSize from '@/components/colorsize/index.vue'
import Reviews from './component/Reviews.vue'
import GoodsList from '@/components/goods_list/index.vue'
import Rate from '@/components/rate/index.vue'
import TopHeader from '@/components/TopHeader.vue'
import LineChat from '@/components/LineChat.vue'
import FooterInfo from '@/components/Footer.vue'
import AddBagSuccess from '@/components/AddBagSuccess'
import updateTdk from '@/utils/tdk'

import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
import http from '@/api/index'

export default {
	inject: ['reload'],
	data() {
		return {
			showMore: false, // 是否显示更多描述
			activeNames: ['1'],
			isLike: 0,
			tabsActive: 0,
			isShowTabs: false, // 是否显示tabs, 页面滚动到一定距离显示。
			offsetTop: 50, // 偏移高度
			showSizePopup: false, // 选尺码弹框
			cartPopup: false,
			// goodsDetail: {}, // 商品信息
			isNew: false, // 是否为新品
			recommendList: [], // 推荐列表
			recommendIsEnd: true, // 推荐结束
			pageSize: 20, // 推荐一页数量
			page: 1, // 当前推荐 页码
			// 评论-相关信息
			reviewInfo: {
				list: [],
				total: 0,
				evaluateStartPercentage: 0,
				largePercentage: 0,
				smallPercentage: 0,
				tureToSizePercentage: 0,
			},
			isInvalid: false, // 无效商品
			swipeIndex: 0, // 轮播图下标
			swipeWidth: 280,
			sizeGuideInfoHtml: '', // 尺码信息
			addcartAnt: {
				show: false,
				ant: false,
			},
			scrollTimer: null,
			evaluateLoading: true, // 评价接口是否还在加载中
			// recommendPicInfo: {}, // 推荐的广告图
			isShowFooter: true, // 是否显示底部按钮
			// currentFullPath: '', // 当前的路由参数信息,在监听路由里用于判断是否需要请求数据
			goodsData: {},
		}
	},
	components: {
		Rate,
		ColorSize,
		Reviews,
		GoodsList,
		TopHeader,
		LineChat,
		FooterInfo,
		AddBagSuccess,
	},
	tdk() {
		const { productName, productDesc } = this.goodsDetail
		return {
			title: productName,
			description: productDesc,
			// keywords,
			// ssrHeadAddInfo,
		}
	},
	serverPrefetch() {
		console.log('detail.serverPrefetch')
		return this.init('noDeal')
	},
	mounted() {
		console.log('detail.mounted', this.goodsDetail)
		if (!this.goodsDetail.list || this.currentFullPath != this.$route.fullPath) {
			this.init()
		} else {
			this.fetchDataMounted()
		}
	},
	activated() {
		console.log('detail.activated')
		let menuHeight = document.querySelector('.top-header__menu').offsetHeight
		this.offsetTop = menuHeight
		this.getWishStatus() // 查看是否收藏
	},
	deactivated() {
		if (this.scrollTimer) {
			clearInterval(this.scrollTimer)
			this.scrollTimer = null
		}
	},
	beforeDestroy() {
		if (this.scrollTimer) {
			clearInterval(this.scrollTimer)
			this.scrollTimer = null
		}
	},
	computed: {
		...mapGetters('shopCar', {
			totalNum: 'totalNum',
		}),
		...mapState('shopCar', {
			carList: (state) => state.carList,
			totalPrice: (state) => state.totalPrice,
			lackForFreeExpressAmount: (state) => state.lackForFreeExpressAmount,
			checkOrderDetail: (state) => state.checkOrderDetail,
		}),
		...mapGetters(['shopsId']),
		...mapState('wish', ['wishList']),
		...mapState('ssr', {
			goodsDetail: (state) => state.goodsDetail,
			currentFullPath: (state) => state.goodsDetail.currentFullPath,
		}),
		// 是否有商品描述
		haveDescription() {
			return this.goodsDetail.additionalAttrList ? this.goodsDetail.additionalAttrList.length : false
		},
		// 推荐图片信息:
		recommendPicInfo() {
			return this.goodsDetail.recommendPicInfo || {}
		},
	},
	watch: {
		$route(to) {
			if (to.fullPath != this.currentFullPath && to.name == 'goodsDetail') {
				let t = setTimeout(() => {
					console.log('详情-rotue--即将发送请求')
					this.resetgoodsDetail() // 请求前,重置商品信息
					this.init()
					clearTimeout(t)
				}, 60)
			}
		},
	},
	methods: {
		...mapMutations('ssr', ['setGoodsDetail']),
		...mapActions('shopCar', {
			checkout: 'checkout', // 结账台
		}),
		...mapActions('wish', ['addWishList', 'isUserCollect', 'deleteWishList']),
		...mapActions({
			addItem: 'shopCar/addItem',
		}),
		// 判断元素是否在可视区域
		isInViewPort() {
			let element = this.$refs.goodsCart
			if (!element) return false
			if (this.goodsDetail.showDefaultImg) return true // 还在请求时,iphoneX 很长,避免同时出现
			const viewHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
			const { top, bottom } = element.getBoundingClientRect()
			return top >= 0 && bottom <= viewHeight
		},
		// 预览图片:
		previewSwipeImg(index) {
			let images = this.goodsDetail.swipeList.map((item) => {
				return this.$utils.imageHandler(1, item)
			})
			ImagePreview({
				images: images,
				startPosition: index,
				closeable: true,
			})
		},
		// 查看是否收藏
		getWishStatus() {
			const { productNo } = this.goodsDetail
			this.isLike = this.wishList.some((item) => {
				return item.productNo == productNo && item.isWish
			})
		},
		// 点击Like
		toLike() {
			let funName = this.isLike ? 'deleteWishList' : 'addWishList'
			this[funName](this.goodsDetail).then((res) => {
				this.isLike = this.isLike ? 0 : 1
			})
			if (!this.isLike) {
				// 数据上报：
				this.reportGtag('add_to_wishlist', this.reportData('UA'))
				this.reportGtag('add_to_wishlist', this.reportData('GA4'), 'GA4')
				this.reportFB('AddToWishlist', this.reportData('fb'))
			}
		},
		// 发生滚动时：
		scroll(e) {
			this.isShowTabs = e.scrollTop >= 200
			this.isShowFooter = !this.isInViewPort()
		},
		// 属性更改：如 颜色 、尺码
		changeAttr(params) {
			this.goodsData = this.$utils.deepClone(this.goodsDetail)
			this.goodsData = { ...this.goodsData, ...params }
			delete this.goodsData.num // 删除库存,该字段与购物车商品数量重复.
			if (params.swipeList) {
				this.goodsData.defaultPicKey = params.swipeList[0]
				this.swipeIndex = 0
				this.$refs.vanSwipe.swipeTo(0)
			}
			this.$utils.calculationInventory(this.goodsData)
			this.dealSizeGuide()
			this.dealModes(this.goodsData)
			// 同步到 vuex
			this.setGoodsDetail(this.goodsData)
		},
		// 前往尺寸信息：
		goSizeGuide() {
			const { productNo } = this.goodsDetail
			this.$router.push({
				path: '/goodsSize',
				query: {
					productNo,
				},
			})
		},
		// 快递信息模块
		goReturnExchanges() {
			this.$router.push({
				path: '/otherInfo',
				query: {
					id: 2, // { name: 'Return & Exchanges', id: 2 }
				},
			})
		},
		// 看更多评论
		goReviews() {
			const { productNo } = this.goodsDetail
			this.$router.push({
				path: '/review_detail',
				query: {
					productNo,
					shopsId: this.shopsId,
					evaluateStartPercentage: this.reviewInfo.evaluateStartPercentage,
					largePercentage: this.reviewInfo.largePercentage,
					smallPercentage: this.reviewInfo.smallPercentage,
					tureToSizePercentage: this.reviewInfo.tureToSizePercentage,
				},
			})
		},
		// 添加到购物车：
		addToBag(flag) {
			let attrList = this.goodsDetail.list
			let isAll = true // 是否每一个属性 都有一个选中的项
			for (let i = 0; i < attrList.length; i++) {
				let item = attrList[i]
				isAll = item.attrValList.some((obj) => obj.isDefault)
				if (!isAll) break
			}

			// 如果是弹框的加购按钮,点击加购,还有未选中的属性时:
			if (flag == 'popup' && !isAll) {
				Toast({
					message: this.$t('cart.preference'),
				})
				return
			}
			if (!isAll) {
				this.showSizePopup = true // 显示弹框
				return
			}
			if (!this.goodsDetail.skuNo) return
			const obj = this.carList.find((item) => item.skuNo == this.goodsDetail.skuNo)
			if (obj && obj.num == 99) {
				Toast(this.$t('detail.addFailed'))
				return
			}
			console.log('开始执行')
			this.addItem(this.goodsDetail)
				.then(() => {
					this.showSizePopup = false
					this.checkout().then(() => {
						this.cartPopup = true
						// this.scrollToEle()
					})
					// this.$nextTick(() => {
					// 	this.addcartAnt.ant = true
					// })
					// let antTimer2 = setTimeout(() => {
					// 	this.addcartAnt.ant = false
					// 	this.showSizePopup = false // 显示弹框
					// 	Toast.success('Added successfully')
					// 	clearTimeout(antTimer2)
					// 	let antTime3 = setTimeout(() => {
					// 		this.$refs.tabs.scrollTo(2) // 定位到推荐
					// 		this.scrollToEle()
					// 		clearTimeout(antTime3)
					// 	}, 1000)
					// }, 1000)
				})
				.catch((err) => {
					console.log('dfafasdf', err)
					// 商品出现问题,重新刷新页面
					// this.reload()
					this.showSizePopup = false
					this.getPageData()
				})
			// 数据上报：
			this.reportGtag('add_to_cart', this.reportData('GA4'), 'GA4') // 新版
			this.reportGtag('add_to_cart', this.reportData('UA'))
			this.reportFB('AddToCart', this.reportData('fb'))
		},
		// 滚动到指定元素
		scrollToEle() {
			const ScrollTop = (number = 0, time) => {
				if (!time) {
					document.body.scrollTop = document.documentElement.scrollTop = number
					return number
				}
				const spacingTime = 20 // 设置循环的间隔时间  值越小消耗性能越高
				let spacingInex = time / spacingTime // 计算循环的次数
				let nowTop = document.body.scrollTop + document.documentElement.scrollTop // 获取当前滚动条位置
				let everTop = (number - nowTop) / spacingInex // 计算每次滑动的距离
				this.scrollTimer = setInterval(() => {
					if (spacingInex > 0) {
						spacingInex--
						ScrollTop((nowTop += everTop))
					} else {
						clearInterval(this.scrollTimer) // 清除计时器
					}
				}, spacingTime)
			}
			if (document.querySelector('#recommend')) ScrollTop(document.querySelector('#recommend').offsetTop - (window.innerWidth / 375) * 190, 1000)
			// const dom = document.querySelector('#recommend')
			// const targetHeiht = dom.offsetTop
			// const scrollToTop = () => {
			// 	const presentHeight = document.body.scrollTop || document.documentElement.scrollTop
			// 	const difference = targetHeiht - presentHeight
			// 	console.log('top', presentHeight + difference / 8)
			// 	if (Math.abs(presentHeight - targetHeiht) > 5) {
			// 		window.scrollTo({
			// 			top: presentHeight + difference / 8,
			// 			behavior: 'smooth',
			// 		})
			// 		window.requestAnimationFrame(scrollToTop)
			// 	}
			// }
			// scrollToTop()
		},
		// 前往购物车：
		goShopBag() {
			this.$router.push({
				path: '/shopping_car',
				query: {
					hideTabbar: 1,
				},
			})
		},
		// 重置商品信息:
		resetgoodsDetail(noDeal) {
			this.recommendList = []
			this.sizeGuideInfoHtml = ''
			const info = this.goodsDetail
			// 请求前,先用上一个页面进入的数据渲染, 并且重置部分属性
			this.goodsData = {
				...info,
				productName: info.name || info.productNo, // 此处的先name 再 productName
				showDefaultImg: true,
				swipeList: [info.picUrl ? info.picUrl : this.$utils.platList('goodsDefaultImg', this.platformId), this.$utils.platList('goodsDefaultImg', this.platformId)],
				currentFullPath: this.$route.fullPath,
				list: [],
			}
			// 服务端没有document
			if (!noDeal) {
				const bodySrcollTop = document.body.scrollTop || document.documentElement.scrollTop
				if (bodySrcollTop !== 0) document.body.scrollTop = document.documentElement.scrollTop = 0
			}
			this.setGoodsDetail(this.goodsData)
		},
		// 获取商品信息
		getPageData() {
			const { productNo } = this.goodsDetail
			const params = {
				productNo,
			}

			http.goodsDetailApi
				.detail(params)
				.then((res) => {
					let data = res.data

					let attrValObj = {} // 选中的属性值, 为了得到skuNo
					data.list.forEach((item, i) => {
						data['attr' + (i + 1)] = item.attrName
						attrValObj['attrVal' + (i + 1)] = ''
						item.attrValList.forEach((obj) => {
							if (obj.isDefault) {
								attrValObj['attrVal' + (i + 1)] = obj.val
								// 取默认轮播图
								if (item.isValHavePics) {
									data.swipeList = obj.picList
								}
							}
							// 然后 绑定轮播图的属性 默认选中,其它默认不选中:
							if (!item.isValHavePics) {
								obj.isDefault = false
							}
						})
					})
					this.$utils.calculationInventory(data) // 对数据进行处理
					let info = {}
					data.skus.forEach((item) => {
						let bool = this.dealObj(attrValObj, item)
						if (bool) info = item
					})
					data.attrObj = attrValObj
					data.skuNo = info.skuNo
					const arr = []
					let attList = {}
					data.additionalAttrList.forEach((item) => {
						if (!attList[item.key]) {
							attList[item.key] = item
							arr.push(attList[item.key])
						} else {
							attList[item.key].val = `${attList[item.key].val}, ${item.val}`
						}
					})
					data.additionalAttrList = arr
					data.showDefaultImg = false // 请求完了,用正常图片数据

					this.dealModes(data) // 处理模特信息
					this.goodsData = data
					this.setGoodsDetail(data)

					this.isNew = (data.tagsMap || []).some((item) => item == 'new_in')
					this.isInvalid = false
					this.getSizeGuide()
					// 重置轮播图位置:
					if (this.$refs.vanSwipe) {
						this.swipeIndex = 0
						this.$refs.vanSwipe.swipeTo(0)
					}
					// 浏览的的商品
					this.reportGtag('view_item', this.reportData('GA4'), 'GA4') // 新版
					this.reportGtag('view_item', this.reportData()) // 老版
					this.reportFB('ViewContent', this.reportData('fb'))
				})
				.catch((err) => {
					this.isInvalid = err.code == '20060102'
				})
		},
		// 判断属性值是否都相等:
		dealObj(o, o2) {
			for (let key in o) {
				if (o2[key] != o[key]) {
					return false
				}
			}
			return true
		},
		// 处理模特信息:
		dealModes(data) {
			data.currentModes = []
			if (!data.productModels.length || !data.list.length) return
			const attrName = data.productModels[0].attrName
			const targets = data.list.find((item) => item.attrName == attrName)
			if (!targets) return
			data.productModels.forEach((modes) => {
				if (modes.bustCm) {
					modes.bustCm = Number(modes.bustCm).toFixed()
					modes.bustIn = (modes.bustCm / 2.54).toFixed() + '"'
				}
				if (modes.heightCm) {
					modes.heightCm = Number(modes.heightCm).toFixed()
					modes.heightIn = (modes.heightCm / 100 / 0.3048).toFixed(1).replace('.', "'") + '"'
				}
				if (modes.hipsCm) {
					modes.hipsCm = Number(modes.hipsCm).toFixed()
					modes.hipsIn = (modes.hipsCm / 2.54).toFixed() + '"'
				}
				if (modes.waistCm) {
					modes.waistCm = Number(modes.waistCm).toFixed()
					modes.waistIn = (modes.waistCm / 2.54).toFixed() + '"'
				}
				targets.attrValList.forEach((attr) => {
					if (attr.isDefault && modes.attrValName == attr.val) {
						data.currentModes.push(modes)
					}
				})
			})
		},
		// 获取评论列表
		getEvaluateList() {
			const { productNo } = this.goodsDetail
			const params = {
				pageNum: 1,
				pageSize: 5, // 本页面只显示5条
				productNo,
				shopsId: this.shopsId,
			}
			this.evaluateLoading = true
			http.review.evaluateList(params).then((res) => {
				this.evaluateLoading = false
				this.reviewInfo = {
					...this.reviewInfo,
					...res.data,
					list: res.data.list.filter((item) => item.evaluateContent),
				}
			})
		},
		// 获取评价统计数据：
		getEvaluateTotal() {
			const { productNo } = this.goodsDetail
			const params = {
				productNo,
				shopsId: this.shopsId,
			}
			http.review.evaluateStatistics(params).then((res) => {
				this.reviewInfo = {
					...this.reviewInfo,
					...res.data,
				}
			})
		},
		// 获取推荐：
		getRecommend() {
			const { productNo } = this.goodsDetail
			const query = {
				pageNum: this.page,
				pageSize: this.pageSize, // 最大100
				noInProductNo: productNo,
				type: 3, // 3-表示商品详情, 2-购物车, 1-首页
			}
			http.home
				.recommend(query)
				.then((res) => {
					this.recommendIsEnd = res.data.length == 0 || res.data.length < this.pageSize
					this.recommendList = this.recommendList.concat(res.data)
				})
				.catch(() => {
					this.recommendIsEnd = true
				})
		},
		// 获取更多推荐数据
		getMoreRecommend() {
			if (!this.recommendIsEnd) {
				this.page++
				this.getRecommend()
			}
		},
		reportData(type) {
			let obj = {}
			let items = [
				{
					id: this.goodsDetail.skuNo,
					name: this.goodsDetail.productName,
					brand: this.goodsDetail.branName,
					price: (this.goodsDetail.discountPrice || this.goodsDetail.price) / 100,
					quantity: 1,
				},
			]
			if (type == 'fb') {
				// facebook--用 SPU
				const { productNo } = this.goodsDetail
				items[0].id = productNo
				obj = {
					content_name: this.goodsDetail.productName,
					content_type: 'product_group',
					currency: 'USD',
					contents: items,
					value: (this.goodsDetail.discountPrice || this.goodsDetail.price) / 100,
				}
			} else if (type == 'GA4') {
				// 新版GA
				obj = {
					currency: 'USD',
					value: (this.goodsDetail.discountPrice || this.goodsDetail.price) / 100,
					items: [
						{
							item_id: this.goodsDetail.skuNo,
							item_name: this.goodsDetail.productName,
							quantity: 1,
							promotion_name: '常规', // 促销活动名称
							item_brand: this.goodsDetail.branName,
							price: (this.goodsDetail.discountPrice || this.goodsDetail.price) / 100,
						},
					],
				}
			} else {
				// 默认是老版GA(UA)
				obj.items = items
			}
			return obj
		},
		// 前往物流方式:
		goShipping() {
			this.$router.push({
				path: '/otherInfo',
				query: {
					id: 1,
				},
			})
		},
		// 轮播图切换:
		swipeChange(index) {
			this.swipeIndex = index
		},
		// 前往评论的目标位置:
		toReviewsPosition() {
			this.$refs.tabs.scrollTo(1)
		},
		// 获取sizeGuide 信息:
		getSizeGuide() {
			const { productNo } = this.goodsDetail
			console.log(productNo, '---------productNO')
			http.goodsDetailApi
				.size({
					productNo,
				})
				.then((res) => {
					this.sizeGuideInfo = JSON.parse(res.data[this.platformId == 3 ? 'sizeCm' : 'sizcInch'])
				})
		},
		// 根据size属性及值,取相关信息:
		dealSizeGuide() {
			this.sizeGuideInfoHtml = ''
			let attrList = this.goodsData.list
			let sizeVal = ''
			// 找到选中的size
			attrList.forEach((item) => {
				if (item.attrName.toLocaleLowerCase().includes(this.$t('size'))) {
					item.attrValList.forEach((obj) => {
						if (obj.isDefault) sizeVal = obj.val
					})
				}
			})
			let xTitle = this.$utils.deepClone(this.sizeGuideInfo.xTitle)
			let xVal = this.$utils.deepClone(this.sizeGuideInfo.datas)
			let haveSize = xTitle[0].toLocaleLowerCase().includes(this.$t('size'))
			// 若有size项, 与当前选中的size进行匹配:
			if (haveSize && sizeVal) {
				let i = -1
				let tar = []
				xVal.forEach((item, pIndex) => {
					if (item[0] == sizeVal) {
						i = pIndex
						tar = item
					}
				})
				// 第二列如果是以下尺码,则删除:
				let mayCountry = ['US', 'EU', 'DE', 'UK', 'AU', 'IT', 'BR', 'FR', 'JP']
				if (mayCountry.includes(xTitle[1].toUpperCase())) {
					xTitle.splice(1, 1)
					tar.splice(0, 1)
				}
				if (i > -1 && tar.length > 1) {
					tar.forEach((obj, index) => {
						if (index > 0) {
							if (obj && obj != '/') {
								this.sizeGuideInfoHtml += `<span class="gs-info-label">${xTitle[index]}: </span><span class="gs-info-value">${obj}${this.platformId == 3 ? 'cm' : 'inch'}${tar.length - 1 == index ? '' : ', '}</span>`
							}
						}
					})
				}
			}
		},
		// 根据属性计算sku库存
		fetchDataMounted() {
			this.isInvalid = Object.keys(this.goodsDetail || {}).length == 0
			this.reInit(this.isInvalid)
			// 轮播图宽度判断:
			if (document.body.offsetWidth >= 750) {
				this.swipeWidth = (280 / 375) * 750
			} else {
				this.swipeWidth = Math.ceil(document.body.offsetWidth * (280 / 375))
			}
			let menuHeight = document.querySelector('.top-header__menu').offsetHeight
			this.offsetTop = menuHeight
			this.isNew = (this.goodsDetail.tagsMap || []).some((item) => item == 'new_in')
			// 重置轮播图位置:
			if (this.$refs.vanSwipe) {
				this.swipeIndex = 0
				this.$refs.vanSwipe.swipeTo(0)
			}
			// 浏览的的商品
			this.reportGtag('view_item', this.reportData('GA4'), 'GA4') // 新版
			this.reportGtag('view_item', this.reportData()) // 老版
			this.reportFB('ViewContent', this.reportData('fb'))
		},
		// 初始化,是否需要处理数据-默认要要处理:
		init(noDeal) {
			const { productNo } = this.$route.params
			if (!productNo || productNo === 'null' || productNo === 'undefined') return
			console.log('初始haul--', !noDeal)
			this.resetgoodsDetail(noDeal)
			return this.$store.dispatch('ssr/detailInit', { productNo: productNo.split('-').slice(-1)[0] }).finally(() => {
				updateTdk.call(this)
				if (!noDeal) this.fetchDataMounted()
			})
		},
		// 商品失效时, 仅请求推荐:
		reInit(onlyRecommend) {
			if (!onlyRecommend) {
				this.getEvaluateList()
				this.getEvaluateTotal()
				this.getWishStatus()
				this.getSizeGuide()
			}
			this.getRecommend() // 推荐需要变化
		},
	},
}
</script>
<style scoped lang="less">
@import '@/style/variable.less';

.goods-detail {
	.goods-detail__swipe {
		// margin-top: -44px;
		height: 414x;
		position: relative;
		.van-swipe-item {
			height: 414x;
			text-align: center;
			.goods-detail__swipe-pic {
				height: 414x;
				width: 276px;
			}
		}
		.goods-detail__swipe-indicator {
			position: absolute;
			bottom: 20px;
			left: 224px;
			height: 18px;
			line-height: 18px;
			padding: 0 2px;
			border-radius: 19px;
			color: #fff;
			font-size: 12px;
			background: rgba(34, 34, 34, 0.4);
			span {
				padding: 0 2px;
			}
		}
	}
	.border-bottom {
		border-bottom: 1px solid @color-F2F;
	}
	.goods-detail__goods {
		.goods-info-box {
			padding: 20px 16px;
			position: relative;
			overflow: hidden;
			&.color-size {
				padding-bottom: 0;
			}
		}
		.goods-cart {
			padding: 0 16px 20px;
			.add-cart-btn {
				height: 48px;
				border-radius: 3px;
				font-size: 16px;
			}
		}
		.goods-tit-box {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.goods_price {
				font-size: 18px;
				color: @color-222;
				font-weight: 500;
				&.have-discount {
					color: @color-promo;
				}
				.goods_old-price {
					color: @color-999;
					font-size: 14px;
					font-weight: 300;
					text-decoration: line-through;
				}
			}
			.goods_star {
				display: flex;
				align-items: center;
				font-size: 12px;
				color: @color-999;
				font-weight: 300;

				.van-rate {
					margin-right: 4px;
				}
				.icon-fanhui-copy {
					margin-left: 4px;
					font-size: 16px;
					margin-right: -4px;
				}
			}
			.goods_star-no {
				font-size: 12px;
				color: #ccc;
			}
		}
		.goods_brand-name {
			font-size: 14px;
			font-weight: 300;
			line-height: 17px;
			height: 17px;
			color: @color-666;
			margin-bottom: 6px;
		}
		.goods_title {
			font-size: 18px;
			line-height: 20px;
			color: @color-444;
			margin-bottom: 14px;
			.goods_title-tag {
				font-size: 12px;
				color: #fff;
				background: #87c6a1;
				padding: 1px 4px;
				vertical-align: middle;
				text-align: center;
				line-height: 16px;
				height: 16px;
				display: inline-block;
				&.goods_title-tag2 {
					color: #222;
					background: #ffb84e;
				}
			}
		}
	}
	.gao-line {
		height: 10px;
		background: @color-F2F;
	}
	.goods-detail__description {
		padding: 0 16px;
		position: relative;
		/deep/ .van-cell {
			padding: 24px 0 20px 0;
			background: @color-bg;
			&::after {
				border-bottom: 0;
			}
		}
		/deep/ .van-collapse-item__content {
			padding: 0;
			background: @color-bg;
		}
		.goods-desc-content {
			padding-bottom: 20px;
			font-weight: 300;
			.more-detail {
				// margin-top: 20px;
				display: inline-block;
				font-size: 14px;
				color: @color-222;
				border-bottom: 1px solid @color-999;
			}
			.goods-desc-txt {
				line-height: 22px;
				color: @color-222;
				margin-bottom: 15px;
			}
			.goods-desc-attr {
				.description_item {
					display: flex;
					align-items: center;
					margin-bottom: 10px;

					&:last-child {
						margin-bottom: 0;
					}
					.description_label {
						color: @color-999;
						width: 128px;
					}

					.description_cont {
						flex: 1;
						line-height: 16px;
						color: @color-222;
					}
				}
			}
		}
	}

	.goods-detail__model-size {
		padding: 24px 16px;
		font-size: 0;
		.size-pic {
			width: 100%;
		}
		.goods-detail__model {
			padding: 0;
		}

		.model_info {
			padding-top: 24px;
			display: flex;
			padding-bottom: 20px;
			border-bottom: 1px solid @color-EBE;

			.model_avatar {
				width: 56px;
				height: 56px;
				border-radius: 50%;
				background: #000;
				margin-right: 16px;
			}

			.model_conts {
				flex: 1;
				display: flex;
				flex-wrap: wrap;
				font-size: 14px;

				.model_item {
					width: 40%;

					&:first-child {
						width: 100%;
						margin-bottom: 12px;
					}

					&.model_b9 {
						margin-bottom: 9px;
					}

					.model_label {
						color: @color-222;
					}

					.model_value {
						color: @color-666;
					}
				}
			}
		}

		.goods-detail__size {
			font-size: 14px;
			padding: 16px 0;
		}
	}

	.goods-detail__shipping {
		padding: 0 16px;
		.shipping-wrapper {
			padding: 20px 0;
			display: flex;
			align-items: center;
			border-bottom: 1px solid @color-EBE;
			position: relative;
			&.return {
				border-bottom: 0;
			}
		}

		.shipping-img {
			width: 26px;
			margin-right: 10px;
		}
		.shipping-wrap {
			flex: 1;
			width: 0;
			.shipping-title {
				font-size: 14px;
				margin-bottom: 6px;
			}
			.txt {
				font-size: 14px;
				color: @color-666;
				font-weight: 300;
			}
		}
		.van-icon {
			position: absolute;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
			font-size: 16px;
			color: #666;
		}
	}
	.no-top-border {
		border-top: 0 !important;
	}
	.margin-bottom-10 {
		margin-bottom: 10px !important;
	}
	.goods-size__info {
		width: 343px;
		margin: -10px auto 20px;
		padding: 10px;
		font-size: 12px;
		color: @color-666;
		line-height: 18px;
		display: flex;
		flex-wrap: wrap;
		white-space: pre-wrap;
		font-weight: 300;

		/deep/ .gs-info-label {
			color: @color-222;
		}
	}
	.goods-detail__model-info {
		padding: 24px 16px 20px 16px;
		.model-info-cont {
			margin-top: 20px;
			display: flex;
			align-items: center;
			.model-info-avatar {
				width: 56px;
				height: 56px;
				min-width: 56px;
				border-radius: 50%;
				margin-right: 10px;
				overflow: hidden;
			}
			.model-info-detail {
				flex: 1;
				display: flex;
				flex-wrap: wrap;
				font-size: 12px;
				line-height: 20px;
				color: @color-222;

				.model-info-item {
					margin-right: 10px;
					&.first {
						width: 100%;
					}
					.model-attval {
						color: @color-666;
					}
				}
			}
		}
	}
	.goods-detail__pictures {
		font-size: 0;
		.pictures-item {
			width: 100%;
			&:last-child {
				margin-bottom: 0;
			}
		}
	}
	.goods-detail__footer {
		.goods-detail__foot-placholder {
			height: calc(56px + constant(safe-area-inset-bottom));
			height: calc(56px + env(safe-area-inset-bottom));
		}
		.goods-detail__foot {
			position: fixed;
			left: 50%;
			bottom: 0;
			z-index: 1;
			width: 100%;
			max-width: 375px;
			transform: translateX(-50%);
			padding-top: 10px;
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
			display: flex;
			align-items: center;
			text-align: center;
			background: @color-bg;
			box-shadow: inset 0 1px 0 0 @color-EBE;
			.goods-detail__footer-add {
				height: 56px;
				font-size: 16px;
				font-weight: 500;
			}
		}
	}

	.goods-detail__title {
		font-size: 16px;
		line-height: 20px;
		height: 20px;
		font-weight: normal;
		color: @color-222;
	}

	.detail-banner-box {
		padding: 10px 16px 0;
		.detail-banner-img {
			height: 160px;
			width: 100%;
		}
	}
	.detail-recommend-title {
		font-size: 14px;
		color: @color-222;
		margin-bottom: 14px;
	}
	.goods-invalid {
		.goods-invalid__kong {
			padding-top: 40px;
			text-align: center;
			> img {
				width: 101px;
				height: auto;
			}
			p > {
				font-size: 14px;
				color: @color-666;
				margin: 10px 0 24px;
			}
		}
	}

	.add-popup {
		/deep/ .van-popup__close-icon {
			top: 12px;
			right: 12px;
			font-size: 20px;
		}
		.color-size__sizes {
			display: flex;
			padding: 16px 0;
			.sizes-item {
				margin-right: 10px;
				padding: 0 20px;
				line-height: 28px;
				height: 30px;
				border-radius: 4px;
				border: 1px solid @color-D1D;
				font-size: 14px;

				&.is-active {
					border-color: @color-222;
				}

				&.disabled {
					border-style: dashed;
					color: @color-999;
				}
			}
		}
		.add-popup-tit {
			text-align: center;
			height: 44px;
			line-height: 44px;
			border-bottom: 1px solid @color-EBE;
			color: @color-666;
			font-size: 16px;
		}
		.add-popup-cont {
			padding: 16px;
		}
		.add-popup-btn {
			margin-top: 16px;
			height: 40px;
			font-weight: bold;
			background: @color-222;
			color: #fff;
		}
	}

	/deep/ .van-tabs {
		margin-top: -44px;
		max-width: 375px;
		&.show {
			.van-tabs__wrap {
				visibility: visible;

				// display: block;
				.van-tabs__line {
					background: #222;
				}
			}
		}

		.van-tabs__wrap {
			visibility: hidden;
			// display: none;
			padding-bottom: 10px;
			border-bottom: 1px solid @color-EBE;
			font-size: 16px;
			font-weight: 300;

			.van-tabs__line {
				background: transparent;
			}
		}
		.van-tabs__nav {
			left: 50%;
			transform: translateX(-50%);
			max-width: 375px;
			background: @color-bg;
		}
	}

	.detail__addcart-ant {
		position: fixed;
		top: 150px;
		right: 129px;
		width: 246px;
		height: 369px;
		z-index: -1;
		display: none;
		&.animate__animated {
			z-index: 9999;
			display: block;
		}
		.detail__addcart-img {
			width: 100%;
			height: 100%;
		}
	}
	@keyframes like {
		0% {
			transform: scale(1);
		}
		25% {
			transform: scale(0.2);
		}
		50% {
			transform: scale(1);
		}
		75% {
			transform: scale(0.2);
		}
		100% {
			transform: scale(1);
		}
	}
}
</style>