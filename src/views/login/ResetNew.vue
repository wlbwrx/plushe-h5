<template>
	<div class="reset-new">
		<nav-bar :title="$t('login.hint17')" border :leftArrow="false"></nav-bar>
		<template>
			<p class="reset-new-desc">
				{{ $t('login.hint18') }}
			</p>
			<field-input :value.sync="form.newCertificate" :label="$t('login.hint19')" type="password" @onblur="blurPassword" hideIcon></field-input>
			<p class="register__tips">
				<span v-if="!errorPassword">{{ $t('login.hint1') }}</span>
				<span v-else class="register__tips-red">{{ errorPassword }}</span>
			</p>
			<field-input :value.sync="form.confirmPassword" :label="$t('login.hint20')" :error="errorConfirm" type="password" @onblur="blurConfirm" hideIcon></field-input>
			<div class="login-submit-box">
				<van-button class="submit-btn-44" block @click="submit">{{ $t('save') }}</van-button>
			</div>
		</template>
	</div>
</template>

<script>
import { Toast } from 'vant'
import FieldInput from './components/FieldInput.vue'
import NavBar from '@/components/navbar/index.vue'
import http from '@/api/user.js'

export default {
	data() {
		return {
			form: {
				newCertificate: '',
				confirmPassword: '',
			},
			errorPassword: '',
			errorConfirm: '',
			isExpired: false, // 链接是否过期
		}
	},
	components: {
		FieldInput,
		NavBar,
	},
	created() {},
	methods: {
		blurPassword() {
			const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,20}$/
			if (!this.form.newCertificate) {
				this.errorPassword = this.$t('login.hint6')
			} else if (!reg.test(this.form.newCertificate)) {
				this.errorPassword = this.$t('login.hint1')
			} else {
				this.errorPassword = ''
			}
		},
		blurConfirm() {
			this.errorConfirm = this.form.confirmPassword !== this.form.newCertificate ? this.$t('login.hint21') : ''
		},
		submit() {
			this.blurPassword()
			this.blurConfirm()
			if (this.errorConfirm || this.errorPassword) return
			const params = {
				resetType: 1,
				newCertificate: this.form.newCertificate,
				emailToken: this.$route.query.emailToken ? decodeURI(this.$route.query.emailToken) : '',
			}
			http.reset(params).then(() => {
				Toast({
					message: this.$t('login.hint22'),
					// type: 'success',
					duration: 3000,
					forbidClick: true,
				})
				let timer = setTimeout(() => {
					this.$router.replace({
						path: '/login',
						query: {
							redirect: '/',
						},
					})
					clearTimeout(timer)
				}, 3000)
			})
		},
	},
}
</script>

<style lang="less" scope>
.reset-new {
	padding: 10px 16px;
	height: 100%;
}
.reset-new-desc {
	color: #222;
	font-size: 14px;
	line-height: 17px;
	margin-bottom: 20px;
}
.register__tips {
	font-size: 12px;
	color: #999;
	line-height: 13px;
	margin-bottom: 10px;
}
.register__tips-red {
	color: #e84646;
}
.reset-new__expired {
	text-align: center;
	padding-top: 60px;
}
.expired-icon {
	font-size: 50px;
}
.expired-desc {
	color: #222;
	font-size: 14px;
	line-height: 17px;
	margin-top: 20px;
}
</style>
