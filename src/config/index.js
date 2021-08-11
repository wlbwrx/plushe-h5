const envUrl = {
	dev: {
		baseUrl: '',
	},
	test: {
		baseUrl: '',
	},
	uat: {
		baseUrl: '',
	},
	prod: {
		baseUrl: '',
	},
}

module.exports = envUrl[process.env.VUE_APP_PROJECT]
