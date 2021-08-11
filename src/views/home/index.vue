<template>
	<!-- Plushe 的首页 -->
	<div class="home">
		<loading-home v-if="loading"></loading-home>
		<!-- 顶部头部 -->
		<top-header showDownPopup></top-header>
		<div class="home-swipe">
			<van-swipe @change="swipeChange" class="home-banner" :autoplay="5000" loop :show-indicators="false">
				<van-swipe-item v-for="item of bannerList" :key="item.id">
					<img class="swiper-img" v-lazy="$utils.imageHandler(3, item.picKey)" @click="clickSwipeImg(item)" :alt="item.docTitle" />
				</van-swipe-item>
			</van-swipe>
			<div class="home-pagination swiper-pagination" v-if="bannerList[swipeIndex]">
				<h3 class="slide-title text-hidden-row-1">{{ bannerList[swipeIndex].docTitle }}</h3>
				<p class="slide-text text-hidden-row-2">
					{{ bannerList[swipeIndex].docContent }}
				</p>
				<ul class="slide-dots">
					<li :class="['slide-dots-item', { 'is-active': swipeIndex == index }]" v-for="(item, index) of bannerList" :key="item.id"></li>
				</ul>
			</div>
		</div>

		<!-- 菜单栏区域 -->
		<nav-bar v-if="beanList.length" :list="beanList"></nav-bar>
		<div class="home__module" @click="goAdPicLink(advertInfo)" v-if="advertInfo.picKey">
			<img class="register-tips-pic" v-lazy="$utils.imageHandler(3, advertInfo.picKey)" :alt="advertInfo.docTitle" />
		</div>
		<!-- 新品模块 -->
		<div class="home__module home__margintop24">
			<h3 class="h__m-title">{{ $t('home.newArrivals') }}</h3>
			<div class="h__m-list">
				<router-link class="h__m-item" v-for="item of newList" :key="item.id" :to="formatUrl(`/category/`, `${item.name}-${item.topicId}`)">
					<img class="h__m-pic" v-lazy="$utils.imageHandler(3, item.picKey)" @click="toReportData(item)" :alt="item.docTitle" />
				</router-link>
			</div>
		</div>
		<!-- 自定义模块一 -->
		<template v-for="element of floor1">
			<div class="home__module" :key="element.id">
				<h3 class="h__m-title">{{ element.name }}</h3>
				<div class="h__m-list">
					<router-link class="h__m-item" v-for="item of element.children" :key="item.id" :to="formatUrl(`/category/`, `${item.name}-${item.topicId}`)">
						<img class="h__m-pic" v-lazy="$utils.imageHandler(3, item.picKey)" @click="toReportData(item)" :alt="item.docTitle" />
					</router-link>
				</div>
			</div>
		</template>
		<!-- 闪购模块 -->
		<div class="home__module" v-if="showFalsh">
			<h3 class="h__m-title h__m-title-more">
				<span class="h__m-title-name">{{ $t('home.flashSale') }}</span>
				<router-link :to="formatUrl(`/category/`, `${$t('home.flashSale')}-${flashInfo.topicId}`)" class="h__m-more" @click.native="toReportData(flashInfo, $t('home.flashSale'))">
					{{ $t('home.viewMore') }}
					<i class="icon icon-fanhui-copy"></i>
				</router-link>
			</h3>
			<router-link :to="formatUrl(`/category/`, `${$t('home.flashSale')}-${flashInfo.topicId}`)">
				<img v-if="flashInfo.coverPicKey" v-lazy="$utils.imageHandler(3, flashInfo.coverPicKey)" :alt="flashInfo.title" class="h__m-banner flash-sale-banner" v-on:click="toReportData(flashInfo, $t('home.flashSale'))" />
			</router-link>
			<div class="h__m-wrap">
				<van-count-down :time="timeValue" format="HH:mm:ss">
					<template #default="timeData">
						<span class="djs-txt" v-if="flashHour(timeData) == '24h+'">{{ $t('home.endIn') }} 24h+</span>
						<template v-else>
							<span class="djs-txt">{{ $t('home.endIn') }}</span>
							<span class="djs-num">{{ flashHour(timeData) }}</span>
							<span class="djs-colon">:</span>
							<span class="djs-num">{{ timeData.minutes }}</span>
							<span class="djs-colon">:</span>
							<span class="djs-num">{{ timeData.seconds }}</span>
						</template>
					</template>
				</van-count-down>
				<slide-goods :list="flashInfo.products.list"></slide-goods>
			</div>
		</div>
		<!-- 自定义模块二 -->
		<template v-for="item of floor2">
			<div class="home__module" :key="item.id" v-if="item.products.length">
				<h3 class="h__m-title h__m-title-more">
					<span class="h__m-title-name">{{ item.name }}</span>
					<router-link :to="formatUrl(`/category/`, `${item.name}-${item.topicId}`)" class="h__m-more">
						{{ $t('home.viewMore') }}
						<i class="icon icon-fanhui-copy"></i>
					</router-link>
				</h3>
				<router-link :to="formatUrl(`/category/`, `${item.name}-${item.topicId}`)">
					<img v-if="item.coverPicKey" v-lazy="$utils.imageHandler(3, item.coverPicKey)" :alt="item.docTitle" class="h__m-banner" @click="toReportData(item)" />
				</router-link>
				<div class="h__m-wrap">
					<slide-goods :list="item.products"></slide-goods>
				</div>
			</div>
		</template>

		<!-- 推荐 -->
		<!-- <div class="home__section" v-if="recommendList.length">
			<slide-goods :list="recommendList" :fromType="9" :title="$t('home.forYou')"></slide-goods>
		</div> -->
		<!-- FIND US ON INSTAGRAM -->
		<div class="home__section find-swiper-box" v-if="findUsList.length">
			<home-swiper :title="$t('home.findUstit')" :subtitle="$t('home.findUsSub')" :list="findUsList" :options="findOptions" name="find"></home-swiper>
		</div>
		<footer-info></footer-info>
		<!-- line聊天 -->
		<line-chat v-if="platformId == 3"></line-chat>
		<!-- 返回顶部 -->
		<back-top></back-top>
	</div>
</template>
<script>
import LoadingHome from '@/components/beforeLoading/home.vue'
import TopHeader from '@/components/TopHeader.vue'
import HomeSwiper from './component/Swiper.vue'
import NavBar from './component/NavBar.vue'
import SlideGoods from './component/SlideGoods.vue'
import BackTop from '@/components/BackTop.vue'
import LineChat from '@/components/LineChat.vue'
import FooterInfo from '@/components/Footer.vue'

import http from '@/api/index.js'
import { mapMutations, mapState } from 'vuex'
import dayjs from 'dayjs'

export default {
	data() {
		// let that = this
		return {
			loading: false, // 加载中
			timeValue: '',
			showFalsh: false, // 是否显示限时购模块
			findOptions: {
				customClass: 'find-swiper',
				scrollbar: {
					el: '.swiper-scrollbar',
					hide: false,
				},
			},
			newList: [], // 新品模块
			floor1: [], // 自定义模块一
			flashInfo: {
				products: { list: [] },
			}, // 限时购的全部信息
			floor2: [], // 自定义模块二
			findUsList: [], // find Us 模块
			recommendList: [], // 推荐数据
			advertInfo: {},
			swipeIndex: 0, // 当前活动的下标
		}
	},
	components: {
		LoadingHome,
		TopHeader,
		HomeSwiper,
		NavBar,
		SlideGoods,
		BackTop,
		LineChat,
		FooterInfo,
	},
	serverPrefetch() {
		console.log('home.serverPrefetch')
		return this.init('noDeal')
	},
	mounted() {
		console.log('home.mounted')
		this.init()
	},
	computed: {
		...mapState({
			bannerList: (state) => state.ssr.homedData.bannerList || [],
			beanList: (state) => state.ssr.homedData.beanList || [],
		}),
	},
	methods: {
		...mapMutations('app', {
			setShopsId: 'SET_SHOPSID',
			setShopsInfo: 'SET_SHOPSINFO',
		}),
		// 轮播图改变:
		swipeChange(index) {
			this.swipeIndex = index
		},
		// 点击轮播图:
		clickSwipeImg(item) {
			// relType 1-链接, 2-专题
			if (item.relType == 1) {
				this.formatLinkToJump(item.internalUrl)
			} else if (item.relType == 2) {
				this.$router.push({
					path: this.formatUrl(`/category/`, `${item.title}-${item.topicId}`) + '?banner=1',
				})
			}
		},
		// 前往广告图对应的链接:
		goAdPicLink(item) {
			this.formatLinkToJump(item.internalUrl)
		},
		// 格式化倒计时--时:
		flashHour(obj) {
			// 当倒计时结束时,重新请求一次接口,查看是否有符合的闪购活动:
			if (obj.days == 0 && obj.hours == 0 && obj.minutes == 0 && obj.seconds == 0) {
				this.getFlashData()
				return
			}
			if (obj.days > 0 && obj.hours > 0) {
				return '24h+'
			}
			return obj.hours
		},
		// 上报数据-促销活动：
		toReportData(item, title) {
			this.reportGtag('view_promotion', {
				id: item.id,
				name: title || item.name,
			})
		},
		// 处理时区
		dealTime(time = '') {
			if (time.includes('.')) {
				time = time.substring(0, time.indexOf('.')) + time.substring(time.indexOf('.') + 4, time.length)
			}
			return time.replace(/-/g, '/')
		},
		getPageData2() {
			// 新品模块:
			http.home.newIns().then((res) => {
				if (res.code == 0) {
					this.newList = res.data
				}
			})
			// 获取首页广告图:
			http.home.advertPic().then((res) => {
				this.advertInfo = res.data || {}
				// console.log(res, '--------------------')
			})
			// 自定义模块一:
			http.home.floors1().then((res) => {
				if (res.code != 0) return
				this.floor1 = res.data
			})
			// 闪购模块:
			this.getFlashData()
			// 自定义模块二:
			http.home.floors2().then((res) => {
				if (res.code != 0) return
				this.floor2 = res.data
			})
			// find Us 模块:
			http.home.findUs().then((res) => {
				if (res.code != 0) return
				this.findUsList = res.data
			})
			// 推荐模块:
			// this.getRecommend()
		},
		// 获取闪购数据:
		getFlashData() {
			http.home
				.flashSaleList({
					pageNum: 1,
					pageSize: 6,
				})
				.then((res) => {
					if (res.code != 0) return
					if (res.data) {
						this.timeValue = dayjs(this.dealTime(res.data.endTime)).valueOf() - dayjs().valueOf()
						// 时间上符合,切含有商品数量才能显示:
						this.showFalsh = dayjs().valueOf() - dayjs(this.dealTime(res.data.startTime)).valueOf() > 0 && this.timeValue > 0 && res.data.products && res.data.products.list.length
					}
					this.flashInfo = res.data
				})
		},
		// 获取推荐数据：
		getRecommend() {
			const params = {
				pageNum: 1,
				pageSize: 20,
				type: 1, // // 3-表示商品详情, 2-购物车, 1-首页
			}
			http.home.recommend(params).then((res) => {
				this.recommendList = res.data
			})
		},
		fetchDataMounted() {
			this.getPageData2()
			if (this.platformId == 2) {
				this.setShopsId()
			}
		},
		// 初始化,是否需要处理数据-默认要要处理:
		init(noDeal) {
			// if (!noDeal && this.beanList.length) {
			// 	this.fetchDataMounted()
			// 	return Promise.resolve()
			// }
			return this.$store.dispatch('ssr/homeInit').finally(() => {
				if (!noDeal) {
					this.fetchDataMounted()
				}
			})
		},
	},
}
</script>
<style scoped lang="less">
@import '@/style/variable.less';

.home {
	padding-bottom: calc(50px + constant(safe-area-inset-bottom)); /* 兼容 iOS < 11.2 */
	padding-bottom: calc(50px + env(safe-area-inset-bottom)); /* 兼容 iOS >= 11.2 */

	.home-swiper-placeholder {
		height: 375px;
	}
	.home__section {
		padding-bottom: 34px;
	}
	.home__margintop24 {
		margin-top: 24px;
	}
	// 大横幅
	.home__big-banner {
		height: 152px;
	}
	.home__small-banner {
		height: 153px;
		width: 100%;
	}
	.find-swiper-box {
		padding: 0 16px 34px;
	}

	// 1.0.6版本改动
	.home__module {
		margin-bottom: 34px;
		img {
			display: block;
			width: 100%;
		}
		.register-tips-pic {
			height: 152px;
		}
		.h__m-title {
			font-size: 18px;
			color: @color-222;
			font-weight: 500;
			text-align: center;
			position: relative;
			padding: 0 16px;
			margin-bottom: 15px;
			&.h__m-title-more {
				padding: 0 90px;
			}
			.h__m-more {
				font-size: 14px;
				position: absolute;
				right: 14px;
				top: 50%;
				transform: translateY(-50%);
				color: @color-222;
				font-weight: 300;
				.icon {
					font-size: 10px;
					font-weight: 600;
				}
			}
		}
		.h__m-list {
			display: flex;
			flex-wrap: wrap;
			.h__m-item {
				height: 152px;
				font-size: 0;
				width: 182px;
				// margin-right: 10px;
				margin-bottom: 10px;
				&:first-child {
					width: 100%;
				}
				&:nth-child(even) {
					margin-right: 10px;
				}
				.h__m-pic {
					height: 100%;
					width: 100%;
				}
			}
		}
		.h__m-banner {
			height: 152px;
			margin-bottom: 10px;
			&.flash-sale-banner {
				margin-bottom: 15px;
			}
		}
		.h__m-wrap {
			.van-count-down {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 12px;
				color: @color-222;
				margin-bottom: 15px;
				line-height: 18px;
				.djs-txt {
					font-size: 14px;
					margin-right: 9px;
				}
				.djs-num {
					width: 18px;
					height: 18px;
					border-radius: 2px;
					background: #000;
					color: #fff;
					text-align: center;
				}
				.djs-colon {
					margin: 0 2px;
				}
			}
		}
	}

	// 首页banner 轮播图样式
	.home-swipe {
		position: relative;
		text-align: center;
		.home-banner {
			height: 375px;
			.swiper-img {
				width: 100%;
				height: 375px;
				object-fit: cover !important;
			}
		}
		.swiper-pagination {
			position: absolute;
			left: 50%;
			bottom: 0;
			transform: translateX(-50%);
			text-align: center;
			color: #222;
			bottom: -30px;
			width: 290px;
			box-shadow: 0 15px 20px 0 rgba(34, 34, 34, 0.05);
			padding: 10px;
			background: @color-bg;
			.slide-title {
				color: @color-222;
				max-width: 328px;
				margin: 0 auto;
				font-size: 18px;
				height: 20px;
				font-weight: 600;
				margin-bottom: 2px;
			}
			.slide-text {
				min-height: 14px;
				line-height: 14px;
				font-size: 14px;
			}
			.slide-dots {
				margin-top: 12px;
				display: flex;
				justify-content: center;
				.slide-dots-item {
					width: 10px;
					height: 2px;
					background: rgba(34, 34, 34, 0.1);
					margin-right: 8px;
					border-radius: 3px;
					&.is-active {
						background: #222;
					}
					&:last-child {
						margin-right: 0;
					}
				}
			}
		}
	}
}
</style>
