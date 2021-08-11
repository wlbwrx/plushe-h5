<template>
	<div class="register">
		<field-input :value.sync="form.userEmail" :label="$t('login.emailAddress')" :error="errorEmail" @onblur="blurEmail"></field-input>
		<field-input :value.sync="form.userPassword" :label="$t('login.password')" type="password" @onblur="blurPassword"></field-input>
		<p class="register__tips">
			<span v-if="!errorPassword">{{ $t('login.hint1') }}</span>
			<span v-else class="register__tips-red">{{ errorPassword }}</span>
		</p>
		<div class="login-submit-box">
			<van-button class="submit-btn-44" block @click="submit('register')">{{ $t('login.register') }}</van-button>
		</div>
		<p class="register__coupon-tips" v-if="$store.getters.newPeopleCouponVal">
			{{ $t('login.hint10', { newPeopleCouponVal: filterPriceMethod($store.getters.newPeopleCouponVal) }) }}
		</p>
	</div>
</template>
<script>
import FieldInput from './FieldInput.vue'
import login from '@/mixins/login.js'

export default {
	mixins: [login],
	data() {
		return {}
	},
	components: {
		FieldInput,
	},
	methods: {
		// Privacy & Cookies Policy
		goPage(id) {
			this.$router.push({
				path: '/otherInfo',
				query: {
					id: id,
				},
			})
		},
	},
}
</script>
<style scoped lang="less">
@import '@/style/variable.less';

.register {
	padding-top: 26px;
	.register__tips {
		font-size: 12px;
		color: @color-999;
		line-height: 13px;
	}
	.register__tips-red {
		color: @color-red;
	}
	.register__coupon-tips {
		color: @color-red;
		font-size: 14px;
		line-height: 17px;
		font-weight: 500;
		margin-top: 14px;
		text-align: center;
	}
}
</style>
