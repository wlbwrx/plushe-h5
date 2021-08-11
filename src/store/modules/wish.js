import $http from '@/api/modules/mine'
import store from 'store'

const state = {
	wishList: store.get('wishList') || [], // 收藏列表
}
const mutations = {
	setWishList(state, payload = []) {
		state.wishList = payload
		store.set('wishList', payload)
	},
	// 添加收藏:
	addWish(state, info) {
		let goodsInfo = deepClone(info)
		goodsInfo.isWish = true
		let index = state.wishList.findIndex(item => item.productNo == goodsInfo.productNo)
		if (index == -1) {
			state.wishList.unshift(goodsInfo)
		} else {
			state.wishList[index].isWish = true
		}
		store.set('wishList', state.wishList)
	},
	// 取消收藏:
	deleteWish(state, info) {
		let index = state.wishList.findIndex(item => item.productNo == info.productNo)
		state.wishList[index].isWish = false
		// 是否要删除,默认是需要删除的
		if (!info.unDelete) {
			state.wishList.splice(index, 1)
		}
		store.set('wishList', state.wishList)
	},
}

const actions = {
	// 添加收藏
	addWishList({ commit, rootGetters, state }, goodsInfo) {
		return new Promise((resolve, reject) => {
			if (rootGetters.token) {
				$http.addWishList({ productNo: goodsInfo.productNo }).then(res => {
					if (res.code == 0) {
						commit('addWish', res.data)
						resolve()
					}
				})
			} else {
				commit('addWish', goodsInfo)
				resolve()
			}
		})
	},
	// 取消收藏
	deleteWishList({ commit, rootGetters }, goodsInfo) {
		return new Promise((resolve, reject) => {
			if (rootGetters.token) {
				$http.deleteWishList({ productNo: goodsInfo.productNo }).then(res => {
					if (res.code == 0) {
						commit('deleteWish', { productNo: goodsInfo.productNo, unDelete: goodsInfo.unDelete })
						resolve()
					}
				})
			} else {
				commit('deleteWish', { productNo: goodsInfo.productNo, unDelete: goodsInfo.unDelete })
				resolve()
			}
		})
	},
	// 获取收藏列表:
	queryWishList({ commit, rootGetters, state }, payload) {
		if (rootGetters.token) {
			$http.queryWishList(payload).then(res => {
				let { data } = res
				data.list = data.list.map(item => {
					item.discountPrice = item.dicountAmount
					item.price = item.saleAmount
					item.defaultPicKey = item.picKey || item.defaultPicKey || item.defaultPickey
					item.picKey = item.defaultPicKey // 前往商品详情时,需要使用该图片
					item.isWish = true // 添加收藏标识
					return item
				})
				commit('setWishList', data.list)
			})
		} else {
			let list = (state.wishList || []).filter(item => {
				item.defaultPicKey = item.picKey || item.defaultPicKey
				console.log(item.isWish, 'nizenemle')
				return item.isWish
			})
			commit('setWishList', list)
		}
	},
	updateWishList({ commit }, payload) {
		return $http.updateWishList(payload)
	},
	// 查询是否收藏:
	isUserCollect({ commit }, goodsInfo) {
		return $http.isUserCollect({ productNo: goodsInfo.productNo })
	},
	// 批量添加收藏:
	async addBatchWishList({ state, rootGetters, dispatch }) {
		// 在登录时,将未登录时的心愿单列表批量加收藏
		if (state.wishList.length) {
			const params = {
				wishList: state.wishList.map(item => ({ productNo: item.productNo, userId: store.get('userInfo').userId, platformId: rootGetters.platformId })),
			}
			await $http.addBatchWishList(params)
			dispatch('queryWishList', { pageNum: 1, pageSize: 100 }) // 同步后,再更新收藏列表
		}
	},
}

function deepClone(target) {
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

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}
