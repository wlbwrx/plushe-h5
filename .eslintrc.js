module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['plugin:vue/essential', '@vue/prettier'],
	rules: {
		// 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-unused-vars':
			process.env.NODE_ENV === 'production'
				? [
						2,
						{
							vars: 'all',
							args: 'none',
						},
				  ]
				: 'off',
		'prettier/prettier': 0,
		'vue/no-unused-components': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'vue/no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'off',
	},
	parserOptions: {
		parser: 'babel-eslint',
	},
	globals: {
		FB: 'readonly',
		Swiper: 'readonly',
	},
}
