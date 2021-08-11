
export default {
	props: {
		list: {
			type: Array,
		},
	},
	data() {
		return {
			current: 0, // 轮播图的当前下标
		}
	},
	created() {},
	mounted() {},
	computed: {
	},
	methods: {
		// 前往商品筛选列表页：
		goGoodsFilter(item) {
			this.$router.push({
				path: '/goods_filter',
				query: {
					categoryId: item.id,
					title: item.name,
					fromType: 0, // 0--首页分类
				},
			})
		},
		// 前往分类列表
		goCategory() {
			this.$router.push({
				path: '/category',
				query: {
					shopsId: this.shopsId || undefined,
				},
			})
		},
		// 轮播切换
		swipeChange(index) {
			this.current = index
		},
	},
}
