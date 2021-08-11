<template>
	<div class="car-footer">
		<div class="car-footer__wrap" v-if="fixed">
			<div class="car-footer__cont">
				<van-checkbox :value="isAllChecked" shape="square" checked-color="#E81027" @click="selectAll">{{ $t('cart.all') }}</van-checkbox>
				<div class="car-footer__total">
					<p class="car-footer__tit">{{ $t('cart.total') }}:</p>
					<p class="car-footer__count taxes_text">{{ filterPriceMethod(totalPrice) }}</p>
				</div>
			</div>
			<p class="cf__free-tips" v-if="isFree">{{ $t('cart.eligibleforFreeExpressShipping', { name: 'Standard' }) }}</p>
			<div class="car-footer__btns">
				<div class="car-footer__btn cf-checkout" :class="{ disabled: effectiveTotalNum == 0 }" @click="goCheckout">
					{{ $t('cart.checkout') }}<span v-if="effectiveTotalNum"> ({{ effectiveTotalNum }})</span>
				</div>
				<div class="car-footer__btn cf-paypal" v-if="platformId == 1" :class="{ disabled: effectiveTotalNum == 0 }" @click="goPayPal">
					<img src="@/assets/images/icons/paypal-btn.png" alt="" />
				</div>
			</div>
		</div>
		<div class="car-footer__btns">
			<p class="cf__free-tips" v-if="isFree">{{ $t('cart.eligibleforFreeExpressShipping', { name: 'Standard' }) }}</p>
			<div class="car-footer__btn cf-checkout" :class="{ disabled: effectiveTotalNum == 0 }" @click="goCheckout">
				{{ $t('cart.checkout') }}<span v-if="effectiveTotalNum"> ({{ effectiveTotalNum }})</span>
			</div>
			<div class="car-footer__btn cf-paypal" v-if="platformId == 1" :class="{ disabled: effectiveTotalNum == 0 }" @click="goPayPal">
				<img src="@/assets/images/icons/paypal-btn.png" alt="" />
			</div>
		</div>

		<van-popup v-model="showChooseMethod" position="bottom">
			<div class="choose-wrap">
				<h3>
					{{ $t('cart.PlaceAnOrder') }}
					<i class="icon icon-guanbi" @click="showChooseMethod = false"></i>
				</h3>
				<div class="choose-btn register-btn" @click="goRegister">{{ $t('cart.singIn') }}</div>
				<div class="choose-btn" :class="{ disabled: skuNos.lengt == 0 }" @click="goCheckoutGuset">{{ $t('cart.guestCheckout') }}</div>
			</div>
		</van-popup>
		<!-- <div class="car-footer__change" v-else>
				<van-button class="car-footer__change-move" :disabled="skuNos.length == 0" @click="addWish">{{$t('cart.movetoWishlist')}}</van-button>
				<van-button class="car-footer__change-delete" :disabled="skuNos.length == 0" @click="clickDelete">{{$t('delete')}}</van-button>
			</div> -->
	</div>
</template>
<script>
import store from 'store'
import { Toast } from 'vant'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
	inject: ['reload'],
	props: {
		fixed: {
			type: Boolean,
		},
		// 是否免邮费
		isFree: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			showChooseMethod: false,
		}
	},
	components: {},
	created() {},
	mounted() {},
	activated() {
		this.showChooseMethod = false
		console.log('???')
	},
	computed: {
		...mapState('shopCar', {
			carList: (state) => state.carList,
			isAllChecked: (state) => state.isAllChecked,
			isEdit: (state) => state.isEdit,
			totalPrice: (state) => state.totalPrice,
			orderParams: (state) => state.orderParams,
		}),
		...mapGetters({
			effectiveTotalNum: 'shopCar/effectiveTotalNum',
			skuNos: 'shopCar/skuNos', // 选中的商品id
			shopsId: 'shopsId', // 当前店铺id，0为平台
			token: 'token',
		}),
		hideTabbar() {
			return this.$route.query.hideTabbar
		},
	},
	methods: {
		...mapActions('wish', ['addBatchWishList']),
		...mapMutations({
			switchDelete: 'shopCar/switchDelete', // 显示删除框
			setOrderParams: 'shopCar/setOrderParams', // 显示删除框
			setLoginSwipeIndex: 'user/SET_LOGINSWIPEINDEX',
		}),
		...mapActions('shopCar', {
			selectAll: 'selectAll', // 是否全选
			checkout: 'checkout', // 结账台
			getPublicKeyByChannelId: 'getPublicKeyByChannelId', // 获取支付通道公钥
		}),
		...mapMutations('address', ['SET_shippingAddress', 'SET_billingAddress']),
		...mapMutations('app', ['SET_payPalOnly']),
		addWish() {
			if (this.token) {
				let wishList = []
				this.carList.map((item) => {
					if (item.check) {
						let { userId, platformId, productNo } = item
						let pro = { userId, platformId, productNo }
						wishList.push(pro)
					}
				})
				this.addBatchWishList({ wishList }).then(() => {
					this.reportGtag('add_to_wishlist', this.reportData())
					// this.reportGtag('add_to_wishlist', this.reportData('GA4'), 'GA4')
					this.reportFB('AddToWishlist', this.reportData('fb'))

					Toast.success({
						duration: 3000,
						message: this.$t('cart.moved'),
					})
				})
			} else {
				this.setLoginSwipeIndex(1)
				this.$router.push({
					path: '/login',
					query: {
						redirect: `/shopping_car`,
					},
				})
			}
		},
		// 点击删除按钮：
		clickDelete() {
			this.switchDelete()
		},
		// 游客结算:
		goCheckoutGuset() {
			if (this.effectiveTotalNum == 0) return
			this.SET_payPalOnly(false)
			this.showChooseMethod = false
			this.setOrderParams({ ...this.orderParams, shippingMethod: undefined })
			this.$router.push({
				path: '/orderConfirm',
			})
			this.reportGtag('begin_checkout', this.reportData())
			this.reportGtag('begin_checkout', this.reportData('GA4'), 'GA4')
			this.reportFB('InitiateCheckout', this.reportData('fb'))
		},
		// 点击paypal
		goPayPal() {
			if (this.effectiveTotalNum <= 0) return
			this.getPublicKeyByChannelId().then((res) => {
				this.SET_payPalOnly(true)
				let authCode = res.data,
					return_url = `${process.env.NODE_ENV === 'production' ? location.origin : 'https://sit.m.plushe.com'}/${this.token ? 'shippingAddress' : 'orderConfirm'}`, // 回调地址会携带 code, 与后端交互,得到paypal里的一些地址信息(本地测试请将ip 给后台,localhost不支持.)
					scope = 'openid profile email address https://uri.paypal.com/services/paypalattributes' // 'openid profile email address'
				window.location.href = encodeURI(`${process.env.VUE_APP_PAYPALURL}/connect?flowEntry=static&client_id=${authCode}&response_type=code&scope=${scope}&redirect_uri=${return_url}`)
			})
		},
		// 点击结算按钮：
		goCheckout() {
			if (!this.token) {
				// this.showChooseMethod = true
				this.goCheckoutGuset()
				return
			}
			if (this.effectiveTotalNum <= 0) return
			let payBack = store.get('payBack')
			if (payBack) store.remove('payBack')
			this.SET_payPalOnly(false)

			// 写已登录逻辑：
			this.checkout()
				.then(() => {
					this.setOrderParams({ ...this.orderParams, shippingMethod: undefined })
					this.SET_shippingAddress({})
					this.SET_billingAddress({})
					this.reportGtag('begin_checkout', this.reportData())
					this.reportGtag('begin_checkout', this.reportData('GA4'), 'GA4')
					this.reportFB('InitiateCheckout', this.reportData('fb'))
					this.$router.push({
						path: '/orderConfirm',
					})
				})
				.catch((err) => {
					Toast.fail({
						duration: 3000,
						message: err.msg,
					})
					setTimeout(() => {
						this.reload()
					}, 3000)
				})
		},
		// 上报的数据：
		reportData(type) {
			let items = [],
				obj = {
					currentcy: 'USD',
					value: this.totalPrice / 100,
				}
			this.carList.forEach((item) => {
				if (item.check) {
					if (type == 'GA4') {
						// 新版GA
						items.push({
							item_id: item.skuNo,
							item_name: item.productName,
							quantity: item.num,
							promotion_name: '常规',
							item_brand: item.brandName,
							price: (item.discountPrice || item.price) / 100,
						})
					} else {
						items.push({
							id: item.skuNo,
							name: item.productName,
							brand: item.brandName,
							price: (item.discountPrice || item.price) / 100,
							quantity: item.num,
							skuNo: item.skuNo,
						})
					}
				}
			})
			if (type == 'fb') {
				// fb 使用 spu
				obj.content_type = 'product_group'
				obj.num_items = this.effectiveTotalNum
				items = items.map((item) => {
					item.id = item.productNo
					return item
				})
				obj.contents = items
			} else {
				obj.items = items
			}
			return obj
		},
		// 前往注册:
		goRegister() {
			this.showChooseMethod = false
			this.setLoginSwipeIndex(1)
			this.$router.push({
				path: '/login',
				query: {
					redirect: '/shopping_car',
				},
			})
		},
	},
}
</script>
<style scoped lang="less">
@import '@/style/variable.less';

.car-footer {
	background: @color-FFF;
	padding: 20px 16px;
	box-shadow: inset 0 1px 0 0 #f5f5f5;

	.car-footer__wrap {
		box-shadow: inset 0 1px 0 0 #f5f5f5;
		background: @color-FFF;
		padding: 20px 16px;
		position: fixed;
		z-index: 1;
		bottom: 0;
		left: 50%;
		width: 100%;
		transform: translateX(-50%);
		max-width: 375px;
		.car-footer__btns {
			display: flex;
			align-items: center;
			.car-footer__btn {
				flex: 1;
			}
			.car-footer__btn.cf-paypal {
				height: 40px;
				margin-left: 5px;
			}
		}
	}

	.car-footer__cont {
		display: flex;
		align-items: center;
		justify-content: space-between;
		line-height: 20px;
		height: 20px;
		.van-checkbox {
			font-size: 14px;
			/deep/ .van-checkbox__icon {
				height: 20px;
			}
			/deep/ .van-icon {
				font-size: 16px;
			}
		}
		.car-footer__total {
			color: @color-222;
			font-size: 16px;
			display: flex;
			.car-footer__tit {
				font-size: 14px;
				color: @color-666;
			}
			.car-footer__count {
				font-weight: 700;
			}
		}

		.car-footer__change {
			font-size: 14px;
			color: @color-222;
			.van-button {
				border: none;
				padding: 0;
			}
			.car-footer__change-delete {
				color: @color-red;
				margin-left: 20px;
			}
		}
	}
	.car-footer__btns {
		.car-footer__btn {
			text-align: center;
			font-size: 14px;
			border-radius: 3px;
			&.cf-checkout {
				height: 40px;
				margin-top: 14px;
				line-height: 40px;
				background: @color-222;
				color: #fff;
				margin-bottom: 14px;
			}
			&.cf-paypal {
				height: 34px;
				font-size: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				background: #f5c657;
				> img {
					height: 34px;
				}
			}
			&.disabled.cf-checkout {
				background: #cccccc;
			}
			&.disabled.cf-paypal {
				background: #cccccc;
			}
		}
	}
	.cf__free-tips {
		width: 100%;
		color: #2fc083;
		font-size: 12px;
		text-align: right;
		// &.tips--left {
		// 	text-align: right;
		// }
	}
	.choose-wrap {
		padding: 16px 16px 26px 16px;
		text-align: center;
		color: #222;
		h3 {
			font-size: 14px;
			font-weight: 500;
			margin-bottom: 16px;
			position: relative;
			.icon-guanbi {
				position: absolute;
				right: 0;
				top: -3px;
				font-size: 20px;
			}
		}
		.choose-btn {
			height: 40px;
			line-height: 38px;
			border: 1px solid #222;
			border-radius: 3px;
			font-size: 16px;
			&.register-btn {
				background: #222;
				color: #fff;
				margin-bottom: 10px;
			}
		}
	}
}
</style>
