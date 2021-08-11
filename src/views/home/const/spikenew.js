
export default {
	props: {
		// 标题
		title: {
			type: String,
		},
		list: {
			type: Array,
		},
		total: {
			type: Number,
		},
		// 秒杀时间
		time: {
			type: Number,
		},
		//2-秒杀，1-新品
		type: {
			type: Number,
			default: 2,
		},
		// 楼层唯一Id
		id: {
			type: Number,
		},
	},
	data() {
		return {
			limitTime: 24 * 60 * 60 * 1000,
		}
	},
	computed: {
	},
	methods: {
		// 前往商品详情：
		goGoodsDetail(item) {
			this.$router.push({
				path: `/goods_detail/${item.productNo}`,
			})
		},
		// 前往商品筛选页
		goGoodsFilter() {
			// 促销活动：
			if (typeof this.reportData == 'function') {
				this.reportData({
					id: this.id,
					name: this.title,
				})
			}

			this.$router.push({
				path: '/goods_filter',
				query: {
					categoryId: this.id || undefined,
					title: this.title,
					fromType: this.type, // 1-新品，2-秒杀
				},
			})
		},
	},
}
