const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const nodeExternals = require('webpack-node-externals')
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const compressionPlugin = require('compression-webpack-plugin')
const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const TARGET_NODE = process.env.BUILD_TARGET === 'node'
const target = TARGET_NODE ? 'server' : 'client'
const isDev = process.env.NODE_ENV === 'development'
const cdn = require('./src/config/cdn')

const theme = path.resolve(__dirname, './src/style/theme.less')

const externals = {}
let cdnHtml = ``
cdn.js.forEach(item => {
	cdnHtml += `<script ${TARGET_NODE ? 'defer' : ''} ${item.async ? 'async ' : ''}src="${item.js}"></script>`
	if (item.name) {
		externals[item.name] = item.scope
	}
})
const urlList = ['https://img.plushe.com', 'https://cdn.plushe.com/', 'https://www.google-analytics.com/', 'https://www.googletagmanager.com', 'https://analytics.tiktok.com', 'https://static.hotjar.com', 'https://connect.facebook.net']
let dnsPrefetch = ``
urlList.forEach(item => {
	dnsPrefetch += `<link rel="dns-prefetch" href="${item}">`
})

module.exports = {
	publicPath: '/',
	assetsDir: 'static',
	productionSourceMap: isDev,
	css: {
		sourceMap: !isDev && !TARGET_NODE, // if enable sourceMap:  fix ssr load Critical CSS throw replace of undefind
		loaderOptions: {
			postcss: {
				plugins: [
					require('postcss-pxtorem')({
						rootValue: 37.5,
						minPixelValue: 2,
						propList: ['*'],
					}),
				],
			},
			less: {
				lessOptions: {
					modifyVars: {
						// 或者可以通过 less 文件覆盖（文件路径为绝对路径）
						hack: `true; @import "${theme}";`,
					},
				},
			},
		},
	},
	devServer: {
		port: process.env.VUE_APP_VUEPROT,
		disableHostCheck: true, //  新增该配置项 fix ssr console error
		headers: { 'Access-Control-Allow-Origin': '*' },
		proxy: {
			'/dev': {
				target: 'http://192.168.8.91:10006',
				changeOrigin: true, //
				pathRewrite: {
					'^/dev': '',
				},
			},
			'/test': {
				target: 'https://sit.m.plushe.com/',
				pathRewrite: {
					'^/test': '',
				},
			},
			'/uat': {
				target: 'https://uat.m.plushe.com/',
				// logLevel: 'debug',
				pathRewrite: {
					'^/uat': '',
				},
			},
			'/pro/plushemall': {
				target: 'https://m.plushe.com/',
				pathRewrite: {
					'^/pro/plushemall': '/plushemall',
				},
			},
			// wind 的本地测试地址
			'/wind': {
				target: 'http://192.168.8.76:10017',
				changeOrigin: true, //
				pathRewrite: {
					'^/wind': '',
				},
			},
			// raise 的本地测试地址
			'/raise': {
				target: 'http://192.168.8.91:10006/raise',
				changeOrigin: true, //
				logLevel: 'debug',
				pathRewrite: {
					'^/raise': '',
				},
			},
		},
		progress: false,
	},
	transpileDependencies: [],
	// eslint-disable-next-line
	configureWebpack: config => ({
		entry: `./src/entry-${target}.js`,
		target: TARGET_NODE ? 'node' : 'web',
		node: TARGET_NODE ? undefined : false,
		output: {
			libraryTarget: TARGET_NODE ? 'commonjs2' : undefined,
			// library: '[name].[hash:8]',
			filename: 'static/js/[name].[hash:8].js',
			chunkFilename: 'static/js/[name].[hash:8].js',
		},
		// https://webpack.js.org/configuration/externals/#function
		// https://github.com/liady/webpack-node-externals
		// 外置化应用程序依赖模块。可以使服务器构建速度更快，
		// 并生成较小的 bundle 文件。
		externals: Object.assign(
			TARGET_NODE
				? nodeExternals({
						// 不要外置化 webpack 需要处理的依赖模块。
						// 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
						// 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
						whitelist: [/\.css$/, /\?vue&type=style/],
				  })
				: {},
			!isDev ? externals : {}
		),
		optimization: {
			splitChunks: TARGET_NODE ? false : undefined,
			minimizer: isDev
				? []
				: [
						new TerserPlugin({
							terserOptions: {
								compress: {
									drop_console: !isDev && !TARGET_NODE,
									pure_funcs: ['console.log'],
								},
							},
						}),
				  ],
		},
		plugins: [TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()].concat(
			isDev
				? []
				: [
						new CopyWebpackPlugin([
							{
								from: resolve('./static'),
								to: resolve('./dist/static'),
								toType: 'dir',
								ignore: ['index.html', '.DS_Store', '.well-known'],
							},
							{
								from: resolve('./server'),
								to: resolve('./dist/server'),
								toType: 'dir',
								ignore: ['setup-dev-server.js', 'pm2.config.template.js', 'index.template.html', '.DS_Store'],
							},
							{
								from: resolve('./server/index.template.html'),
								to: resolve('./dist/server/index.template.html'),
								transform: function(content) {
									return content
										.toString()
										.replace('<!-- cdn-srcipt -->', cdnHtml)
										.replace('<!-- head-dns-prefetch -->', dnsPrefetch)
										.replace('<!-- application-name -->', process.env.VUE_APP_PROJECT === 'prod' ? `` : `<meta name="robots" content="noindex, nofollow" />`)
								},
							},
							{
								from: resolve('./server/pm2.config.template.js'),
								to: resolve('./dist/server/pm2.config.js'),
								transform: function(content) {
									return content.toString().replace('VUE_APP_MAXMEMORY', process.env.VUE_APP_MAXMEMORY)
								},
							},
							{
								from: resolve('./bin'),
								to: resolve('./dist/bin'),
							},
							{
								from: resolve('./package.json'),
								to: resolve('./dist'),
							},
							// {
							//   from: resolve('./package-lock.json'),
							//   to: resolve('./dist')
							// }
						]),
						new compressionPlugin({
							filename: '[path].gz[query]', // 压缩的文件名
							algorithm: 'gzip', // 压缩格式
							test: /.(js|css)$/, // 匹配.js .css后缀的文件才进行压缩
							threshold: 1024, //
							minRatio: 0.8, //
							deleteOriginalAssets: false, // 是否删除对应的源文件（不确定服务器那边是否开启了gzip，设置为false， true:删除 false:不删除）
						}),
						new compressionPlugin({
							filename: '[path].br[query]',
							algorithm: 'brotliCompress',
							test: /\.(js|css|html|svg)$/,
							compressionOptions: { level: 11 },
							threshold: 1024,
							minRatio: 0.8,
							deleteOriginalAssets: false,
						}),
				  ]
		),
	}),
	chainWebpack: config => {
		// alias
		config.resolve.alias
			.set('@', resolve('src'))
			.set('@assets', resolve('src/assets'))
			.set('@config', resolve('src/config'))
			.set('@components', resolve('src/components'))
			.set('@static', resolve('src/static'))
			.set('@utils', resolve('src/utils'))

		// reset public/index.html to static/index.html
		config.plugin('html').tap(args => {
			args[0].template = resolve('./static/index.html')
			return args
		})
		if (!isDev) {
			config.plugin('html').tap(args => {
				args[0].cdn = cdnHtml
				args[0].dnsPrefetch = dnsPrefetch
				return args
			})
		}

		if (TARGET_NODE) {
			// fix ssr bug: document not found -- https://github.com/Akryum/vue-cli-plugin-ssr/blob/master/lib/webpack.js
			const isExtracting = config.plugins.has('extract-css')
			if (isExtracting) {
				// Remove extract
				const langs = ['css', 'postcss', 'scss', 'sass', 'less', 'stylus']
				const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
				for (const lang of langs) {
					for (const type of types) {
						const rule = config.module.rule(lang).oneOf(type)
						rule.uses.delete('extract-css-loader')
						// Critical CSS
						rule.use('vue-style')
							.loader('vue-style-loader')
							.before('css-loader')
					}
				}
				config.plugins.delete('extract-css')
			}

			config.module
				.rule('vue')
				.use('cache-loader')
				.tap(options => {
					// Change cache directory for server-side
					options.cacheIdentifier += '-server'
					options.cacheDirectory += '-server'
					return options
				})
		}
		config.module
			.rule('vue')
			.use('vue-loader')
			.tap(options => {
				if (TARGET_NODE) {
					options.cacheIdentifier += '-server'
					options.cacheDirectory += '-server'
				}
				options.optimizeSSR = TARGET_NODE
				return options
			})

		// fix ssr hot update bug
		if (TARGET_NODE) {
			config.plugins.delete('hmr')
		}
	},
}
