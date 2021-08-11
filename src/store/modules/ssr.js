import http from '@/api/index'
import { imageHandler, isWindow, calculationInventory } from '@/utils/index.js'
import { configPlat } from '@/utils/enums.js'
import i18n from '@/i18n/i18n'
import store from 'store'

const state = {
	homedData: {}, // 首页全部数据
	goodsDetail: {}, // 商品详情信息
	categoryDetail: {}, // 商品分类详情
	platformConfig: {},
	categoryMenuId: store.get('categoryMenuId') || '', // 分类ID
	categoryMenu: store.get('categoryMenu') || [], // 分类信息
}
const mutations = {
	SET_platformId: (state, platformId) => {
		state.platformConfig = configPlat[platformId]
		i18n.locale = configPlat[platformId].language
	},
	SET_homedData: (state, homedData) => {
		state.homedData = homedData
	},
	// 设置商品信息:
	setGoodsDetail(state, info = {}) {
		if (info.picKey || info.defaultPicKey) info.picUrl = imageHandler(0, info.picKey || info.defaultPicKey)
		state.goodsDetail = info.clear ? {} : { ...state.goodsDetail, ...info }
		// state.goodsDetail = info.clear ? {} : info
	},
	// 设置分类列表页信息:
	setCategoryDetail(state, info = {}) {
		state.categoryDetail = { ...state.categoryDetail, ...info }
	},
	SET_CATEGORYMENUID: (state, id) => {
		state.categoryMenuId = id
		if (isWindow) store.set('categoryMenuId', id)
	},
	// 分类
	SET_CATEGORYMENU: (state, menu) => {
		state.categoryMenu = menu
	},
}

const actions = {
	homeInit({ state, commit }) {
		const { platformId } = state.platformConfig
		const { banner, beans } = http.home
		const httpArr = [banner('', { headers: { platformId } }), beans('', { headers: { platformId } })]
		return Promise.all(httpArr).then(dataArr => {
			const [bannerList, beanList] = dataArr
			commit('SET_homedData', {
				bannerList: bannerList.data,
				beanList: beanList.data,
			})
		})
	},
	// 商品详情页:
	detailInit({ commit }, payload) {
		const { productNo } = payload
		return http.goodsDetailApi
			.detail({ productNo })
			.then(res => {
				const data = dealGoodsData(res.data)
				console.log('服务端---', data)
				commit('setGoodsDetail', data)
				return res
			})
			.catch(err => {
				console.log('商品detail接口错误:', err)
				if (err.code == '20060102') {
					commit('setGoodsDetail', { clear: true }) // 清空
				}
			})
	},
	// 列表页:
	categoryInit({ commit }, payload) {
		// 兼容主题,topicId
		const { fromType, productName, topicId, AdCode, pageNum } = payload
		// 请求接口的页面地址，和url 判断, 没有则默认为专题
		const httpKey = fromType || 'topic'
		delete payload.fromType

		if (fromType == 'topic') delete payload.productName
		// 如果有广告标记,第一页时,需要与广告一起请求:
		if (AdCode && pageNum == 1) {
			const adParams = {
				categoryId: AdCode,
				pageNum: 1,
				pageSize: 10,
			}
			const reqList = [http.home[httpKey](payload), http.home.adList(adParams), http.home.topicInfo({ id: topicId })]
			return Promise.all(reqList).then(result => {
				const allList = [...result[1].data.list, ...result[0].data.list]
				const topicInfo = result[2].data || {}
				commit('setCategoryDetail', {
					allRecomentList: dealSame(allList),
					title: productName || topicInfo.title,
					topicId: topicId,
					adList: result[1].data.list,
					listPicKey: topicInfo.listPicH5,
					listInfo: result[0].data, // 列表分页等全部信息
				})
			})
		}
		const reqList = topicId ? [http.home[httpKey](payload), http.home.topicInfo({ id: topicId })] : [http.home[httpKey](payload)]
		return Promise.all(reqList)
			.then(result => {
				console.log('productName', productName)
				const [listData, topicInfo] = result
				commit('setCategoryDetail', {
					allRecomentList: listData.data.list || [],
					title: productName || (topicInfo && topicInfo.data && topicInfo.data.name),
					topicId: topicId,
					listPicKey: topicInfo && topicInfo.data ? topicInfo.data.listPicH5 : '',
					adList: [],
					listInfo: listData.data,
				})
			})
			.catch(err => {
				console.log('列表专题列表接口错误: ', err)
			})
	},
	// 分类页
	classifyInit({ commit }, payload) {
		const { platformId, shopsId } = state.platformConfig
		const params = {
			shopsId,
		}
		return http.category.categoryLeft(params, { headers: { platformId } }).then(res => {
			const list = res.data.map(item => ({ name: item.name, id: item.id }))
			if (platformId == 2 && !shopsId) {
				// GeeMart平台下-手动加上店铺信息
				list.push({
					name: 'Brand Wall',
					id: -1,
				})
			}
			commit('SET_CATEGORYMENU', list)
		})
	},
}

function dealGoodsData(data) {
	let attrValObj = {} // 选中的属性值, 为了得到skuNo
	data.list.forEach((item, i) => {
		data['attr' + (i + 1)] = item.attrName
		attrValObj['attrVal' + (i + 1)] = ''
		item.attrValList.forEach(obj => {
			if (obj.isDefault) {
				attrValObj['attrVal' + (i + 1)] = obj.val
				// 取默认轮播图
				if (item.isValHavePics) {
					data.swipeList = obj.picList
				}
			}
			// 然后 绑定轮播图的属性 默认选中,其它默认不选中:
			if (!item.isValHavePics) {
				obj.isDefault = false
			}
		})
	})
	calculationInventory(data) // 对数据进行处理
	dealModes(data) // 处理模特信息
	let info = {}
	data.skus.forEach(item => {
		let bool = dealObj(attrValObj, item)
		if (bool) info = item
	})
	data.attrObj = attrValObj
	data.skuNo = info.skuNo
	const arr = []
	let attList = {}
	data.additionalAttrList.forEach(item => {
		if (!attList[item.key]) {
			attList[item.key] = item
			arr.push(attList[item.key])
		} else {
			attList[item.key].val = `${attList[item.key].val}, ${item.val}`
		}
	})
	data.additionalAttrList = arr
	data.showDefaultImg = false

	return data
}
// 判断属性值是否都相等:
function dealObj(o, o2) {
	for (let key in o) {
		if (o2[key] != o[key]) {
			return false
		}
	}
	return true
}
// 第一页,去除与广告相同的数据
function dealSame(list) {
	let obj = {},
		result = []
	for (let i = 0; i < list.length; i++) {
		if (!obj[list[i].productNo]) {
			result.push(list[i])
			obj[list[i].productNo] = true
		}
	}
	return result
}

// 处理模特信息:
function dealModes(data) {
	data.currentModes = []
	if (!data.productModels.length || !data.list.length) return
	const attrName = data.productModels[0].attrName
	const targets = data.list.find(item => item.attrName == attrName)
	if (!targets) return
	data.productModels.forEach(modes => {
		if (modes.bustCm) {
			modes.bustCm = Number(modes.bustCm).toFixed()
			modes.bustIn = (modes.bustCm / 2.54).toFixed() + '"'
		}
		if (modes.heightCm) {
			modes.heightCm = Number(modes.heightCm).toFixed()
			modes.heightIn = (modes.heightCm / 100 / 0.3048).toFixed(1).replace('.', "'") + '"'
		}
		if (modes.hipsCm) {
			modes.hipsCm = Number(modes.hipsCm).toFixed()
			modes.hipsIn = (modes.hipsCm / 2.54).toFixed() + '"'
		}
		if (modes.waistCm) {
			modes.waistCm = Number(modes.waistCm).toFixed()
			modes.waistIn = (modes.waistCm / 2.54).toFixed() + '"'
		}
		targets.attrValList.forEach(attr => {
			if (attr.isDefault && modes.attrValName == attr.val) {
				data.currentModes.push(modes)
			}
		})
	})
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}
