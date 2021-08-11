<template>
	<div class="reviews__general">
		<div class="reviews__general-lf">
			<p class="reviews__general-num">{{ review.evaluateStartPercentage ? review.evaluateStartPercentage.toFixed(1) : 0 }}</p>
			<rate :value="review.evaluateStartPercentage" size="16"></rate>
		</div>
		<div class="reviews__general-rt">
			<p class="reviews__general-tit">{{ $t('detail.fitWell') }}</p>
			<ul class="reviews__general-info">
				<li class="reviews__general-item">
					<span class="reviews__general-label">{{ $t('detail.small') }}</span>
					<van-progress :percentage="review.smallPercentage || ''" color="#222" track-color="#c4c4c4" stroke-width="8" :show-pivot="false" />
					<span class="reviews__general-value">{{ review.smallPercentage }}%</span>
				</li>
				<li class="reviews__general-item">
					<span class="reviews__general-label">{{ $t('detail.trueToSize') }}</span>
					<van-progress :percentage="review.tureToSizePercentage || ''" color="#222" track-color="#c4c4c4" stroke-width="8" :show-pivot="false" />
					<span class="reviews__general-value">{{ review.tureToSizePercentage }}%</span>
				</li>
				<li class="reviews__general-item">
					<span class="reviews__general-label">{{ $t('detail.large') }}</span>
					<van-progress :percentage="review.largePercentage || ''" color="#222" track-color="#c4c4c4" stroke-width="8" :show-pivot="false" />
					<span class="reviews__general-value">{{ review.largePercentage }}%</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import Rate from '@/components/rate/index.vue'
export default {
	props: {
		review: {
			type: Object,
		},
	},
	components: {
		Rate,
	},
}
</script>

<style scoped lang="less">
@import '@/style/variable.less';

.reviews__general {
	display: flex;
	align-items: center;
	padding: 14px 18px;
	background: @color-F0F;
	margin-bottom: 20px;
	font-weight: 300;

	.reviews__general-lf {
		width: 36%;

		.reviews__general-num {
			font-size: 28px;
			line-height: 34px;
			font-weight: normal;
		}
	}

	.reviews__general-rt {
		flex: 1;
		font-size: 12px;
		color: @color-222;

		.reviews__general-tit {
			color: @color-666;
			margin-bottom: 12px;
		}

		.reviews__general-info {
			.reviews__general-item {
				margin-bottom: 10px;
				display: flex;
				align-items: center;

				.reviews__general-label {
					width: 82px;
				}

				.van-progress {
					width: 84px;
					margin-right: 6px;
					border-radius: 0;
				}
			}
		}
	}
}
</style>