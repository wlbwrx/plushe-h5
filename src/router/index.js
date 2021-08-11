import Vue from 'vue'
import Router from 'vue-router'

const requireRoutes = require.context('./modules', false, /.js$/)
const routeMap = requireRoutes.keys().map(route => {
	return requireRoutes(route).default
})
const routes = routeMap.flat()

Vue.use(Router)

function scrollBehavior(to, from, savedPosition) {
	if (savedPosition) {
		return savedPosition
	} else {
		if (from.meta.keepAlive) {
			from.meta.savedPosition = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset
		}
		return { x: 0, y: to.meta.savedPosition || 0 }
	}
}

export function createRouter() {
	const router = new Router({
		mode: 'history',
		routes: [
			...routes,
			{
				path: '*',
				name: '404',
				meta: {
					title: '404',
				},
				component: () => import('@/views/404'),
			},
		],
		scrollBehavior,
	})
	return router
}
