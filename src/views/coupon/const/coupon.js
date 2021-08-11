import { mapState, mapActions } from 'vuex'
export default {
	computed: {
		...mapState('coupon', ['couponList']),
	},
	created() {
		this.GET_USERCOUPON(this.param)
	},
	data() {
		return {
			switchOn: true,
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
		ApplyClick() {
			let { campaignId } = this
			this.CONVERTCOUPON({ campaignId })
		},
	},
}
