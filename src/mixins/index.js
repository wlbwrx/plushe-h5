import { mapGetters } from 'vuex'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(timezone)
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)
import { osVersion, osName, browserVersion, browserName } from 'mobile-device-detect'

export default {
	data() {
		return {}
	},
	mounted() {},
	filters: {},
	methods: {
		filterPriceMethod(value) {
			if (isNaN(value)) return value
			return value ? this.$t('money') + (value / 100).toFixed(this.platformId == 3 ? 0 : 2) : 0
		},
		creditAmount(item) {
			let { discountModel, fixedAmount, discountProbability } = item
			// return discountModel === 1 ? this.$t('money') + this.filterPriceMethod(fixedAmount) : this.$t('offCoupon1', { num: discountProbability })
			return discountModel === 1 ? this.filterPriceMethod(fixedAmount) : this.$t('offCoupon1', { num: discountProbability })
		},
		// 时间格式化
		formatTimeMethod(time) {
			if (!time) return ''
			let dateObj = dayjs(time)
			// console.log('dateObj', dateObj);
			if (isNaN(dateObj.valueOf())) {
				dateObj = dayjs(time, 'YYYY-MM-DDTHH:mm:ss.000 ZZ')
			}
			return dateObj.tz().format(this.platformId == 3 ? 'YYYY/MM/DD' : 'MM/DD/YYYY')
		},
		creditDays(item, def) {
			let { timeModel, validPeriod, startTime, endTime, validTime, expireTime } = item
			let date1, date2
			if (timeModel === 1 || def === 'cop') {
				date1 = this.formatTimeMethod(startTime || validTime)
				date2 = this.formatTimeMethod(endTime || expireTime)
			} else {
				date1 = this.formatTimeMethod(dayjs())
				date2 = this.formatTimeMethod(dayjs().add(validPeriod, 'day'))
			}
			return date1 + '-' + date2
		},
		reportGtag(eventName, data, isNew) {
			if (!window.gtag) {
				window.dataLayer = window.dataLayer || []
				window.gtag = function() {
					window.dataLayer.push(arguments)
				}
			}
			const { googlePixelId, googlePixelOldId } = this.platformConfig
			// 携带的公共数据：
			let params = {
				platformId: this.platformId,
				shopsId: this.shopsId,
			}
			Object.assign(params, data)
			if (isNew) {
				window.gtag('event', eventName, { ...params, send_to: googlePixelId }) // 新版的GA
			} else {
				window.gtag('event', eventName, { ...params, send_to: googlePixelOldId }) // 老版的UA
			}
			// 仅正式环境才上报:
			if (process.env.VUE_APP_PROJECT === 'prod' && googlePixelOldId) {
				window.gtag('event', eventName, { ...params, send_to: 'AW-365802310' }) // 7月21, ads--营销--同GA老版本数据保一致
			}
		},
		reportFB(eventName, data, isCustom, otherData) {
			// 事件名, 数据, 自定义
			if (!window.fbq) {
				const { fbPixelID } = this.platformConfig
				let n = (window.fbq = function() {
					console.log('window.fbq执行')
					n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
				})
				if (!window._fbq) window._fbq = n
				n.push = n
				n.loaded = !0
				n.version = '2.0'
				n.queue = []
				window.fbq('init', fbPixelID)
			}
			let params = {
				platformId: this.platformId,
				shopsId: this.shopsId,
				osVersion,
				osName,
				browserVersion,
				browserName,
				...data,
			}
			// if (window.fbq && typeof fbq == 'function') {
			if (otherData) {
				window.fbq(isCustom ? 'trackCustom' : 'track', eventName, params, otherData)
			} else {
				window.fbq(isCustom ? 'trackCustom' : 'track', eventName, params)
			}
			// }
		},
		// 处理跳转的url 地址
		formatUrl(url, params) {
			params = params.replace(/\s/g, '-')
			params = encodeURIComponent(params)
			return url + params
		},
		// 处理后台返回的跳转链接:
		formatLinkToJump(url) {
			if (!url || url == '0') return
			const reg = /(m.plushe.com)|(m.bondot.com)/
			if (reg.test(url)) {
				url = decodeURIComponent(url.split('.com')[1])
				url = url.replace(/\s/g, '-')
				this.$router.push(decodeURIComponent(url))
			} else {
				location.href = url
			}
		},
	},
	computed: {
		...mapGetters(['token', 'shopsId', 'platformId', 'platformConfig']),
		platformTitle() {
			return this.platformConfig.title
		},
		platformEmail() {
			return this.platformConfig.email
		},
	},
}
