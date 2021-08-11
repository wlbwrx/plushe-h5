<template>
	<!-- tabbar-购物车 -->
	<div class="shop-car">
		<nav-bar :title="$t('cart.yourCart')" border></nav-bar>
		<div class="shop-car__main">
			<!-- 有商品 -->
			<div class="shop-car__exist" v-if="!isEmpty">
				<!-- 7月9号,先隐藏 -->
				<!-- <div class="shop-car__login" v-if="!token">
					<span>{{ $t('cart.singIn1') }}</span>
					<span class="shop-car__login-btn" @click="goLogin">{{ $t('cart.singIn2') }}</span>
				</div> -->
				<div class="sc__notice m10" v-if="lackForFreeExpressAmount || manjianText">
					<img class="sc__notice-icon" src="@/assets/images/icons/cart-notice.png" alt="" />
					<van-swipe class="sc__notice-swipe" vertical :show-indicators="false" :autoplay="3000">
						<van-swipe-item class="sc__notice-swipe-item" v-if="lackForFreeExpressAmount">
							<p>
								{{ $t('cart.buyText0') }} <span class="sc__notice-money"> {{ filterPriceMethod(lackForFreeExpressAmount) }}</span> {{ $t('cart.buyText1') }}
							</p>
						</van-swipe-item>
						<van-swipe-item class="sc__notice-swipe-item" v-if="manjianText">
							<p v-html="manjianText"></p>
						</van-swipe-item>
					</van-swipe>
				</div>
				<!-- 有效商品 -->
				<car-list class="m10" v-if="goodsList.length" :list="goodsList"></car-list>
				<!-- 无效商品 -->
				<car-list class="m10" v-if="expiredList.length" :list="expiredList" expired></car-list>
				<van-cell class="sc__coupon sc__van-cell m10" is-link @click="choosePromoCode">
					<template #title>
						<img class="cell-icon" :src="$utils.platList('discount', platformId)" alt="" />
						<template v-if="selectPromo">
							<span class="cell-tit max" v-if="selectPromo.couponType == 1 || selectPromo.couponType == 2">
								{{ $t('cart.enjoyCode', { num: filterPriceMethod(selectPromo.fixedAmount), num1: filterPriceMethod(selectPromo.thresholdAmount) }) }}
								<i>({{ $t('code') }} : {{ selectPromo.couponCode }}) </i>
							</span>
							<span class="cell-tit max" v-else-if="selectPromo.couponType == 3">
								{{ $t('cart.enjoyCode1', { num: selectPromo.discountProbability, num1: filterPriceMethod(selectPromo.thresholdAmount) }) }}
								<i>({{ $t('code') }} : {{ selectPromo.couponCode }}) </i>
							</span>
							<span class="cell-tit max" v-if="selectPromo.couponType == 4">
								{{ $t('cart.enjoyCode4', { num: selectPromo.discountProbability, num1: selectPromo.thresholdNumber }) }}
								<i>({{ $t('code') }} : {{ selectPromo.couponCode }}) </i>
							</span>
						</template>
						<span class="cell-tit" v-else>{{ $t('cart.promoCode') }}</span>
					</template>
					<template #default>
						<span class="cell-txt" v-if="selectPromo">-{{ filterPriceMethod(checkOrderDetail.promoAmount) }}</span>
					</template>
				</van-cell>
				<!-- 新人优惠券未登录时隐藏 -->
				<van-cell class="sc__gift sc__van-cell m10" is-link @click="chooseCoupon" v-show="token">
					<template #title>
						<img class="cell-icon" src="@/assets/images/icons/gift-icon.png" alt="" />
						<span class="cell-tit" v-if="!token">{{ $t('cart.registerText', { num: filterPriceMethod(newPeopleCouponVal) }) }} </span>
						<span class="cell-tit" v-else>{{ $t('cart.applyCoupon') }}</span>
					</template>
					<template #default>
						<span class="cell-txt" v-if="!token">
							<i>{{ $t('cart.registerNow') }}</i>
						</span>
						<span class="cell-txt" v-if="token && selectCoupon">-{{ filterPriceMethod(checkOrderDetail.couponAmount) }}</span>
					</template>
				</van-cell>
				<!-- <div class="sc__recommend m10" v-if="recommendList.length">
					<h3 class="sc__recommend-tit">
						<span>{{ $t('cart.like') }}</span>
						<i>{{ recommendList.length }}{{ $t('cart.item') }}</i>
					</h3>
					<div class="sc__recommend-swiper" v-swiper:mySwiper="options">
						<div class="swiper-wrapper">
							<div class="swiper-slide sc__recommend-goods" v-for="item of recommendList" :key="item.productNo">
								<div class="sc__recommend-item" @click="goGoodsDetail(item)">
									<van-image class="sc__recommend-pic" :src="$utils.imageHandler(0, item.picKey)" :alt="item.name || item.productName">
										<template v-slot:loading>
											<img width="100%" height="100%" :src="$utils.platList('goodsDefaultImg', platformId)" alt="" />
										</template>
									</van-image>
									<p class="sc__recommend-price taxes_text">{{ filterPriceMethod(item.discountPrice || item.price) }}</p>
								</div>
							</div>
						</div>
					</div>
				</div> -->
				<div class="sc__other m10">
					<div class="sc__other-item">
						<div class="sc__other-sub">
							<span class="sc__other-tit">{{ $t('cart.price') }}</span>
							<span class="thro taxes_text"> {{ filterPriceMethod(checkOrderDetail.retailAmount) }}</span>
						</div>
						<div class="sc__other-sub">
							<span class="sc__other-tit">{{ $t('cart.subtotal') }}</span>
							<span class="taxes_text"> {{ filterPriceMethod(checkOrderDetail.subtotalAmount) }}</span>
						</div>

						<div class="sc__other-sub" v-if="checkOrderDetail.promoAmount">
							<span class="sc__other-tit">{{ $t('cart.promoCodeDiscount') }}</span>
							<span class="red">- {{ filterPriceMethod(checkOrderDetail.promoAmount) }}</span>
						</div>
						<div class="sc__other-sub" v-if="checkOrderDetail.couponAmount">
							<span class="sc__other-tit">{{ $t('cart.couponDiscount') }}</span>
							<span class="red">- {{ filterPriceMethod(checkOrderDetail.couponAmount) }}</span>
						</div>
						<div class="sc__other-sub tot">
							<span class="sc__other-tit">{{ $t('cart.total') }}</span>
							<span class="bold taxes_text"> {{ filterPriceMethod(checkOrderDetail.totalAmount) }}</span>
						</div>
					</div>
					<div class="sc__other-pics">
						<img :src="item.src" alt="" class="sc__other-img" v-for="item of picList" :key="item.name" />
					</div>
				</div>
				<!-- 底部结算栏 -->
				<car-footer :fixed="isFixed" :isFree="!lackForFreeExpressAmount"></car-footer>
			</div>
			<!-- 无商品 -->
			<div class="shop-car__empty" v-else>
				<van-image :src="require('../../assets/images/shoppingbag_empty_chatu.png')" class="shop-car__empty-pic" />
				<p class="shop-car__empty-txt">{{ $t('cart.empty') }}</p>
				<van-button class="shop-car__empty-btn" @click="clickEmptyBtn" block>{{ token ? $t('cart.shopNow') : $t('cart.singIn') }}</van-button>
				<!-- 推荐 -->
				<div class="shop-car__recommend">
					<h3 class="shop-car__recommend-title">{{ $t('cart.like') }}</h3>
					<ul class="shop-car__recommend-list">
						<li class="shop-car__recommend-item" v-for="item of recommendList" :key="item.productNo" @click="goGoodsDetail(item)">
							<!-- <van-image class="shop-car__recommend-pic" lazy-load :src="item.picUrl" /> -->
							<van-image class="shop-car__recommend-pic" lazy-load :src="$utils.imageHandler(0, item.picKey)" :alt="item.name || item.productName">
								<template v-slot:loading>
									<img width="100%" height="100%" :src="$utils.platList('goodsDefaultImg', platformId)" alt="" />
								</template>
							</van-image>
							<p class="shop-car__recommend-price taxes_text">{{ filterPriceMethod(item.discountPrice || item.price) }}</p>

							<p class="goods-labels" v-if="item.tagsMap.length">
								<template v-if="item.tagsMap.indexOf('flash_sale') > -1">
									<span v-if="item.discountRate" class="goods-sign goods-sign-sale">-{{ Math.floor(item.discountRate * 100) }}%</span>
								</template>
								<span class="goods-sign" v-else>{{ $t('new') }}</span>
							</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 确认删除弹框 -->
		<delete-popup></delete-popup>
		<!-- Promo Code 弹框 -->
		<van-popup v-model="showPromoCode" position="bottom">
			<div class="promo-code">
				<h3>
					{{ $t('cart.code') }}
					<i class="icon icon-guanbi" @click="showPromoCode = false"></i>
				</h3>
				<div class="promo-code__cont">
					<van-field v-model="promoCode" clearable :border="false" maxlength="20" :placeholder="$t('cart.enterCode')"></van-field>
					<div class="promo-code__btn" :class="{ disabled: !promoCode }" @click="promoCodeApply">{{ $t('cart.apply') }}</div>
				</div>
				<p class="promo-code__tips">{{ $t('cart.tips') }}</p>
			</div>
		</van-popup>
	</div>
</template>
<script>
import { Toast } from 'vant'
import NavBar from '@/components/navbar/index.vue'
import CarList from './component/CarList.vue'
import CarFooter from './component/CarFooter.vue'
import DeletePopup from './component/DeletePopup.vue'

import http from '@/api/index.js'
import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'

export default {
	data() {
		return {
			// goodsList: [],
			// expiredList: [],
			recommendList: [], // 推荐列表
			options: {
				slidesPerView: 'auto', // 显示个数
				freeMode: true,
			},
			isFixed: true, // 是否为固定定位
			picList: [
				{ name: '1', src: require('@/assets/images/cart/cart-img-1.png') },
				{ name: '2', src: require('@/assets/images/cart/cart-img-2.png') },
				{ name: '3', src: require('@/assets/images/cart/cart-img-3.png') },
				{ name: '4', src: require('@/assets/images/cart/cart-img-4.png') },
				{ name: '5', src: require('@/assets/images/cart/cart-img-5.png') },
				{ name: '6', src: require('@/assets/images/cart/cart-img-6.png') },
				{ name: '7', src: require('@/assets/images/cart/cart-img-7.png') },
				{ name: '8', src: require('@/assets/images/cart/cart-img-8.png') },
			],
			existHeight: 0,
			clientHeight: 0,
			showPromoCode: false, // 是否显示活动码弹框
			promoCode: '', // 输入框活动码
		}
	},
	components: {
		NavBar,
		CarList,
		CarFooter,
		DeletePopup,
	},
	created() {
		// this.getRecommend()
	},
	mounted() {},
	activated() {
		this.setOrderParams({ ...this.orderParams, shippingMethod: undefined })
		this.setCheckOrderDetail()
		this.checkout()
		this.getRecommend()
		window.addEventListener('scroll', this.pageScroll)
	},
	deactivated() {
		window.removeEventListener('scroll', this.pageScroll)
	},
	computed: {
		...mapState('shopCar', {
			goodsList: (state) => state.carList,
			expiredList: (state) => state.expiredList,
			isEdit: (state) => state.isEdit,
			totalPrice: (state) => state.totalPrice,
			retailPrice: (state) => state.retailPrice,
			lackForFreeExpressAmount: (state) => state.lackForFreeExpressAmount,
			selectPromo: (state) => state.checkOrderDetail.selectPromo,
			selectCoupon: (state) => state.checkOrderDetail.selectCoupon,
			checkOrderDetail: (state) => state.checkOrderDetail,
			orderParams: (state) => state.orderParams,
		}),
		...mapGetters(['newPeopleCouponVal']),
		// 购物车是否为空
		isEmpty() {
			return this.goodsList.length == 0 && this.expiredList.length == 0
		},
		isBackIcon() {
			return !!(this.$store.getters.shopsId > 0 || this.$route.query.hideTabbar)
		},
		// 满减轮播文案:
		manjianText() {
			let unmetCoupon = this.checkOrderDetail.unmetCoupon
			// 4 是满件--满减
			if (unmetCoupon && (unmetCoupon.lackAmount || unmetCoupon.couponType == 4)) {
				if (unmetCoupon.couponType == 3) {
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
	beforeDestroy() {
		// 离开页面时，关闭
		this.switchEdit('guanbi')
	},
	methods: {
		...mapMutations('shopCar', {
			switchEdit: 'switchEdit', // 切换编辑状态
			setCheckOrderDetail: 'setCheckOrderDetail',
			setOrderParams: 'setOrderParams',
		}),
		...mapMutations('user', ['SET_LOGINSWIPEINDEX']),
		...mapActions('shopCar', {
			// getCarList: 'getCarList', // 获取购车数据
			checkout: 'checkout', // 结账台
		}),
		// 点击无购车下的按钮
		clickEmptyBtn() {
			if (this.token) {
				this.$router.push({
					path: `/home`,
				})
			} else {
				this.goLogin()
			}
		},
		// 前往商品详情：
		goGoodsDetail(item) {
			this.$store.commit('ssr/setGoodsDetail', item)
			this.$router.push({
				path: `/product/${item.productName || item.name}-${item.productNo}`,
			})
		},
		// 获取推荐：
		getRecommend() {
			const query = {
				pageNum: 1,
				pageSize: 50, // 后端做的最大100条
				// shopsId: this.$store.getters.shopsId || undefined,
				type: 2, // // 3-表示商品详情, 2-购物车, 1-首页
			}
			http.home.recommend(query).then((res) => {
				// console.log(res.data)
				this.recommendList = res.data
				this.$nextTick(() => {
					if (!this.isEmpty) {
						this.existHeight = document.querySelector('.shop-car__exist').offsetHeight
						this.clientHeight = document.body.height || window.innerHeight
						this.pageScroll()
					}
				})
			})
		},
		pageScroll() {
			console.log('pageScrollpageScroll')
			let scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
			if (this.existHeight > this.clientHeight) {
				this.isFixed = this.existHeight - this.clientHeight - 80 > scrollTop
			} else {
				this.isFixed = false
			}
		},
		goLogin() {
			this.SET_LOGINSWIPEINDEX(1)
			this.$router.push({
				path: '/login',
				query: {
					redirect: '/shopping_car',
				},
			})
		},
		// 点击选 promo-code
		choosePromoCode() {
			this.promoCode = ''
			this.showPromoCode = true
			if (this.selectPromo) {
				this.promoCode = this.selectPromo.couponCode
			}
		},
		// 活动码输入后确认
		promoCodeApply() {
			if (!this.promoCode) return
			this.setOrderParams({ ...this.orderParams, promoCode: this.promoCode })
			this.checkout()
				.then(() => {
					this.showPromoCode = false
				})
				.catch((err) => {
					this.showPromoCode = false
					Toast(err.msg)
				})
		},
		// 点击选 Coupon
		chooseCoupon() {
			if (this.token) {
				// 传入 choose 标记,则会隐藏 输入兑换框部分
				this.$router.push({
					path: '/coupon',
					query: {
						choose: 1,
						couponCode: this.selectCoupon ? this.selectCoupon.couponCode : undefined, //  当前选中的优惠券id
					},
				})
			} else {
				this.goLogin()
			}
		},
	},
}
</script>
<style scoped lang="less">
@import '@/style/variable.less';

.shop-car {
	.shop-car__nav-icon {
		font-size: 26px;
	}
	.shop-car__main {
		font-weight: 300;
		.shop-car__empty {
			padding: 40px 16px 24px;
			text-align: center;
			margin-bottom: 10px;

			.shop-car__empty-pic {
				width: 101px;
				height: 98px;
				margin-bottom: 10px;
			}

			.shop-car__empty-txt {
				color: @color-666;
				font-size: 14px;
				margin-bottom: 24px;
			}

			.shop-car__empty-btn {
				// margin-bottom: 20px;
				background: @color-222;
				color: @color-FFF;
				border-radius: 3px;
			}

			.shop-car__empty-other {
				border-top: 1px solid @color-bg;
				padding-top: 16px;
				font-size: 0;

				.empty-other-pic {
					width: 100%;
				}
			}
		}

		.shop-car__recommend {
			padding: 24px 0 30px;
			min-height: 400px;

			.shop-car__recommend-title {
				font-size: 18px;
				color: @color-222;
				text-align: center;
				margin-bottom: 20px;
			}

			.shop-car__recommend-list {
				display: flex;
				flex-wrap: wrap;

				.shop-car__recommend-item {
					margin-right: 14px;
					margin-bottom: 20px;
					width: 105px;
					font-size: 0;
					position: relative;

					&:nth-child(3n) {
						margin-right: 0;
					}

					.shop-car__recommend-pic {
						width: 105px;
						height: 157.5px;
						margin-bottom: 10px;
					}

					.shop-car__recommend-price {
						font-size: 14px;
						font-weight: normal;
						color: @color-222;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}
					.goods-labels {
						position: absolute;
						left: 0;
						top: 0;
						.goods-sign {
							display: block;
							height: 18px;
							line-height: 18px;
							background: #87c6a1;
							color: #fff;
							font-size: 12px;
							padding: 0 6px;
							margin-bottom: 6px;
							&.goods-sign-sale {
								background: #ffb84e;
								color: #222;
							}
						}
					}
				}
			}
		}

		.shop-car__exist {
			padding-top: 10px;
			.shop-car__login {
				margin: 7px 0 17px;
				padding: 0 10px;
				height: 26px;
				line-height: 26px;
				font-size: 14px;
				color: @color-666;
				display: flex;
				justify-content: space-between;
				font-size: 12px;
				.shop-car__login-btn {
					padding: 0 10px;
					background: #222;
					color: #fff;
				}
			}
			.m10 {
				margin: 0 10px 10px 10px;
				width: auto;
			}
			.sc__notice {
				display: flex;
				padding: 0 10px;
				background: #fff;
				height: 44px;
				margin-bottom: 10px;
				border-radius: 6px;
				.sc__notice-icon {
					width: 22px;
					margin-right: 14px;
				}
				.sc__notice-swipe {
					flex: 1;
					font-size: 13px;
					height: 44px;
					.sc__notice-swipe-item {
						height: 44px;
						display: flex;
						align-items: center;
					}
					/deep/ .sc__notice-money {
						color: @color-promo;
					}
				}
			}
			.sc__van-cell {
				padding: 16px;
				border-radius: 6px;
				margin-bottom: 10px;
				display: flex;
				align-items: center;
				font-size: 14px;
				/deep/ .van-cell__title {
					flex: auto;
					display: flex;
					align-items: center;
				}
				/deep/ .van-cell__value {
					min-width: 60px;
					// max-width: 110px;
					flex: none;
				}
				.cell-icon {
					width: 22px;
					margin-right: 10px;
				}
				.cell-tit {
					color: @color-222;
					line-height: 17px;
					// &.max {
					// width: 200px;
					// }
					i {
						color: #999;
					}
				}
				.cell-txt {
					color: @color-promo;
					white-space: nowrap;
					i {
						color: #999;
					}
				}
			}
			.sc__recommend {
				padding: 20px 0;
				border-radius: 6px;
				background: #fff;
				overflow: hidden;
				margin-bottom: 10px;
				.sc__recommend-tit {
					display: flex;
					padding: 0 14px;
					justify-content: space-between;
					align-items: center;
					font-size: 14px;
					font-weight: normal;
					margin-bottom: 20px;
					i {
						color: @color-999;
						font-size: 12px;
					}
				}
				.sc__recommend-goods {
					width: 130px;
					margin-right: 10px;
					&:first-child {
						margin-left: 14px;
					}
					&:last-child {
						margin-right: 14px;
					}
				}
				.sc__recommend-item {
					font-size: 0;
					.sc__recommend-pic {
						height: 195px;
						width: 130px;
					}
					.sc__recommend-price {
						font-size: 12px;
						color: @color-222;
						margin-top: 6px;
						font-weight: normal;
					}
				}
			}
			.sc__other {
				background: #fff;
				padding: 20px 14px 5px;
				border-radius: 6px;
				overflow: hidden;
				.sc__other-item {
					border-bottom: 1px solid #f5f5f5;

					.sc__other-sub {
						display: flex;
						justify-content: space-between;
						font-size: 14px;
						color: #222;
						margin-bottom: 14px;
						.red {
							color: @color-promo;
						}
						.bold {
							font-size: 16px;
							font-weight: 500;
						}
						.thro {
							text-decoration: line-through;
						}
					}
				}
				.sc__other-pics {
					margin-top: 16px;
					display: flex;
					justify-content: center;
					flex-wrap: wrap;
					.sc__other-img {
						margin: 0 7px 15px;
						height: 30px;
					}
				}
			}
			.sc__bottom {
				background: #fff;
				padding: 20px 16px;
				.sc__bottom-btn {
					border-radius: 3px;
					height: 40px;
					line-height: 38px;
					border: 1px solid @color-222;
					background: @color-222;
					color: #fff;
					text-align: center;
					font-size: 14px;
					font-weight: 500;
					&:last-child {
						margin-top: 14px;
						color: @color-222;
						background: #fff;
					}
				}
			}
		}
	}
	.promo-code {
		padding: 16px;
		border-top-left-radius: 6px;
		border-top-right-radius: 6px;
		overflow: hidden;
		font-size: 14px;
		h3 {
			color: #222;
			margin-bottom: 17px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.icon-guanbi {
				font-size: 20px;
			}
		}
		.promo-code__cont {
			display: flex;
			justify-content: space-between;
			.promo-code__btn {
				height: 34px;
				line-height: 34px;
				text-align: center;
				width: 100px;
				border-radius: 3px;
				background: #222;
				color: #fff;
				margin-left: 10px;
			}
			.disabled.promo-code__btn {
				background: #ccc;
			}
			.van-field {
				border: 1px solid #d1d1d1;
				height: 36px;
				line-height: 36px;
				padding: 0 10px;
				border-radius: 3px;
			}
		}
		.promo-code__tips {
			margin-top: 10px;
			color: #999;
			font-size: 12px;
		}
	}
}
</style>
