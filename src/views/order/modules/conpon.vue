<template>
	<el-dialog title="" :visible.sync="dialogFormVisible">
		<div class="coupon header-title">
			<van-tabs v-model="active">
				<van-tab title="Available" :name="1"></van-tab>
				<van-tab title="Not Available" :name="2"></van-tab>
			</van-tabs>
			<van-radio-group v-model="couponCode">
				<div class="coupon-list" v-for="(item, index) in list" :key="index" :class="{ 'coupon-list-stale': active === 2 }">
					<div class="coupon-list-bj"></div>
					<div class="coupon-list-item">
						<div v-show="active === 1" class="coupon-checkbox">
							<van-radio @click="checkClick(item.couponCode)" :name="item.couponCode" shape="square"></van-radio>
						</div>
						<div class="coupon-item">
							<h2 class="coupon-title">{{ creditAmount(item) }}</h2>
							<div class="coupon-content">For orders over US${{ (item.thresholdAmount / 100).toFixed(2) }}</div>
							<div class="coupon-content">{{ item.couponCode }}</div>
							<div class="coupon-data">
								<span>{{ creditDays(item, 'cop') }}</span>
								<div class="coupon-showAll">
									<span class="autoprefixer-one-clamp" :class="{ 'show-all': item.switchOn === false }">{{ item.comment }}</span
									><i v-show="item.comment.length > 25" class="icon" @click="toggleClick(item.couponId)" :class="{ 'icon-zhankai': item.switchOn === true, 'icon-plus-arrow-up': item.switchOn === false }"></i>
								</div>
							</div>
						</div>
					</div>
				</div>
			</van-radio-group>
			<div class="not-found" v-show="list.length === 0">
				<van-empty class="custom-image" :image="emptyImg" description="No coupons available" />
			</div>
		</div>
	</el-dialog>
</template>
<script>
import { mapActions } from 'vuex'
export default {
	props: ['shippingmethod', 'couponcode'],
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
	created() {
		this.ApplyClick()
	},
	computed: {
		couponCode() {
			return this.couponcode
		},
		shippingMethod() {
			return this.shippingmethod
		},
	},
	data() {
		return {
			dialogFormVisible: false,
			active: 1,
			orderList: {},
			isApply: true,
			list: [],
			checked: false,
			emptyImg: require('@/assets/images/Coupon_404.png'),
			param: {
				pageNum: 1,
				pageSize: 10,
				couponStatus: 0, //0-待使用|1-锁定|2-已使用|3-可复用
			},
		}
	},
	methods: {
		...mapActions('coupon', ['ORDER_CONFIG']),
		show(isDrag) {
			this.dialogFormVisible = isDrag
		},
		toggleClick(couponId) {
			this.list = this.list.map((item) => {
				if (couponId == item.couponId) {
					item.switchOn = !item.switchOn
				}
				return item
			})
		},
		checkClick(couponCode) {
			let { shippingMethod } = this
			this.$emit('click-coupon', { couponCode, shippingMethod })
			this.dialogFormVisible = false
		},
		ApplyClick() {
			let param = {}
			if (this.couponCode) param['couponCode'] = this.couponCode
			if (this.shippingMethod) param['shippingMethod'] = this.shippingMethod
			this.ORDER_CONFIG(param).then((res) => {
				this.orderList = res.data
				this.list = this.orderList.availableCoupons.map((item) => {
					item['switchOn'] = true
					return item
				})
			})
		},
	},
}
</script>
<style scoped lang="less">
@import '@/style/modules/coupon.less';
.coupon {
	background: #fff;
	/deep/ .custom-image .van-empty__image {
		width: 116px;
		height: 98px;
		margin-top: 20px;
	}
}
</style>