<template>
	<div id="app" :class="{ bondot: platformId == 3 }" v-cloak>
		<Header v-if="$route.meta.showHeader" />
		<keep-alive>
			<router-view v-if="isRouterAlive && $route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="isRouterAlive && !$route.meta.keepAlive"></router-view>

		<!-- tabbar -->
		<tabbar v-show="$route.meta.showTabbar && showTabbar"></tabbar>

		<slide-coupon v-if="isMounted && !hideSlideCoupon"></slide-coupon>
		<!-- Messenger 聊天插件 Code -->
		<div v-if="platformId === 1" v-show="showFBRoot" id="fb-root"></div>
		<!-- Your 聊天插件 code -->
		<div id="fb-customer-chat" class="fb-customerchat"></div>
	</div>
</template>

<script>
import Header from '@/components/header.vue'
import Tabbar from '@/components/tabbar/index.vue'
import SlideCoupon from '@/components/SlideCoupon.vue'
import { getQueryString } from '@/utils/index'
import { mapState, mapActions } from 'vuex'
import { osVersion, osName, browserVersion, browserName } from 'mobile-device-detect'

export default {
	components: {
		Tabbar,
		Header,
		SlideCoupon,
	},
	provide() {
		return {
			reload: this.reload,
			isMounted: this.isMounted,
		}
	},
	created() {},
	data() {
		return {
			isRouterAlive: true,
			isMounted: false,
		}
	},
	computed: {
		...mapState('user', ['slideCouponHide']),
		showTabbar() {
			return !this.shopsId && !this.$route.query.hideTabbar
		},
		hideSlideCoupon() {
			return this.token || !this.$route.meta.showSlideCoupon || this.slideCouponHide
		},
		showFBRoot() {
			const nextRoute = ['Home', 'goodsFilter', 'goodsDetail']
			return nextRoute.includes(this.$route.name)
		},
	},
	mounted() {
		this.mountedLoad()
	},
	methods: {
		...mapActions({
			getNewPeopleCoupon: 'user/getNewPeopleCoupon',
			getFreeShipping: 'app/getFreeShipping',
		}),
		reload() {
			this.isRouterAlive = false
			this.$nextTick(() => {
				this.isRouterAlive = true
			})
		},
		loadFBChat() {
			// 聊天代码:
			window.fbAsyncInit = function () {
				FB.init({
					xfbml: true,
					version: 'v11.0',
				})
			}
			// messenger
			var param = {
				chatState: 1,
				path: 2,
				showUpgradePrompt: 'not_shown',
				v: 0,
				visibility: 'hidden',
			}
			localStorage.setItem('__fb_chat_plugin', JSON.stringify(param))
			var chatbox = document.getElementById('fb-customer-chat')
			chatbox.setAttribute('page_id', '106370298179108')
			chatbox.setAttribute('attribution', 'biz_inbox')
			let script = document.createElement('script')
			script.src = `https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js`
			script.id = 'facebook-jssdk'
			script.async = true
			document.body.appendChild(script)
			script = null
		},
		loadHotjar() {
			// 仅正式环境才使用:
			// 线上plushe 热图---7月9号添加
			!(function (h, o, t, j, a, r) {
				h.hj =
					h.hj ||
					function () {
						;(h.hj.q = h.hj.q || []).push(arguments)
					}
				h._hjSettings = {
					hjid: 2495446,
					hjsv: 6,
				}
				a = o.getElementsByTagName('head')[0]
				r = o.createElement('script')
				r.async = 1
				r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv
				a.appendChild(r)
			})(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=')
		},
		loadTiktok() {
			// 抖音上报代码:
			!(function (w, d, t) {
				w.TiktokAnalyticsObject = t
				var ttq = (w[t] = w[t] || [])
				;(ttq.methods = ['page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie']),
					(ttq.setAndDefer = function (t, e) {
						t[e] = function () {
							t.push([e].concat(Array.prototype.slice.call(arguments, 0)))
						}
					})
				for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i])
				;(ttq.instance = function (t) {
					for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n])
					return e
				}),
					(ttq.load = function (e, n) {
						var i = 'https://analytics.tiktok.com/i18n/pixel/events.js'
						;(ttq._i = ttq._i || {}), (ttq._i[e] = []), (ttq._i[e]._u = i), (ttq._t = ttq._t || {}), (ttq._t[e] = +new Date()), (ttq._o = ttq._o || {}), (ttq._o[e] = n || {})
						var o = document.createElement('script')
						;(o.type = 'text/javascript'), (o.async = !0), (o.src = i + '?sdkid=' + e + '&lib=' + t)
						var a = document.getElementsByTagName('script')[0]
						a.parentNode.insertBefore(o, a)
					})

				//part2
				ttq.load('C40HD8KVE57P75FJRAU0')
				ttq.page()
			})(window, document, 'ttq')
		},
		loadGtag() {
			const { googlePixelId, googlePixelOldId } = this.platformConfig
			let script = document.createElement('script')
			script.src = `https://www.googletagmanager.com/gtag/js?id=${googlePixelId}`
			script.type = 'text/javascript'
			script.async = true
			document.body.appendChild(script)
			script = null
			if (!window.gtag) {
				window.dataLayer = window.dataLayer || []
				window.gtag = function () {
					window.dataLayer.push(arguments)
				}
			}
			window.gtag('js', new Date())
			window.gtag('config', googlePixelId, { send_page_view: true })
			window.gtag('config', googlePixelOldId, { send_page_view: true })
			window.gtag('set', {
				osVersion,
				osName,
				browserVersion,
				browserName,
			})
		},
		loadFB() {
			const { fbPixelID } = this.platformConfig
			let script = document.createElement('script')
			script.src = `https://connect.facebook.net/en_US/fbevents.js`
			script.type = 'text/javascript'
			script.async = true
			document.body.appendChild(script)
			script = null
			if (!window.fbq) {
				let n = (window.fbq = function () {
					n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
				})
				if (!window._fbq) window._fbq = n
				n.push = n
				n.loaded = !0
				n.version = '2.0'
				n.queue = []
				window.fbq('init', fbPixelID)
			}
			window.fbq('track', 'PageView')
			const noscript = document.createElement('noscript')
			noscript.innerHTML = `<img height="1" width="1" src="https://www.facebook.com/tr?id=${fbPixelID}&ev=PageView&noscript=1" />`
			document.body.appendChild(noscript)
		},
		loadShareASale() {
			if (process.env.NODE_ENV != 'production') return
			let script = document.createElement('script')
			script.src = `https://www.dwin1.com/19038.js`
			script.type = 'text/javascript'
			script.async = true
			document.body.appendChild(script)
		},
		loadScript() {
			const src = `https://cdn.plushe.com/plugn/js/${this.platformId == 1 ? 'countrys' : 'jpCountry'}.js`
			const script = document.createElement('script')
			script.async = true
			script.defer = true
			script.src = src // 你的url
			document.body.appendChild(script)
		},
		// 处理全局性请求错误问题:
		loadErrCode() {
			window.errCode = (code, msg, cb) => {
				if (code == 401) {
					// 登录失效:
					this.$store.dispatch('user/Signout')
				} else if (code == 'exception') {
					// 接口异常:
					this.reportGtag('exception', {
						description: msg,
					})
				} else if (code == 'timeOut') {
					// 请求超时:
					this.reportGtag('timing_complete', {
						name: 'requestFail',
					})
				}
				// 回调函数处理:
				if (cb && typeof cb === 'function') cb()
			}
		},
		mountedLoad() {
			this.isMounted = true
			const invitationCode = getQueryString('invitationCode')
			if (invitationCode) this.$store.commit('app/SET_INVITATION_CODE', invitationCode) //SET_INVITATION_CODE(invitationCode);
			this.getNewPeopleCoupon()
			this.getFreeShipping()
			this.loadFB()
			this.loadGtag()
			this.loadScript()
			this.loadErrCode()
			this.loadShareASale()
			if (process.env.VUE_APP_PROJECT !== 'prod') {
				this.loadTiktok()
				this.loadHotjar()
				this.loadFBChat()
			}
		},
	},
}
</script>
<style>
#app {
	color: #222;
	background: #fafafa;
	height: 100%;
	max-width: 375px;
	position: relative;
	margin: 0 auto;
	font-size: 14px;
}
[v-cloak] {
	display: none !important;
}
</style>
