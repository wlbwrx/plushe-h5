<template>
	<div class="pay-method">
		<div class="order-list">
			<h2>Default Payment</h2>
			<div class="pay-list">
				<van-checkbox v-model="checked"
					><span class="pay-end-img"><img src="@/assets/images/visa.png" /></span>Ending in 5157</van-checkbox
				>
			</div>
		</div>
		<div class="pay-method-select">
			<van-radio-group v-model="radio">
				<van-radio name="1" class="pay-list"
					><span class="pay-end-img"><img src="@/assets/images/visa.png" /></span>Ending in 5157</van-radio
				>
				<van-radio name="2" class="pay-list"
					><span class="pay-end-img"><img src="@/assets/images/mastercard.png" /></span>Ending in 5157</van-radio
				>
				<van-radio name="3" class="pay-list"
					><span class="pay-end-img"><img src="@/assets/images/paypal.png" /></span>Ending in 5157</van-radio
				>
			</van-radio-group>
		</div>
		<ul class="pay-method-list">
			<li><img src="@/assets/images/visa.png" /></li>
			<li><img src="@/assets/images/mastercard.png" /></li>
			<li><img src="@/assets/images/payment.png" /></li>
			<li><img src="@/assets/images/discover.png" /></li>
		</ul>
		<div class="pay-methd-card">
			<div class="pay-methd-card-num">
				<span>CARD NUMBER</span>
				<p>1521 4587 3256 1457</p>
			</div>
			<i class="icon icon-xinyongka"></i>
		</div>
		<div class="pay-methd-data">
			<div class="pay-methd-data-list pay-methd-data-sel">
				<p class="pay-methd-data-txt">EXPIRE DATE</p>
				<div class="pay-methd-data-confir">
					<span>00/0000</span>
					<i class="icon icon-xiala"></i>
				</div>
			</div>
			<div class="pay-methd-data-list pay-methd-data-cv">
				<div class="pay-methd-data-confir">
					<span>CVV</span>
					<i class="icon icon-wenhao"></i>
				</div>
				<p class="pay-methd-data-txt">000</p>
			</div>
		</div>
		<div class="pay-methd-remember">
			<van-cell center title="Remember this card for future use">
				<template #right-icon>
					<van-switch v-model="checked" size="18" />
				</template>
			</van-cell>
		</div>
		<div class="submit-order-box">
			<van-button type="primary" class="submit-order">PURCHASE</van-button>
		</div>
	</div>
</template>
<script>
export default {
	components: {},
	data() {
		return {
			radio: 1,
			checked: false,
		}
	},
}
</script>
<style lang="less" scoped src="@/style/modules/order.less"></style>