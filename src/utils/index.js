import { Base64 } from 'js-base64'
import { getToken } from '@/utils/auth.js'

export const LS = {
	get(key) {
		if (!localStorage) return
		const value = localStorage.getItem(key)
		if (value) {
			try {
				return JSON.parse(value)
			} catch (error) {
				return value
			}
		} else {
			return false
		}
	},
	set(key, value) {
		if (typeof value === 'object') {
			localStorage.setItem(key, JSON.stringify(value))
		} else {
			localStorage.setItem(key, value)
		}
	},
	remove(key) {
		localStorage.removeItem(key)
	},
	clear: function() {
		localStorage.clear()
	},
}

export const getQueryString = function(name) {
	let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
	let r = window.location.search.substr(1).match(reg)
	if (r != null) {
		return decodeURIComponent(r[2])
	}
	return null
}

// 对象赋值
export const deepCopy = function(source) {
	let target = Array.isArray(source) ? [] : {}
	for (var k in source) {
		if (typeof source[k] === 'object') {
			target[k] = deepCopy(source[k])
		} else {
			target[k] = source[k]
		}
	}
	return target
}
/**
 * @param {string} value - 字符串
 */
export const isEmpty = function(value) {
	return !value || value === undefined || value === null || value === '' || value.length === 0
}

/**
 * @param {string} obj - object
 */
export const isEmptyObject = function(obj) {
	for (let name in obj) {
		return false
	}
	return true
}
//productKey:  图片key值
//layout:  0 -> 默认产品尺寸   1 -> h5商品详情页, 首页banner  2 -> 分类,订单,sku图片, 3 --> 首页banner
export const imageHandler = function(layout, productKey, bucket) {
	// console.log('process.env.VUE_APP_BUCKET', process.env.VUE_APP_BUCKET)
	if (!productKey) return ''
	const resize = {
		0: {
			width: 400,
			fit: 'cover',
		},
		1: {
			width: 750,
			fit: 'cover',
		},
		2: {
			height: 128,
			fit: 'cover',
		},
		3: {
			width: 900,
			fit: 'cover',
		},
		4: {
			fit: 'cover',
		},
	}
	if (isWindow) {
		const drp = window.devicePixelRatio || 1
		if (drp > 2) {
			resize['0'].width = 700
		}
	}
	const parameter = {
		bucket: bucket || process.env.VUE_APP_BUCKET, // 根据host来识别，如果是sit则填：test-plushe；如果是生产则填：pro-plushe
		key: productKey, // productKey, // 后台放回S3 图片key
		edits: {
			resize: resize[layout || 0],
		},
	}
	if (productKey.includes('.gif')) delete parameter.edits
	return `https://img.plushe.com/${Base64.encode(JSON.stringify(parameter))}`
}

//订单详情
export const getDiscountAmount = function(orderResp) {
	let { promotionAmountYuan, integrationAmountYuan, couponAmountYuan, discountAmountYuan } = orderResp || {}
	return promotionAmountYuan + integrationAmountYuan + couponAmountYuan + discountAmountYuan
}
export const getShippingAddress = function(orderResp) {
	let { receiverDetailAddressone, receiverDetailAddresstwo, receiverCity, receiverState, receiverCountry, receiverPostCode } = orderResp || {}
	if (receiverDetailAddressone) {
		return receiverDetailAddressone + ' ' + receiverDetailAddresstwo + ' ' + receiverCity + ' ' + receiverState + ' ' + receiverCountry + ' ' + receiverPostCode
	}
	return ''
}
export const getBillAddress = function(orderResp) {
	let { billDetailAddressone, billDetailAddresstwo, billRecCity, billRecState, billRecCountry, billRecPostCode } = orderResp || {}
	if (billDetailAddressone) {
		return billDetailAddressone + ' ' + billDetailAddresstwo + ' ' + billRecCity + ' ' + billRecState + ' ' + billRecCountry + ' ' + billRecPostCode
	}
	return ''
}
export const getPaseJSON = function(orderDetail, param) {
	let { orderResp } = orderDetail
	return orderResp ? orderResp[param] : ''
}
export const getOrderStatus = function(orderResp, type) {
	let { orderStatus } = orderResp || {}
	if (type === 1) {
		return orderStatus === 0
	} else if (type === 2) {
		return orderStatus === 2 || orderStatus === 3
	} else if (type === 3) {
		return orderStatus === 3 || orderStatus === 5
	}
}
export const getProduceLen = function(orderDetail) {
	let { orderItemResp } = orderDetail
	if (orderItemResp) {
		let len = orderItemResp.reduce((pre, cur) => {
			return pre + cur.productQuantity
		}, 0)
		return len
	}
	return 0
}
export const getAttrList = function(item) {
	let arr1 = []
	let arr2 = []
	let arr3 = []
	for (let key in item) {
		if (key.indexOf('attr') != -1 && item[key] != '' && key.indexOf('attrVal') == -1) {
			arr1.push(item[key])
		}
		if (key.indexOf('attrVal') != -1 && item[key] != '') {
			arr2.push(item[key])
		}
	}
	if (arr1.length == arr2.length) {
		for (let i = 0; i < arr1.length; i++) {
			arr3.push({
				key: arr1[i],
				val: arr2[i],
			})
		}
		return arr3
	}
	return arr3
}

export const platList = function(type, platform) {
	let platListData = {
		1: {
			logo: require('@/assets/images/logo.png'),
			free: require('@/assets/images/home/home-free.png'),
			return: require('@/assets/images/home/home-return.png'),
			bigBanner: imageHandler(4, 'product/2021072310130758027930/20210723101307014.png', 'pro-plushe'),
			flashList: imageHandler(4, 'product/2021072310143315761189/20210723101433039.png', 'pro-plushe'),
			discount: require('@/assets/images/icons/icon-discount.png'),
			goodsDefaultImg: imageHandler(4, 'product/2021072310021462289890/20210723100214075.png', 'pro-plushe'),
			soldout: require('@/assets/images/soldout.png'),
			buzhou: require('@/assets/images/address-buzhou.png'),
		},
		2: {
			logo: require('@/assets/images/gee-logo.png'),
			free: require('@/assets/images/home/home-free.png'),
			return: require('@/assets/images/home/home-return.png'),
			bigBanner: imageHandler(4, 'product/2021072310130758027930/20210723101307014.png', 'pro-plushe'),
			flashList: imageHandler(4, 'product/2021072310143315761189/20210723101433039.png', 'pro-plushe'),
			discount: require('@/assets/images/icons/icon-discount.png'),
		},
		3: {
			logo: require('@/assets/images/bondot-logo.png'),
			free: require('@/assets/images/home/home-free-bondot.jpg'),
			return: require('@/assets/images/home/home-return-bondot.jpg'),
			bigBanner: imageHandler(4, 'product/2021072310130758027930/20210723101307014.png', 'pro-plushe'),
			flashList: imageHandler(4, 'product/2021072310143315761189/20210723101433039.png', 'pro-plushe'),
			discount: require('@/assets/images/icons/icon-discount-bondot.png'),
			goodsDefaultImg: imageHandler(4, 'product/2021072310021437422115/20210723100214040.png', 'pro-plushe'),
			soldout: require('@/assets/images/soldout-bondot.png'),
			buzhou: require('@/assets/images/address-buzhou-bondot.png'),
		},
	}
	return platListData[platform][type]
}

export const isWindow = typeof window !== 'undefined'

export const permission = function(router, store) {
	router.beforeEach((to, from, next) => {
		// ios/android打包时的入口为: https://m.plushe.com/home?client=ios/android
		if (to.path == '/' && to.query.client) {
			store.commit('app/SET_CLIENT', to.query.client)
		}
		// 平台为 geeMart时，有店铺概念：
		if (store.getters.platformId == 2) {
			// 发现有店铺Id，则更新
			if (to.query.shopsId) {
				store.commit('app/SET_SHOPSID', to.query.shopsId)
			}
			// 共用的分类页面（正常前进后退，店铺会从这里返回到geeMart平台）
			if (to.path == '/category' && !to.query.shopsId) {
				store.commit('app/SET_SHOPSID')
			}
		}
		// 权限判断:
		if (getToken()) {
			console.log(getToken(), 'route============')
			if (to.path == '/login') {
				next('/')
			} else {
				next()
			}
		} else {
			// 需要登录权限的页面
			if (!to.meta.auth) {
				next()
			} else {
				next({
					path: '/login',
					query: {
						redirect: to.fullPath,
					},
				})
			}
		}
	})
	router.afterEach(to => {
		const { goBackUrlList } = store.state.app
		if (goBackUrlList.length) {
			store.commit(
				'app/SET_goBackUrl',
				goBackUrlList.filter((o, i) => i != 0)
			)
		}
		if (isWindow) {
			if (!window.gtag) return
			const { googlePixelId, googlePixelOldId } = store.getters.platformConfig
			window.gtag('config', googlePixelId, { page_path: to.fullPath })
			console.log('googlePixelOldId', googlePixelOldId)
			window.gtag('config', googlePixelOldId, { page_path: to.fullPath })
		}
	})
}

export const deepClone = function(target) {
	// 定义一个变量
	let result
	// 如果当前需要深拷贝的是一个对象的话
	if (typeof target === 'object') {
		// 如果是一个数组的话
		if (Array.isArray(target)) {
			result = [] // 将result赋值为一个数组，并且执行遍历
			for (let i in target) {
				// 递归克隆数组中的每一项
				result.push(deepClone(target[i]))
			}
			// 判断如果当前的值是null的话；直接赋值为null
		} else if (target === null) {
			result = null
			// 判断如果当前的值是一个RegExp对象的话，直接赋值
		} else if (target.constructor === RegExp) {
			result = target
		} else {
			// 否则是普通对象，直接for in循环，递归赋值对象的所有值
			result = {}
			for (let i in target) {
				result[i] = deepClone(target[i])
			}
		}
		// 如果不是对象的话，就是基本数据类型，那么直接赋值
	} else {
		result = target
	}
	// 返回最终结果
	return result
}

// 根据属性计算sku库存是否需要禁用:
export function calculationInventory(obj) {
	if (!obj.skus) return
	const { list, skus } = obj
	const active = []
	const skuObj = {}
	skus.forEach(item => {
		const attrVal1 = item.attrVal1 || '',
			attrVal2 = item.attrVal2 || '',
			attrVal3 = item.attrVal3 || '',
			attrVal4 = item.attrVal4 || ''
		const key = `${attrVal1},${attrVal2},${attrVal3},${attrVal4}`.replace(/(,+$)/gm, '')
		skuObj[key] = { ...item }
	})
	list.forEach((item, index) => {
		active[index] = '.+'
		item.attrValList.forEach(element => {
			if (element.isDefault) {
				active[index] = element.val
			}
		})
	})
	list.forEach((item, index) => {
		item.attrValList.forEach(element => {
			const currentObj = active.map((item, i) => (index == i ? element.val : item)).join(',')
			if (currentObj.includes('.+')) {
				element.disabled = false
				return
			}
			element.disabled = !skuObj[currentObj]
			if (element.disabled) {
				element.isDefault = false
			}
		})
	})
}
