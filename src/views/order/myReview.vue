<template>
	<div class="review">
		<div class="review-rate">
			<div class="review-rate-cont">
				<h2>Logistics Service</h2>
				<span>5 stars means the best</span>
			</div>
			<div class="review-rate-opear">
				<p>Rating</p>
				<van-rate class="review-rate-star" v-model="value" :size="25" color="#FFBF00" void-icon="star" void-color="#E9E9E9" />
			</div>
		</div>
		<ReviewList :type="false" />
		<ReviewList />
	</div>
</template>
<script>
import ReviewList from './modules/ReviewList'
export default {
	components: {
		ReviewList,
	},
	data() {
		return {
			value: 2,
		}
	},
}
</script>
<style lang="less" scoped src="@/style/modules/order.less"></style>
