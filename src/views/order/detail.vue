<template>
	<div class="order-detail header-title">
		<div class="thank-you" v-if="firstPay && getOrderStatus(orderDetail.orderResp, 10)">
			<i v-if="orderDetail.userResp">
				{{ $t('my.hint8', { userEmail: orderDetail.userResp.userEmail }) }}
			</i>
			<i class="icon icon-guanbi" @click="firstPay = false"></i>
		</div>
		<div class="detail-number">
			<div class="detail-number-p flex">
				<div class="detail-id flex">
					<label>{{ $t('my.order') }} {{ $t('id') }}:</label>
					<span>{{ orderSn }}</span>
				</div>
				<van-button class="copy-btn" v-copy :data-clipboard-text="orderSn">{{ $t('copy') }}</van-button>
			</div>
			<div class="detail-number-p flex">
				<span>{{ $t('my.orderDate') }}: </span>
				<span v-if="orderDetail.orderResp" class="detail-number-date">{{ dealTimeMDY(orderDetail.orderResp.createTime) }}</span>
			</div>
		</div>
		<p class="gao-line"></p>
		<div class="order-detail-list">
			<h2>{{ $t('pay.paymentMethod') }}</h2>
			<div class="order-detail-box">
				<span class="order-detail-paypal">
					<img v-if="payType == 1" src="@/assets/images/icons/paypal.png" />
					<img v-else-if="payType == 4" src="@/assets/images/icons/stripe.png" alt="" />
					<img v-else-if="payType == 5" src="@/assets/images/icons/delivery.png" alt="" />
					<label>{{ getPayTypes[getPaseJSON(orderDetail, 'payType')] }}</label>
				</span>
			</div>
		</div>
		<p class="gao-line"></p>
		<div class="order-detail-list">
			<h2>{{ $t('pay.shippingAddress') }}</h2>
			<AddressShown :addressObj="getAddress(1)" />
			<!-- <div class="order-detail-box border-bottom">
				<div class="order-detail-address">
					<h3 class="flex">
						<label>{{ getAddress('firstName', '1') + ' ' + getAddress('lastName', '1') }}</label>
						<span>{{ getAddress('phoneCode', '1') + ' ' + getAddress('phone', '1') }}</span>
					</h3>
					<p class="order-detail-address-detail autoprefixer">{{ getShippingAddress(orderDetail.orderAddressRespList) }}</p>
				</div>
			</div> -->
		</div>
		<div class="order-detail-list">
			<h2>{{ $t('pay.billingAddress') }}</h2>
			<AddressShown :addressObj="getAddress(2)" />
			<!-- <div class="order-detail-box border-bottom">
				<div class="order-detail-address">
					<h3 class="flex">
						<label>{{ getAddress('firstName', '2') + ' ' + getAddress('lastName', '2') }}</label>
						<span>{{ getAddress('phoneCode', '2') + ' ' + getAddress('phone', '2') }}</span>
					</h3>
					<p class="order-detail-address-detail autoprefixer">{{ getBillAddress(orderDetail.orderAddressRespList) }}</p>
				</div>
			</div> -->
		</div>
		<div class="order-detail-list">
			<h2>{{ $t('pay.shippingMethod') }}</h2>
			<div class="order-detail-box">
				<span class="order-detail-paypal">
					<label>{{ getPaseJSON(orderDetail, 'shippMethodName') || $t('pay.freeShipping') }}</label>
				</span>
			</div>
		</div>
		<p class="gao-line"></p>
		<div class="order-detail-list">
			<i18n path="my.hint5" class="register__desc" tag="h2">
				<template #length
					><em>{{ getProduceLen(orderDetail) }}</em></template
				>
			</i18n>
			<div class="order-detail-box">
				<ul class="order-product">
					<li v-for="(item, index) in orderDetail.orderItemResp" :key="index" class="flex" @click="goGoodsDetail(item)">
						<div class="order-product-img">
							<van-image class="default-image" :src="$utils.imageHandler(0, item.picKey)">
								<template v-slot:loading>
									<img width="100%" height="100%" :src="$utils.platList('goodsDefaultImg', platformId)" alt="" />
								</template>
							</van-image>
						</div>
						<div class="order-product-detail">
							<div class="order-product-list order-product-dec">
								<div class="order-product-brand">
									<!-- <label v-if="item.brand">{{ item.brand }}</label> -->
									<p class="text-hidden-row-2">{{ item.productName }}</p>
								</div>

								<span class="taxes_text">{{ filterPriceMethod(item.payPrice) }}</span>
							</div>
							<div class="order-product-list" v-show="item.attr1">
								<label>{{ item.attr1 }}: {{ item.attrVal1 }}</label>
							</div>
							<div class="order-product-list">
								<label>{{ item.attr2 ? `${item.attr2}:${item.attrVal2}` : '' }}</label>
								<span>X{{ item.productQuantity }}</span>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>

		<div class="order-list border-top">
			<div class="order-price-detail">
				<label>{{ $t('pay.price') }}</label>
				<span class="color-999 taxes_text" style="text-decoration: line-through">{{ filterPriceMethod(getPaseJSON(orderDetail, 'saleAmount')) }}</span>
			</div>
			<div class="order-price-detail">
				<label>{{ $t('pay.subtotal') }}</label>
				<span class="color-red taxes_text">{{ filterPriceMethod(getPaseJSON(orderDetail, 'totalAmount')) }}</span>
			</div>
			<div class="order-price-detail">
				<label>{{ $t('pay.Shippingfee') }}</label>
				<span class="color-222">{{ filterPriceMethod(getPaseJSON(orderDetail, 'freightAmount')) }}</span>
			</div>
			<div class="order-price-detail" v-if="payType == 5">
				<label>{{ $t('pay.codCharge') }}:</label>
				<span class="color-222">{{ filterPriceMethod(getPaseJSON(orderDetail, 'codFeeAmount')) }}</span>
			</div>
			<div class="order-price-detail" v-if="getPaseJSON(orderDetail, 'promotionAmount')">
				<label>{{ $t('cart.promoCodeDiscount') }}</label>
				<span class="color-red">-{{ filterPriceMethod(getPaseJSON(orderDetail, 'promotionAmount')) }}</span>
			</div>
			<div class="order-price-detail" v-if="getPaseJSON(orderDetail, 'couponAmount')">
				<label>{{ $t('cart.couponDiscount') }}</label>
				<span class="color-red">-{{ filterPriceMethod(getPaseJSON(orderDetail, 'couponAmount')) }}</span>
			</div>
			<div class="order-price-detail order-price-total">
				<label>{{ $t(`cart.${payType == 5 ? 'amountPaid' : platformId == 3 ? 'actualAmount' : 'total'}`) }}</label>
				<span class="taxes_text"> {{ filterPriceMethod(getPaseJSON(orderDetail, 'totalPayAmount')) }}</span>
			</div>
		</div>
		<div class="order-list order-list-btn border-top">
			<van-button v-if="getOrderStatus(orderDetail.orderResp, 1)" type="default" class="submit-order" @click="closeReaSOn(orderDetail.orderResp)">
				{{ $t('my.cancelOrder') }}
			</van-button>
			<van-button v-if="getOrderStatus(orderDetail.orderResp, 1)" type="primary" class="submit-order" @click="payFun">
				{{ $t('my.payNow') }}
			</van-button>
			<van-button v-if="getOrderStatus(orderDetail.orderResp, 4)" @click="goReturn">{{ $t('detail.return') }}</van-button>
			<van-button v-if="getOrderStatus(orderDetail.orderResp, 3) && !orderDetail.orderResp.isOverEvaluate" type="default" class="submit-order" @click="review">
				{{ $t('my.review') }}
			</van-button>
			<van-button v-if="getOrderStatus(orderDetail.orderResp, 2)" type="primary" class="submit-order" @click="viewLogistics">
				{{ $t('my.track') }}
			</van-button>
		</div>
		<van-popup v-model="showCloseReason" closeable position="bottom" :style="{ height: '11rem' }">
			<h2 class="popup-title">{{ $t('my.selectReason') }}</h2>
			<van-radio-group class="clsereason" v-model="param.returnReasonId">
				<van-cell-group>
					<van-cell v-for="item in closeReasonList" :key="item.id" arrow-direction="left" clickable>
						<template>
							<van-radio :name="item.id">{{ item.teturnDesc }}</van-radio>
						</template>
					</van-cell>
				</van-cell-group>
			</van-radio-group>
			<!-- 订单状态：
            ALL 4-> 交易关闭、已取消
            unpaid 0->待支付
            processing 1->待发货 6-> 支付处理中                                   
            shipped 2->已发货 3->已收货；5->交易完成 -->
			<van-button class="submit-btn-reason" @click="subCloseReaSon" type="primary">{{ $t('submit') }}</van-button>
		</van-popup>

		<!-- 选择支付方式弹框 -->
		<van-popup v-model="isShowPayType" position="bottom">
			<div class="gao-payType">
				<h3 class="gao-payType-title">{{ $t('my.hint6') }}</h3>
				<i class="icon icon-guanbi" @click="isShowPayType = false"></i>
				<van-radio-group v-model="payType">
					<p class="gao-payType-method" v-for="item in payList" :key="item.value">
						<van-radio :name="item.value"><img :src="item.icon" />{{ item.label }}</van-radio>
					</p>
				</van-radio-group>
				<van-button class="gao-payType-submit" block square color="#222" @click="toCreatePay">{{ $t('my.payNow') }}</van-button>
			</div>
		</van-popup>
		<van-popup v-model="returnPop" position="bottom">
			<div class="gao-return">
				<h3 class="gao-return-title" v-html="$t('my.hint7')"></h3>
				<i class="icon icon-guanbi" @click="returnPop = false"></i>
				<div class="gao-return-cont">
					<span class="gao-return-e">{{ $t('email') }}: </span>
					<span>{{ platformEmail }}</span>
					<span class="gao-return-copy" v-copy :data-clipboard-text="platformEmail" @click="returnPop = false">
						<i>{{ $t('copy') }}</i>
					</span>
				</div>
			</div>
		</van-popup>
	</div>
</template>
<script>
import store from 'store'
import Clipboard from '@/mixins/Clipboard'
import { getPayTypes, payList } from '@/utils/enums'
import { mapState, mapActions, mapMutations } from 'vuex'
import { Toast } from 'vant'
import { loadStripe } from '@stripe/stripe-js'
import AddressShown from '@/components/AddressShown.vue'

export default {
	mixins: [Clipboard],
	beforeRouteEnter(to, from, next) {
		console.log('beforeRouteEnter', to.name, from.name)
		if (to.name === 'orderDetail' || from.name === 'payment') {
			to.meta.goBackUrl = store.get('token') ? 'order' : 'my'
			if (from.name === 'payment') {
				to.query.firstPay = true
			}
		} else {
			to.meta.goBackUrl = ''
		}
		next()
	},
	computed: {
		...mapState('order', ['closeReasonList', 'orderDetail']),
		payList() {
			if (this.platformId == 3) {
				return payList.filter((item) => item.value != 1)
			} else {
				return payList.filter((item) => item.value != 5)
			}
		},
	},
	inject: ['reload'],
	created() {
		let payBack = store.get('payBack')
		if (payBack) store.remove('payBack')
		this.getOrderDetail(this.orderSn).then((res) => {
			// 该笔订单--后台记录的当前支付方式:
			console.log(this.orderDetail, '------------------')
			this.payType = res.orderResp.payType
		})
	},
	components: {
		AddressShown,
	},
	data() {
		let { orderSn, firstPay } = this.$route.query
		return {
			firstPay,
			orderSn,
			getPayTypes,
			showCloseReason: false,
			param: {
				returnReasonId: 0,
				orderSn: '',
				orderId: 0,
			},
			payType: 1, // 支付方式 1:paypal, 4: stripe
			isShowPayType: false, // 是否显示支付方式选着弹框
			returnPop: false,
		}
	},
	methods: {
		...mapActions('order', ['getOrderDetail', 'queryGetOrderDetail', 'getCloseReason', 'setCloseReason']),
		...mapActions('pay', ['createPayment']),
		...mapMutations('pay', ['setPayInfo']),
		getProduceLen(orderDetail) {
			let { orderItemResp } = orderDetail
			if (orderItemResp) {
				let len = orderItemResp.reduce((pre, cur) => {
					return pre + cur.productQuantity
				}, 0)
				return len
			}
			return 0
		},
		getDiscountAmount(orderResp) {
			let { promotionAmountYuan, integrationAmountYuan, couponAmountYuan, discountAmountYuan } = orderResp || {}
			return promotionAmountYuan + integrationAmountYuan + couponAmountYuan + discountAmountYuan
		},
		getShippingAddress(orderAddressRespList) {
			let address = orderAddressRespList.filter((item) => item.addressType === '1')
			let { detailAddressone, detailAddresstwo, city, state, country, postCode } = address[0] || {}
			return detailAddressone + ' ' + detailAddresstwo + ' ' + city + ' ' + state + ' ' + country + ' ' + postCode
		},
		getBillAddress(orderAddressRespList) {
			let address = orderAddressRespList.filter((item) => item.addressType === '2')
			let { detailAddressone, detailAddresstwo, city, state, country, postCode } = address[0] || {}
			return detailAddressone + ' ' + detailAddresstwo + ' ' + city + ' ' + state + ' ' + country + ' ' + postCode
		},
		// 获取对应的地址信息:
		getAddress(type, key) {
			let address = this.orderDetail.orderAddressRespList ? this.orderDetail.orderAddressRespList.find((item) => item.addressType == type) : {}
			return key ? address[key] : address
		},
		subCloseReaSon() {
			if (this.param.returnReasonId === 0) {
				Toast.fail(this.$t('my.selectReason'))
				return
			}
			this.setCloseReason(this.param).then(() => {
				this.$router.replace({ name: 'order' })
			})
		},
		closeReaSOn(orderResp) {
			// this.param.orderSn = orderStatus.orderSn
			//     this.param.orderId = orderStatus.id
			this.param.orderSn = orderResp.orderSn
			this.param.orderId = orderResp.id
			this.showCloseReason = true
			this.getCloseReason(2)
		},
		getPaseJSON(orderDetail, param) {
			let { orderResp } = orderDetail
			return orderResp ? orderResp[param] : ''
		},
		getOrderStatus(orderResp, type) {
			let { orderStatus } = orderResp || {}
			if (type === 1) {
				return orderStatus === 0
			} else if (type === 2) {
				console.log(777777, orderStatus)
				return orderStatus === 2 || orderStatus === 3
			} else if (type === 3) {
				return orderStatus === 3 || orderStatus === 5
			} else if (type == 4) {
				return orderStatus === 2 || orderStatus == 3 || orderStatus == 5
			} else if (type == 9) {
				return orderStatus == 1
			} else if (type == 10) {
				return orderStatus == 5 || orderStatus == 1
			}
			//    return false
		},
		review() {
			let { orderSn } = this.orderDetail.orderResp
			this.$router.push({ name: 'orderReview', query: { orderSn } })
		},
		viewLogistics() {
			let { orderResp, orderLogisticsRespList } = this.orderDetail
			if (orderLogisticsRespList && orderLogisticsRespList.length > 1) {
				this.$router.push({ name: 'logistics', query: { orderSn: orderResp.orderSn } })
			} else {
				let [{ deliveryCompany, deliverySn, orderId, orderSn, shopsId }] = orderLogisticsRespList || []
				this.$router.push({ name: 'logisticsDetail', query: { deliveryCompany, deliverySn, orderId, orderSn, shopsId } })
			}
		},
		async payFun() {
			let { orderSn } = this.orderDetail.orderResp
			let { data } = await this.queryGetOrderDetail(orderSn)
			if (data.orderResp.orderStatus !== 0) {
				Toast.fail(this.$t('pay.changed'))
				setTimeout(() => {
					this.reload()
				}, 1500)
				return
			}
			this.isShowPayType = true
		},
		// 弹框里的 pay now 支付按钮:
		toCreatePay() {
			let { shopsId, orderSn } = this.orderDetail.orderResp
			let payType = this.payType
			this.createPayment({ shopsId, orderChannel: payType, orderSn })
				.then((res) => {
					this.setPayInfo(res.data)
					// 创建支付失败:
					if (res.data.paymentStatus == 5) {
						if (res.data.thirdErrorDesc) Toast.fail(res.data.thirdErrorDesc)
						setTimeout(() => {
							this.reload()
						}, 1500)
						return
					}

					try {
						// 数据上报,检查缓存中是否有该订单对应的商品信息缓存:
						let reportOrderGoods = store.get('reportOrderGoods') || []
						let isHaveOrderInfoStore = reportOrderGoods.some((item) => item.transaction_id == orderSn)
						if (!isHaveOrderInfoStore) {
							// 没有该笔订单对应的商品缓存,
							let reportItems = []
							this.orderDetail.orderItemResp.forEach((item) => {
								reportItems.push({
									id: item.skuNo,
									brand: item.brand,
									name: item.productName,
									price: item.productPriceYuan,
									quantity: item.productQuantity,
								})
							})
							let reportData = {
								coupon: this.orderDetail.orderResp.couponAmountYuan || undefined,
								promotionCode: this.orderDetail.orderResp.couponCode || undefined,
								currency: 'USD',
								checkout_option: (payType == 1 && 'ppaypal') || (payType == 2 && 'visa') || (payType == 3 && 'master') || (payType == 4 && 'stripe'),
								checkout_step: 1,
								value: this.orderDetail.orderResp.totalPayAmountYuan,
								shipping: this.orderDetail.orderResp.freightAmountYuan, // 运费
								tax: this.orderDetail.orderResp.taxAmountYuan, // 税费
								transaction_id: orderSn, // 订单编号
								items: reportItems,
							}
							reportOrderGoods.push(reportData)
							store.set('reportOrderGoods', reportOrderGoods) // 将数据缓存起来，结算完成后将对应的存入删除
						}
					} catch (err) {
						console.log(err)
					}
					// 4: Stripe 支付, 1: paypel 支付,
					if (payType == 4) {
						loadStripe(res.data.thirdClientKey).then((stripe) => {
							stripe.redirectToCheckout({ sessionId: res.data.paymentRespSn })
						})
					} else {
						window.location.href = res.data.thirdPaymentUrl
					}
				})
				.catch((err) => {
					let { msg } = err
					Toast.fail(msg)
					setTimeout(() => {
						this.reload()
					}, 1500)
				})
		},
		// 前往商品详情:
		goGoodsDetail(item) {
			this.$store.commit('ssr/setGoodsDetail', { picKey: item.picKey })
			this.$router.push({
				path: `/product/${item.productName || item.name}-${item.productNo}`,
			})
		},
		goReturn() {
			this.returnPop = true
		},
		dealTimeMDY(val) {
			const index = val.indexOf('.')
			val = val.substring(0, index) + val.substring(index + 4, val.length)
			val = val.replace(/-/g, '/')
			let date = new Date(val),
				m = date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1),
				d = date.getDate() > 10 ? date.getDate() : '0' + date.getDate(),
				mm = date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes()
			if (this.platformId == 3) {
				return date.getFullYear() + '/' + m + '/' + d + ' ' + date.getHours() + ':' + mm
			}
			return m + '/' + d + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + mm
		},
	},
}
</script>
<style lang="less" scoped>
@import '@/style/modules/order.less';
.order-detail {
	margin-top: 0 !important;
}
.thank-you {
	display: flex;
	align-items: center;
	padding: 10px 16px;
	background: #d2e1f8;
	line-height: 17px;
	font-size: 14px;
	color: #222d65;
	.icon-guanbi {
		font-size: 26px;
	}
}
.gao-line {
	height: 10px;
	background: #f6f6f6;
}
.popup-title {
	font-size: 16px;
	color: #666;
	height: 44px;
	line-height: 44px;
	text-align: center;
}
.detail-number {
	margin-top: 1px;
	border-top: 1px solid #f5f5f5;
	background: #fff;
	padding: 20px 16px;
	.detail-number-p {
		justify-content: space-between;
		align-items: center;
		margin-bottom: 12px;
		&:last-child {
			margin-bottom: 0;
		}
		.detail-number-date {
			color: #666;
		}
	}
	.detail-id {
		font-size: 14px;
		span {
			margin-left: 5px;
		}
	}
	.copy-btn {
		height: 25px;
		font-size: 14px;
		padding: 0 8px;
		border-radius: 4px;
		border-color: #222;
	}
}
.order-detail {
	background: #fff;
	margin-top: 40px;
}
.order-detail-list {
	padding: 0 16px;
	margin-bottom: 10px;
	h2 {
		font-size: 14px;
		font-weight: 700;
		color: #222;
		padding-top: 16px;
		em {
			font-size: 14px;
			font-weight: normal;
		}
	}
	.order-detail-box {
		margin-top: 12px;
		padding-bottom: 15px;
	}
	/deep/ .address-list {
		padding: 0;
		padding-bottom: 15px;
		margin-top: 12px;
		border-bottom: 1px solid #f5f5f5;
		font-size: 12px;
		.icon-fanhui-copy {
			display: none;
		}
	}
}
.order-detail-paypal {
	display: block;
	// padding-bottom: 24px;
	img {
		max-height: 18px;
		margin-right: 6px;
	}
}
.order-detail-address {
	h3 {
		line-height: 20px;
		padding-bottom: 8px;
		label {
			font-size: 14px;
		}
		span {
			font-size: 12px;
			margin-left: 20px;
			color: #666;
		}
	}
	.order-detail-address-detail {
		font-size: 12px;
		line-height: 17px;
	}
}
.margin-top-24 {
	margin-top: 24px;
}
.order-title {
	font-size: 14px;
	margin-bottom: 10px;
}
.border-bottom {
	border-bottom: 1px solid #f5f5f5;
}
.order-product {
	font-size: 14px;
	color: #999;
	li {
		padding-bottom: 28px;
		&:last-child {
			padding-bottom: 0;
		}
	}
	.order-product-img {
		width: 69px;
		height: 104px;
		flex-shrink: 0;
	}
	.order-product-detail {
		width: 100%;
		margin-left: 12px;
	}
	.order-product-list {
		display: flex;
		justify-content: space-between;
		font-size: 12px;
		.order-product-brand {
			width: 180px;
		}
		label {
			margin-right: 20px;
		}
		span {
			color: #666;
			font-size: 13px;
		}
	}
	.order-product-dec {
		height: 34px;
		margin-bottom: 20px;
		label {
			font-size: 16px;
			color: #222;
		}
		span {
			color: #222;
			font-size: 13px;
		}
	}
}
.order-list-btn {
	display: flex;
	justify-content: space-between;
	margin-bottom: 0px;
	/deep/ .van-button--default {
		margin-right: 10px;
	}
	/deep/ .van-button--primary {
		margin-left: 10px;
	}
	.van-button {
		border-color: #222;
		border-radius: 4px;
		flex: 1;
	}
}
.clsereason {
	height: 300px;
	overflow: auto;
}
.order-product-brand {
	color: #222;
}
.popup-title {
	font-size: 16px;
	color: #666;
	height: 44px;
	line-height: 44px;
	text-align: center;
}
.submit-btn-reason {
	margin: 16px 16px 0;
	width: calc(100% - 32px);
}
.order-list {
	margin-bottom: 0;
	.order-price-detail {
		color: #222;
		line-height: 17px;
		font-size: 14px;
		margin-bottom: 14px;
		&:last-child {
			margin-bottom: 0;
		}
		&.order-price-total {
			font-size: 16px;
			font-weight: 700;
		}
	}
}

/deep/ .van-cell__title {
	flex: none;
}
/deep/ .van-cell {
	align-items: center;
}
/deep/ .van-cell__value {
	margin-left: 10px;
}
/deep/ .van-popup__close-icon--top-right {
	top: 12px;
}

/deep/ .van-popup {
	max-width: 375px;
	left: 50%;
	transform: translateX(-50%);
}
.gao-payType {
	padding: 16px;
	position: relative;
	font-size: 16px;
	.gao-payType-title {
		font-size: 18px;
		color: #222;
		line-height: 20px;
		margin-bottom: 20px;
	}
	.icon-guanbi {
		position: absolute;
		right: 12px;
		top: 12px;
		font-size: 24px;
	}
	.gao-payType-method {
		margin-bottom: 20px;
		img {
			width: 26px;
			margin-right: 10px;
			margin-left: 6px;
		}
	}
	.gao-payType-submit {
		margin-top: 30px;
		height: 40px;
		line-height: 40px;
	}
}
.gao-return {
	padding: 30px;
	position: relative;
	font-size: 14px;
	.gao-return-title {
		color: #222;
		line-height: 20px;
		margin-bottom: 20px;
		text-align: center;
	}
	.icon-guanbi {
		position: absolute;
		right: 12px;
		top: 12px;
		font-size: 24px;
	}
	.gao-return-cont {
		border: 1px solid #222;
		line-height: 40px;
		padding: 0 20px;
		color: #595959;
		.gao-return-e {
			font-size: 14px;
			font-weight: 500;
			color: #222;
		}
		.gao-return-copy {
			float: right;
			color: #999;

			i {
				border-bottom: 1px solid #999;
			}
		}
	}
}
</style>
