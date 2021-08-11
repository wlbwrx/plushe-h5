<template>
	<!-- 加购成功弹框 -->
	<van-popup class="cart-popup" v-model="cartPopup" position="top">
		<div class="cart-popup-wrap">
			<i class="close-icon icon icon-guanbi" @click="cartPopup = false"></i>
			<h3 class="cart-popup-tit">{{ $t('cart.itemsAdded') }}</h3>
			<div class="cart-popup-cont">
				<img class="img" :src="$utils.imageHandler(0, goodsInfo.defaultPicKey)" />
				<div class="title-box">
					<p class="title">{{ goodsInfo.productName }}</p>
					<div :class="['goods_price', { 'have-discount': goodsInfo.discountPrice && goodsInfo.price > goodsInfo.discountPrice }]">
						{{ filterPriceMethod(goodsInfo.discountPrice || goodsInfo.price) }}
						<span class="goods_old-price" v-if="goodsInfo.discountPrice && goodsInfo.price > goodsInfo.discountPrice">{{ filterPriceMethod(goodsInfo.price) }}</span>
					</div>
				</div>
				<div class="num">x1</div>
			</div>
			<div class="cart-popup-tip">
				<p class="total">{{ $t('cart.cartTotals') }}: {{ filterPriceMethod(totalPrice) }}</p>
				<p class="postage">
					<span class="postage-check" v-if="lackForFreeExpressAmount == 0">
						<img src="@/assets/images/chenggong@2x.png" class="check-img" />
						<span class="postage-tips">{{ $t('cart.eligibleforFreeExpressShipping', { name: 'Standard' }) }}</span>
					</span>
					<template v-else>
						<p v-html="$t('cart.buyAnOther2', { num: filterPriceMethod(lackForFreeExpressAmount) })"></p>
					</template>
				</p>
				<p class="reduction" v-if="manjianText" v-html="manjianText"></p>
			</div>
			<div class="cart-popup-btn-box">
				<van-button class="cart-popup-btn" @click="cartPopup = false">{{ $t('cart.continueShopping') }}</van-button>
				<van-button class="cart-popup-btn" color="#222" @click="goPage('/shopping_car?hideTabbar=1')">{{ $t('detail.goToCart') }}</van-button>
			</div>
		</div>
	</van-popup>
</template>

<script>
import { mapState } from 'vuex'

export default {
	props: {
		// 商品信息:
		goodsInfo: {
			type: Object,
		},
		// 是否显示
		show: {
			type: Boolean,
			default: false,
		},
	},
	components: {},
	computed: {
		...mapState('shopCar', {
			carList: (state) => state.carList,
			totalPrice: (state) => state.totalPrice,
			lackForFreeExpressAmount: (state) => state.lackForFreeExpressAmount,
			checkOrderDetail: (state) => state.checkOrderDetail,
		}),
		// 弹框
		cartPopup: {
			get() {
				return this.show
			},
			set() {
				this.$emit('update:show', false)
			},
		},
		// 满减轮播文案:
		manjianText() {
			let unmetCoupon = this.checkOrderDetail.unmetCoupon
			if (unmetCoupon && (unmetCoupon.lackAmount || unmetCoupon.couponType == 4)) {
				if (unmetCoupon.couponType == 3 || unmetCoupon.couponType == 4) {
					// 比例
					return this.$t('cart.buyAnOther', { num: this.filterPriceMethod(unmetCoupon.lackAmount), num1: unmetCoupon.discountProbability })
				} else if (unmetCoupon.couponType == 4) {
					// 满件满减
					return this.$t('cart.buyAnOther', { num: unmetCoupon.lackNumber, num1: unmetCoupon.discountProbability })
				} else {
					return this.$t('cart.buyAnOther1', { num: this.filterPriceMethod(unmetCoupon.lackAmount), num1: this.filterPriceMethod(unmetCoupon.fixedAmount) })
				}
			} else {
				return ''
			}
		},
	},
	methods: {
		goPage(path) {
			this.cartPopup = false
			this.$nextTick(() => {
				this.$router.push({
					path: path,
				})
			})
		},
	},
}
</script>

<style scoped lang="less">
@import '@/style/variable.less';
.cart-popup {
	font-weight: 300;
	.close-icon {
		position: absolute;
		right: 12px;
		top: 12px;
		font-size: 20px;
	}
	.cart-popup-tit {
		text-align: left;
		height: 44px;
		line-height: 44px;
		padding-left: 16px;
		color: @color-222;
		font-weight: 500;
		font-size: 16px;
	}
	.cart-popup-cont {
		display: flex;
		padding: 16px;
		border-top: 1px solid #f5f5f5;
		font-size: 14px;
		align-items: start;
		box-shadow: 0px 1px 0px 0px #f5f5f5;
		position: relative;
		.img {
			width: 65px;
			vertical-align: top;
		}
		.num {
			position: absolute;
			bottom: 16px;
			right: 16px;
		}
		.title-box {
			flex: 1;
			margin: 0 16px 0;
			.title {
				line-height: 17px;
			}
		}
		.goods_price {
			margin-top: 16px;
			font-size: 14px;
			color: @color-222;
			font-weight: normal;
			&.have-discount {
				color: @color-promo;
			}
			.goods_old-price {
				color: @color-999;
				text-decoration: line-through;
			}
		}
	}
	.cart-popup-tip {
		padding: 16px;
		font-size: 12px;
		text-align: right;
		line-height: 16px;
		.sc__notice-money {
			color: #ff5269;
		}
		.total {
			font-size: 16px;
			font-weight: normal;
		}
		.postage {
			margin: 10px 0;
			color: #999;
			.postage-check {
				font-size: 0;
				display: flex;
				align-items: center;
				justify-content: flex-end;
			}

			.check-img {
				width: 14px;
				margin-right: 4px;
			}
			/deep/ .sc__notice-money {
				color: @color-promo;
			}
			.postage-tips {
				color: #2fc083;
				font-size: 13px;
			}
		}
		.reduction {
			font-size: 13px;
			color: #999999;
			/deep/ .sc__notice-money {
				color: @color-promo;
			}
		}
	}
	.cart-popup-btn-box {
		display: flex;
		justify-content: space-between;
		font-size: 14px;
		margin-bottom: 8px;
		padding: 0 8px 20px;
		font-weight: normal;
		.cart-popup-btn {
			margin: 0 8px;
			flex: 1;
		}
		.cart-popup-btn:nth-of-type(1) {
			border-color: #7a7a7a;
		}
	}
}
</style>
