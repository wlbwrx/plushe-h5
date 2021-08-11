<template>
	<div class="reviews">
		<van-cell class="reviews__title" :border="false" :is-link="!!review.total && review.list.length < review.total" @click="goReviewDetail">
			<template #title>
				<span>{{ $t('detail.reviews') }} ({{ review.total }})</span>
			</template>
		</van-cell>
		<div class="reviews__wrapper" v-if="review.total">
			<evaluation-view :review="review"></evaluation-view>
			<!-- 评论列表 -->
			<comment-list :list="review.list"></comment-list>
			<div class="reviews__all" @click="goReviewDetail" v-if="review.list.length < review.total">
				<span class="reviews__all-title">{{ $t('detail.viewAll') }}</span>
				<i class="icon icon-fanhui-copy"></i>
			</div>
		</div>
	</div>
</template>
<script>
import EvaluationView from '@/components/comment_list/EvaluationView.vue'
import CommentList from '@/components/comment_list/index.vue'

export default {
	props: {
		review: {
			type: Object,
		},
	},
	data() {
		return {}
	},
	components: {
		EvaluationView,
		CommentList,
	},
	created() {},
	mounted() {},
	methods: {
		// 前往评论详情列表：
		goReviewDetail() {
			if (this.review.list.length < this.review.total) {
				this.$emit('moreReviews')
			}
		},
	},
}
</script>
<style scoped lang="less">
@import '@/style/variable.less';

.reviews {
	padding-top: 24px;
	// margin-bottom: 10px;

	.reviews__title {
		font-size: 16px;
		font-weight: normal;
		color: @color-222;
		padding-top: 0;
		padding-bottom: 20px;
		display: flex;
		justify-content: space-between;
		background: @color-bg;
		.icon {
			font-size: 20px;
		}
	}
	.reviews__wrapper {
		padding: 0 16px;
	}

	.reviews__all {
		border-top: 1px solid @color-F2F;
		height: 49px;
		line-height: 48px;
		display: flex;
		justify-content: center;
		font-size: 14px;
		color: @color-666;
		font-weight: 300;
		.icon {
			font-size: 14px;
			font-weight: normal;
			margin-left: 6px;
		}
	}
}
</style>
