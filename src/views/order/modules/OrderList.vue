<template>
	<div class="unpaid">
		<h2 class="unpaid-title" @click="$router.push({ name: 'orderDetail', query: { orderSn: orderDetail.orderResp.orderSn } })">
			<label>{{ orderStatus[orderDetail.orderResp.orderStatus] }}</label
			><i class="icon icon-fanhui-copy"></i>
		</h2>
		<div class="unpaid-model">
			<div class="">
				<label>{{ this.$t('my.order') }} #</label><b>{{ orderDetail.orderResp.orderSn }}</b>
			</div>
			<a class="unpaid-copy" href="javascript: void(0);" v-copy :data-clipboard-text="orderDetail.orderResp.orderSn">{{ $t('copy') }}</a>
		</div>
		<ul class="sider unpaid-shop" @click="$router.push({ name: 'orderDetail', query: { orderSn: orderDetail.orderResp.orderSn } })">
			<li v-for="(item, index) in orderDetail.orderItemResp" :key="index">
				<van-image class="unpaid-shop-image" :src="$utils.imageHandler(0, item.picKey)">
					<template v-slot:loading>
						<img width="100%" height="100%" :src="$utils.platList('goodsDefaultImg', platformId)" alt="" />
					</template>
				</van-image>
			</li>
		</ul>
		<div class="unpaid-oper">
			<div class="unpaid-total">
				<label>{{ geyOrderLen(orderDetail.orderItemResp) }} {{ $t('my.itemsTotal') }}:</label>
				<b>{{ filterPriceMethod(orderDetail.orderResp.totalPayAmount) }}</b>
			</div>
			<div class="unpaid-btn">
				<!-- <van-button type="default" @click="goto('shippingAddress')">Edit Address</van-button>Repurchase -->
				<!-- <van-button type="default" v-show="orderStatusFun(orderDetail.orderResp, 1)" class="unpaid-btn-pay btn-padding-20" @click="closeReaSOn(orderDetail.orderResp.id)" >cancel</van-button> -->
				<van-button v-show="orderStatusFun(orderDetail.orderResp.orderStatus, 1)" type="primary" class="unpaid-btn-pay btn-padding-20" @click="payFun">{{ $t('my.payNow') }}</van-button>
				<van-button v-show="orderStatusFun(orderDetail.orderResp.orderStatus, 3) && !orderDetail.orderResp.isOverEvaluate" type="default" class="unpaid-btn-pay btn-padding-20" @click="review">{{ $t('my.review') }}</van-button>
				<van-button v-show="orderStatusFun(orderDetail.orderResp.orderStatus, 2)" type="primary" class="unpaid-btn-pay btn-padding-20" @click="viewLogistics">{{ $t('my.track') }}</van-button>
				<!-- <van-button v-show="orderStatusFun(orderDetail.orderResp.orderStatus, 4)" type="primary" class="unpaid-btn-pay btn-padding-20">Repurchase</van-button> -->
			</div>
		</div>

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
	</div>
</template>
<script>
import Clipboard from '@/mixins/Clipboard'
import { orderStatus, payList } from '@/utils/enums'
import { Toast } from 'vant'
import { mapActions, mapMutations } from 'vuex'
import { loadStripe } from '@stripe/stripe-js'
import store from 'store'

export default {
	mixins: [Clipboard],
	inject: ['reload'],
	props: {
		orderDetail: {
			type: Object,
			default: () => {},
		},
	},
	components: {},
	created() {
		// this.setDocumentTitle('My Orders')
	},
	data() {
		return {
			orderStatus, //  订单状态：
			//             ALL 4-> 交易关闭、已取消
			//             unpaid 0->待支付
			//             processing 1->待发货 6-> 支付处理中
			//             shipped 2->已发货 3->已收货；5->交易完成
			// export const orderStatus = ['Unpaid', 'Shipment Pending', 'Shipped', 'Delivered', 'Cancelled', 'Finished', 'Payment Pending']
			payType: this.orderDetail.orderResp.payType,
			isShowPayType: false, // 是否显示支付方式选着弹框
		}
	},
	methods: {
		...mapActions('pay', ['createPayment']),
		...mapMutations('pay', ['setPayInfo']),
		...mapActions('order', ['queryGetOrderDetail']),
		viewLogistics() {
			// console.log(9999, this.orderDetail)

			let { orderResp, orderLogisticsRespList } = this.orderDetail
			if (orderLogisticsRespList && orderLogisticsRespList.length > 1) {
				this.$router.push({ name: 'logistics', query: { orderSn: orderResp.orderSn } })
			} else if (orderLogisticsRespList.length == 1) {
				let { deliveryCompany, deliverySn, orderId, orderSn, shopsId } = orderLogisticsRespList[0] || {}
				this.$router.push({ name: 'logisticsDetail', query: { deliveryCompany, deliverySn, orderId, orderSn, shopsId } })
			}
		},
		// goto(url){
		//     this.$router.push({name:url})
		// },
		review() {
			let { orderSn } = this.orderDetail.orderResp
			this.$router.push({ name: 'orderReview', query: { orderSn } })
		},
		orderStatusFun(orderStatus, status) {
			if (status === 1) {
				//
				return orderStatus === 0 // 0（Unpaid）   显示Pay Now   1（Shipment Pending）和6 （Payment Pending）不显示功能按钮
			} else if (status === 2) {
				// 2 Shipped   显示Track(查看物流)  单个物流跳详情  多个物流列表
				// 3 Delivered 1.如果没有评论Review 评论完了则不显示 2、显示Track(查看物流)  单个物流跳详情  多个物流列表
				// 5 Finished 1.如果没有评论Review 评论完了则不显示
				return orderStatus === 2 || orderStatus === 3
			} else if (status === 3) {
				return orderStatus === 3 || orderStatus === 5
			}
			// else if(status===4){
			//     return orderStatus ===4
			// }
		},
		geyOrderLen(orderItemResp) {
			let len = 0
			if (orderItemResp && orderItemResp.length > 0) {
				len = orderItemResp.reduce((pre, cur) => {
					return pre + cur.productQuantity
				}, 0)
			}
			return len
		},
		// 列表的 pay now 支付按钮:
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
					if (res.data.paymentStatus == 5) {
						this.$router.push({ name: 'orderDetail', query: { orderSn } })
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
						// Stripe(res.data.thirdClientKey).redirectToCheckout({ sessionId: res.data.paymentRespSn })
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
	},
	computed: {
		payList() {
			if (this.platformId == 3) {
				return payList.filter((item) => item.value != 1)
			} else {
				return payList.filter((item) => item.value != 5)
			}
		},
	},
}
</script>
<style lang="less" scoped>
@import '@/style/variable.less';

.unpaid {
	background: #fff;
	padding: 0 16px;
	.unpaid-copy {
		color: #999999;
		font-size: 12px;
		border-bottom: 1px solid #999;
	}
	.unpaid-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 18px;
		height: 50px;
		line-height: 50px;
		border-bottom: 1px solid #f5f5f5;
	}
	.unpaid-model {
		font-size: 14px;
		display: flex;
		justify-content: space-between;
		height: 24px;
		align-items: center;
		margin-top: 14px;
		b {
			margin-left: 5px;
		}
		/deep/ .van-button {
			color: #999;
			border: 1px solid #999;
			height: auto;
			padding: 4px 10px;
		}
	}
	.unpaid-shop {
		li {
			width: 96px;
			height: 144px;
			margin: 14px 10px 0 0;
			.unpaid-shop-image {
				width: 100%;
				height: 100%;
			}
		}
	}
	.unpaid-oper {
		padding-top: 20px;
		padding-bottom: 30px;
		font-size: 14px;
		.unpaid-total,
		.unpaid-btn {
			display: flex;
			justify-content: flex-end;
		}
		.unpaid-total {
			b {
				margin-left: 10px;
				color: @color-promo;
			}
		}
		.unpaid-btn {
			.van-button {
				height: 32px;
				font-size: 14px;
			}
			.unpaid-btn-pay {
				margin-top: 16px;
				margin-left: 10px;
			}
			// /deep/ .van-button{padding:0 20px;}
		}
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
}
.unpaid:not(:first-child) {
	margin-top: 10px;
}
</style>
