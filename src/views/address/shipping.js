import { mapActions, mapMutations, mapState } from 'vuex'
import selectCountryComponent from '@/components/SelectCountry.vue'
import { paypalAdd } from '@/utils/enums.js'
export default {
	beforeRouteEnter(to, from, next) {
		let { goBackUrl } = to.query
		if (goBackUrl) {
			to.meta.goBackUrl = 'shoppingCar'
		} else {
			to.meta.goBackUrl = ''
		}
		next()
	},
	components: {
		selectCountryComponent,
	},
	data() {
		let { goBackUrl, addressId, isDefaultAddress } = this.$route.query
		return {
			goBackUrl,
			selectCountry: {},
			showCountry: false,
			showPicker: false,
			showJPPicker: false,
			fieldValue: '',
			cascaderValue: '',
			phoneCode: '',
			provinces: [],
			addressId,
			cityValidator: /^.{2,60}$/,
			userNameValidator: /^[a-z\sA-Z0-9_-]+$/,
			phoneValidator: /^\d{5,16}$/,
			postCodeValidator: /^[0-9a-zA-Z-]{4,10}$/,
			jpCountry: [],
			param: {
				firstName: '',
				katakanaFirstName: '',
				lastName: '',
				katakanaLastName: '',
				phoneCode: '', // 电话前缀
				phoneNumber: '',
				country: '',
				city: '',
				county: '', // 日本地址 町
				state: '',
				postCode: '',
				firstAddress: '',
				secondAddress: '',
				isDefaultAddress: isDefaultAddress ? Number(isDefaultAddress) : 0,
			},
			// isDefaultAddress: 1
		}
	},
	created() {
		// Toast.fail()
		this.getjpCountry()
		const { code, error_description } = this.$route.query
		if (code || error_description) {
			this.SET_goBackUrl(error_description ? ['/shopping_car'] : ['/orderConfirm', '/shopping_car'])
			// paypal地址回调
			if (!code) return
			this.getPaypalUserInfo({
				authCode: code,
				channelId: 1,
			}).then(res => {
				if (!res.data) return
				this.backfillAddress(res.data)
			})
			return
		}
		let { addressId } = this
		if (addressId) {
			this.GET_USERADDRESS_DETAIL({ addressId }).then(res => {
				let { data } = res
				this.param = data
				this.fieldValue = `${data.state} ${data.city} ${data.county || ''}`
				this.cascaderValue = data.county || data.city
				this.getAddressList(data)
			})
		} else if (this.platformId == 3) {
			this.param.phoneCode = '+81'
		} else if (this.platformId !== 3) {
			this.getAddressList()
		}
	},
	mounted() {},
	watch: {
		'param.postCode'(newVal) {
			if (newVal.length < 6 || this.platformId != 3 || this.jpCountry.length == 0) return
			// console.log('newVal', newVal);
			this.jpCountry.forEach(item => {
				item.children.forEach(element => {
					if (element.code == newVal) {
						this.onFinish({
							selectedOptions: [item, element],
						})
					}
					;(element.children || []).forEach(sign => {
						if (sign.code == newVal) {
							this.onFinish({
								selectedOptions: [item, element, sign],
							})
						}
					})
				})
			})
		},
	},
	computed: {
		// 是否显示步骤图, 只当第一次添加地址时出现,成功提交后,不再显示
		hideBuZhouImg() {
			return !this.$route.query.shippingFirst
		},
		...mapState('app', ['goBackUrlList']),
		postCodeLength() {
			return this.platformId == 3 ? '6' : '10'
		},
	},
	methods: {
		...mapMutations('app', ['SET_goBackUrl']),
		...mapMutations('address', ['SET_shippingAddress', 'SET_billingAddress']),
		...mapActions('address', ['ADD_ADDRESS', 'GET_USERADDRESS_DETAIL', 'UPDATE_ADDRESS']),
		...mapActions('shopCar', {
			getPaypalUserInfo: 'getPaypalUserInfo', // 获取支付通道公钥
		}),
		selectCountryClick() {
			this.showCountry = true
			this.$refs.country.show(true)
		},
		selectCountryCallBack(item) {
			if (item == 0) {
				this.showCountry = false
				return
			}
			this.param.city = ''
			this.param.state = ''
			this.param.postCode = ''
			this.showCountry = false
			this.selectCountry = item
			this.getAddressList()
		},
		getAddressList(data) {
			let country = this.selectCountry
			let countrys = window.countrys
			let defaultCountrys = countrys['U'].filter(v => v.name == 'United States')
			let seleCountry = this.$utils.isEmptyObject(country) ? defaultCountrys[0] : country
			if (data) {
				let index = data.country.substr(0, 1)
				seleCountry = countrys[index].filter(v => v.name == data.country)[0]
			}
			let { code, dial_code, name, provinces } = seleCountry
			// console.log(33333, Object.keys(provinces))
			this.phoneCode = code + ' ' + dial_code
			this.provinces = provinces ? Object.keys(provinces) : []
			this.param.phoneCode = dial_code
			this.param.country = name
		},
		onConfirm(value) {
			this.param.state = value
			this.showPicker = false
		},
		validator(val) {
			return /1\d{2}/.test(val)
		},
		// 异步校验函数返回 Promise
		onSubmit(values) {
			values = this.param
			if (this.$utils.isEmpty(values.city) || values.city.length > 60) {
				this.errToast('fail', this.$t('addressForm.text5'))
				return
			}
			if (!this.param.country || this.param.country === '') {
				this.errToast('fail', this.$t('addressForm.text0'))
				return
			}
			if ((!this.param.state || this.param.state === '') && this.provinces.length > 0) {
				this.errToast('fail', this.$t('addressForm.text8'))
				return
			}
			// please enter a valid firstAddress
			let { param } = this
			let { goBackUrl } = this.$route.query
			if (this.addressId) {
				this.UPDATE_ADDRESS(param).then(() => {
					this.errToast('success', this.$t('addressForm.text9'))
					if (goBackUrl) {
						this.$router.replace({ name: 'orderConfirm' })
					} else {
						this.$router.go(-1)
					}
				})
			} else {
				this.ADD_ADDRESS(param).then(res => {
					this.errToast('success', this.$t('addressForm.text10'))
					if (goBackUrl || this.goBackUrlList[0] == '/orderConfirm') {
						this.SET_shippingAddress(res.data)
						this.SET_billingAddress(res.data)
						this.$router.replace({ name: 'orderConfirm' })
					} else {
						this.$router.go(-1)
					}
				})
			}
		},
		backfillAddress(data) {
			const { address, familyName, givenName } = data
			const { country, postalCode, streetAddress, region } = address
			this.provinces = []
			this.param = {
				...this.param,
				firstAddress: streetAddress,
				postCode: postalCode,
				firstName: familyName,
				lastName: givenName,
				country: paypalAdd[country] || '',
				city: region,
			}
		},
		onFinish(val) {
			const [state, city, county] = val.selectedOptions
			this.param = {
				...this.param,
				state: state.name,
				city: city.name,
				county: county.name,
				postCode: String(county ? county.code : city.code),
				country: 'Japan',
			}
			this.fieldValue = `${state.name} ${city.name} ${county.name || ''}`
			this.showJPPicker = false
		},
		getjpCountry() {
			if (!window.jpCity) return
			this.jpCountry = Object.keys(window.jpCity).map(item => {
				const province = window.jpCity[item].childrenObj
				return {
					name: item,
					children: Object.keys(province).map(element => {
						const city = province[element].childrenObj
						const obj = {
							name: element,
							code: city.code,
							children: Object.keys(city).map(sign => {
								return { name: sign, code: (city[sign] || {}).code }
							}),
						}
						delete obj[obj.code ? 'children' : 'code']
						return obj
					}),
				}
			})
		},
	},
}
