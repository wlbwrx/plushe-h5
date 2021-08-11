<template>
	<div class="order-confirm header-title">
		<div v-show="!showCountry">
			<template v-if="token">
				<div class="order-list">
					<div class="" @click="$router.push({ name: 'selectAddress', query: { souceType: 'shipping', addressId: shippingAddress.addressId } })">
						<h2>{{ $t('pay.shippingAddress') }}</h2>
						<AddressShown :addressObj="shippingAddress" />
					</div>
					<div class="border-top" @click="$router.push({ name: 'selectAddress', query: { souceType: 'billing', addressId: billingAddress.addressId } })">
						<h2>{{ $t('pay.billingAddress') }}</h2>
						<AddressShown :addressObj="billingAddress" />
					</div>
				</div>
			</template>
			<!-- 游客,填写地址信息 -->
			<template v-else>
				<van-form validate-first ref="form">
					<div class="sa__field email">
						<field-input :value.sync="form.userEmail" maxlength="50" :label="$t('addressForm.label0')" :placeholder="$t('addressForm.textEmail')" name="email" :rules="[{ pattern: emailValidator, message: $t('addressForm.text1') }]"></field-input>
					</div>
					<h2>{{ $t('pay.shippingAddress') }}</h2>
					<div class="sa__field">
						<field-input :value.sync="form.receiverFirstName" maxlength="30" :label="$t('addressForm.label2')" name="first" :rules="[{ pattern: platformId == 3 ? /\S/ : userNameValidator, message: $t('addressForm.text2') }]"></field-input>
					</div>
					<div class="sa__field">
						<field-input :value.sync="form.receiverLastName" maxlength="30" :label="$t('addressForm.label3')" name="last" :rules="[{ pattern: platformId == 3 ? /\S/ : userNameValidator, message: $t('addressForm.text3') }]"></field-input>
					</div>
					<template v-if="platformId == 3">
						<div class="sa__field">
							<field-input :value.sync="form.receiverKatakanaFirstName" maxlength="15" label="*姓（カナ）" :rules="[{ required: true, message: $t('addressForm.text14') }]"></field-input>
						</div>
						<div class="sa__field">
							<field-input :value.sync="form.receiverKatakanaLastName" maxlength="15" label="*名（カナ)" :rules="[{ required: true, message: $t('addressForm.text15') }]"></field-input>
						</div>
					</template>
					<div class="sa__field">
						<field-input :value.sync="form.receiverDetailAddressone" maxlength="50" :label="$t('addressForm.label7')" name="address1" :rules="[{ required: true, message: $t('addressForm.text7') }]"></field-input>
					</div>
					<div class="sa__field" v-if="platformId != 3">
						<field-input :value.sync="form.receiverDetailAddresstwo" maxlength="50" :label="$t('addressForm.label8')" name="address2"></field-input>
					</div>
					<template v-if="platformId == 3">
						<div class="sa__field">
							<field-input v-model="form.fieldValue" is-link readonly :label="$t('addressForm.label11')" :placeholder="$t('addressForm.text13')" @clickInput="showJPPicker = true" />
							<van-popup v-model="showJPPicker" round position="bottom">
								<van-cascader v-model="invalid.cascaderValue" :options="jpCountry" @close="showJPPicker = false" @finish="onFinish" :field-names="{ text: 'name', value: 'name' }" />
							</van-popup>
						</div>
					</template>
					<template v-else>
						<div class="sa__field">
							<field-input :value.sync="form.receiverCountry" :label="$t('addressForm.label1')" name="country" :readonly="true" rightIcon="arrow" @clickInput="selectCountryClick(1)"></field-input>
						</div>
						<div class="sa__field" v-if="provinces.length">
							<field-input :value.sync="form.receiverState" :rules="[{ required: true, message: $t('addressForm.text8') }]" :label="$t('addressForm.label5')" name="state" :readonly="true" rightIcon="arrow" @clickInput="showPicker = true"></field-input>
							<van-popup v-model.trim="showPicker" class="province-show" round position="bottom">
								<van-picker show-toolbar :columns="provinces" @cancel="showPicker = false" @confirm="onConfirm" confirm-button-text="confirm" cancel-button-text="cancel" value-key="code" />
							</van-popup>
						</div>
						<div class="sa__field">
							<field-input :value.sync="form.receiverCity" :label="$t('addressForm.label6')" maxlength="60" name="City" :rules="[{ pattern: cityValidator, message: $t('addressForm.text5') }]"></field-input>
						</div>
					</template>
					<div class="sa__field">
						<field-input :value.sync="form.receiverPostCode" :label="$t('addressForm.label9')" name="Code" maxlength="10" :rules="[{ pattern: postCodeValidator, message: $t('addressForm.text6') }]"></field-input>
					</div>
					<div class="sa__field">
						<field-input :value.sync="form.receiverPhone" :label="`*${form.receiverPhoneCode ? form.receiverPhoneCode + ' | ' : ''} ${$t('addressForm.label4')}`" name="Phone" maxlength="16" :rules="[{ pattern: phoneValidator, message: $t('addressForm.text4') }]"></field-input>
					</div>
					<div class="bill">
						<h2>{{ $t('pay.billingAddress') }}</h2>
						<van-radio-group v-model="addBillAddress">
							<van-radio name="0">
								<template> {{ $t('addressForm.AddAddress') }} </template>
								<template #icon="props"> <i class="iconfont" :class="props.checked ? 'icondian' : 'van-icon van-icon-success'" /> </template>
							</van-radio>
							<van-radio name="1">
								<template>{{ $t('addressForm.set') }} </template>
								<template #icon="props"> <i class="iconfont" :class="props.checked ? 'icondian' : 'van-icon van-icon-success'" /> </template>
							</van-radio>
						</van-radio-group>
						<template v-if="addBillAddress === '0'">
							<div class="sa__field">
								<field-input :value.sync="billForm.billRecFirstName" maxlength="30" :label="$t('addressForm.label2')" name="billfirst" :rules="[{ pattern: platformId == 3 ? /\S/ : userNameValidator, message: $t('addressForm.text2') }]"></field-input>
							</div>
							<div class="sa__field">
								<field-input :value.sync="billForm.billRecLastName" maxlength="30" :label="$t('addressForm.label3')" name="billlast" :rules="[{ pattern: platformId == 3 ? /\S/ : userNameValidator, message: $t('addressForm.text3') }]"></field-input>
							</div>
							<template v-if="platformId == 3">
								<div class="sa__field">
									<field-input :value.sync="billForm.billRecKatakanaFirstName" maxlength="15" label="*姓（カナ）" :rules="[{ required: true, message: $t('addressForm.text13') }]"></field-input>
								</div>
								<div class="sa__field">
									<field-input :value.sync="billForm.billRecKatakanaLastName" maxlength="15" label="*名（カナ)" :rules="[{ required: true, message: $t('addressForm.text14') }]"></field-input>
								</div>
							</template>
							<div class="sa__field">
								<field-input :value.sync="billForm.billDetailAddressone" maxlength="50" :label="$t('addressForm.label7')" name="billaddress1" :rules="[{ required: true, message: $t('addressForm.text7') }]"></field-input>
							</div>
							<div class="sa__field" v-if="!platformId == 3">
								<field-input :value.sync="billForm.billDetailAddresstwo" maxlength="50" :label="$t('addressForm.label8')" name="billaddress"></field-input>
							</div>
							<template v-if="platformId == 3">
								<div class="sa__field">
									<field-input v-model="billForm.fieldValue" is-link readonly :label="$t('addressForm.label11')" :placeholder="$t('addressForm.text13')" @clickInput="billshowJPPicker = true" />
									<van-popup v-model="billshowJPPicker" round position="bottom">
										<van-cascader v-model="invalid.cascaderValue" :options="jpCountry" @close="billshowJPPicker = false" @finish="onFinish" :field-names="{ text: 'name', value: 'name' }" />
									</van-popup>
								</div>
							</template>
							<template v-else>
								<div class="sa__field">
									<field-input :value.sync="billForm.billRecCountry" :label="$t('addressForm.label1')" name="billcountry" :readonly="true" rightIcon="arrow" @clickInput="selectCountryClick(2)"></field-input>
								</div>
								<div class="sa__field" v-show="billprovinces.length">
									<field-input :value.sync="billForm.billRecState" :rules="[{ required: true, message: $t('addressForm.text8') }]" :label="$t('addressForm.label5')" name="billstate" :readonly="true" rightIcon="arrow" @clickInput="billshowPicker = true"></field-input>
									<van-popup v-model.trim="billshowPicker" class="province-show" round position="bottom">
										<van-picker show-toolbar :columns="billprovinces" @cancel="billshowPicker = false" @confirm="onConfirm" confirm-button-text="confirm" cancel-button-text="cancel" value-key="code" />
									</van-popup>
								</div>
								<div class="sa__field">
									<field-input :value.sync="billForm.billRecCity" :label="$t('addressForm.label6')" maxlength="60" name="billcity" :rules="[{ pattern: cityValidator, message: $t('addressForm.text5') }]"></field-input>
								</div>
							</template>
							<div class="sa__field">
								<field-input :value.sync="billForm.billRecPostCode" :label="$t('addressForm.label9')" name="billCode" maxlength="10" :rules="[{ pattern: postCodeValidator, message: $t('addressForm.text6') }]"></field-input>
							</div>
							<div class="sa__field">
								<field-input
									:value.sync="billForm.billRecPhone"
									:label="`*${billForm.billPhoneCode ? '*' + billForm.billPhoneCode + ' | ' : ''}${$t('addressForm.label4')}`"
									name="billPhone"
									maxlength="16"
									:rules="[{ pattern: phoneValidator, message: $t('addressForm.text4') }]"
								></field-input>
							</div>
						</template>
					</div>
				</van-form>
			</template>
			<div class="order-list">
				<h2>{{ $t('pay.shippingMethod') }}</h2>
				<div class="order-shipmethod">
					<van-radio-group v-model="shippMethod" @change="shipmethodChange">
						<div v-for="item in availableShippings" :key="item.id" class="shipmethod-list">
							<div class="shipmethod-radio">
								<van-radio :name="item.id">
									{{ item.name }}
									<template #icon="props"> <i class="iconfont" :class="props.checked ? 'icondian' : 'van-icon van-icon-success'" /> </template>
								</van-radio>
								<span class="shipmethod-mon">{{ filterPriceMethod(item.fee) }}</span>
							</div>
							<p class="delivry-data">{{ item.desc }}</p>
						</div>
					</van-radio-group>
				</div>
			</div>
			<div class="order-list order-list-payment-method">
				<h2>{{ $t('pay.paymentMethod') }}</h2>
				<div class="payment-method">
					<van-radio-group v-model="otherParms.payType" @change="getOrderConfig">
						<p class="payment-method-list" v-for="item in payList" :key="item.value">
							<!-- <i class="icon icon-pinglun"></i> -->
							<van-radio :name="item.value">
								<template>
									<img :src="item.icon" />
									{{ item.label }}
								</template>
								<template #icon="props"> <i class="iconfont" :class="props.checked ? 'icondian' : 'van-icon van-icon-success'" /> </template>
							</van-radio>
						</p>
					</van-radio-group>
				</div>
			</div>
			<div class="order-list coupon">
				<div class="coupon-item" @click="choosePromoCode">
					<img :src="$utils.platList('discount', platformId)" />
					<template v-if="checkOrderDetail.promoAmount > 0">
						<p class="content" v-if="selectPromo.couponType == 3">
							{{ $t('cart.enjoyCode1', { num: selectPromo.discountProbability, num1: filterPriceMethod(selectPromo.thresholdAmount) }) }}
							<i>({{ $t('code') }} : {{ selectPromo.couponCode }}) </i>
						</p>
						<p class="content" v-else-if="selectPromo.couponType == 4">
							{{ $t('cart.enjoyCode4', { num: selectPromo.discountProbability, num1: selectPromo.thresholdNumber }) }}
							<i>({{ $t('code') }} : {{ selectPromo.couponCode }}) </i>
						</p>
						<p class="content" v-else>
							{{ $t('cart.enjoyCode', { num: filterPriceMethod(selectPromo.fixedAmount), num1: filterPriceMethod(selectPromo.thresholdAmount) }) }}
						</p>
					</template>
					<p class="content" v-else>{{ $t('cart.promoCode') }}</p>
					<van-row type="flex" align="center">
						<span class="pirce" v-if="checkOrderDetail.promoAmount > 0">-{{ filterPriceMethod(checkOrderDetail.promoAmount) }}</span>
						<i class="icon icon-fanhui-copy"></i>
					</van-row>
				</div>
				<div class="coupon-item" v-if="token" @click="$router.push({ name: 'coupon', query: { choose: 1, couponCode: selectCoupon.couponCode || '' } })">
					<img src="@/assets/images/icons/gift-icon.png" />
					<div class="content">
						<p>{{ $t('cart.applyCoupon') }}</p>
						<p class="code" v-if="selectCoupon.couponCode">{{ $t('pay.couponCode') }} : {{ selectCoupon.couponCode }}</p>
					</div>
					<van-row type="flex" align="center">
						<span class="pirce" v-if="selectCoupon.couponCode">-{{ filterPriceMethod(checkOrderDetail.couponAmount) }}</span>
						<i class="icon icon-fanhui-copy"></i>
					</van-row>
				</div>
			</div>
			<div class="order-coupon">
				<h4 class="shopping-bag">
					<span class="shopping-bag-title">{{ $t('pay.shoppingBag') }}</span>
					<span class="shopping-bag-total">{{ shopListlenth }}{{ $t('cart.item') }} </span>
				</h4>
				<div class="shopping-box">
					<ul class="shopping-list">
						<li class="shopping-list-item" v-for="(item, index) in checkOrderDetail.items" v-show="item.check" :key="index">
							<van-image class="shopping-list-img" :src="$utils.imageHandler(0, item.picKey)">
								<template v-slot:loading>
									<img width="100%" height="100%" :src="$utils.platList('goodsDefaultImg', platformId)" alt="" />
								</template>
							</van-image>
							<i class="shopping-list-num">X{{ item.num }}</i>
						</li>
					</ul>
				</div>
			</div>
			<div class="order-list no-margin-bottom">
				<div class="select-address order-price">
					<label>{{ $t('pay.price') }}</label>
					<span class="order-amount thro color-999 taxes_text" style="text-decoration: line-through">{{ filterPriceMethod(checkOrderDetail.retailAmount) }}</span>
				</div>
				<div class="select-address order-price">
					<label>{{ $t('pay.subtotal') }}:</label>
					<span class="order-amount taxes_text">{{ filterPriceMethod(checkOrderDetail.subtotalAmount) }}</span>
				</div>
				<div class="select-address order-price" v-if="otherParms.payType === 5">
					<label>{{ $t('pay.codCharge') }}:</label>
					<span class="order-amount">{{ filterPriceMethod(checkOrderDetail.codFeeAmount) }}</span>
				</div>
				<div class="select-address order-price">
					<label>{{ $t('pay.Shippingfee') }}:</label>
					<span class="order-amount" v-if="checkOrderDetail.lackForFreeExpressAmount != 0">{{ filterPriceMethod(checkOrderDetail.shippingFeeAmount) }}</span>
					<span class="color-222" v-else>{{ $t('pay.free') }}</span>
				</div>
				<div class="select-address order-price order-price-detail" v-if="checkOrderDetail.promoAmount">
					<label>{{ $t('cart.promoCodeDiscount') }}:</label>
					<span class="order-amount color-red">-{{ filterPriceMethod(checkOrderDetail.promoAmount) }}</span>
				</div>
				<div class="select-address order-price order-price-detail" v-if="checkOrderDetail.couponAmount">
					<label>{{ $t('cart.couponDiscount') }}:</label>
					<span class="order-amount color-red">-{{ filterPriceMethod(checkOrderDetail.couponAmount) }}</span>
				</div>
			</div>
			<div class="order-list order-list-fixed">
				<div class="order-sum">
					<label>{{ $t('cart.total') }}:</label>
					<span class="order-amount taxes_text">{{ filterPriceMethod(checkOrderDetail.totalAmount) }}</span>
				</div>
				<van-button type="primary" class="submit-order" :disabled="isCreateOrder" @click="createOrderFun">{{ $t('pay.placeOrder') }}</van-button>
			</div>
		</div>
		<selectCountryComponent @selectCountry="selectCountryCallBack" ref="country" />
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
// import store from 'store'
import { Toast } from 'vant'
import FieldInput from '@/components/FieldInput.vue'
import mixin from './const/orderConfirm'
import selectCountryComponent from '@/components/SelectCountry.vue'
export default {
	mixins: [mixin],
	components: {
		FieldInput,
		selectCountryComponent,
	},
	created() {},
	methods: {
		shipmethodChange() {
			if (this.shippMethod < 1) return
			this.setOrderParams({ ...this.orderParams, shippingMethod: this.shippMethod })
			this.$nextTick(this.getOrderConfig)
		},
		toastShow(msg) {
			Toast.fail(msg)
		},
		gotoDetail(orderSn) {
			if (orderSn) this.$router.replace({ name: 'orderDetail', query: { orderSn } })
		},
		gotoAddress(gotoPage, object) {
			console.log('gotoAddress', gotoPage, object)
			if (gotoPage === 'newAddress') {
				this.$router.replace({ name: 'shippingAddress', query: { isDefaultAddress: 1, goBackUrl: 'shoppingCar', shippingFirst: true } })
			} else if (object.souceType === 'shipping') {
				this.$router.push({ name: 'selectAddress', query: { souceType: 'shipping' } })
			}
		},
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
			this.getOrderConfig()
				.then(() => {
					this.showPromoCode = false
					this.setOrderParams({ ...this.orderParams, promoCode: this.promoCode })
				})
				.catch(() => {
					this.showPromoCode = false
				})
		},
	},
}
</script>
<style lang="less" scoped>
@import '@/style/modules/order.less';
.order-confirm {
	padding-bottom: 118px;
	font-size: 14px;
	.select-address {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.order-price {
		padding: 4px 0;
	}
	.shopping-list-item {
		height: 96px !important;
		width: 64px !important;
	}
	.shopping-list-num {
		width: 32px;
		height: 32px;
		line-height: 32px;
		position: absolute;
		background: #fff;
		bottom: -4px;
		right: -4px;
		font-size: 6px;
		color: #222;
		transform: scale(0.5);
		border-radius: 50%;
		text-align: center;
	}
	.shopping-list-img {
		width: 100%;
		height: 100%;
	}
	/deep/ .van-form {
		background: #fff;
		padding: 0 16px;
		font-size: 14px;
		h2 {
			font-weight: 500;
			color: #222222;
			margin-top: 16px;
			font-size: 14px;
		}
		.email {
			.field-input__label {
				color: #222222;
				font-weight: 500;
				top: 4px;
			}
		}
	}
	.email {
		position: relative;
		border-top: 20px solid #fff;
		margin-bottom: 10px;
		padding-bottom: 20px;
		box-sizing: content-box;
	}
	.email::before {
		content: '';
		position: absolute;
		bottom: 0;
		height: 10px;
		background: #f5f5f5;
		width: 100vw;
		left: -16px;
	}
	.bill {
		position: relative;
		padding: 20px 0 30px;
		/deep/ .van-radio-group {
			display: flex;
			justify-content: space-between;
			margin-top: 20px;
			.van-radio {
				width: 160px;
				&:last-child {
					flex: 1;
				}
				.van-radio__label {
					margin-left: 4px;
				}
			}
		}
		/deep/ .van-radio__icon {
			height: 18px;
			width: 18px;
			// display: flex;
			// align-items: center;
		}
	}
	.bill::after {
		content: '';
		position: absolute;
		top: 0;
		height: 10px;
		background: #f5f5f5;
		width: 100vw;
		left: -16px;
	}
	.bill::before {
		content: '';
		position: absolute;
		bottom: 0;
		height: 10px;
		background: #f5f5f5;
		width: 100vw;
		left: -16px;
	}

	.order-sum {
		display: flex;
		justify-content: space-between;
		padding-bottom: 16px;
		padding-top: 0;
		font-weight: 700;
		color: #222;
		.order-amount {
			font-size: 18px;
			color: #222;
		}
	}
	.border-top {
		margin-top: 15px;
		padding-top: 16px;
		border-top: 1px solid #f5f5f5;
		position: relative;
	}
	.border-top::after {
		content: '';
		position: absolute;
		background: url('~@/assets/images/order-confirm-bg.png');
		background-size: 100% 100%;
		width: 375px;
		height: 3px;
		bottom: -16px;
		left: -16px;
	}
	.order-list {
		font-size: 14px;
		&.no-margin-bottom {
			margin-bottom: 0;
		}
		.order-price {
			line-height: 30px;
			.order-amount {
				font-size: 13px;
			}
		}
		.order-price-detail {
			height: auto;
			color: #222;
		}

		h2 {
			width: 100%;
			font-size: @font-size-md;
			font-weight: @fW-7;
			line-height: 17px;
			margin-bottom: 10px;
		}

		.adress {
			line-height: 17px;
			font-size: 12px;
		}

		.order-shipmethod {
			.shipmethod-list {
				border-bottom: 1px solid #f5f5f5;
				padding-bottom: 14px;
				.shipmethod-radio {
					display: flex;
					justify-content: space-between;
					padding: 12px 0 2px;
				}

				.delivry-data {
					font-size: 14px;
					color: #666;
					margin-left: 24px;
					line-height: 14px;
				}
				/deep/ .van-radio__icon {
					height: 18px;
					width: 18px;
					line-height: 18px;
				}
				/deep/ .van-radio__label {
					line-height: 17px;
					font-size: 14px;
				}
			}
			.shipmethod-list:nth-last-child(1) {
				border: 0;
			}
		}
		.icon-fanhui-copy {
			color: #999;
		}
		/deep/ .address-list {
			padding: 0;
		}
	}

	.order-list-payment-method {
		padding-bottom: 0;
	}

	.coupon {
		padding: 0 16px;
		.coupon-item {
			border-bottom: 1px solid #f5f5f5;
			padding: 16px 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			img {
				width: 22px;
			}
			.content {
				margin-left: 10px;
				margin-right: 20px;
				line-height: 17px;
				flex: 1;
			}
			.pirce {
				font-size: 14px;
				color: #e81027;
				display: inline-block;
			}
			.code {
				color: #999;
			}
		}
		.coupon-item:nth-last-child(1) {
			border: 0;
		}
	}
	.order-coupon .shopping-bag {
		padding-top: 0;
	}
	.order-total label {
		font-size: 14px;
	}

	.order-list-fixed {
		box-shadow: 0px 1px 0px 0px #f5f5f5 inset;
		max-width: 375px;
		position: fixed;
		bottom: 0;
		background: #fff;
		margin-bottom: 0;
		padding-bottom: 30px;
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

.katakana {
	max-width: 175px;
	line-height: 1.2;

	.item {
		display: flex;
		min-width: 150px;

		.first {
			text-align: left;
			margin-right: 5px;
		}

		span {
			text-align: right;
			flex: 1;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			margin-left: 0;
			line-height: 1;
			font-size: 18px;
		}
	}

	.item.small {
		span {
			font-size: 14px !important;
		}
	}
}
</style>
