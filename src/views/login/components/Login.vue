<template>
	<div class="login">
		<field-input :value.sync="form.userEmail" :label="$t('login.emailAddress')" :error="errorEmail" @onblur="blurEmail"></field-input>
		<field-input :value.sync="form.userPassword" :label="$t('login.password')" :error="errorPassword" type="password" @onblur="blurPassword"></field-input>
		<p class="login__forgotten">
			<span @click="forget">{{ $t('login.forgotYourPassword') }}</span>
		</p>
		<div class="login-submit-box">
			<van-button class="submit-btn-44" block @click="submit('login')">{{ $t('login.signIn') }}</van-button>
		</div>
	</div>
</template>
<script>
import FieldInput from './FieldInput.vue'
import login from '@/mixins/login.js'

export default {
	mixins: [login],
	data() {
		return {
			isShow: false, // 是否显示密码
		}
	},
	components: {
		FieldInput,
	},
	methods: {
		// 切换密码显隐藏：
		switchPassword() {
			this.isShow = !this.isShow
		},
		// 忘记密码：
		forget() {
			this.$router.push({
				path: '/reset_password',
				query: {
					userEmail: this.form.userEmail || '',
				},
			})
		},
	},
}
</script>
<style scoped lang="less">
@import '@/style/variable.less';

.login {
	padding-top: 26px;

	.login__forgotten {
		text-align: right;
		color: @color-666;
		font-size: 14px;
		line-height: 17px;
	}
}
</style>
