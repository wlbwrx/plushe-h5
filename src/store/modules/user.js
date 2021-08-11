import http from '@/api/user'
import $http from '@/api/index'
import I18n from '@/i18n/i18n'

import { setToken, removeToken, setUserInfo, getUserInfo, getLoginMethod, setLoginMethod } from '@/utils/auth.js'

const state = {
	user: getUserInfo() || {},
	loginSwipeIndex: 1, // 默认为注册
	userEmail: '', // 用户邮箱
	loginMethod: getLoginMethod() || 0, // 登录方式
	backPath: '', //用来记录当前页面的上一个页面 直接用router返回会出现bug
	slideCouponHide: false, // 是否隐藏侧栏优惠券提示
	newPeopleCouponVal: 0, // 新人优惠券金额
}

const mutations = {
	SET_USER: (state, obj = {}) => {
		setToken(obj.userToken || '')
		setUserInfo(obj)
		state.user = obj
	},
	SET_USEREMAIL(state, email) {
		state.userEmail = email
	},
	SET_LOGINSWIPEINDEX(state, index) {
		state.loginSwipeIndex = index
	},
	SET_LOGINMETHOD(state, type) {
		state.loginMethod = type
		setLoginMethod(type)
	},
	setSlideCoupon(state, bool) {
		state.slideCouponHide = bool
	},
	backPath(state, string) {
		state.backPath = string
	},
	// 新人优惠券金额:
	setNewPeopleCouponVal(state, val) {
		state.newPeopleCouponVal = val || 0
	},
}

const actions = {
	// 邮箱-登陆
	Login({ commit }, params) {
		return new Promise((resolve, reject) => {
			http.login(params)
				.then(response => {
					const { data } = response
					commit('SET_USER', data)
					resolve()
				})
				.catch(error => {
					reject(error)
				})
		})
	},
	// 登出：
	Signout({ commit }) {
		return new Promise(resolve => {
			commit('shopCar/setCarExpiredList', null, { root: true })
			commit('shopCar/setCarListData', null, { root: true })
			commit('wish/setWishList', [], { root: true })
			commit('SET_LOGINSWIPEINDEX', 0)
			commit('SET_USER')
			removeToken()
			localStorage.clear()
			sessionStorage.clear()
			resolve()
		})
	},
	// 邮箱-注册
	Register({ commit }, params) {
		params.registerMode = 1
		params.country = I18n.t('country')
		params.currency = I18n.t('currency')
		return new Promise((resolve, reject) => {
			http.register(params)
				.then(response => {
					const { data } = response
					commit('SET_USER', data)
					resolve()
				})
				.catch(error => {
					reject(error)
				})
		})
	},
	// 三方-登录
	ThirdLogin({ commit }, params) {
		params.country = I18n.t('country')
		params.currency = I18n.t('currency')
		return new Promise((resolve, reject) => {
			http.third(params)
				.then(response => {
					const { data } = response
					commit('SET_USER', data)
					resolve(data)
				})
				.catch(error => {
					reject(error)
				})
		})
	},
	getUser({ commit, state }, params) {
		http.getUser(params).then(res => {
			let { data } = res || {}
			commit('SET_USER', { ...state.user, ...data })
		})
	},
	updateUser({ commit }, payload) {
		return http.updateByUser(payload)
	},
	getNewPeopleCoupon({ commit }) {
		$http.coupon.newPeople().then(res => {
			commit('setNewPeopleCouponVal', res.data ? res.data.couponAmount : 0)
		})
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}
