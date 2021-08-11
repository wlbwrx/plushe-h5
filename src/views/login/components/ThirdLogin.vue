<template>
	<div class="login-register__join">
		<h3 class="join-tit">
			<span>{{ $t('login.signInWith') }}</span>
		</h3>
		<!-- app走fullter提供的方法 -->
		<ul class="join-list" v-if="client == 'ios' || client == 'android'">
			<li class="join-item" @click="thirdLogin(1)">
				<img class="join-logo" src="@/assets/images/signin_icon_google.png" />
			</li>
			<li class="join-item" @click="thirdLogin(2)">
				<img class="join-logo" src="@/assets/images/signin_icon_facebook.png" />
			</li>
			<li class="join-item" @click="thirdLogin(3)" v-if="client == 'ios'">
				<img class="join-logo" src="@/assets/images/signin_icon_apple.png" />
			</li>
		</ul>
		<!-- h5走前端对接的三方方法 -->
		<ul class="join-list" v-else>
			<li class="join-item" @click="thirdLogin(1)" v-google-signin-button="">
				<img class="join-logo" src="@/assets/images/signin_icon_google.png" />
			</li>
			<li class="join-item" @click="thirdLogin(2)" v-facebook-signin-button="">
				<img class="join-logo" src="@/assets/images/signin_icon_facebook.png" />
			</li>
			<li class="join-item" @click="lineLogin()" v-if="platformId == 3">
				<img class="join-logo" src="@/assets/images/signin_icon_line.png" />
			</li>
		</ul>
	</div>
</template>

<script>
import { Toast } from 'vant'
import axios from 'axios'
import queryString from 'querystring'
import OAuthRequest from '../common/OAuthRequest'
import linq from 'linq'
import { mapState } from 'vuex'

export default {
	data() {
		return {
			type: 0, // 登录方式 1-google, 2-facebook, 3-apple
		}
	},
	directives: {
		'facebook-signin-button': {
			bind: function (el, binding, vnode) {
				console.log(vnode.context, '----fasdfs')
				CheckComponentMethods()
				let facebookSignInAPI = document.createElement('script')
				facebookSignInAPI.setAttribute('src', '//connect.facebook.net/en_US/sdk.js')
				document.head.appendChild(facebookSignInAPI)

				facebookSignInAPI.onload = InitFacebookButton

				function InitFacebookButton() {
					window.FB.init({
						appId: vnode.context.platformConfig.fbLoginID,
						xfbml: true,
						version: 'v3.1',
					})
					window.FB.logout()
				}

				// 点击按钮时:
				el.addEventListener('click', PopUp)

				function PopUp() {
					FB.login(
						function (facebookResponse) {
							if (facebookResponse.status === 'connected') {
								OnSuccess(facebookResponse.authResponse.accessToken)
							} else {
								Onfail()
							}
							// {scope: 'email public_profile user_photos user_birthday user_gender'}
						},
						{ scope: 'email, public_profile' }
					)
				}

				function OnSuccess(token) {
					vnode.context.OnFacebookAuthSuccess(token)
				}

				function Onfail() {
					vnode.context.OnFacebookAuthFail('Facebook sign-in failed')
				}

				function CheckComponentMethods() {
					if (!vnode.context.OnFacebookAuthSuccess) {
						throw new Error('The method OnFacebookAuthSuccess must be defined on the component')
					}

					if (!vnode.context.OnFacebookAuthFail) {
						throw new Error('The method OnFacebookAuthFail must be defined on the component')
					}
				}
			},
		},
		'google-signin-button': {
			bind: function (el, binding, vnode) {
				CheckComponentMethods()
				let googleSignInAPI = document.createElement('script')
				googleSignInAPI.setAttribute('src', 'https://apis.google.com/js/api:client.js')
				document.head.appendChild(googleSignInAPI)

				googleSignInAPI.onload = InitGoogleButton

				function InitGoogleButton() {
					window.gapi.load('auth2', () => {
						const auth2 = window.gapi.auth2.init({
							client_id: vnode.context.platformConfig.googleLoginID,
							cookiepolicy: 'single_host_origin',
						})
						// 点击按钮:
						auth2.attachClickHandler(el, {}, OnSuccess, Onfail)
					})
				}

				function OnSuccess(googleUser) {
					console.log(googleUser, googleUser.getAuthResponse(true))
					vnode.context.OnGoogleAuthSuccess(googleUser.getAuthResponse().id_token)
					googleUser.disconnect()
				}

				function Onfail(error) {
					vnode.context.OnGoogleAuthFail(error)
				}

				function CheckComponentMethods() {
					if (!vnode.context.OnGoogleAuthSuccess) {
						throw new Error('The method OnGoogleAuthSuccess must be defined on the component')
					}

					if (!vnode.context.OnGoogleAuthFail) {
						throw new Error('The method OnGoogleAuthFail must be defined on the component')
					}
				}
			},
		},
	},
	computed: {
		...mapState({
			client: (state) => state.app.client, // app 才有, 值: ios | android
		}),
	},
	created() {},
	mounted() {},
	activated() {
		const { code } = queryString.parse(window.location.search.replace('?', ''))
		if (!code) return
		// this.getToken(code)
		this.getToken(code)
	},
	methods: {
		// 谷歌登录:
		OnGoogleAuthSuccess(idToken) {
			this.loading()
			this.toLogin(idToken)
		},
		OnGoogleAuthFail(error) {
			Toast(this.$t('login.hint24'))
			console.log(error)
		},
		// facebook 登录:
		OnFacebookAuthSuccess(idToken) {
			this.loading()
			this.toLogin(idToken)
		},
		OnFacebookAuthFail(error) {
			Toast(this.$t('login.hint23'))
			console.log(error)
		},
		// 点击了三方登录按钮:
		thirdLogin(type) {
			this.type = type
			// 如果是APP,则走Fullter 对接三方返回的idToken
			if (this.client == 'ios' || this.client == 'android') {
				let method = (type == 1 && 'googleSignIn') || (type == 2 && 'facebookSignIn') || (type == 3 && 'appleSignIn')
				this.loading()
				window.flutter_inappwebview
					.callHandler('callNativeMethod', {
						method: method,
					})
					.then((res) => {
						if (res.result) {
							this.toLogin(res.data)
						} else {
							Toast(this.$t('login.accessDenied'))
						}
					})
			}
		},
		// 执行后台登录操作:
		toLogin(idToken) {
			let type = this.type
			const params = {
				authType: type,
				thirdToken: idToken,
				shopsId: this.shopsId || undefined,
			}
			this.$store.dispatch('user/ThirdLogin', params).then((data) => {
				this.goPageDel(data.newPerson)
				// 将购物车数据上传：
				this.$store.dispatch('shopCar/addItems')
				// 批量加收藏:
				this.$store.dispatch('wish/addBatchWishList')
				// 数据上报:
				this.reportGtag(data.newPerson ? 'sign_up' : 'login', {
					method: (type == 1 && 'Google') || (type == 2 && 'Fackbook') || (type == 3 && 'Apple'),
				})
				this.reportGtag(
					data.newPerson ? 'sign_up' : 'login',
					{
						method: (type == 1 && 'Google') || (type == 2 && 'Fackbook') || (type == 3 && 'Apple'),
					},
					'GA4'
				)
				this.reportFB(
					data.newPerson ? 'SignUp' : 'Login',
					{
						methods: (type == 1 && 'Google') || (type == 2 && 'Fackbook') || (type == 3 && 'Apple'),
					},
					true
				)
			})
		},
		// 新增line登录判断
		lineLogin() {
			// 跳转之前判断当前页面的上一级页面，以便返回登录之前的页面
			sessionStorage.directUrl = this.$route.query.redirect || ''
			// line授权
			const url = 'https://access.line.me/oauth2/v2.1/authorize'
			let params = {
				response_type: 'code',
				client_id: this.platformConfig.lineId,
				redirect_uri: location.protocol + '//' + location.host + '/login',
				state: Math.random().toString(32).substring(2),
				scope: 'openid profile email',
				prompt: 'consent',
				bot_prompt: 'aggressive',
			}
			window.location.href = `${url}?${queryString.stringify(params)}`
		},
		async getToken(code) {
			const result = new OAuthRequest({
				code: code,
				clientId: this.platformConfig.lineId,
				clientSecret: this.platformConfig.lineSecret,
				redirectUri: location.protocol + '//' + location.host + '/login',
			})
			const params = new URLSearchParams()
			linq.from(result.getPostable())
				.select((x) => params.append(x.key, x.value))
				.toArray()
			const { data } = await axios.post('https://api.line.me/oauth2/v2.1/token', params)
			// return new OAuthResult(data)
			this.thirdLogin1(data.id_token)
		},
		thirdLogin1(token) {
			const params = {
				authType: 4,
				thirdToken: token,
				shopsId: this.shopsId || undefined,
			}
			this.$store.dispatch('user/ThirdLogin', params).then((data) => {
				this.goPageDel(data.newPerson, 'line')
				// 将购物车数据上传：
				this.$store.dispatch('shopCar/addItems')
				// 批量加收藏:
				this.$store.dispatch('wish/addBatchWishList')
				// 数据上报:
				this.reportGtag(data.newPerson ? 'sign_up' : 'login', {
					method: 'Line',
				})
				this.reportFB(
					data.newPerson ? 'SignUp' : 'Login',
					{
						methods: 'Line',
					},
					true
				)
			})
		},
		// 跳转判断:
		goPageDel(isNewPerson, type) {
			Toast.clear()
			if (isNewPerson) {
				this.$router.push({
					path: '/register_success',
					query: {
						redirect: type ? sessionStorage.directUrl : this.$route.query.redirect,
					},
				})
			} else {
				this.$router.push({
					path: type ? sessionStorage.directUrl || '/' : this.$route.query.redirect || '/',
				})
			}
		},
		// 加载:
		loading() {
			Toast.loading({
				loadingType: 'spinner',
				forbidClick: true,
				message: this.$t('loading'),
				duration: 0,
			})
		},
	},
}
</script>

<style scoped lang="less">
@import '@/style/variable.less';

.login-register__join {
	margin-top: 50px;
	text-align: center;
	padding-bottom: 20px;

	.join-tit {
		font-size: 16px;
		line-height: 19px;
		margin-bottom: 20px;
		color: #666;

		span {
			position: relative;

			&::after {
				content: '';
				position: absolute;
				right: -55px;
				top: 50%;
				transform: translateY(-50%);
				width: 45px;
				border-bottom: 1px solid #c4c4c4;
			}

			&::before {
				content: '';
				position: absolute;
				left: -55px;
				top: 50%;
				transform: translateY(-50%);
				width: 45px;
				border-bottom: 1px solid #c4c4c4;
			}
		}
	}

	.join-list {
		display: flex;
		justify-content: center;

		.join-item {
			margin-right: 24px;

			&:last-child {
				margin-right: 0;
			}

			.join-logo {
				width: 44px;
				height: 44px;
			}
		}
	}
}
</style>
