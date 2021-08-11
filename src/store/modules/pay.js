import $http from '@/api/modules/pay'
import http from '@/api/modules/order'

import store from 'store'
const state = {
	payInfo: store.get('payInfo') || {},
}

const mutations = {
	setPayInfo(state, payload) {
		store.set('payInfo', payload)
		state.payInfo = payload
	},
}

const actions = {
	createPayment({ commit }, payload) {
		
		return $http.createPayment(payload)
	},
	setCapturePayment({ commit }, payload) {
		console.log(5555, commit)
		return $http.capturePayment(payload)
	},
	queryPayment({ commit }, payload) {
		
		return http.orderDetail(payload)
	},
	// 查询支付订单:
	queryPayment2({ commit }, payload) {
		
		return $http.queryPayment(payload)
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}
