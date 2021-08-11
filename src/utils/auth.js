import store from 'store'
import Cookies from 'js-cookie'

export function setToken(value) {
	Cookies.set('token', value, { expires: 15 })
}

export function getToken() {
	return Cookies.get('token') || false
}

export function removeToken() {
	Cookies.remove('token')
	store.remove('userInfo')
	window.sessionStorage.removeItem('vuex')
}

// 用户信息
export function setUserInfo(obj) {
	store.set('userInfo', obj)
}
export function getUserInfo() {
	if (getToken()) {
		return store.get('userInfo')
	} else {
		return undefined
	}
}

// 购物车信息
export function setCarList(list) {
	store.set('carList', list)
}
export function getCarList() {
	return store.get('carList')
}

// 登录方式
export function getLoginMethod() {
	return store.get('loginMethod')
}
export function setLoginMethod(type) {
	if (type == undefined) {
		store.remove('loginMethod')
	} else {
		store.set('loginMethod', type)
	}
}
