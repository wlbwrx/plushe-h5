<template>
	<div class="shipping-address header-title">
		<div v-show="!showCountry">
			<img v-if="!hideBuZhouImg" class="sa__bz-img" :src="$utils.platList('buzhou', platformId)" alt="" />
			<van-form validate-first @submit="onSubmit">
				<div class="sa__field">
					<field-input :value.sync="param.firstName" :label="$t('addressForm.label2')" :rules="[{ pattern: platformId == 3 ? /\S/ : userNameValidator, message: $t('addressForm.text2') }]"></field-input>
				</div>
				<div class="sa__field">
					<field-input :value.sync="param.lastName" :label="$t('addressForm.label3')" :rules="[{ pattern: platformId == 3 ? /\S/ : userNameValidator, message: $t('addressForm.text3') }]"></field-input>
				</div>
				<template v-if="platformId == 3">
					<div class="sa__field">
						<field-input :value.sync="param.katakanaFirstName" label="*姓（カナ）" :rules="[{ required: true, message: $t('addressForm.text14') }]"></field-input>
					</div>
					<div class="sa__field">
						<field-input :value.sync="param.katakanaLastName" label="*名（カナ)" :rules="[{ required: true, message: $t('addressForm.text15') }]"></field-input>
					</div>
				</template>
				<template v-if="platformId == 3">
					<div class="sa__field">
						<field-input v-model="fieldValue" is-link readonly :label="$t('addressForm.label11')" :placeholder="$t('addressForm.text13')" @clickInput="showJPPicker = true" />
						<van-popup v-model="showJPPicker" round position="bottom">
							<van-cascader v-model="cascaderValue" :options="jpCountry" @close="showJPPicker = false" @finish="onFinish" :field-names="{ text: 'name', value: 'name' }" />
						</van-popup>
					</div>
				</template>
				<div class="sa__field">
					<field-input :value.sync="param.firstAddress" :label="$t('addressForm.label7')" :rules="[{ required: true, message: $t('addressForm.text7') }]"></field-input>
				</div>
				<div class="sa__field" v-if="platformId != 3">
					<field-input :value.sync="param.secondAddress" :label="$t('addressForm.label8')"></field-input>
				</div>
				<template v-if="platformId != 3">
					<div class="sa__field">
						<field-input :value.sync="param.country" :label="$t('addressForm.label1')" :readonly="true" rightIcon="arrow" @clickInput="selectCountryClick"></field-input>
					</div>
					<div class="sa__field" v-show="provinces.length">
						<field-input :value.sync="param.state" :label="$t('addressForm.label5')" :readonly="true" rightIcon="arrow" @clickInput="showPicker = true"></field-input>
						<van-popup v-model.trim="showPicker" class="province-show" round position="bottom">
							<van-picker show-toolbar :columns="provinces" @cancel="showPicker = false" @confirm="onConfirm" confirm-button-text="confirm" cancel-button-text="cancel" value-key="code" />
						</van-popup>
					</div>
					<div class="sa__field">
						<field-input :value.sync="param.city" :label="$t('addressForm.label6')" maxlength="60" :rules="[{ pattern: cityValidator, message: $t('addressForm.text5') }]"></field-input>
					</div>
				</template>
				<div class="sa__field">
					<field-input :value.sync="param.postCode" :label="$t('addressForm.label9')" :maxlength="postCodeLength" :rules="[{ pattern: postCodeValidator, message: $t('addressForm.text6') }]"></field-input>
				</div>
				<div class="sa__field">
					<field-input :value.sync="param.phoneNumber" :label="`*${param.phoneCode ? param.phoneCode + ' | ' : ''} ${$t('addressForm.label4')}`" maxlength="16" :rules="[{ pattern: phoneValidator, message: $t('addressForm.text4') }]"></field-input>
				</div>
				<div class="sa__field field-switch">
					<span>{{ $t('addressForm.label10') }}</span>
					<van-switch active-color="#222" :active-value="1" :inactive-value="0" inactive-color="#f5f5f5" v-model.trim="param.isDefaultAddress" size="20" />
				</div>
				<div class="submit-btn">
					<van-button class="submit-order" type="primary" native-type="submit">{{ $t('save') }}</van-button>
				</div>
			</van-form>
		</div>
		<selectCountryComponent @selectCountry="selectCountryCallBack" ref="country" />
	</div>
</template>
<script>
import mixin from './shipping'
import FieldInput from '@/components/FieldInput.vue'

import { Toast } from 'vant'
export default {
	mixins: [mixin],
	components: {
		FieldInput,
	},
	methods: {
		errToast(result, msg) {
			if (result === 'success') {
				Toast.success(msg)
			} else {
				Toast.fail(msg)
			}
		},
	},
}
</script>
<style lang="less" scoped>
/deep/ .van-field__control {
	justify-content: flex-end;
}
/deep/ .van-cell__title {
	font-size: 16px;
	color: #222;
}
/deep/ .van-cell__label {
	font-size: 16px;
	color: #222;
	font-weight: bold;
}
.phone-number {
	/deep/ .van-field__label {
		width: auto;
		flex-grow: 0;
	}
}
.province-show {
	max-width: 375px;
	left: 50%;
	transform: translate(-50%, 0);
}
.address-showname {
	font-size: 14px;
	color: #999;
	p {
		margin-left: 16px;
	}
	/deep/ .van-field {
		padding-top: 0px;
	}
}
.sa__bz-img {
	width: 375px;
	margin-bottom: 10px;
}
.sa__field {
	padding: 0 16px;
	background: #fff;
	&.field-switch {
		margin: 10px 0;
		color: #222;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
	}
}
</style>
