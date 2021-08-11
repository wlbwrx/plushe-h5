import { isWindow } from './index'

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

function getTdk(vm) {
	const { tdk } = vm.$options
	if (tdk) {
		return tdk.call(vm)
	}
}

function updateTdk(vm, vdom) {
	const { title, description } = defaultTdk[vm.platformId]
	const tdk = getTdk(vm)
	vdom.title = (tdk && tdk.title) || title
	vdom.description = (tdk && tdk.description) || description
	vdom.keywords = (tdk && tdk.keywords) || ''
	vdom.ssrHeadAddInfo = (tdk && tdk.ssrHeadAddInfo) || ''
}

function serverUpdateTdk() {
	updateTdk(this, this.$ssrContext)
}

function clientUpdateTdk() {
	updateTdk(this, document)
}

export default !isWindow ? serverUpdateTdk : clientUpdateTdk
