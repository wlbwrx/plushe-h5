<template>
	<div class="pay-success">
		<div class="success-state">
			<div class="pay-state">
				<i v-if="payType == 1" class="icon iconsuccess_no_circle"></i>
				<i v-else-if="payType == 2" class="icon icon-guanbi1"></i>
				<img v-else src="@/assets/images/paying.gif" />
			</div>
			<div v-show="type !== 'cancel'">
				<div v-if="payType == 1">
					<p class="success-mess">{{ $t('pay.paymentSuccessfulText') }}</p>
					<div class="sucess-order">{{ $t('pay.paymentSuccessfulText1', { id: param.orderSn }) }}</div>
					<div class="sucess-order">{{ $t('pay.paymentSuccessfulText2') }}</div>
				</div>
				<div class="faild-text" v-else-if="payType == 2">{{ $t('pay.PaymentFailedText') }}</div>
				<div v-else>
					<p class="success-mess b">{{ $t('pay.paymentText') }}</p>
					<div class="sucess-order">{{ $t('pay.paymentText1') }}{{ $t('pay.paymentText2') }}</div>
				</div>
			</div>
		</div>
		<div class="submit-order-box" v-show="type !== 'cancel'">
			<van-button type="primary" class="submit-order" @click="gotoNext">{{ $t('pay.view') }}</van-button>
		</div>
	</div>
</template>

<script>
import mixin from './payment'
export default {
	mixins: [mixin],
	components: {},
	methods: {
		gotoNext() {
			let { orderSn } = this.param
			this.$router.replace({ name: 'orderDetail', query: { orderSn, firstPay: true } })
		},
	},
}
</script>
<style lang="less" scoped>
.pay-success {
	height: 100%;
	background: #fff;
}
.success-state {
	background: #fff;
	position: absolute;
	width: 100%;
	height: calc(100% - 80px);
	font-size: 16px;
	text-align: center;
	padding: 112px 16px 0;
	.success-mess {
		margin: 20px 0;
		&.b {
			font-weight: 600;
		}
	}
	.faild-text {
		margin-top: 20px;
	}
	.pay-state {
		width: 100px;
		height: 100px;
		margin: 0 auto;
		border-radius: 50%;
		background: #222;
		display: flex;
		justify-content: center;
		align-items: center;
		img {
			width: 100%;
			height: 100%;
		}
		i {
			color: #fff;
			font-size: 60px;
		}
	}
}
</style>
