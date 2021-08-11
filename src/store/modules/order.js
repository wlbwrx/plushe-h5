import $http from '@/api/modules/order'
import { deepCopy } from '@/utils/index'

const state = {
	isOrderLoading: false,
	orderList: {},
	closeReasonList: [],
	orderDetail: {},
	reviewDetail: {},
}

const mutations = {
	SET_ORDER(state, data) {
		state.isOrderLoading = true
		state.orderList = data
	},
	SET_CLOSE_REASON(state, data) {
		state.closeReasonList = data
	},
	SET_ORDER_DETAIL(state, data) {
		if (!data || data.length === 0) {
			state.orderDetail = []
			state.reviewDetail = []
			return
		}
		let list = deepCopy(data)
		let { userEvaluateList, orderItemResp } = list
		if (userEvaluateList && userEvaluateList.length > 0) {
			list.orderItemResp = orderItemResp.filter(v => {
				let value = userEvaluateList.some(el => el.skuNo === v.skuNo)
				if (!value) return v
			})
			list.userEvaluateList.map(item => {
				orderItemResp.forEach(item2 => {
					if (item.skuNo == item2.skuNo) {
						item['picKey'] = item2.picKey
						item['brand'] = item2.brand
						item['productName'] = item2.productName
					}
				})
				return item
			})
		}
		for (let i = 0; i < list.orderItemResp.length; i++) {
			list.orderItemResp[i].img = ''
			list.orderItemResp[i].evaluateStart = 5
			list.orderItemResp[i].productMatch = ''
			list.orderItemResp[i].evaluateContent = ''
		}

		console.log('orderDetail', data)
		console.log('reviewDetail', list)
		state.orderDetail = data
		state.reviewDetail = list
	},
	// SET_LOGISTICS(state, data){
	// 	state.logisticsList = data
	// }
}

const actions = {
	getOrderList({ commit }, payload) {
		$http.getOrderStatusList(payload).then(res => {
			let { data } = res
			commit('SET_ORDER', data)
		})
	}, // orderColseReason
	getCloseReason({ commit }, payload) {
		$http.orderColseReason(payload).then(res => {
			let { data } = res
			commit('SET_CLOSE_REASON', data)
		})
	},
	setCloseReason({ commit }, payload) {
		
		return $http.closeOrder(payload)
	},
	getOrderDetail({ commit }, payload) {
		commit('SET_ORDER_DETAIL', [])
		return new Promise((resolve, reject) => {
			$http
				.orderDetail(payload)
				.then(res => {
					let { data } = res
					commit('SET_ORDER_DETAIL', data)
					resolve(data)
				})
				.catch(err => {
					reject(err)
				})
		})
	},
	queryGetOrderDetail({ commit }, payload) {
		
		return $http.orderDetail(payload)
	},
	getAllLogistics({ commit }, payload) {
		
		return $http.allLogistics(payload)
		// .then((res)=>{
		// 	let {data} = res
		// 	commit('SET_LOGISTICS', data)
		// })
	},
	getLogisticsDetail({ commit }, payload) {
		
		return $http.logistics(payload)
		// .then((res)=>{
		// 	console.log(55555,res)
		// 	let {data} = res
		// 	commit('SET_LOGISTICS', data)
		// })
	},
	createEvaluate({ commit }, payload) {
		
		return $http.createEvaluate(payload)
	},
	UploadImg({ commit }, payload) {
		
		return $http.uploadImg(payload)
	},
	createOrder({ commit }, payload) {
		
		return $http.createOrder(payload)
	},
	createGuestUserOrder({ commit }, payload) {
		console.log('createGuestUserOrder', commit)
		return $http.createGuestUserOrder(payload)
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}
