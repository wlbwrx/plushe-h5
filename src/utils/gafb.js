// Global site tag (gtag.js) - Google Analytics
import store from '@/store/index.js'
import _store from 'store'
// import { platformId } from "./app";
import { appConstant } from './enums'

import { osVersion, osName, browserVersion, browserName } from 'mobile-device-detect'

const GAID = appConstant.googlePixelId
const FBID = appConstant.fbPixelID

initGa() // 初始化GA
initFB() // 初始化FB

function initGa() {
	let head = document.getElementsByTagName('head')[0]
	let script = document.createElement('script')
	script.src = `https://www.googletagmanager.com/gtag/js?id=${GAID}`
	script.type = 'text/javascript'
	script.async = true
	head.appendChild(script) /*添加到HTML中*/

	window.dataLayer = window.dataLayer || []
	window.gtag = function() {
		window.dataLayer.push(arguments)
	}
	// function gtag() {
	// 	dataLayer.push(arguments)
	// }
	window.gtag('js', new Date())
	window.gtag('config', GAID, { send_page_view: false })
	window.gtag('set', {
		osVersion,
		osName,
		browserVersion,
		browserName,
	})
}

export function report(eventName, data, isNew) {
	// 携带的公共数据：
	let params = {
		platformId: store.getters.platformId,
		shopsId: store.getters.shopsId,
	}
	Object.assign(params, data)
	if (isNew) {
		window.gtag('event', eventName, { ...params, send_to: GAID }) // 新版的GA
	} else if (process.env.VUE_APP_PROJECT === 'prod' && appConstant.googlePixelOldId) {
		// 仅正式环境才上报:
		console.log('老版的数据上报即将触发')
		window.gtag('event', eventName, { ...params, send_to: appConstant.googlePixelOldId }) // 老版的UA
	}
}
// 页面浏览事件,手动在上报的 page_location中加入广告参数:
export function pageView(obj = {}, newGA) {
	let query = getAllUrlParams()
	if (query.utm_source || query.utm_medium) {
		_store.set('adParams', {
			utm_source: query.utm_source,
			utm_medium: query.utm_medium,
			time: +new Date(),
		})
	}
	let params = {
		page_path: obj.page_path || window.location.pathname,
		page_location: obj.page_location || getPageLocation(),
		page_title: obj.page_title || document.title,
	}
	if (newGA) {
		report('page_view', params, 'GA4')
	} else {
		report('page_view', params)
	}
}
function getPageLocation() {
	let adParams = _store.get('adParams') || {}
	// 30 分钟过期
	if (adParams.time + 30 * 60 * 1000 < +new Date()) {
		_store.remove('adParams')
		adParams = {}
	}
	if (location.search) {
		if (location.search.includes('utm_source')) {
			return location.href
		} else {
			let str = location.href
			if (adParams.utm_source) {
				str += `&utm_source=${adParams.utm_source}`
			}
			if (adParams.utm_medium) {
				str += `&utm_medium=${adParams.utm_medium}`
			}
			return str
		}
	} else {
		let str = location.href
		if (adParams.utm_source) {
			str += `?utm_source=${adParams.utm_source}`
		}
		if (adParams.utm_medium && adParams.utm_source) {
			str += `&utm_medium=${adParams.utm_medium}`
		}
		if (adParams.utm_medium && !adParams.utm_source) {
			str += `?utm_medium=${adParams.utm_medium}`
		}
		return str
	}
}
function getAllUrlParams(url) {
	// 用JS拿到URL，如果函数接收了URL，那就用函数的参数。如果没传参，就使用当前页面的URL
	var queryString = url ? url.split('?')[1] : window.location.search.slice(1)
	// 用来存储我们所有的参数
	var obj = {}
	// 如果没有传参，返回一个空对象
	if (!queryString) {
		return obj
	}
	// stuff after # is not part of query string, so get rid of it
	queryString = queryString.split('#')[0]
	// 将参数分成数组
	var arr = queryString.split('&')
	for (var i = 0; i < arr.length; i++) {
		// 分离成key:value的形式
		var a = arr[i].split('=')
		// 将undefined标记为true
		var paramName = a[0]
		var paramValue = typeof a[1] === 'undefined' ? true : a[1]
		// 如果调用对象时要求大小写区分，可删除这两行代码
		paramName = paramName.toLowerCase()
		if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase()
		// 如果paramName以方括号结束, e.g. colors[] or colors[2]
		if (paramName.match(/\[(\d+)?\]$/)) {
			// 如果paramName不存在，则创建key
			var key = paramName.replace(/\[(\d+)?\]/, '')
			if (!obj[key]) obj[key] = []
			// 如果是索引数组 e.g. colors[2]
			if (paramName.match(/\[\d+\]$/)) {
				// 获取索引值并在对应的位置添加值
				var index = /\[(\d+)\]/.exec(paramName)[1]
				obj[key][index] = paramValue
			} else {
				// 如果是其它的类型，也放到数组中
				obj[key].push(paramValue)
			}
		} else {
			// 处理字符串类型
			if (!obj[paramName]) {
				// 如果如果paramName不存在，则创建对象的属性
				obj[paramName] = paramValue
			} else if (obj[paramName] && typeof obj[paramName] === 'string') {
				// 如果属性存在，并且是个字符串，那么就转换为数组
				obj[paramName] = [obj[paramName]]
				obj[paramName].push(paramValue)
			} else {
				// 如果是其它的类型，还是往数组里丢
				obj[paramName].push(paramValue)
			}
		}
	}
	return obj
}
function initFB() {
	!(function(f, b, e, v, n, t, s) {
		if (f.fbq) return
		n = f.fbq = function() {
			n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
		}
		if (!f._fbq) f._fbq = n
		n.push = n
		n.loaded = !0
		n.version = '2.0'
		n.queue = []
		t = b.createElement(e)
		t.async = !0
		t.src = v
		s = b.getElementsByTagName(e)[0]
		s.parentNode.insertBefore(t, s)
	})(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')

	window.fbq('init', FBID)
	window.fbq('track', 'PageView')

	let head = document.getElementsByTagName('head')[0]
	let noscript = document.createElement('noscript')
	noscript.innerHTML = `<img height="1" width="1" src="https://www.facebook.com/tr?id=${FBID}&ev=PageView&noscript=1" />`
	head.appendChild(noscript)
}

// facebook 上报数据
export function facebookReport(eventName, data, isCustom, otherData) {
	// 事件名, 数据, 自定义
	let params = {
		platformId: store.getters.platformId,
		shopsId: store.getters.shopsId,
		osVersion,
		osName,
		browserVersion,
		browserName,
		...data,
	}
	if (window.fbq && typeof fbq == 'function') {
		if (otherData) {
			window.fbq(isCustom ? 'trackCustom' : 'track', eventName, params, otherData)
		} else {
			window.fbq(isCustom ? 'trackCustom' : 'track', eventName, params)
		}
	}
}
