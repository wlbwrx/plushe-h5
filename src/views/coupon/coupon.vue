<template>
	<div class="coupon header-title">
		<van-tabs v-model="active">
			<van-tab :title="$t('coupon.Available')" :name="1"></van-tab>
			<van-tab :title="$t('coupon.NotAvailable')" :name="2"></van-tab>
		</van-tabs>
		<!-- <van-form validate-first @submit="ApplyClick('tap')">
			<div class="coupon-available" v-show="active === 1">
				<h2 class="coupon-available-tips">Only one coupon can be used per order</h2>
				<template v-if="!hideApply">
					<div class="coupon-available-apply" v-show="param.couponStatus === 0">
						<van-field maxlength="8" :rules="[{ pattern: couponCodeValidator, message: 'please enter a valid couponCode' }]" v-model="couponCode" placeholder="Apply Coupon" />
						<van-button type="primary" :disabled="couponCode == ''" native-type="submit">{{ isApply ? 'Apply' : 'remove' }}</van-button>
					</div>
				</template>
			</div>
		</van-form> -->

		<van-radio-group v-model="couponCode" @change="selectOldCodeClick">
			<div class="coupon-list" v-for="(item, index) in list" :key="index" :class="{ 'coupon-list-stale': active === 2 }">
				<div class="coupon-list-bj"></div>
				<div class="coupon-list-item">
					<div v-show="active === 1" class="coupon-checkbox">
						<van-radio @click="checkClick(item.couponCode)" :name="item.couponCode" checked-color="#E84646"></van-radio>
					</div>
					<div class="coupon-item">
						<h2 class="coupon-title">{{ creditAmount(item) }}</h2>
						<div class="coupon-content" v-if="item.couponType == 4">{{ $t('coupon.ForOrdersOver4', { num: item.thresholdNumber }) }}</div>
						<div class="coupon-content" v-else>{{ $t('coupon.ForOrdersOver', { num: filterPriceMethod(item.thresholdAmount) }) }}</div>
						<div class="coupon-content">{{ item.couponCode }}</div>
						<div class="coupon-data">
							<span>{{ creditDays(item, 'cop') }}</span>
							<div class="coupon-showAll">
								<span class="autoprefixer-one-clamp" :class="{ 'show-all': !item.switchOn }">{{ item.comment }}</span>
								<i v-show="item.comment.length > commentLength" class="icon" @click="toggleClick(item.couponId)" :class="{ 'icon-zhankai': !!item.switchOn, 'icon-plus-arrow-up': !item.switchOn }"></i>
							</div>
						</div>
					</div>
				</div>
			</div>
		</van-radio-group>
		<div class="not-found" v-show="list.length === 0">
			<van-empty class="custom-image" :image="emptyImg" :description="$t('coupon.NoCouponsAvailable')" />
		</div>
		<!-- <div class="submit-order-box">
			<van-button class="submit-order" type="primary" >SUBMIT CODE</van-button>
		</div> -->
	</div>
</template>
<script>
// orderList
import { Toast } from 'vant'
import { mapActions, mapState, mapMutations } from 'vuex'
// import { getToken } from '@/utils/auth.js'

import store from 'store'
export default {
	watch: {
		active(val) {
			if (val === 1) {
				this.list = this.orderList.availableCoupons.map((item) => {
					item['switchOn'] = true
					return item
				})
			} else {
				this.list = this.orderList.notAvailableCoupons.map((item) => {
					item['switchOn'] = true
					return item
				})
			}
		},
	},
	components: {},
	created() {},
	activated() {
		console.log(this.$route.query)
		this.active = this.$route.query.choose || 1
		this.couponCode = this.$route.query.couponCode || ''
		// if (this.couponCode) this.isApply = false // 默认有数据
		this.ApplyClick()
	},
	data() {
		// let couponCode = this.orderParams.couponCode
		return {
			active: 1,
			orderList: {},
			isApply: true,
			list: [],
			checked: false,
			couponCode: '',
			couponCodeValidator: /^\w+$/,
			emptyImg: require('@/assets/images/Coupon_404.png'),
			param: {
				pageNum: 1,
				pageSize: 10,
				couponStatus: 0, //0-待使用|1-锁定|2-已使用|3-可复用
			},
		}
	},
	computed: {
		...mapState('shopCar', {
			orderParams: (state) => state.orderParams,
		}),
		hideApply() {
			return this.$route.query.choose
		},
		commentLength() {
			return this.platformId == 3 ? 29 : 25
		},
	},
	methods: {
		...mapActions('coupon', ['ORDER_CONFIG']),
		...mapMutations('shopCar', ['setOrderParams', 'setCheckOrderDetail']),
		toggleClick(couponId) {
			this.list = this.list.map((item) => {
				if (couponId == item.couponId) {
					item.switchOn = !item.switchOn
				}
				return item
			})
		},
		selectOldCodeClick() {
			let isFlag = false
			if (this.list) {
				isFlag = this.list.some((item) => {
					return item.couponCode == this.couponCode
				})
			}
			if (!isFlag && this.couponCode !== '') {
				this.oldCouponCode = this.couponCode
			}
		},
		checkClick(couponCode) {
			const { couponCode: oldCouponCode } = this.orderParams
			console.log('couponCode', couponCode, oldCouponCode === couponCode)
			if (oldCouponCode === couponCode) {
				couponCode = ''
			}
			this.setOrderParams({
				...this.orderParams,
				couponCode,
			})
			this.$router.go(-1)
			// if (couponCode === this.oldCouponCode) {
			// 	this.couponCode = ''
			// 	this.oldCouponCode = ''
			// 	this.isApply = true
			// } else {
			// 	this.isApply = true
			// 	this.oldCouponCode = couponCode
			// }
		},
		ApplyClick(def) {
			this.ORDER_CONFIG(this.orderParams)
				.then((res) => {
					store.set('couponCode', this.couponCode)
					// store.set('guestOrder', param)
					this.orderList = res.data || {}
					this.orderList.availableCoupons = this.orderList.availableCoupons || []
					this.list = this.orderList.availableCoupons.map((item) => {
						item['switchOn'] = true
						return item
					})
					if (!def) return
					if (this.isApply) {
						this.$router.go(-1)
						// this.$router.push({ name: getToken() ? 'orderConfirm' : 'orderConfirmVisitor', query: { isRefresh: 'no', ...param } })
					} else {
						this.isApply = true
					}
				})
				.catch((err) => {
					let { shortCode, msg } = err

					if (shortCode === '001' || shortCode === '002' || shortCode === '004') {
						Toast.fail(msg)
						setTimeout(() => {
							this.$router.push({ name: 'shoppingCar' })
						}, 3000)
					} else if (shortCode === '003' || shortCode === '005') {
						Toast.fail(msg)
						setTimeout(() => {
							if (shortCode === '003') {
								let couponCode = store.get('couponCode')
								if (couponCode) store.remove('couponCode')
								this.couponCode = ''
							}
							this.reload()
						}, 1500)
					}
					//   001,
					//   002,004 返回购物车

					//   003 005 在当前页面 刷新
				})
		},
	},
}
</script>
<style lang="less" scoped>
@import '@/style/modules/coupon.less';
.coupon {
	min-height: 100%;
	background: #fff;
	/deep/ .custom-image .van-empty__image {
		width: 116px;
		height: 98px;
		margin-top: 20px;
	}
	/deep/ .van-tabs__line {
		background: #222;
	}
}
</style>
