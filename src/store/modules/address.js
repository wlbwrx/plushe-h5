import $http from '@/api/modules/mine'
const state = {
	shippingAddress: {},
	billingAddress: {},
}

const mutations = {
	SET_shippingAddress(state, data) {
		state.shippingAddress = data || {}
	},
	SET_billingAddress(state, data) {
		state.billingAddress = data || {}
	},
}

const actions = {
	DEL_ADDRESS({ commit }, payload) {
		return $http.deleteByAddress(payload)
	},
	UPDATE_ADDRESS({ commit }, payload) {
		return $http.updatetUserAddress(payload)
	},
	ADD_ADDRESS({ commit }, payload) {
		return $http.addUserAddress(payload)
	},
	GET_USERADDRESS({ commit }, payload) {
		return $http.querytUserAddress(payload)
		// .then((res)=>{
		//     let {data} = res
		//     commit('SET_USERADDRESS', data)
		// })
	},
	GET_USERADDRESS_DETAIL({ commit }, payload) {
		return $http.getByAddress(payload)
		// .then((res)=>{
		//     let {data} = res
		//     commit('SET_USERADDRESS_DETAIL', data)
		// })
	},
	SET_DEFAULTARRESSADD_ADDRESS({ commit }, payload) {
		return $http.makeDefaultAddress(payload)
	},
	getUserDefaultAddress({ commit }, payload) {
		return $http.getUserDefaultAddress(payload).then(res => {
			// if (res.data) {
			// 	commit('SET_shippingAddress', res.data)
			// 	commit('SET_billingAddress', res.data)
			// }
			return res
		})
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}
