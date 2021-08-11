<template>
	<div class="pay-success">
		<div class="success-state">
			<i class="icon icon-zhifuchenggong"></i>
			<p class="success-mess">Your payment was successful!</p>
			<div class="sucess-order">Your order: B1548457641</div>
			<div class="success-text">is being procssed,and wil be delivered soon</div>
		</div>
		<div class="submit-order-box">
			<van-button type="primary" class="submit-order">RETRUN</van-button>
		</div>
	</div>
</template>
<script>
export default {
	components: {},
}
</script>
<style lang="less" scoped>
.success-state {
	background: #fff;
	position: absolute;
	top: 45%;
	width: 100%;
	transform: translate(0, -50%);
	font-size: 16px;
	text-align: center;
	i {
		display: block;
		font-size: 100px;
	}
	.success-mess {
		margin: 10px 0 20px;
	}
}
</style>