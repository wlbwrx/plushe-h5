<template>
	<!-- GeeMart 店铺de首页 -->
	<div class="home">
		<!-- 顶部头部 -->
		<gee-top></gee-top>
		<!-- 轮播图区域 -->
		<van-swipe :autoplay="5000" indicator-color="white">
			<van-swipe-item v-for="item of bannerList" :key="item.id">
				<a class="home__banner-link" href="javascript: void(0)" @click.prevent="clickBanner(item)">
					<van-image class="home__banner-pic" fit="cover" lazy-load :src="$utils.imageHandler(3, item.picKey)"></van-image>
				</a>
			</van-swipe-item>
		</van-swipe>
		<!-- 菜单栏区域 -->
		<nav-bar v-if="menuList.length" :list="menuList"></nav-bar>
		<!-- 秒杀/-新品区域-->
		<spike-new :list="newList" title="NEW IN" :type="1" :total="newTotal"></spike-new>
		<spike-new v-if="flashTime" :list="flashList" :time="flashTime" title="FLASH SALE" :type="2"></spike-new>
		<!-- 楼层 -->
		<template v-for="item of floors">
			<spike-new v-if="item.goodsList && item.goodsList.length" :list="item.goodsList" :title="item.name" :type="3" :key="item.id" :id="item.id"></spike-new>
		</template>
		<!-- 商品列表(推荐)区域 -->
		<goods-list v-if="recommendList.length" title="For You" :list="recommendList" showMore @showMore="getMoreRecommend" :isEnd="recommendIsEnd"></goods-list>
		<!-- 其他 -->
		<FooterInfo></FooterInfo>
		<!-- 返回顶部 -->
		<back-top></back-top>
	</div>
</template>
<script>
import GeeTop from '@/components/gee/GeeTop.vue'
import NavBar from './component/NavBar.vue'
import SpikeNew from './component/SpikeNew.vue'
import GoodsList from '@/components/goods_list/index.vue'
import BackTop from '@/components/BackTop.vue'
import FooterInfo from '@/components/Footer.vue'

import http from '@/api/index.js'
import { mapMutations } from 'vuex'

export default {
	data() {
		return {
			bannerList: [],
			menuList: [],
			newList: [],
			newTotal: 0,
			flashList: [],
			flashTime: 0, // 秒杀时间
			floors: [], // 楼层数据
			allRecomentList: [], // 全部的推荐数据
			recommendList: [], // 推荐数据
			recommendIsEnd: false, // 推荐结束
			pageSize: 20, // 推荐一页数量
			page: 1, // 当前推荐 页码
		}
	},
	components: {
		GeeTop,
		NavBar,
		SpikeNew,
		GoodsList,
		FooterInfo,
		BackTop,
	},
	mounted() {
		this.getPageData()
		if (this.$route.query.shopsId) {
			this.setShopsId(this.$route.query.shopsId)
		}
		// 获取推荐数据：
		this.getRecommend()
	},
	computed: {},
	methods: {
		...mapMutations('app', {
			setShopsId: 'SET_SHOPSID',
			setShopsInfo: 'SET_SHOPSINFO',
		}),
		// 点击banner:
		clickBanner(item) {
			if (item.internalUrl && item.internalUrl != '0') {
				window.location.href = item.internalUrl

				this.reportGtag('view_promotion', {
					name: 'Banner',
					creative_name: item.title, // 广告素材的名称
				})
			}
		},
		// 获取页面数据:
		getPageData() {
			let params = {
				shopsId: this.shopsId,
			}
			http.home.index(params).then((res) => {
				const data = res.data
				this.bannerList = data.banners
				this.menuList = data.beans
				// 新品-秒杀--控制4个：
				this.newList = data.newIns.list.filter((item, index) => {
					return index < 4
				})
				this.newTotal = data.newIns.total
				if (data.flashSale && data.flashSale.endTime && data.flashSale.products.total > 0) {
					this.flashList = data.flashSale.products.list.filter((item, index) => {
						return index < 4
					})
					data.flashSale.endTime = this.delTime(data.flashSale.endTime.replace(/-/g, '/'))
					data.flashSale.startTime = this.delTime(data.flashSale.startTime.replace(/-/g, '/'))
					const theTime = new Date()
					if (+new Date(data.flashSale.endTime) > +theTime && +new Date(data.flashSale.startTime) < +theTime) {
						this.flashTime = new Date(data.flashSale.endTime) - theTime
					} else {
						this.flashTime = 0
					}
				}
				// // 全部店铺信息：
				// this.setShopsInfo(data.shops)

				// 楼层：
				this.floors = data.floors
				data.floors.forEach((item, index) => {
					this.getFloorsData(item, index)
				})
			})
		},
		// 获取楼层数据：
		getFloorsData(item, index) {
			let params = {
				categoryId: item.id,
				pageNum: 1,
				pageSize: 6,
				shopsId: this.shopsId,
			}
			http.home.floorsList(params).then((res) => {
				this.$set(this.floors[index], 'goodsList', res.data.list)
			})
		},
		// 获取推荐数据：
		getRecommend() {
			const params = {
				pageNum: 1,
				pageSize: 100,
				shopsId: this.shopsId, // 店铺时需要传递
				type: 1, // 3-表示商品详情, 2-购物车, 1-首页
			}
			// 前端分页-20条一页
			http.home.recommend(params).then((res) => {
				this.allRecomentList = res.data
				if (this.pageSize < this.allRecomentList.length) {
					this.recommendIsEnd = false
					this.recommendList = this.allRecomentList.filter((item, index) => index < this.pageSize * this.page)
				} else {
					this.recommendList = this.allRecomentList
					this.recommendIsEnd = true
				}
			})
		},
		// 获取更多推荐数据
		getMoreRecommend() {
			if (!this.recommendIsEnd) {
				this.page++
				this.recommendList = this.allRecomentList.filter((item, index) => index < this.pageSize * this.page)
				this.recommendIsEnd = this.allRecomentList.length == this.recommendList.length
			}
		},
		delTime(strTime) {
			let index = strTime.indexOf('.')
			return strTime.substring(0, index) + strTime.substring(index + 4, strTime.length)
		},
	},
}
</script>
<style scoped lang="less">
@color-bg: #f5f5f5;

.home {
	background: @color-bg;
	padding-bottom: constant(safe-area-inset-bottom);
	/* 兼容 iOS < 11.2 */
	padding-bottom: env(safe-area-inset-bottom);
	/* 兼容 iOS >= 11.2 */
}

.home__banner-link {
	display: block;
	font-size: 0;
}

.home__banner-pic {
	width: 100%;
	height: 400px;
}
</style>
