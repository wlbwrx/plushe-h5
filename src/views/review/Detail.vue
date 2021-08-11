<template>
	<!-- 评论详情 -->
	<div class="review-detail">
		<nav-bar :title="$t('detail.reviews')" border></nav-bar>
		<evaluation-view :review="review"></evaluation-view>
		<div class="review-detail__main">
			<van-list v-model="loading" :finished="finished" :finished-text="$t('sort.noMore')" :immediate-check="false" :loading-text="$t('loading')" @load="onLoad">
				<comment-list :list="review.list"></comment-list>
			</van-list>
		</div>
	</div>
</template>
<script>
import NavBar from '@/components/navbar/index.vue'
import EvaluationView from '@/components/comment_list/EvaluationView.vue'
import CommentList from '@/components/comment_list/index.vue'
import http from '@/api/index'

export default {
	data() {
		return {
			loading: false,
			finished: false,
			// 评论-相关信息
			review: {
				list: [],
				total: 0,
				evaluateStartPercentage: 0,
				largePercentage: 0,
				smallPercentage: 0,
				tureToSizePercentage: 0,
			},
			pageNum: 1,
			pageSize: 10,
		}
	},
	components: {
		CommentList,
		NavBar,
		EvaluationView,
	},
	created() {
		this.getEvaluateList()
		this.getEvaluateTotal()
	},
	mounted() {},
	methods: {
		// 获取评价统计数据：
		getEvaluateTotal() {
			const params = {
				productNo: this.$route.query.productNo,
				shopsId: this.$route.queryshopsId || undefined,
			}
			http.review.evaluateStatistics(params).then((res) => {
				const data = res.data
				this.review = Object.assign(this.review, data)
			})
		},
		// 获取评论列表
		getEvaluateList() {
			this.loading = true
			this.finished = false
			const params = {
				pageNum: this.pageNum,
				pageSize: this.pageSize,
				productNo: this.$route.query.productNo,
				shopsId: this.$route.queryshopsId || undefined,
			}
			http.review.evaluateList(params).then((res) => {
				this.loading = false
				const data = res.data
				this.review.total = data.total
				this.review.list = this.review.list.concat(data.list)
				if (this.review.list.length >= data.total) {
					this.finished = true
				}
			})
		},
		// 加载更多
		onLoad() {
			this.pageNum++
			console.log(this.pageNum, '00000000')
			this.getEvaluateList()
		},
	},
}
</script>
<style scoped lang="less">
@import '@/style/variable.less';

.review-detail {
	.review-detail__main {
		padding: 24px 16px;
	}
}
</style>
