<template>
	<!-- tabbar-类目 -->
	<div class="category">
		<top-header v-if="!shopsId" :iconBack="hideTabbar" :iconFenLei="false"></top-header>
		<gee-top v-else iconName="guanbi" fixed></gee-top>
		<div :class="['category__main', { 'categroy__main-brand': shopsId, 'category__main-hidetabbar': hideTabbar }]">
			<div class="category__left" ref="categoryLeft">
				<ul class="category__menu">
					<li :class="['category__menu-item', { 'is-active': item.id == menuId }]" v-for="item of menu" :key="item.id" @click="changeMenu($event, item)">
						{{ item.name }}
					</li>
				</ul>
			</div>
			<div class="category__wrapper">
				<!-- 店铺内容 -->
				<template v-if="menuId == -1">
					<div class="category__brand" v-for="item of shopsInfo" :key="item.id" @click="goShops(item)">
						<van-image :src="$utils.imageHandler(0, item.logoPicKey)" class="category__brand-pic" round />
						<div class="category__brand-desc">
							<div class="category__brand-name">{{ item.name }}</div>
							<p class="category__brand-txt text-hidden-row-1">{{ item.desc }}</p>
						</div>
					</div>
				</template>
				<!-- 常规内容 -->
				<template v-else>
					<div class="category__box" v-for="item of rightList" :key="item.id">
						<h3 class="category__box-tit text-hidden-row-1" v-if="item.nodeType == 0">{{ item.name }}</h3>
						<!-- 第二级中--告知是普通节点时, 每一项必定是专题 -->
						<template v-if="item.nodeType == 0">
							<div class="category__goods-list">
								<router-link class="category__goods-items" v-for="obj of item.children" :key="obj.id" :to="formatUrl(`/category/`, `${obj.name}-${obj.topicId}`)">
									<van-image class="category__goods-pic" :src="$utils.imageHandler(0, obj.picKey)" :alt="obj.docTitle" />
									<p class="category__goods-name text-hidden-row-2">{{ obj.name }}</p>
								</router-link>
							</div>
						</template>
						<!-- 第二级中--告知是分组节点时 -->
						<template v-else-if="item.nodeType == 1">
							<div class="category__box-content">
								<div v-for="child of item.children" :key="child.id" class="category__box-content-item">
									<!-- 第三级中  是链接--单图 -->
									<template v-if="child.nodeType == 3">
										<van-image class="category__single-banner" :src="$utils.imageHandler(3, child.picKey)" @click="goPage(child)" :alt="child.docTitle"></van-image>
									</template>
									<!-- 第三级中 是多图节点 但只配了一个图, 该图 可链接/关联专题 -->
									<template v-else-if="child.nodeType == 2 && child.children.length == 1">
										<van-image class="category__single-banner" :src="$utils.imageHandler(3, child.children[0].picKey)" @click="goPage(child.children[0])" :alt="child.children[0].docTitle"></van-image>
									</template>
									<!--第三级中 是多图节点 且多图 可链接/关联专题-->
									<template v-else-if="child.nodeType == 2 && child.children.length > 1">
										<van-swipe class="category__swiper" :autoplay="3000" indicator-color="white">
											<van-swipe-item v-for="four of child.children" :key="four.id">
												<img class="category__single-banner" :src="$utils.imageHandler(3, four.picKey)" @click="goPage(four)" :alt="four.docTitle" />
											</van-swipe-item>
										</van-swipe>
									</template>

									<!-- 如果是普通节点--必定是专题 -->
									<router-link v-else-if="child.nodeType == 0" class="category__goods-items" :to="formatUrl(`/category/`, `${child.name}-${child.topicId}`)">
										<van-image class="category__goods-pic" :src="$utils.imageHandler(0, child.picKey)" :alt="child.docTitle" />
										<p class="category__goods-name text-hidden-row-2">{{ child.name }}</p>
									</router-link>
								</div>
							</div>
						</template>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>
<script>
import BScroll from 'better-scroll'
import GeeTop from '@/components/gee/GeeTop.vue'
import TopHeader from '@/components/TopHeader.vue'
import http from '@/api/index.js'
import { mapState, mapMutations } from 'vuex'

export default {
	data() {
		return {
			rightList: [], // 右侧数据源
			BS: null, // better-scroll 的实例
			hideTabbar: false, // 是否隐藏了底部导航栏
		}
	},
	components: {
		GeeTop,
		TopHeader,
	},
	serverPrefetch() {
		return this.init()
	},
	mounted() {
		this.init().then(this.fetchDataMounted)
	},
	activated() {
		this.hideTabbar = !!this.$route.query.hideTabbar
		// if (this.menu.length != 0) {
		// 	this.fetchDataMounted()
		// } else {
		// }
	},
	computed: {
		...mapState('app', {
			shopsId: (state) => state.shopsId,
			shopsInfo: (state) => state.shopsInfo,
		}),
		...mapState('ssr', {
			menu: (state) => state.categoryMenu,
			menuId: (state) => state.categoryMenuId,
		}),
	},
	methods: {
		...mapMutations('app', {
			setShopsId: 'SET_SHOPSID',
			setShopsInfo: 'SET_SHOPSINFO',
		}),
		...mapMutations('ssr', {
			setCategoryMenuId: 'SET_CATEGORYMENUID',
		}),
		// ...mapActions('app', {
		// 	CategoryMenu: 'CategoryMenu',
		// }),
		// 左侧类更改：
		changeMenu(e, item) {
			if (item.id == this.menuId) return
			this.setCategoryMenuId(item.id)
			if (item.id && item.id != -1) {
				// -1 为店铺信息，所以非店铺时要获取数据
				this.getRightData()
			}
			// 滚动到目标元素： scrollToElement(el, time, offsetX, offsetY, easing)
			this.BS.scrollToElement(e.target, 300, false, true)
		},
		// 前往页面:
		goPage(item) {
			// relType: 1-链接,2-专题
			if (item.relType == 1) {
				this.formatLinkToJump(item.linkUrl)
			} else if (item.relType == 2) {
				this.$router.push({
					path: this.formatUrl(`/category/`, `${item.name}-${item.topicId}`),
				})
			}
		},
		// 前往搜索页
		goSearchPage() {
			this.$router.push({
				path: '/search',
			})
		},
		// 前往店铺首页：
		goShops(item) {
			this.setShopsId(item.id) // 设置店铺Id
			this.setCategoryMenuId(undefined) // 重置选中的分类ID
			this.$router.push({
				path: '/geeMart/shop',
				query: {
					shopsId: item.id,
				},
			})
		},
		// getPageData() {
		// 	// 左侧栏数据:
		// 	this.CategoryMenu().then(() => {
		// 		setTimeout(() => {
		// 			this.BS = new BScroll(this.$refs.categoryLeft, {
		// 				scrollY: true,
		// 				click: true,
		// 			})
		// 		}, 60)
		// 		// 右侧数据:
		// 		this.getRightData()
		// 		this.getShopsList()
		// 	})
		// },
		// 获取右侧栏数据：
		getRightData() {
			if (this.menuId == -1 || !this.menuId) return
			const params = {
				categoryId: this.menuId,
			}
			http.category.categoryRight(params).then((res) => {
				this.rightList = res.data.children
			})
		},
		// 获取店铺列表信息：
		getShopsList() {
			if (this.platformId == 2 && !this.shopsId) {
				http.category.categoryShopsList().then((res) => {
					if (res.code == 0) {
						this.setShopsInfo(res.data)
					}
				})
			}
		},
		fetchDataMounted() {
			if (this.menu && !this.menuId) {
				this.$store.commit('ssr/SET_CATEGORYMENUID', this.menu[0].id)
			}
			// setTimeout(() => {
			this.BS = new BScroll(this.$refs.categoryLeft, {
				scrollY: true,
				click: true,
			})
			// }, 60)
			// 右侧数据:
			this.getRightData()
			this.getShopsList()
		},
		init() {
			return this.$store.dispatch('ssr/classifyInit')
		},
	},
}
</script>
<style scoped lang="less">
@import '@/style/variable.less';

.category {
	height: 100%;
	.category__main {
		height: calc(100% - 122px);
		padding-bottom: calc(50px + constant(safe-area-inset-bottom));
		padding-bottom: calc(50px + env(safe-area-inset-bottom));

		&.categroy__main-brand {
			padding-top: 103px;
		}
		&.category__main-hidetabbar {
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);
		}
		.category__left {
			float: left;
			height: 100%;
			width: 102px;
			overflow: hidden;
			background: #ececec;
		}
		.category__menu {
			.category__menu-item {
				height: 52px;
				font-size: 14px;
				color: @color-222;
				padding: 0 10px;
				display: flex;
				align-items: center;
				word-break: break-word;
				overflow: hidden;
				&.is-active {
					background: @color-bg;
					font-weight: normal;
				}
			}
		}

		.category__wrapper {
			height: 100%;
			overflow-y: auto;
			background: @color-bg;
			padding: 10px 0 12px 12px;
			&::-webkit-scrollbar {
				display: none;
			}

			.category__box {
				margin-bottom: 10px;
			}
			.category__box-tit {
				font-size: 14px;
				font-weight: normal;
				color: @color-666;
				line-height: 17px;
				margin-bottom: 10px;
			}
			.category__goods-list {
				display: flex;
				flex-wrap: wrap;
				.category__goods-items {
					&:nth-child(3n) {
						margin-right: 0;
					}
				}
			}
			.category__goods-items {
				width: 78px;
				margin-bottom: 14px;
				margin-right: 6.5px;
				text-align: center;
				font-size: 0;

				.category__goods-pic {
					width: 78px;
					height: 78px;
				}

				.category__goods-name {
					margin-top: 6px;
					color: @color-666;
					font-size: 12px;
					line-height: 14px;
					// height: 28px;
				}
			}

			.category__brand {
				background: #fff;
				padding: 14px 12px;
				display: flex;
				align-items: center;
				margin-bottom: 10px;
				.category__brand-pic {
					width: 38px;
					height: 38px;
					margin-right: 10px;
				}
				.category__brand-desc {
					flex: 1;
					width: 0;
					.category__brand-txt {
						color: @color-999;
						font-size: 14px;
						line-height: 17px;
					}
					.category__brand-name {
						height: 20px;
						font-size: 16px;
					}
				}
			}
			.category__box-content-item {
				font-size: 0;
				margin-bottom: 10px;
				&:last-child {
					margin-bottom: 0;
				}
			}
			.category__single-banner {
				width: 248px;
				height: 93px;
			}
			.category__swiper {
				width: 248px;
				// margin-bottom: 10px;
				.category__swiper-img {
					width: 238px;
					height: 90px;
				}
			}
			.category__box-content {
				display: flex;
				flex-wrap: wrap;
			}
		}
	}
}
</style>
