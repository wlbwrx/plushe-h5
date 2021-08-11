<template>
	<div class="review header-title">
		<ReviewList v-for="(item, index) in reviewDetail.orderItemResp" :reviewList="item" :key="index" :type="false" />
		<div v-if="reviewDetail.userEvaluateList && reviewDetail.userEvaluateList.length > 0">
			<ReviewList :type="true" v-for="(item, index) in reviewDetail.userEvaluateList" :reviewList="item" :key="index" />
		</div>
	</div>
</template>
<script>
import mixin from './const/review'
import ReviewList from './modules/ReviewList'
export default {
	mixins: [mixin],
	components: {
		ReviewList,
	},
}
</script>
<style lang="less" scoped src="@/style/modules/order.less"></style>