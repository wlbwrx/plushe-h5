const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const compress = require('koa-compress')
const koaStatic = require('koa-static')
const cookie = require('koa-cookie').default
const mount = require('koa-mount')
const LRU = require('lru-cache')
const morgan = require('koa-morgan')
const resolve = file => path.resolve(__dirname, file)
const isServerRenderPage = require('./ssr-page-config')
const isDev = process.env.NODE_ENV === 'development'

const template = fs.readFileSync(resolve('./index.template.html'), 'utf-8')
const spaTemplate = fs.readFileSync(resolve(`${isDev ? '../static/index.html' : '../index.html'}`), 'utf-8')
const { createBundleRenderer } = require('vue-server-renderer')
const setupServer = require(`${isDev ? './setup-dev-server' : './setup-pro-server'}`)
const PROT = process.env.VUE_APP_NODEPROT || 30002

const app = new Koa()

app.use(cookie())

// 获取render
let renderer
setupServer.setupServer(app, (bundle, options) => {
	renderer = createBundleRenderer(
		bundle,
		Object.assign(options, {
			template,
			// for component caching
			cache: new LRU({
				max: 1000,
				maxAge: 1000 * 60 * 5,
			}),
			// this is only neede when vue-server-renderer is npm-linked
			// basedir: resolve('../dist'),
			runInNewContext: false,
		})
	)
})
app.use(
	compress({
		filter(content_type) {
			// console.log('content_type', content_type);
			return /text\/html/i.test(content_type)
		},
		threshold: 2048,
		encoding: {},
		br: true, // disable brotli
	})
)
// eslint-disable-next-line
async function ssrRequestHandle(ctx, next) {
	ctx.set('Content-Type', 'text/html')
	const defaultTdk = {
		1: {
			title: 'Plushe | Plus Size Women’s Clothing & Plus Size Fashion',
			description: 'Shop the latest affordable trendy women’s plus size clothing online. Find plus size fashion for women, plus size dress, tops, bottoms, intimates, swimwear&more at Plushe plus size fashion.',
			keywords: '',
			ssrHeadAddInfo: `<link rel="icon" type="image/png" href="/static/ico-plushe.png">`,
		},
		3: {
			title: 'Bondot',
			description: 'Bondot-description',
			keywords: 'Bondot-keywords',
			ssrHeadAddInfo: `<link rel="icon" type="image/png" href="/static/ico-bondot.png">`,
		},
	}
	const { host } = ctx.request.header
	const platformId = host.includes('plushe') ? 1 : host.includes('geemart') ? 2 : host.includes('bondot') ? 3 : 1
	const { title, description, keywords, ssrHeadAddInfo } = defaultTdk[platformId]
	const context = {
		title, // default title
		description,
		keywords,
		ssrHeadAddInfo,
		url: ctx.url,
		cookies: ctx.cookie || {}, // for cookie using
		userAgent: ctx.header['user-agent'],
		host: ctx.header['host'],
	}
	try {
		// eslint-disable-next-line
		ctx.body = await renderer.renderToString(context)
	} catch (err) {
		console.error(`ssrRequestHandle error : url=${ctx.url} err=`, err)
		// handleError(err)
		ctx.body = spaTemplate
	}
}

//开放dist目录
app.use(mount('/static', koaStatic(resolve('../static'))))
//开放.well-known
app.use(mount('/.well-known', koaStatic(resolve('../static/.well-known'))))

// setup the access logger
if (!isDev) {
	app.use(morgan('combined'))
}

// 处理请求
app.use(async (ctx, next) => {
	// 谷歌验证链接, 不可去除
	if (ctx.url === '/google452e4f1b5ba3ecb5.html') {
		ctx.body = 'google-site-verification: google452e4f1b5ba3ecb5.html'
		return
	}
	if (isServerRenderPage(ctx, ctx.cookie || {})) {
		await ssrRequestHandle(ctx, next)
	} else {
		ctx.body = spaTemplate
	}
})
const server = app
	.listen(PROT)
	.on('listening', () => {
		console.log(`server started at localhost:${PROT} , ${new Date()}`)
	})
	.on('error', err => {
		console.error(`---server error--- ${new Date()}`, err)
	})

if (setupServer.setupAppServer) {
	setupServer.setupAppServer(server)
}
