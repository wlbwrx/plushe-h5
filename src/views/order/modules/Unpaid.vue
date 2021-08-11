<template>
	<div class="unpaid">
		<h2 class="unpaid-title">Unpaid</h2>
		<p class="unpaid-model"><label>ORDER #</label><b>B02145671</b></p>
		<ul class="sider unpaid-shop">
			<li><van-image class="unpaid-shop-image" src="" /></li>
			<li><van-image class="unpaid-shop-image" src="" /></li>
			<li><van-image class="unpaid-shop-image" src="" /></li>
			<li><van-image class="unpaid-shop-image" src="" /></li>
			<li><van-image class="unpaid-shop-image" src="" /></li>
			<li><van-image class="unpaid-shop-image" src="" /></li>
		</ul>
		<div class="unpaid-oper">
			<div class="unpaid-total">
				<label>4 Items Total:</label>
				<b>US$39.9</b>
			</div>
			<div class="unpaid-closeIn">
				<label>Close In:</label>
				<b>11:30:52</b>
			</div>
			<div class="unpaid-btn">
				<van-button type="default" @click="goto('shippingAddress')">Edit Address</van-button>
				<van-button type="primary" class="unpaid-btn-pay" @click="goto('payment')">PAY</van-button>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	components: {},
	data() {
		return {}
	},
	methods: {
		goto(url) {
			this.$router.push({ name: url })
		},
	},
}
</script>
<style lang="less" scoped>
.unpaid {
	background: #fff;
	padding: 0 16px;
	.unpaid-title {
		font-size: 18px;
		height: 50px;
		line-height: 50px;
	}
	.unpaid-model {
		font-size: 14px;
		b {
			margin-left: 5px;
		}
	}
	.unpaid-shop {
		li {
			width: 96px;
			height: 144px;
			margin: 10px 10px 0 0;
			.unpaid-shop-image {
				width: 100%;
				height: 100%;
			}
		}
	}
	.unpaid-oper {
		padding-top: 20px;
		font-size: 14px;
		.unpaid-total,
		.unpaid-closeIn,
		.unpaid-btn {
			display: flex;
			justify-content: flex-end;
		}
		.unpaid-total,
		.unpaid-closeIn {
			margin-bottom: 10px;
			b {
				margin-left: 10px;
			}
		}
		.unpaid-btn {
			.unpaid-btn-pay {
				margin-left: 10px;
			}
		}
	}
}
</style>
