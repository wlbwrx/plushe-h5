<template>
	<!-- 商品筛选页 -->
	<div class="filters">
		<top-header iconBack @scroll="pageScroll" showDownPopup></top-header>
		<img v-if="topImgSrc" :src="$utils.imageHandler(3, topImgSrc)" alt="" class="filters-top-img" ref="topImg" />
		<div class="filters__operate" v-if="fromType == 'search'">
			<van-dropdown-menu :class="['filter-wrap__menu', { 'is-fixed': isFixed }]" active-color="#222" :overlay="true">
				<van-dropdown-item ref="dropdownSort">
					<template #title>
						<div class="menu-tit is-active">
							<span class="menu-text">{{ $t('sort.sortBy') }}</span>
							<i class="iconfont icon-xiala"></i>
						</div>
					</template>
					<template #default>
						<ul class="menu-down-list">
							<li :class="['menu-down-item', { 'is-active': sortId == item.id }]" v-for="item of sort" :key="item.id" @click="clickSortItem(item)">
								{{ item.name }}
								<i v-if="sortId == item.id" class="van-icon van-icon-success"></i>
							</li>
						</ul>
					</template>
				</van-dropdown-item>
			</van-dropdown-menu>
		</div>
		<!-- 列表内容 -->
		<div class="filters__main">
			<!-- 顶部文字垂直轮播 -->
			<h3 class="filter-title">
				<span class="filter-title-hide text-hidden-row-1">{{ title }}</span>
				<!-- <span class="filters--num" v-if="!firstLoading">{{ $t('sort.products', { num: listTotalNum }) }}</span> -->
			</h3>
			<van-list v-model="loading" :finished="finished" finished-text="" :immediate-check="false" loading-text="loading..." :offset="1048" @load="onLoad">
				<goods-list showColors :list="allRecomentList" border showCartIcon showLikeIcon></goods-list>
			</van-list>
		</div>
		<footer-info class="f-line" v-if="finished"></footer-info>
		<!-- 返回顶部 -->
		<back-top></back-top>
		<!-- line 聊天入口 -->
		<line-chat v-if="platformId == 3"></line-chat>
	</div>
</template>
<script>
import GoodsList from '@/components/goods_list/index.vue'
import BackTop from '@/components/BackTop.vue'
import TopHeader from '@/components/TopHeader.vue'

import LineChat from '@/components/LineChat.vue'

import FooterInfo from '@/components/Footer.vue'

import { mapGetters, mapState, mapMutations } from 'vuex'
import http from '@/api/index.js'
import updateTdk from '@/utils/tdk'

export default {
	data() {
		return {
			loading: false,
			finished: false,
			dataList: [],
			listTotalNum: 0,
			queryParams: {
				pageSize: 20,
				pageNum: 1,
				isOrderByPriceDesc: undefined,
			},
			// fromType: -1, // 来源，看enums.js 中的 filterFrom
			sort: [
				{ name: this.$t('sort.recommended'), id: -1 },
				{ name: this.$t('sort.priceLowHigh'), value: false, id: 0 },
				{ name: this.$t('sort.priceHightoLow'), value: true, id: 1 },
			],
			sortId: -1,
			// title: '', // navbar 标题
			isFixed: 0, // 是否为固定定位
			// currentFullPath: '', // 记录url 参数, 是否要继续请求接口
			topImgHeight: 0, // 顶部图片高度
			// topImgSrc: '', // 顶部图片
			// adList: [], // 广告关联的商品
		}
	},
	components: {
		GoodsList,
		BackTop,
		TopHeader,
		LineChat,
		FooterInfo,
	},
	tdk() {
		// console.log(this.title, 'tdk')
		return {
			title: this.title,
			// description: '描述',
			// keywords,
			// ssrHeadAddInfo,
		}
	},
	serverPrefetch() {
		console.log('list.serverPrefetch')
		return this.init('noDeal')
	},
	mounted() {
		console.log('list.mounted, this.allRecomentList.length=', this.allRecomentList.length)
		// this.init()
		console.log(this.allRecomentList.length == 0 || this.currentFullPath != this.$route.fullPath)
		if (this.allRecomentList.length == 0 || this.currentFullPath != this.$route.fullPath) {
			this.init()
		} else {
			this.fetchDataMounted()
		}
	},
	activated() {
		this.dataList = this.dealListOrWish(this.dataList)
	},
	computed: {
		...mapState('wish', ['wishList']),
		...mapGetters({
			totalNum: 'shopCar/totalNum',
		}),
		...mapState({
			categoryDetail: (state) => state.ssr.categoryDetail || {},
			fromType: (state) => state.ssr.categoryDetail.fromType || 'topic',
			topImgSrc: (state) => state.ssr.categoryDetail.listPicKey || '',
			title: (state) => state.ssr.categoryDetail.title || '',
			allRecomentList: (state) => state.ssr.categoryDetail.allRecomentList || [],
			topicId: (state) => state.ssr.categoryDetail.topicId || '',
			adList: (state) => state.ssr.categoryDetail.adList || [],
			currentFullPath: (state) => state.ssr.categoryDetail.currentFullPath,
		}),
	},
	watch: {
		// 该页面有路由缓存,由该界面 进入 到 商详页,再回来时不需要请求接口
		$route(to) {
			console.log('route,请求条件值:', to.name == 'goodsFilter' && this.currentFullPath != to.fullPath)
			if (to.name == 'goodsFilter' && this.currentFullPath != to.fullPath) {
				this.init()
			}
		},
	},
	methods: {
		...mapMutations('ssr', ['setCategoryDetail']),
		// 排序：
		clickSortItem(item) {
			this.queryParams.isOrderByPriceDesc = item.id == -1 ? undefined : item.value
			this.dataList = []
			this.sortId = item.id
			this.finished = false
			document.documentElement.scrollTop = 0 // 这里必须滚回顶部，不然会直接请求到上一次滚动的位置
			this.queryParams.pageNum = 1
			this.getPageData(() => {
				this.$refs.dropdownSort.toggle()
			})
		},
		// 页面滚动:
		pageScroll(obj) {
			this.isFixed = obj.scrollTop > obj.noticesHeight + obj.otherHeight + this.topImgHeight + obj.downHeight
		},
		// 获取页面数据：(其实该函数,仅可能发生在第二页数据请求时,第一页走了init 里的方法)
		getPageData(cb) {
			console.log('/////getPageData')
			this.loading = true
			this.finished = false
			// 请求接口的页面地址，和url 判断, 没有则默认为专题
			let httpKey = this.fromType || 'topic'
			http.home[httpKey](this.queryParams).then((res) => {
				const data = res.data
				this.dealData(data)
				if (cb && typeof cb == 'function') cb()
			})
		},
		// 数据处理:
		dealData(data) {
			this.loading = false
			data.list = this.dealListOrWish(data.list) // 判断该商品是否在心愿单列表
			this.dataList = this.dataList.concat(data.list)
			// 根据后台返回的字段判断是否还有下一页
			this.finished = data.nextPage == 0

			this.setCategoryDetail({
				allRecomentList: this.dataList,
			})
		},
		// 专题-获取其他信息:
		getTopicInfo() {
			if (!this.topicId) return
			http.home.topicInfo({ id: this.topicId }).then((res) => {
				const data = res.data || {}
				this.setCategoryDetail({ title: data.name, listPicKey: data.listPicH5 })
				// 得到列表顶图高度:
				this.$nextTick(() => {
					this.topImgHeight = this.$refs.topImg ? this.$refs.topImg.height : 0
				})
			})
		},
		// 判断list 中是否有收藏的商品
		dealListOrWish(list) {
			const arr = this.$utils.deepClone(list)
			arr.forEach((item, index, arr) => {
				item.isWish = false
				let targetObj = this.wishList.find((obj) => obj.productNo == item.productNo)
				if (targetObj) {
					arr[index].isWish = targetObj.isWish
				}
			})
			return arr
		},
		// 加载更多：
		onLoad() {
			this.queryParams.pageNum++
			this.queryParams.topicId = this.topicId // 这里是为了拿到服务端请求时给的专题ID
			if (this.fromType == 'search') {
				this.queryParams.productName = this.title
			}
			this.getPageData()
		},
		// 初始化--数据处理
		fetchDataMounted() {
			this.loading = false
			this.dataList = this.dealListOrWish(this.allRecomentList)
			this.topImgHeight = this.$refs.topImg ? this.$refs.topImg.height : 0
			this.finshed = this.categoryDetail.listInfo.nextPage == 0
			this.setCategoryDetail({
				allRecomentList: this.dataList,
			})
			console.log(this.allRecomentList)
			// this.getTopicInfo()
		},
		// 初始化; noDeal:是否需要处理数据-默认要要处理,---该函数其实仅在第一页时被调用
		init(noDeal) {
			const { categoryTitle } = this.$route.params
			if (!categoryTitle || categoryTitle === 'null' || categoryTitle === 'undefined') return
			let title, fromType, topicId
			if (!categoryTitle.includes('-c-')) {
				// 专题: /category/name-id/?xxx
				let nameIds = categoryTitle.split('-')
				topicId = nameIds.slice(-1)[0]
				// 是banner 进入时,用专题标题
				if (this.$route.query.banner) {
					title = ''
				} else {
					title = categoryTitle.substring(0, categoryTitle.lastIndexOf('-')).replace(/-/g, ' ')
				}
			} else {
				// 搜索 / 推荐: /category/title-c-type   // type: 'search', 'recommend'
				;[title, fromType] = categoryTitle.split('-c-')
			}
			const AdCode = this.$route.query.AdCode
			this.queryParams = {
				pageSize: 20,
				pageNum: 1,
				isOrderByPriceDesc: undefined,
				productName: title,
				shopsId: this.shopsId,
				fromType: fromType,
				topicId: topicId,
				AdCode,
			}
			// 初始化数据结果数据
			this.setCategoryDetail({
				allRecomentList: [],
				title,
				fromType,
				topicId: topicId || undefined,
				currentFullPath: this.$route.fullPath,
				listPicKey: '',
			})
			this.loading = true
			this.finished = false
			return this.$store.dispatch('ssr/categoryInit', this.queryParams).finally(() => {
				this.loading = false
				updateTdk.call(this)
				if (!noDeal) this.fetchDataMounted()
			})
		},
	},
}
</script>
<style scoped lang="less">
@import '@/style/variable.less';

.filters {
	height: 100%;
	.filters-top-img {
		height: 102px;
		width: 100%;
	}
	.f-line {
		position: relative;
		&::before {
			content: '';
			position: absolute;
			left: 0;
			top: -25px;
			width: 100%;
			border-top: 1px solid @color-bg;
		}
	}
	.filters__operate {
		height: 48px;

		/deep/ .van-dropdown-item {
			width: 100%;
			max-width: 375px;
			left: 50%;
			transform: translateX(-50%);
		}
		.filter-wrap__menu {
			position: relative;
			z-index: 20;
			border-bottom: 1px solid @color-bg;
			padding: 0 8px;
			background: @color-FFF;
			&.is-fixed {
				position: fixed;
				top: 50px;
				width: 100%;
				max-width: 375px;
			}
			.menu-tit {
				display: flex;
				align-items: center;
				color: @color-666;

				&.is-selected {
					color: @color-222;
				}

				&.is-active {
					.iconfont {
						transform: rotate(180deg);
					}
				}

				.iconfont {
					margin-left: 8px;
				}
			}
			.menu-down-list {
				.menu-down-item {
					font-size: 14px;
					line-height: 34px;
					color: #999;
					padding: 0 16px;
					border-top: 1px solid #f5f5f5;
					display: flex;
					justify-content: space-between;
					align-items: center;
					&.is-active {
						color: #595959;
					}
				}
			}
		}
	}
	.filter-title {
		font-size: 16px;
		color: @color-222;
		padding-left: 16px;
		padding-top: 20px;
		display: flex;
		align-items: center;
		.filter-title-hide {
			max-width: 260px;
		}
		.filters--num {
			font-size: 12px;
			color: #666;
			margin-left: 10px;
		}
	}
	.goods-list {
		padding-top: 16px;
	}

	/deep/ .van-dropdown-menu__bar {
		justify-content: space-between;
		box-shadow: none;
		border-top: 0;
		height: 48px;

		// &::after {
		// 	content: '';
		// 	position: absolute;
		// 	z-index: 10;
		// 	right: 54px;
		// 	top: 50%;
		// 	transform: translateY(-50%);
		// 	height: 19px;
		// 	border-right: 1px solid @color-bg;
		// }

		.van-dropdown-menu__item {
			flex: 0 1 auto;
		}

		.van-dropdown-menu__title::after {
			border: 0;
			display: none;
		}
	}
	/deep/ .van-rate {
		.van-rate__item:not(:last-child) {
			padding-right: 1px;
		}
	}
}
</style>
