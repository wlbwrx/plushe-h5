import http from '@/api/index.js'

// 商品详情:
const state = {
	sizeConfig: [], // 配置信息
}

const mutations = {
	setSizeConfig(state, info) {
		state.sizeConfig = info
	},
}

const actions = {
	getSizeConfig({ commit, state }) {
		return new Promise((resolve, reject) => {
			// if (state.sizeConfig.length) {
			// 	resolve()
			// 	return
			// }
			http.goodsDetailApi
				.sizeConfig()
				.then(res => {
					resolve()
					commit('setSizeConfig', res.data)
				})
				.catch(err => {
					reject(err)
				})
		})
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}
