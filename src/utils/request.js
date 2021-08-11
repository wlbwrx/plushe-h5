import axios from 'axios'
import { LS } from '@/utils'
import { Toast } from 'vant' // 这里我是使用vant的组件来给提示
import httpCode from './httpCode'
import I18n from '@/i18n/i18n'
import { isWindow } from '@/utils'
import { getToken } from '@/utils/auth.js'
const isProd = process.env.NODE_ENV === 'production'
let loadingInstance = null // 加载全局的loading
let timer = null
const TIME_LIMIT = 2000
const instance = axios.create({
	//创建axios实例，在这里可以设置请求的默认配置
	timeout: 100000, // 设置超时时间10s
	// baseURL: `https://m.plushe.com/plushemall/plushe-mall-web`, //根据自己配置的反向代理去设置不同环境的baeUrl
	baseURL: `${isProd ? process.env.VUE_APP_DOMAIN : 'http://localhost:9000/uat'}/plushemall/plushe-mall-web`, //根据自己配置的反向代理去设置不同环境的baeUrl
})
function debounce(fn, delay) {
	// 借助闭包
	return function() {
		if (timer) clearTimeout(timer)
		timer = setTimeout(fn, delay) // 简化写法
	}
}

function showLoading() {
	loadingInstance = Toast.loading({
		// 发起请求时加载全局loading，请求失败或有响应时会关闭
		loadingType: 'spinner',
		forbidClick: true,
		message: I18n.t('loading'),
		duration: 0,
	})
}
instance.interceptors.request.use(
	config => {
		const { url, headers } = config
		// if (isProd && isWindow) {
		// 	console.log('config', config)
		// 	config.baseURL = `${window.location.origin}/plushemall/plushe-mall-web`
		// }
		config.headers['userDevice'] = 1 // 1-h5, 2-pc

		if (getToken()) {
			config.headers['Authorization'] = getToken()
		} else {
			const guestUrl = ['/cart/checkout', '/order/createGuestUserOrder']
			const tokenUrl = ['/order/orderDetail', '/orderPay/createPayment', '/orderPay/capturePayment', '/orderPay/queryPayment']
			if (guestUrl.includes(url)) {
				config.headers['accessUser'] = 'guest'
			}
			if (tokenUrl.includes(url)) {
				config.headers['accessUser'] = 'guest'
				config.headers['Authorization'] = LS.get('guestToken') || ''
			}
		}
		// nodeJS中设置请求头
		if (!headers.platformId) {
			if (config.baseURL.includes('bondot')) {
				config.headers['platformId'] = 3
				config.headers['language'] = 'js'
			} else {
				config.headers['platformId'] = 1
				config.headers['language'] = 'en'
			}
		}
		if (isWindow) debounce(showLoading, TIME_LIMIT)()

		// if (method === 'get') {
		// 	// 添加时间戳参数，防止浏览器（IE）对get请求的缓存
		// 	config.params = {
		// 		...params,
		// 		t: new Date().getTime(),
		// 	}
		// }
		return config
	},
	error => {
		console.log('errorerror')
		// 对请求错误做些什么
		return Promise.reject(error)
	}
)

/** 添加响应拦截器  **/
instance.interceptors.response.use(
	response => {
		// console.info('response', response.data)
		timer && clearTimeout(timer)
		loadingInstance && loadingInstance.clear()
		if (response.data.code === 0) {
			// 响应结果里的code: ok是我与后台的约定，大家可以根据实际情况去做对应的判断
			return response.data
		} else {
			if (!isWindow) return Promise.reject(response.data)
			// console.log('错误接口参数', response)
			// code 结尾为2 是不需要在这里谈提示,会出现shortCode字段，需要做页面交互处理,
			if (!response.data.shortCode) {
				Toast({
					message: response.data.msg,
					type: 'fail',
					duration: 2000,
				})
			}
			// code 结尾为1, 是真正的异常事件:
			let errCode = response.data.code + ''
			if (errCode.charAt(errCode.length - 1) == '1') {
				window.errCode('exception', response.data.msg)
			}
			return Promise.reject(response.data)
		}
	},
	error => {
		console.error('response.config', error.config)
		if (!isWindow) return Promise.reject(error)
		timer && clearTimeout(timer)
		loadingInstance && loadingInstance.clear()
		if (error.response) {
			// 根据请求失败的http状态码去给用户相应的提示
			let tips = error.response.status in httpCode ? httpCode[error.response.status] : error.response.data.message
			Toast({
				message: tips || 'Request error',
				type: 'fail',
			})
			// token 失效处理:
			if (error.response.status === 401) {
				window.errCode(401, '', () => {
					location.href = 'login'
				})
				return Promise.reject(error)
			}
			return Promise.reject(error)
		} else {
			Toast({
				message: httpCode.timeOut,
				type: 'fail',
			})
			// 超时--需要上报数据:
			window.errCode('timeOut')
			return Promise.reject(new Error(httpCode.timeOut))
		}
	}
)

/* 统一封装get请求 */
export const get = (url, params, config = {}) => {
	// console.log('confog', config)
	return new Promise((resolve, reject) => {
		instance
			.get(url, {
				params,
				...config,
			})
			.then(response => {
				resolve(response)
			})
			.catch(error => {
				reject(error)
			})
	})
}

/* 统一封装post请求  */
export const post = (url, data, config = {}) => {
	return new Promise((resolve, reject) => {
		instance
			.post(url, data, config)
			.then(response => {
				resolve(response)
			})
			.catch(error => {
				reject(error)
			})
	})
}
