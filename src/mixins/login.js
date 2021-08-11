import http from '@/api/user.js'
import { Toast } from 'vant'

export default {
	data() {
		return {
			form: {
				userEmail: '',
				userPassword: '',
			},
			errorEmail: '',
			errorPassword: '',
			btnHaveClick: true, // 按钮是否可以点击，防接口长时间不返回，用户再次触发按钮问题
		}
	},
	methods: {
		blurEmail() {
			const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
			if (!this.form.userEmail) {
				this.errorEmail = this.$t('login.hint2')
			} else if (!reg.test(this.form.userEmail)) {
				this.errorEmail = this.$t('login.hint5')
			} else {
				this.errorEmail = ''
				// 将正确格式的邮箱存入：
				this.$store.commit('user/SET_USEREMAIL', this.form.userEmail)
			}
		},
		blurPassword() {
			const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,20}$/
			if (!this.form.userPassword) {
				this.errorPassword = this.$t('login.hint6')
			} else if (!reg.test(this.form.userPassword)) {
				this.errorPassword = this.$t('login.hint1')
			} else {
				this.errorPassword = ''
			}
		},
		submit(formName, type) {
			this.blurEmail()
			if (formName != 'sendRestEmail') this.blurPassword()
			if (this.errorEmail || this.errorPassword) return
			if (this.btnHaveClick) this[formName](type)
		},
		login() {
			let params = Object.assign({ authType: 0 }, this.form)
			this.btnHaveClick = false
			this.$store
				.dispatch('user/Login', params)
				.then(() => {
					this.btnHaveClick = true
					this.reportGtag('login', {
						method: 'Email',
					})
					this.reportGtag(
						'login',
						{
							method: 'Email',
						},
						'GA4'
					)
					this.reportFB(
						'Login',
						{
							method: 'Email',
						},
						true
					)
					// 登录后，立马将购车数据上传：
					this.$store
						.dispatch('shopCar/addItems')
						.then(() => {
							this.$router.push({
								path: this.$route.query.redirect || '/',
							})
						})
						.catch(() => {
							this.$router.push({
								path: this.$route.query.redirect || '/',
							})
						})
					// 批量加收藏:
					this.$store.dispatch('wish/addBatchWishList')
				})
				.catch(() => {
					this.btnHaveClick = true
				})
		},
		register() {
			let params = Object.assign({ authType: 0, shopsId: this.$store.getters.shopsId || undefined }, this.form)
			this.btnHaveClick = false
			this.$store
				.dispatch('user/Register', params)
				.then(() => {
					this.btnHaveClick = true
					this.reportGtag('sign_up', {
						method: 'Email',
					})
					this.reportGtag(
						'sign_up',
						{
							method: 'Email',
						},
						'GA4'
					)

					// 注册成功以后需要关闭弹窗
					this.reportFB(
						'SignUp',
						{
							method: 'Email',
						},
						true
					)
					this.$store
						.dispatch('shopCar/addItems')
						.then(() => {
							this.$router.push({
								path: '/register_success',
								query: {
									redirect: this.$route.query.redirect,
								},
							})
						})
						.catch(() => {
							this.$router.push({
								path: '/register_success',
								query: {
									redirect: this.$route.query.redirect,
								},
							})
						})
					// 批量加收藏:
					this.$store.dispatch('wish/addBatchWishList')
				})
				.catch(() => {
					this.btnHaveClick = true
				})
		},
		sendRestEmail(type) {
			let params = {
				authEmail: this.form.userEmail,
			}
			this.btnHaveClick = false
			http.sendEmail(params)
				.then(() => {
					this.btnHaveClick = true
					this.progress = 1
					if (type == 1) {
						Toast(this.$t('login.emailSent'))
					}
				})
				.catch(() => {
					this.btnHaveClick = true
				})
		},
		// 将store 中的邮箱赋值给当前：
		setEmail() {
			this.form.userEmail = this.$store.state.user.userEmail
			this.form.userPassword = ''
			this.errorPassword = ''
		},
	},
}
