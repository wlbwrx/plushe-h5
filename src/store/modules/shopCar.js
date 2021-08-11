import { getCarList, setCarList } from '@/utils/auth.js'
import http from '@/api/index.js'
import $http from '@/api/modules/pay'
import store from 'store'
import { Toast } from 'vant'

const state = {
	carList: getCarList() || [], // 有效商品列表数据
	expiredList: [], // 失效商品列表数据
	isAllChecked: false, // 是否全选
	isEdit: false, // 是否为编辑状态
	isDelete: false, // 是否显示删除弹框
	singleDeleteId: '', // 单个删除时的 ID
	totalPrice: 0, // 总价
	retailPrice: 0, // 原价
	lackForFreeExpressAmount: 0, // 包邮差额
	checkOrderDetail: {},
	orderParams: {},
	checkoutInfo: store.get('checkoutInfo') || {}, // 结账台返回信息
}

const getters = {
	selectPromo(state) {
		return state.checkOrderDetail.selectPromo
	},
	// 选中的商品sku 集合：
	skuNos(state) {
		let arr = []
		state.calcList = []
		state.carList.forEach(item => {
			if (item.check) {
				arr.push(item.skuNo)
			}
		})
		return arr
	},
	// 购物车商品数量：
	totalNum(state) {
		let num = 0
		state.carList.forEach(item => {
			num += item.num
		})
		state.expiredList.forEach(item => {
			num += item.num
		})
		return num > 99 ? '99+' : num
	},
	// 已选中的有效商品总数:
	effectiveTotalNum(state) {
		let num = 0
		state.carList.forEach(item => {
			if (item.check) {
				num += item.num
			}
		})
		return num
	},
}

const mutations = {
	// 设置订单返回结果
	setOrderParams(state, detail) {
		state.orderParams = detail
	},
	// 设置订单返回结果
	setCheckOrderDetail(state, detail) {
		state.checkOrderDetail = detail || {}
	},
	// 修改包邮差额
	setLackForFreeExpressAmount(state, amount) {
		state.lackForFreeExpressAmount = amount
	},
	// 加-数量
	addNum(state, skuNo) {
		let index = state.carList.findIndex(item => item.skuNo == skuNo)
		if (index >= 0) state.carList[index].num++
		// 更新购物车数据缓存
		setCarList(state.carList)
	},
	// 减-数量
	cutNum(state, skuNo) {
		let index = state.carList.findIndex(item => item.skuNo == skuNo)
		if (index >= 0) state.carList[index].num--
		// 更新购物车数据缓存
		setCarList(state.carList)
	},
	// 单选
	selectSingle(state, skuNo) {
		let index = state.carList.findIndex(item => item.skuNo == skuNo)
		state.carList[index].check = !state.carList[index].check // 取反
		state.isAllChecked = state.carList.length ? state.carList.every(item => item.check) : false // 是否全选
		// 更新购物车数据缓存
		setCarList(state.carList)
	},
	// 全选
	selectAll(state) {
		state.isAllChecked = !state.isAllChecked
		console.log(state.isAllChecked, '-----fasdfsdf')
		state.carList.forEach(item => (item.check = state.isAllChecked))
		// 更新购物车数据缓存
		setCarList(state.carList)
	},
	// 删除商品:
	deleteGoods(state, skuNos) {
		state.carList = state.carList.filter(item => {
			if (!skuNos.includes(item.skuNo)) return true
		})
		state.expiredList = state.expiredList.filter(item => {
			if (!skuNos.includes(item.skuNo)) return true
		})
		state.isDelete = false
		state.singleDeleteId = ''
		if (state.carList.length) {
			state.isAllChecked = state.carList.length ? state.carList.every(item => item.check) : false // 是否全选
		} else {
			state.isAllChecked = false
		}
		// 更新购物车数据缓存
		setCarList(state.carList)
	},
	// 加入购物车
	addCar(state, data) {
		let goods = {
			check: true,
			num: 1,
			...data,
		}
		// 判断是否存在，不在购物车则直接新增，若有则数量加 1
		let index = state.carList.findIndex(item => item.skuNo == goods.skuNo)
		if (index === -1) {
			state.carList.unshift(goods)
		} else {
			state.carList[index].num++
		}
		// 更新购物车数据缓存
		setCarList(state.carList)
	},
	// 切换编辑状态：
	switchEdit(state, bool) {
		if (bool === 'guanbi') {
			state.isEdit = false
		} else {
			state.isEdit = !state.isEdit
		}
	},
	// 切换删除确认框显示隐藏, 并设置单个删除时的id：
	switchDelete(state, skuNo) {
		state.isDelete = !state.isDelete
		state.singleDeleteId = skuNo || ''
	},
	// 设置总金额
	setTotalPrice(state, num) {
		state.totalPrice = num
	},
	// 设置原价
	setRetailPrice(state, num) {
		state.retailPrice = num
	},
	// 更新购车数据（有效）：
	setCarListData(state, list) {
		list = dealAttr(list)
		state.carList = list
		// 更新购物车数据缓存
		setCarList(state.carList)
	},
	// 更新购物车数据（失效）：
	setCarExpiredList(state, list) {
		list = dealAttr(list)
		state.expiredList = list
	},
	// 设置是否全部选中：
	setIsAllChecked(state, bool) {
		state.isAllChecked = bool
	},
	// 设置结账台信息：
	setCheckoutInfo(state, info) {
		state.checkoutInfo = info
	},
}
/* 若是登录了，则所有异步操作，均使用后台返回数据（如：单选、全选、修改数量等），后台已给出正常列表 */
const actions = {
	// 添加商品到购物车
	async addItem({ dispatch, commit, rootGetters }, goods) {
		try {
			const params = {
				num: 1,
				sku: goods.skuNo,
			}
			if (rootGetters.token) {
				await http.car.carAdd(params)
			} else {
				commit('addCar', goods)
			}
		} catch (error) {
			console.log('selectSingle', error)
		}
		return dispatch('checkout', { couponCode: 'default', promoCode: 'default' })
	},
	// 批量添加购车(用户登录后，立马将缓存中的购车数据上传， 退出登录则清空购物车缓存)
	async addItems({ dispatch, state }) {
		try {
			const params = {
				items: [],
			}
			state.carList.forEach(item => {
				params.items.push({
					sku: item.skuNo,
					num: item.num,
				})
			})
			await http.car.carAddItems(params)
		} catch (error) {
			console.log('selectSingle', error)
		}
		return dispatch('checkout')
	},
	// 删除购物车商品
	async deleteItems({ dispatch, state, rootGetters, getters, commit }) {
		try {
			const params = {
				skus: state.singleDeleteId ? [state.singleDeleteId] : getters.skuNos,
			}
			if (rootGetters.token) {
				await http.car.carDeletes(params)
				commit('switchDelete')
			} else {
				console.log(state.singleDeleteId, '----删除----')
				commit('deleteGoods', state.singleDeleteId ? [state.singleDeleteId] : getters.skuNos)
			}
		} catch (error) {
			console.log('selectSingle', error)
		}
		return dispatch('checkout', { couponCode: 'default', promoCode: 'default' })
	},
	// 计算总金额：(1.0.3版本,该接口功能更改为了结账台功能,(同一个接口))
	carCalc({ commit, state }, query) {
		return new Promise((resolve, reject) => {
			query = query || {}
			const { type, goods } = query
			let couponCode = query.couponCode
			let promotionCode = query.promotionCode
			if (couponCode === undefined) {
				couponCode = state.orderParams.couponCode
			}
			if (promotionCode === undefined) {
				promotionCode = state.orderParams.promotionCode
			}
			const params = {
				items: [],
				promotionCode, // 活动码
				couponCode, // 优惠券码
			}
			const list = state.carList.filter(item => item.check)
			if (type == 0 || type == 1) {
				// 修改数量--- 0-减少，1-增加   当前修改的加减1添加；其他选中的再添加

				list.forEach(item => {
					if (item.skuNo == goods.skuNo) {
						params.items.push({
							check: item.check,
							num: item.num + (type ? 1 : -1),
							skuNo: item.skuNo,
						})
					} else {
						params.items.push({
							check: item.check,
							num: item.num,
							skuNo: item.skuNo,
						})
					}
				})
			} else if (type == 2) {
				// 全选--- 全部添加
				state.carList.forEach(item => {
					params.items.push({
						check: true,
						num: item.num,
						skuNo: item.skuNo,
					})
				})
			} else if (type == 3 || type == 4) {
				// 单选---- 3-取消(将除了即将取消的，其他已选中添加)；4-选中（将已选中的全部加入，再添加即将选中的商品）
				if (type == 3) {
					list.forEach(item => {
						if (item.skuNo != goods.skuNo) {
							params.items.push({
								check: item.check,
								num: item.num,
								skuNo: item.skuNo,
							})
						}
					})
				} else {
					list.forEach(item => {
						params.items.push({
							check: item.check,
							num: item.num,
							skuNo: item.skuNo,
						})
					})
					params.items.push({
						check: true,
						num: goods.num,
						skuNo: goods.skuNo,
					})
				}
			} else {
				// 计算现有选中商品的金额
				list.forEach(item => {
					params.items.push({
						check: item.check,
						num: item.num,
						skuNo: item.skuNo,
					})
				})
			}
			// 计算金额
			http.car['carCheckout'](params)
				.then(res => {
					const data = res.data
					if (type == 0 || type == 1) {
						commit(type ? 'addNum' : 'cutNum', goods.skuNo)
					} else if (type == 2) {
						commit('selectAll')
					} else if (type == 3 || type == 4) {
						commit('selectSingle', goods.skuNo)
					}
					commit('setRetailPrice', data.retailAmount || 0)
					const { selectCoupon = {}, selectPromo = {} } = data
					params.couponCode = selectCoupon.couponCode || ''
					params.promoCode = selectPromo.couponCode || ''
					console.log('paramsparamsparams', params)
					commit('setOrderParams', params)
					// commit('setTotalPrice', data.subtotalAmount || 0)
					// commit('setLackForFreeExpressAmount', data.lackForFreeExpressAmount)
					// commit('setCheckOrderDetail', data)
					dealData(commit, data)
					resolve()
				})
				.catch(err => {
					dealData(commit, {})
					reject(err)
				})
		})
	},
	// 单选：
	async selectSingle({ dispatch, commit, rootGetters }, goods) {
		try {
			const params = {
				sku: goods.skuNo,
			}
			const key = goods.check ? 'carUnCheckSingle' : 'carCheckSingle'
			if (rootGetters.token) {
				await http.car[key](params)
			} else {
				commit('selectSingle', goods.skuNo)
			}
		} catch (error) {
			console.log('selectSingle', error)
		}
		return dispatch('checkout', { couponCode: 'default', promoCode: 'default' })
	},
	// 全选：
	async selectAll({ dispatch, state, commit, rootGetters }) {
		try {
			if (rootGetters.token) {
				const key = state.isAllChecked ? 'carUnCheckAll' : 'carCheckAll'
				await http.car[key]()
			} else {
				commit('selectAll')
			}
		} catch (error) {
			console.log('changeNum', error)
		}
		return dispatch('checkout', { couponCode: 'default', promoCode: 'default' })
	},
	// 修改数量
	async changeNum({ dispatch, commit, rootGetters }, query) {
		try {
			const { type, goods } = query //type: 1 增加， 0 减少
			const params = {
				sku: goods.skuNo,
				num: goods.num + (type == 1 ? 1 : -1),
			}
			if (rootGetters.token) {
				await http.car.carChangeCount(params)
			} else {
				console.log(type == 1 ? 'addNum' : 'cutNum')
				commit(type == 1 ? 'addNum' : 'cutNum', goods.skuNo)
			}
		} catch (error) {
			console.log('changeNum', error)
		}
		return dispatch('checkout', { couponCode: 'default', promoCode: 'default' })
	},
	// 修改sku,(即删除、新增 同一个接口)
	async changeSku({ dispatch, commit, rootGetters }, query) {
		try {
			const params = {
				newSku: query.newSku,
				num: query.num,
				oldSku: query.oldSku,
			}
			if (rootGetters.token) {
				await http.car.carChangeSku(params)
			} else {
				commit('addCar', query.goods)
				commit('deleteGoods', [query.oldSku])
			}
		} catch (error) {
			console.log('changeSku', error)
		}
		return dispatch('checkout', { couponCode: 'default', promoCode: 'default' })
	},
	// 获取购车列表
	getCarList({ commit, rootGetters, state, dispatch }) {
		console.log('getCarListgetCarListgetCarList')
		return new Promise((resolve, reject) => {
			if (rootGetters.token) {
				http.car
					.carList()
					.then(res => {
						const data = res.data
						dealData(commit, data) // 区分是否有效数据
						resolve()
					})
					.catch(err => {
						reject(err)
					})
			} else {
				// 未登录
				let bool = state.carList.length ? state.carList.every(item => item.check) : false
				commit('setIsAllChecked', bool)
				dispatch('carCalc', {
					type: 99, // 有可能已经有选中的，所以要计算金额
				})
				resolve()
			}
		})
	},
	// 结账台
	checkout({ state, dispatch, commit, rootGetters }, query) {
		const { orderParams = {}, carList, expiredList } = state
		const params = {
			items: [...carList, ...expiredList],
			promoCode: orderParams.promoCode, // 活动码
			couponCode: orderParams.couponCode, // 空字符串为不适用优惠券
			shippingMethod: orderParams.shippingMethod,
			payType: orderParams.payType,
		}
		if (!rootGetters.token && params.items.length == 0) return
		if (query && query.couponCode === 'default') {
			delete params.promoCode
			delete params.couponCode
		}
		return http.car['carCheckout'](params)
			.then(res => {
				// 数据正常模式
				let { selectCoupon = {}, selectPromo = {} } = res.data
				selectCoupon = selectCoupon || {}
				selectPromo = selectPromo || {}
				params.couponCode = selectCoupon.couponCode || orderParams.couponCode
				params.promoCode = selectPromo.couponCode || orderParams.promoCode
				commit('setOrderParams', params)
				dealData(commit, res.data)
				return res
			})
			.catch(async err => {
				// 数据异常
				let data = err.data || {}
				const { selectCoupon = {}, selectPromo = {} } = data
				params.couponCode = selectCoupon.couponCode || orderParams.couponCode
				params.promoCode = selectPromo.couponCode || orderParams.promoCode
				// 取消选中的优惠券
				if (err.shortCode == '003' || err.shortCode == '006') {
					if (err.shortCode == '003') params.couponCode = undefined
					if (err.shortCode == '006') params.promoCode = ''
					Toast(err.msg)
					commit('setOrderParams', params)
					setTimeout(() => {
						// 提示错误信息,延迟更新数据
						dispatch('checkout')
					}, 500)
					return
				}
				dealData(commit, data)

				if (rootGetters.token) {
					const arr = []
					// 将异常数据取消选中:
					data.items.forEach(item => {
						if (item.itemStatus != 10) {
							arr.push(http.car.carUnCheckSingle({ sku: item.skuNo }))
						}
					})
					await Promise.all(arr)
				}
				setTimeout(() => {
					// 先处理异常，重新计算
					dispatch('checkout')
				}, 0)
				return Promise.reject(err)
			})
	},
	getPublicKeyByChannelId() {
		return $http.getPublicKeyByChannelId({ channelId: 1 })
	},
	getPaypalUserInfo(obj, query) {
		return $http.getPaypalUserInfo(query)
	},
}

// 处理数据，区分是否有效商品, ：
function dealData(commit, data) {
	let { items = [], totalAmount = 0, lackForFreeExpressAmount = 0 } = data
	let normalList = [],
		failList = []

	// 处理选中的属性, 这个值主要是为了得到 属性组合，以及购物车点击属性后探出的商品信息回显正确值：
	items = dealAttr(items)
	// 区分正常与异常商品:
	items.forEach(item => {
		if (item.itemStatus == 10) {
			// 10-启用, 30-停用,,,35-当前sku 的库存为 0
			normalList.push(item)
		} else if (item.itemStatus == 40) {
			// 40-无效, 无效不加购物车,删除
		} else {
			item.check = false
			failList.push(item)
		}
	})
	let bool = normalList.length ? normalList.every(item => item.check) : false
	commit('setCheckOrderDetail', data)
	commit('setTotalPrice', totalAmount) // 计算当前总金额
	commit('setLackForFreeExpressAmount', lackForFreeExpressAmount)
	commit('setIsAllChecked', bool) // 判断是否全部选中状态
	commit('setCarListData', normalList)
	commit('setCarExpiredList', failList)
}
function dealAttr(list) {
	if (!list || !list.length) return []
	list.forEach(item => {
		item.attrObj = {}
		if (item.attr1 && item.val1) {
			item.attrObj[item.attr1] = item.val1
		}
		if (item.attr2 && item.val2) {
			item.attrObj[item.attr2] = item.val2
		}
		if (item.attr3 && item.val3) {
			item.attrObj[item.attr3] = item.val3
		}
		if (item.attr4 && item.val4) {
			item.attrObj[item.attr4] = item.val4
		}
	})
	return list
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
}
