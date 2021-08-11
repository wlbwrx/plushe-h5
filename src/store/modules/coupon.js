import $http from '@/api/modules/mine'
const state = {
	couponList: [],
	// isCoupon: false,
	receiveList: [],
}

const mutations = {
	SET_COUPON(state, data) {
		state.couponList = data
	},
	SET_COUPON_LIST(state, payload) {
		state.receiveList = payload
	},
	// SET_COUPON_STATUS(state, payload){
	// 	state.isCoupon = payload
	// }
}
const actions = {
	CONVERTCOUPON({ commit }, payload) {
		
		return $http.convertCoupon(payload)
	},
	GET_USERCOUPON({ commit }, payload) {
		commit('SET_COUPON', [])
		$http.queryUserCoupon(payload).then(res => {
			let { data } = res
			commit('SET_COUPON', data.list || [])
		})
	},
	ORDER_CONFIG({ commit }, payload) {
		
		return $http.orderConfig(payload)
		// .then((res)=>{
		// 	let {data} = res
		// 	commit('SET_ORDER_CONFIG', data)
		// })
	},
	getNewComerCoupon({ commit }, payload) {
		commit('SET_COUPON_LIST', [])
		$http.getNewComerCoupon(payload).then(res => {
			let { data } = res
			commit('SET_COUPON_LIST', data)
		})
	},
	getUserEnableSpecialCoupon({ commit }, payload) {
		$http.getUserEnableSpecialCoupon(payload).then(res => {
			let { data } = res
			commit('SET_COUPON_LIST', data)
		})
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}
