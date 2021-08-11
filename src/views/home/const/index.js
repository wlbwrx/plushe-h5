import LoadingHome from '@/components/beforeLoading/home.vue'
import TopHeader from '../component/TopHeader.vue'
import Swiper from '../component/Swiper.vue'
import NavBar from '../component/NavBar.vue'
import SpikeNew from '../component/SpikeNew.vue'
import SlideGoods from '../component/SlideGoods.vue'
import GoodsList from '@/components/goods_list/index.vue'
import BackTop from '@/components/BackTop.vue'
import OtherInfo from '../component/OtherInfo.vue'

import http from '@/api/index.js'
import { mapMutations, mapState } from 'vuex'

export default {
	data() {
		return {
			loading: true, // 加载中
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
		LoadingHome,
		TopHeader,
		Swiper,
		NavBar,
		SpikeNew,
		SlideGoods,
		GoodsList,
		OtherInfo,
		BackTop,
	},
	created() {
		if (this.platformId == 2) {
			this.setShopsId()
		}
		this.getPageData()
		// 获取推荐数据：
		this.getRecommend()
	},
	mounted() {},
	computed: {
		...mapState({
			userInfo: state => state.user.user,
			currentServerTime: state => state.app.currentServerTime,
		}),
	},
	methods: {
		...mapMutations('app', {
			setShopsId: 'SET_SHOPSID',
			setShopsInfo: 'SET_SHOPSINFO',
		}),
		getPageData() {
			this.loading = true
			http.home.index().then(res => {
				this.loading = false
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
					if (+new Date(data.flashSale.endTime) > this.currentServerTime && +new Date(data.flashSale.startTime) < this.currentServerTime) {
						this.flashTime = new Date(data.flashSale.endTime) - new Date(this.currentServerTime)
					} else {
						this.flashTime = 0
					}
				}

				// 店铺信息(仅geeMart平台下才)：
				if (this.platformId == 2) {
					this.setShopsInfo(data.shops)
				}

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
			}
			http.home.floorsList(params).then(res => {
				this.$set(this.floors[index], 'goodsList', res.data.list)
			})
		},
		// 获取推荐数据：
		getRecommend() {
			const params = {
				pageNum: 1,
				pageSize: 100,
				type: 1, // // 3-表示商品详情, 2-购物车, 1-首页
			}
			// 前端分页-20条一页
			http.home.recommend(params).then(res => {
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
				this.recommendIsEnd = this.allRecomentList.length <= this.recommendList.length
			}
		},
		delTime(strTime) {
			let index = strTime.indexOf('.')
			return strTime.substring(0, index) + strTime.substring(index + 4, strTime.length)
		},
	},
}
