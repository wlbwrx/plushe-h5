<template>
	<div class="coupon">
		<nav-bar :title="$t('MyCoupons')" border></nav-bar>
		<van-tabs class="coupon-tabs" v-model="param.couponStatus" @change="GET_USERCOUPON(param)">
			<van-tab :title="$t('coupon.unusedCoupons')" :name="0"></van-tab>
			<van-tab :title="$t('coupon.expiredCoupons')" :name="3"></van-tab>
		</van-tabs>
		<div v-if="couponList.length > 0">
			<div class="coupon-list" v-for="(item, index) in couponList" :key="index" :class="{ 'coupon-list-stale': param.couponStatus === 3 }">
				<div class="coupon-list-bj"></div>
				<div class="coupon-list-item">
					<div class="coupon-item">
						<h2 class="coupon-title">{{ creditAmount(item) }}</h2>
						<div class="coupon-content" v-if="item.couponType == 4">{{ $t('coupon.ForOrdersOver4', { num: item.thresholdNumber }) }}</div>
						<div class="coupon-content" v-else>{{ $t('login.hint13', { thresholdAmount: filterPriceMethod(item.thresholdAmount) }) }}</div>
						<div class="coupon-content">{{ item.couponCode }}</div>
						<div class="coupon-data">
							<span>{{ creditDays(item, 'cop') }}</span>
							<div class="coupon-showAll">
								<span class="autoprefixer-one-clamp" :class="{ 'show-all': !!item.switchOn }">{{ item.comment }}</span>
								<i v-show="item.comment.length > commentLength" class="icon" @click="toggleClick(item.couponId)" :class="{ 'icon-zhankai': !item.switchOn, 'icon-plus-arrow-up': !!item.switchOn }"></i>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="not-found" v-else>
			<van-empty class="custom-image" :image="emptyImg" :description="param.couponStatus === 3 ? $t('coupon.noCoupons') : $t('coupon.NoCouponsAvailable')" />
		</div>
	</div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import NavBar from '@/components/navbar/index.vue'

export default {
	computed: {
		...mapState('coupon', ['couponList']),
		commentLength() {
			return this.platformId == 3 ? 29 : 25
		},
	},
	components: {
		NavBar,
	},
	created() {
		this.GET_USERCOUPON(this.param)
	},
	data() {
		return {
			checked: false,
			campaignId: 0,
			emptyImg: require('@/assets/images/Coupon_404.png'),
			param: {
				pageNum: 1,
				pageSize: 10,
				couponStatus: 0, //0  3-待使用|   |3-可复用    0待使用|1-锁定|2-已使用|3过期   0-待使用|1-锁定|2-已使用|3-过期
			},
		}
	},
	methods: {
		...mapActions('coupon', ['GET_USERCOUPON', 'CONVERTCOUPON']),
		...mapMutations('coupon', ['SET_COUPON']),
		toggleClick(couponId) {
			let couponList = this.couponList.map((item) => {
				if (couponId == item.couponId) {
					item.switchOn = !item.switchOn
				}
				return item
			})
			this.SET_COUPON(couponList)
		},
		ApplyClick() {
			let { campaignId } = this
			this.CONVERTCOUPON({ campaignId })
		},
	},
}
</script>
<style lang="less" scoped>
@import '@/style/modules/coupon.less';
@import '@/style/variable.less';

.coupon {
	padding: 50px 0 20px 0;
	.coupon-tabs {
		position: fixed;
		top: 46px;
		left: 50%;
		width: 100%;
		transform: translateX(-50%);
		max-width: 375px;
		background: @color-bg;
		box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
	}
	/deep/ .custom-image .van-empty__image {
		width: 116px;
		height: 98px;
		margin-top: 20px;
	}
}
</style>
