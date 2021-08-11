<template>
	<!-- 注册成功 -->
	<div class="register-success">
		<nav-bar border></nav-bar>
		<!-- 头部返回 -->
		<div class="register-success__main">
			<h1 class="register-success__title">{{ $t('login.congratulations') }}</h1>
			<h3 class="register-success__tips">{{ $t('login.registrationSuccessful') }}</h3>
			<div class="receive-wrap" v-if="receiveList.length">
				<p class="receive-title">
					{{ $t('login.hint11') }}<br />
					{{ $t('login.hint12') }}
				</p>
				<ul class="coupon-list">
					<li class="coupon-item" v-for="(item, index) in receiveList" :key="index">
						<div class="coupon-item-cont">
							<h3 class="coupon-tit">{{ creditAmount(item) }}</h3>
							<p class="coupon-msg" v-if="item.couponType == 4">{{ $t('coupon.ForOrdersOver4', { num: item.thresholdNumber }) }}</p>
							<p class="coupon-msg" v-else>{{ $t('coupon.ForOrdersOver', { num: filterPriceMethod(item.thresholdAmount) }) }}</p>
							<p class="coupon-code">{{ item.couponCode }}</p>
							<p class="coupon-date coupon-gray">{{ creditDays(item, 'cop') }}</p>
							<p class="coupon-area coupon-gray text-hidden-row-1">{{ item.comment }}</p>
						</div>
					</li>
				</ul>
			</div>
			<div class="login-submit-box">
				<van-button class="submit-btn-44" block @click="submit">{{ $t('login.shopNow') }}</van-button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import NavBar from '@/components/navbar/index.vue'
import http from '@/api/index.js'

export default {
	computed: {
		...mapState({
			userInfo: (state) => state.user.user,
		}),
	},
	data() {
		return {
			receiveList: [], // 优惠券列表
		}
	},
	components: {
		NavBar,
	},
	created() {
		this.getCouponList()
	},
	methods: {
		// 提交：
		submit() {
			this.$router.replace({
				path: this.$route.query.redirect || '/',
			})
		},
		// 可用的优惠券:
		async getCouponList() {
			let result = await http.coupon.newCoupon()
			if (result.data) {
				http.coupon.covert({ campaignId: result.data }).then((res) => {
					this.receiveList = res.data
				})
			}
		},
	},
}
</script>

<style lang="less" scoped>
@import '@/style/variable.less';

.register-success {
	min-height: 100%;
	padding-bottom: 80px;
	.register-success__main {
		overflow: hidden;
		text-align: center;
		color: @color-222;
		.register-success__title {
			font-size: 24px;
			font-weight: 700;
			margin: 60px 0 10px;
		}
		.register-success__tips {
			line-height: 19px;
			font-size: 16px;
			margin-bottom: 20px;
			font-weight: 500;
		}
		.register-success__desc {
			line-height: 17px;
			font-size: 14px;
		}
		.login-submit-box {
			padding: 0 16px;
		}
		.submit {
			margin-top: 50px;
		}
	}

	.receive-wrap {
		padding: 0 16px;
		.receive-title {
			text-align: center;
			color: #222;
			font-size: 14px;
			line-height: 20px;
			margin-bottom: 10px;
		}
		.coupon-list {
			text-align: left;
			.coupon-item {
				margin-bottom: 20px;
				position: relative;
				padding-top: 15px;
				color: #ff5269;
				.coupon-item-cont {
					background: #fdecec;
					padding: 20px 30px;
				}
				&::before {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 15px;
					background: url('../../assets/images/coupon.png') repeat-x;
				}
				.coupon-tit {
					font-size: 20px;
					font-weight: bold;
					line-height: 24px;
					margin-bottom: 4px;
				}
				.coupon-msg {
					font-size: 14px;
					line-height: 17px;
					height: 17px;
					margin-bottom: 4px;
				}
				.coupon-code {
					font-size: 14px;
					font-weight: 500;
					line-height: 17px;
					margin-bottom: 16px;
				}
				.coupon-gray {
					color: #666;
					font-size: 12px;
					margin-bottom: 4px;
					&:last-child {
						margin-bottom: 0;
					}
				}
			}
		}
	}
}
</style>
