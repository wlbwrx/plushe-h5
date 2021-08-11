import { createApp } from './main'

// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default context => {
	return new Promise((resolve, reject) => {
		const beginTime = Date.now()
		const { host } = context
		const platformId = host.includes('plushe') ? 1 : host.includes('geemart') ? 2 : host.includes('bondot') ? 3 : 1
		const { app, router, store } = createApp()
		store.commit('ssr/SET_platformId', platformId)
		// set router's location
		router.push(context.url)
		router.onReady(() => {
			// This `rendered` hook is called when the app has finished rendering
			context.rendered = () => {
				// After the app is rendered, our store is now
				// filled with the state from our components.
				// When we attach the state to the context, and the `template` option
				// is used for the renderer, the state will automatically be
				// serialized and injected into the HTML as `window.__INITIAL_STATE__`.
				context.state = store.state
				/* eslint-disable-next-line */
				console.log(`[DATE] data pre-fetch: ${Date.now() - beginTime}ms url=${context.url}`)
			}
			resolve(app)
		}, reject)
	})
}
