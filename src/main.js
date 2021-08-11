import Vue from 'vue'
import App from './App.vue'

import { sync } from 'vuex-router-sync'

import { createRouter } from './router'
import { createStore } from './store'
import i18n from './i18n/i18n'
import { isWindow, permission } from '@/utils'
const VueAwsomeSwiper = require('vue-awesome-swiper')
Vue.use(VueAwsomeSwiper)

import '@/style/index.less'
require('swiper/css/swiper.css')

if (isWindow) {
	require('@vant/touch-emulator')
	require('@static/js/rem.js')
}

if (isWindow && process.env.NODE_ENV === 'development') {
	// require('@/mock/modules/countrys')
	// require('@/mock/modules/jpCountry')
}

//关闭生产模式下给出的提示
Vue.config.productionTip = true
Vue.config.errorHandler = (error, vm) => {
	console.error('Vue error')
	console.error(vm)
	console.error(error)
}

// for using vant components
import Vant from 'vant'
Vue.use(Vant)
// 控制服务端渲染时候，返回HTML移除三方css，转为 preload 加载，前提: 默认支持的 preload 加载
// if (process.env.BUILD_TARGET !== 'node') {
// 	require('vant/lib/index.css')
// }

import * as utils from '@/utils/index'
Vue.prototype.$utils = utils
import mixin from './mixins/index.js'
Vue.mixin(mixin)

import { Lazyload } from 'vant'
Vue.use(Lazyload)

export function createApp() {
	const router = createRouter()
	const store = createStore()
	// sync the router with the vuex store.
	// this registers `store.state.route`
	sync(store, router)
	const app = new Vue({
		router,
		store,
		i18n,
		render: h => h(App),
	})
	permission(router, store)
	return { app, router, store }
}

// promise.finally Polyfill
if (!Promise.prototype.finally) {
	Promise.prototype.finally = function(callback) {
		let P = this.constructor
		return this.then(
			value => P.resolve(callback()).then(() => value),
			reason =>
				P.resolve(callback()).then(() => {
					throw reason
				})
		)
	}
}
