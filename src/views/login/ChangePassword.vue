<template>
	<div class="reset-new">
		<nav-bar :title="$t('my.changePassword')" border></nav-bar>
		<field-input :value.sync="form.oldCertificate" :label="$t('my.oldPassword')" type="password" :error="errorOld" @onblur="blurOld"></field-input>
		<field-input :value.sync="form.newCertificate" :label="$t('login.hint19')" type="password" :error="errorNew" @onblur="blurNew"></field-input>
		<field-input :value.sync="form.confirmPassword" :label="$t('login.hint20')" :error="errorConfirm" type="password" @onblur="blurConfirm"></field-input>
		<div class="login-submit-box">
			<van-button class="submit-btn-44" block @click="submit">{{ $t('submit') }}</van-button>
		</div>
	</div>
</template>

<script>
import { Toast } from 'vant'
import FieldInput from './components/FieldInput.vue'
import NavBar from '@/components/navbar/index.vue'
import http from '@/api/user.js'
import { mapState, mapMutations } from 'vuex'

export default {
	data() {
		return {
			form: {
				authEmail: '',
				newCertificate: '',
				oldCertificate: '',
				confirmPassword: '',
				resetType: 0,
			},
			errorOld: '',
			errorNew: '',
			errorConfirm: '',
		}
	},
	components: {
		FieldInput,
		NavBar,
	},
	created() {},
	computed: {
		...mapState('user', {
			user: 'user',
		}),
	},
	methods: {
		...mapMutations('user', {
			SET_USER: 'SET_USER',
		}),
		blurOld() {
			const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,20}$/
			if (!this.form.oldCertificate) {
				this.errorOld = this.$t('login.hint6')
			} else if (!reg.test(this.form.oldCertificate)) {
				this.errorOld = this.$t('login.hint1')
			} else {
				this.errorOld = ''
			}
		},
		blurNew() {
			const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,20}$/
			if (!this.form.newCertificate) {
				this.errorNew = this.$t('login.hint6')
			} else if (!reg.test(this.form.newCertificate)) {
				this.errorNew = this.$t('login.hint1')
			} else {
				this.errorNew = ''
			}
		},
		blurConfirm() {
			this.errorConfirm = this.form.confirmPassword !== this.form.newCertificate ? this.$t('login.hint21') : ''
		},
		submit() {
			this.blurOld()
			this.blurNew()
			this.blurConfirm()
			if (this.errorConfirm || this.errorOld || this.errorNew) return
			this.form.authEmail = this.user.userEmail

			http.modify(this.form).then((res) => {
				const data = res.data
				this.SET_USER(data)

				Toast({
					message: this.$t('login.hint4'),
					type: 'success',
					duration: 3000,
				})
				let timer = setTimeout(() => {
					clearTimeout(timer)
					this.$router.go(-1)
				}, 3000)
			})
		},
	},
}
</script>

<style lang="less" scope>
.reset-new {
	padding: 10px 16px;
	min-height: 100vh;
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
