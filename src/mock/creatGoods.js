const str = 'abcdefghijklmnopqrstuvwxyz'

function newStr(len) {
	let strs = ''
	for (let i = 0; i < len; i++) {
		if (i > 0 && (i % 3 == 0 || i % 7 == 0)) strs += ' '
		strs += str.charAt(Math.floor(Math.random() * str.length))
	}
	return strs
}

function newId() {
	return Math.floor(Math.random() * 100 + 1) + newStr(3) + Math.floor(Math.random() * 100) + newStr(2)
}

let colors = [
	{
		id: 1,
		color: 'red',
	},
	{
		id: 2,
		color: 'blue',
	},
	{
		id: 3,
		color: 'yellow',
	},
	{
		id: 4,
		color: 'pink',
	},
	{
		id: 5,
		color: 'hotpink',
	},
	{
		id: 6,
		color: 'black',
	},
]

// 创建一条随机数据：
export function creatGoods() {
	return {
		productName: newStr(Math.floor(Math.random() * 40) + 10),
		productId: newId(),
		discountPrice: Math.ceil(Math.random() * 10000),
		colorId: Math.ceil(Math.random() * 6),
		colors: colors,
	}
}
