<template>
	<div class="slide-coupon" v-if="newPeopleCouponVal > 0">
		<img src="@/assets/images/icons/u-close.png" alt="" class="sc__close" @click="toClose" />
		<div class="sc__cont" @click="goLogin">
			<span class="sc-text"> {{ $t('offCoupon', { num: filterPriceMethod(newPeopleCouponVal) }) }} </span>
			<img src="@/assets/images/icons/u-arrow.png" alt="" class="sc__arrow" />
		</div>
	</div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters(['newPeopleCouponVal']),
	},
	methods: {
		...mapMutations('user', ['setSlideCoupon', 'SET_LOGINSWIPEINDEX']),
		goLogin() {
			this.SET_LOGINSWIPEINDEX(1)
			this.$router.push({
				path: '/login',
				query: {
					redirect: this.$route.fullPath,
				},
			})
		},
		toClose() {
			this.setSlideCoupon(1)
		},
	},
}
</script>

<style lang="less" scoped>
.slide-coupon {
	position: fixed;
	right: 0;
	top: 50%;
	z-index: 10;
	transform: translateY(-50%) rotate(-90deg);
	transform-origin: right bottom;
	height: 35px;
	background: rgba(34, 34, 34, 0.7);
	color: #fff;
	padding: 0 12px;
	display: flex;
	margin-top: -100px;
	align-items: center;
	.sc__close {
		width: 13px;
	}
	.sc__cont {
		display: flex;
		align-items: center;
		font-size: 13px;
		.sc-text {
			margin: 0 10px;
		}
		.sc__arrow {
			width: 13px;
		}
	}
}
</style>
