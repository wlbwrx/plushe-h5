<template>
	<div v-show="receiveList && receiveList.length > 0">
		<van-popup class="popup-show" v-model="couponShow" closeable click-close-icon="show(false)" :style="{ width: '90%' }">
			<div class="">
				<couponList :couponShow="couponShow" @callbanckBtn="show" btnTitle="OK" />
			</div>
		</van-popup>
	</div>
</template>
<script>
import couponList from './couponList'
import { mapState } from 'vuex'
export default {
	computed: {
		...mapState('coupon', ['receiveList']),
	},
	data() {
		return {
			couponShow: false,
		}
	},
	components: {
		couponList,
	},
	methods: {
		show(isShow) {
			this.couponShow = isShow
		},
	},
}
</script>
<style lang="less" scoped>
/deep/ .receive-title {
	padding: 45px 0 4px;
}
/deep/ .submit-order-box {
	padding: 14px 16px 20px;
}
.popup-show {
	max-width: 375px;
}
</style>
