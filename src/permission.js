import router from './router/index.js'
import store from './store/index.js'

import { getToken } from '@/utils/auth.js'
import { appConstant } from '@/utils/enums.js'

router.beforeEach((to, from, next) => {
	// ios/android打包时的入口为: https://m.plushe.com/home?client=ios/android
	if (to.path == '/home' && to.query.client) {
		store.commit('app/SET_CLIENT', to.query.client)
	}
	// 平台为 geeMart时，有店铺概念：
	if (store.getters.platformId == 2) {
		// 发现有店铺Id，则更新
		if (to.query.shopsId) {
			store.commit('app/SET_SHOPSID', to.query.shopsId)
		}
		// 共用的分类页面（正常前进后退，店铺会从这里返回到geeMart平台）
		if (to.path == '/category' && !to.query.shopsId) {
			store.commit('app/SET_SHOPSID')
		}
	}
	if (getToken()) {
		if (to.path == '/login') {
			next('/home')
		} else {
			next()
		}
	} else {
		// 需要登录权限的页面
		if (!to.meta.auth) {
			next()
		} else {
			next({
				path: '/login',
				query: {
					redirect: to.fullPath,
				},
			})
		}
	}
})
router.afterEach(to => {
	window.gtag('config', appConstant.googlePixelId, { page_path: to.fullPath })
	if (appConstant.googlePixelOldId && process.env.VUE_APP_PROJECT === 'prod') {
		window.gtag('config', appConstant.googlePixelOldId, { page_path: to.fullPath })
	}

	// pageView()
	// pageView({}, 'GA4')

	const { goBackUrlList } = store.state.app
	if (goBackUrlList.length) {
		store.commit(
			'app/SET_goBackUrl',
			goBackUrlList.filter((o, i) => i != 0)
		)
	}

	let bodySrcollTop = document.body.scrollTop
	if (bodySrcollTop !== 0) {
		document.body.scrollTop = 0
		return
	}
	let docSrcollTop = document.documentElement.scrollTop
	if (docSrcollTop !== 0) {
		document.documentElement.scrollTop = 0
	}
})
