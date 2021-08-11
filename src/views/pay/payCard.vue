<template>
	<div class="pay-card">
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
		<div class="pay-card-list">
			<h2>SHIPPING ADDRESS</h2>
			<div class="address-list">
				<div class="contact">
					<div class="concat-info">
						<label>Alice Lipich</label>
						<span>+1 540 696 9993</span>
					</div>
					<p class="concat-address">1905 Anderson Court, Apt 241 Becxes, CD, US, 32461</p>
				</div>
				<i class="icon icon-fanhui-copy"></i>
			</div>
		</div>
		<div class="order-list">
			<ul class="pay-sum-item">
				<li class="pay-sum-list">
					<label>Order Number:</label>
					<span>a514614872</span>
				</li>
				<li class="pay-sum-list">
					<label>Order Number:</label>
					<span>a514614872</span>
				</li>
				<li class="pay-sum-list">
					<label>Order Number:</label>
					<span>a514614872</span>
				</li>
			</ul>
			<div class="order-sum">
				<div class="order-total">
					<label>Tatol:</label>
				</div>
				<span class="order-amount">-US$9.00</span>
			</div>
			<div class="submit-order-box">
				<van-button type="primary" class="submit-order">PLACE ORDER</van-button>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	components: {},
	data() {
		return {
			checked: false,
		}
	},
}
</script>
<style lang="less" scoped>
@import '@/style/modules/order.less';
@import '@/style/modules/address.less';
.pay-card-list {
	margin-top: 10px;
	background: #fff;
	h2 {
		font-size: 20px;
		font-weight: bold;
		padding: 20px 16px 0;
	}
	.contact {
		margin-left: 0;
	}
}
</style>