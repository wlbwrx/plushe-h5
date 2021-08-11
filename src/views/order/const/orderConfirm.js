import store from 'store'
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'
import { payList, provincesList } from '@/utils/enums'
import { loadStripe } from '@stripe/stripe-js'
import { paypalAdd } from '@/utils/enums.js'
import AddressShown from '@/components/AddressShown.vue'

export default {
	created() {},
	activated() {
		this.getjpCountry()
		this.SET_TITLE('')
		if (store.get('payBack')) {
			this.gotoDetail(store.get('payBack'))
			return
		}
		this.init()
		// 这个是终端判断: ios / android / h5
		const client = store.get('client')
		if (client) {
			this.otherParms.sourceType = (client == 'ios' && 2) || (client == 'android' && 1) || 3
		}
	},
	inject: ['reload'],
	data() {
		let shopsId = store.get('shopsId')
		return {
			form: {
				userEmail: '',
				receiverFirstName: '',
				receiverLastName: '',
				receiverKatakanaFirstName: '',
				receiverKatakanaLastName: '',
				receiverPhoneCode: '+1', // 电话前缀
				receiverPhone: '',
				receiverCountry: 'United States',
				receiverCity: '',
				receiverState: '',
				receiverPostCode: '',
				receiverDetailAddressone: '',
				receiverDetailAddresstwo: '',
				receiverTing: '',
				fieldValue: '',
			},
			billForm: {
				billDetailAddressone: '',
				billDetailAddresstwo: '',
				billPhoneCode: '',
				billRecCity: '',
				billRecCountry: 'United States',
				billRecFirstName: '',
				billRecKatakanaFirstName: '',
				billRecKatakanaLastName: '',
				billRecLastName: '',
				billRecPhone: '',
				billRecPostCode: '',
				billRecState: '',
				billRecTing: '',
				fieldValue: '',
			},
			showPromoCode: false,
			showJPPicker: false,
			billshowJPPicker: false,
			promoCode: '',
			addBillAddress: '1', // 游客模式账单地址模式
			isCreateOrder: false,
			shippMethod: '',
			otherParms: {
				payType: 4,
				sourceType: 3, // 默认是3 表示 h5
				shopsId,
				receiverAddressId: '',
				billAddressId: '',
			},
			reportItems: [], // 上报的商品信息
			cityValidator: /^.{2,60}$/,
			emailValidator: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
			userNameValidator: /^[a-z\sA-Z0-9_-]+$/,
			phoneValidator: /^\d{5,16}$/,
			postCodeValidator: /^[0-9a-zA-Z-]{4,10}$/,
			selectCountry: {},
			showCountry: false,
			showPicker: false,
			billshowPicker: false,
			phoneCode: '',
			billphoneCode: '',
			showCountryType: 1,
			billprovinces: provincesList,
			provinces: provincesList,
			invalid: {
				cascaderValue: '',
				billcascaderValue: '',
			},
			jpCountry: [],
		}
	},
	watch: {
		'form.receiverPostCode'(newVal) {
			console.log('form.receiverPostCode', newVal)
			if (newVal.length < 6 || this.platformId != 3 || this.jpCountry.length == 0) return
			this.jpCountry.forEach(item => {
				item.children.forEach(element => {
					if (element.code == newVal) {
						this.onFinish(
							{
								selectedOptions: [item, element],
							},
							true
						)
					}
					;(element.children || []).forEach(sign => {
						if (sign.code == newVal) {
							this.onFinish(
								{
									selectedOptions: [item, element, sign],
								},
								true
							)
						}
					})
				})
			})
		},
		'billForm.billRecPostCode'(newVal) {
			if (newVal.length < 6 || this.platformId != 3 || this.jpCountry.length == 0) return
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
		payList() {
			if (this.payPalOnly) {
				return payList.filter(item => item.value == 1)
			} else if (this.platformId == 3) {
				return payList.filter(item => item.value != 1)
			} else {
				return payList.filter(item => item.value != 5)
			}
		},
		...mapState('shopCar', {
			selectPromo: state => state.checkOrderDetail.selectPromo || {},
			checkOrderDetail: state => state.checkOrderDetail,
			orderParams: state => state.orderParams,
			selectCoupon: state => state.checkOrderDetail.selectCoupon || {},
			carList: state => state.carList,
		}),
		...mapState('address', {
			shippingAddress: state => state.shippingAddress,
			billingAddress: state => state.billingAddress,
		}),
		...mapGetters(['InvitationCode']),
		...mapState('app', ['goBackUrlList', 'payPalOnly']),
		shopListlenth() {
			const total = (this.checkOrderDetail.items || []).reduce((pre, cur) => {
				if (!cur.check) return pre
				return pre + cur.num
			}, 0)
			return total
		},
		availableShippings() {
			const { lackForFreeExpressAmount, availableShippings } = this.checkOrderDetail

			let arr = [{ name: this.$t('pay.freeShipping'), fee: this.$t('pay.free'), id: 0 }]
			if (lackForFreeExpressAmount > 0) {
				arr = availableShippings
			}
			return arr
		},
		shippingName() {
			const { firstName = '', lastName = '' } = this.shippingAddress
			return `${firstName} ${lastName}`
		},
		shippingPhone() {
			const { phoneCode = '', phoneNumber = '' } = this.shippingAddress
			return `${phoneCode} ${phoneNumber}`
		},
		shippingDetailAddress() {
			const { firstAddress = '', secondAddress = '', city = '', state = '', country = '', postCode = '', county = '' } = this.shippingAddress
			return this.platformId == 3 ? `${state} ${city} ${county} ${firstAddress} ${postCode}` : `${firstAddress} ${secondAddress} ${city} ${state} ${country} ${postCode}`
		},
		billingName() {
			const { firstName = '', lastName = '' } = this.billingAddress
			return `${firstName} ${lastName}`
		},
		billingPhone() {
			const { phoneCode = '', phoneNumber = '' } = this.billingAddress
			return `${phoneCode} ${phoneNumber}`
		},
		billingDetailAddress() {
			const { firstAddress = '', secondAddress = '', city = '', state = '', country = '', postCode = '', county = '' } = this.billingAddress
			return this.platformId == 3 ? `${state} ${city} ${county} ${firstAddress} ${postCode}` : `${firstAddress} ${secondAddress} ${city} ${state} ${country} ${postCode}`
		},
	},
	methods: {
		...mapMutations('shopCar', ['setOrderParams', 'setCheckOrderDetail', 'setCarListData']),
		...mapActions('shopCar', ['checkout', 'getPaypalUserInfo']),
		...mapActions('address', ['getUserDefaultAddress', 'GET_USERADDRESS']),
		...mapActions('order', ['createOrder', 'createGuestUserOrder', 'queryGetOrderDetail']),
		...mapActions('pay', ['createPayment']),
		...mapMutations('pay', ['setPayInfo']),
		...mapMutations('app', ['SET_TITLE', 'SET_goBackUrl']),
		...mapMutations('address', ['SET_shippingAddress', 'SET_billingAddress']),

		init() {
			if (this.platformId == 3) {
				this.form.receiverPhoneCode = ''
			}
			this.shippMethod = this.orderParams.shippingMethod
			// 默认选中金额最大的:
			if (!this.shippMethod) {
				let maxMoney = 0
				this.availableShippings.forEach(item => {
					if (item.fee > maxMoney) {
						maxMoney = item.fee
						this.shippMethod = item.id
					}
				})
			}
			this.orderParams.shippingMethod = this.shippMethod || undefined
			this.otherParms.payType = 4
			this.getOrderConfig()
			this.getUserAddress()
			const { code, error_description } = this.$route.query
			if (code || error_description || this.payPalOnly) {
				this.otherParms.payType = 1
				this.SET_goBackUrl(['/shopping_car'])
				if (!code) return
				// paypal地址回调
				this.getPaypalUserInfo({
					authCode: code,
					channelId: 1,
				}).then(res => {
					if (!res.data) return
					this.backfillAddress(res.data)
				})
			}
		},
		async getUserAddress() {
			if (!this.token) return
			this.otherParms.receiverAddressId = this.shippingAddress.addressId
			this.otherParms.billAddressId = this.billingAddress.addressId
			if (this.shippingAddress.addressId && this.billingAddress.addressId) {
				return
			}
			let res = await this.getUserDefaultAddress({})
			if (res && res.data) {
				this.SET_shippingAddress(res.data)
				this.SET_billingAddress(res.data)
				return
			}
			// 没有地址跳转地址，有地址列表跳转选择地址，都没有跳转新增地址
			let { data } = await this.GET_USERADDRESS({ pageNum: 1, pageSize: 20 })
			if (data && data.list && data.list.length > 0) {
				this.SET_shippingAddress(data.list[0])
				this.SET_billingAddress(data.list[0])
			} else {
				this.gotoAddress('newAddress', { isDefaultAddress: 1 })
			}
		},
		getOrderConfig() {
			let { payType } = this.otherParms
			this.orderParams['payType'] = payType
			this.isCreateOrder = true
			return this.checkout({ ...this.orderParams })
				.then(res => {
					this.setCheckOrderDetail(res.data)
					this.getConfigInfo()
				})
				.catch(err => {
					let { shortCode, msg } = err
					if (shortCode === '001' || shortCode === '002' || shortCode === '004') {
						this.toastShow(msg)
						setTimeout(() => {
							this.$router.replace({ name: 'shoppingCar' })
						}, 2000)
					} else if (shortCode === '003' || shortCode === '005' || shortCode === '006') {
						this.toastShow(msg)
					}
					//   001,
					//   002,004 返回购物车

					//   003 005 在当前页面 刷新
				})
				.finally(() => {
					this.isCreateOrder = false
				})
		},
		getConfigInfo() {
			const orderParams = { ...this.orderParams }
			const { items, lackForFreeExpressAmount, availableShippings } = this.checkOrderDetail
			if (availableShippings.length == 1 && !this.shippMethod) {
				this.shippMethod = availableShippings[0].id
				orderParams.shippingMethod = availableShippings[0].id
				this.$nextTick(this.getOrderConfig)
			}
			if (lackForFreeExpressAmount === 0) {
				this.shippMethod = 0
			}
			orderParams.productSkuVoList = items.map(item => {
				let { productId, productNo, skuNo, num } = item
				return { productId, productNo, skuNo, productQuantity: num }
			})
			this.setOrderParams(orderParams)
		},
		async createOrderFun() {
			if (this.isCreateOrder) return
			const { shippingMethod } = this.orderParams
			const { lackForFreeExpressAmount, verifyKey } = this.checkOrderDetail
			if (lackForFreeExpressAmount > 0 && !shippingMethod) {
				this.toastShow(this.$t('pay.choose'))
				return
			}
			const { addressId: billAddressId } = this.billingAddress
			const { addressId: receiverAddressId } = this.shippingAddress
			const invitationCode = this.InvitationCode || ''
			let params = { ...this.otherParms, invitationCode, billAddressId, receiverAddressId, ...this.orderParams, notRealUserFlag: false, verifyKey, shippMethod: shippingMethod }
			if (!this.token) {
				const validate = await this.$refs.form.validate().catch(err => {
					this.$refs.form.scrollToField(err[0].name)
					return err[0].message
				})
				if (validate) {
					this.toastShow(validate)
					return
				}
				if (this.addBillAddress === '1') {
					// 账单地址与默认地址相同
					Object.keys(this.billForm).forEach(item => {
						const str = item.replace('billRec', 'receiver').replace('bill', 'receiver')
						this.billForm[item] = this.form[str]
					})
				}
				params = {
					items: this.orderParams.items,
					orderVo: {
						billAddress: { ...this.billForm },
						receiverAdderss: { ...this.form },
						...this.orderParams,
						...this.otherParms,
						couponCode: this.orderParams.couponCode || '',
						promotionCode: this.selectPromo.couponCode || '',
						invitationCode,
						shippMethod: this.orderParams.shippingMethod,
						shippingMethod,
						verifyKey,
					},
					notRealUserFlag: true,
					userVo: {
						userEmail: this.form.userEmail,
						country: this.$t('country'),
						currency: this.$t('currency'),
					},
				}
			}
			this.isCreateOrder = true
			this[this.token ? 'createOrder' : 'createGuestUserOrder'](params)
				.then(res => {
					// console.log('createOrder,success', res)
					let { data } = res
					this.dataReport(data) // 执行数据上报
					if (this.InvitationCode) this.$store.commit('app/SET_INVITATION_CODE', null)
					if (data.createResult) {
						store.set('guestToken', data.guestToken)
						if (this.otherParms.payType === 5) {
							// 到付
							this.emptyData()
							this.$router.replace({ name: 'paySuccess', query: { orderSn: data.orderSn } })
						} else {
							this.payFun(data.orderSn)
						}
					} else {
						this.toastShow(data.createResultDesc)
					}
				})
				.catch(err => {
					console.log('createOrder,fail', err)
					this.isCreateOrder = false
					let { shortCode, code, msg } = err
					if (shortCode === '001' || shortCode === '002' || shortCode === '006') {
						this.toastShow(msg)
						setTimeout(() => {
							this.$router.replace({ name: 'shoppingCar' })
						}, 3000)
					} else if (shortCode === '003' || shortCode === '004' || shortCode === '005') {
						this.toastShow(msg)
						let key = 'couponCode' // 订单信息改变(一般通用优惠券错误)  003
						if (shortCode == '004') key = 'shippingMethod' // 订单信息改变(一般通用优惠券错误) 004
						if (shortCode == '005') key = 'promoCode' // 订单信息改变(一般通用优惠券错误) 005
						this.setOrderParams({ ...this.orderParams, [key]: undefined })
						setTimeout(this.getOrderConfig, 500)
					} else if (code === 20199010) {
						this.toastShow(msg)
						this.deleAddress()
					} else {
						// 未知异常
						this.$router.go(-1)
					}
				})
		},
		// 数据上报
		dataReport(data) {
			// 结算过程中上报,第一步创建订单：
			let reportItems = []
			this.checkOrderDetail.items.forEach(item => {
				// 将本次购买的商品上报
				if (item.check) {
					reportItems.push({
						id: item.skuNo,
						name: item.productName,
						brand: item.brandName,
						quantity: item.num,
						price: (item.discountPrice || item.price) / 100,
						// 新版GA4 字段
						promotion_name: '常规',
						item_id: item.skuNo,
						item_name: item.productName,
						item_brand: item.brandName,
						// 自定义参数-spu
						spuNo: item.productNo,
					})
				}
			})
			let reportData = {
				coupon: this.orderParams.couponCode || undefined,
				promotionCode: this.selectPromo.couponCode || undefined,
				currency: 'USD',
				checkout_option: (this.otherParms.payType == 1 && 'ppaypal') || (this.otherParms.payType == 2 && 'visa') || (this.otherParms.payType == 3 && 'master') || (this.otherParms.payType == 4 && 'stripe'),
				checkout_step: 1,
				value: this.checkOrderDetail.totalAmount / 100,
				shipping: this.checkOrderDetail.shippingFeeAmount / 100, // 运费
				tax: this.checkOrderDetail.taxAmount / 100, // 税费
				transaction_id: data.orderSn,
				items: reportItems,
			}
			let reportOrderGoods = store.get('reportOrderGoods') || []
			reportOrderGoods.push(reportData)
			store.set('reportOrderGoods', reportOrderGoods) // 将数据缓存起来，结算完成后将对应的存入删除
			// UA 上报
			this.reportGtag('checkout_progress', reportData)
			// GA4 上报
			let ga4Data = {
				coupon: this.orderParams.couponCode || undefined,
				currency: 'USD',
				value: this.checkOrderDetail.totalAmount / 100,
				payment_type: (this.otherParms.payType == 1 && 'ppaypal') || (this.otherParms.payType == 2 && 'visa') || (this.otherParms.payType == 3 && 'master') || (this.otherParms.payType == 4 && 'stripe'),
				items: reportItems,
			}
			this.reportGtag('add_payment_info', ga4Data, 'GA4')
			// FB 上报--使用spu
			let fbData = {
				currency: 'USD',
				value: this.checkOrderDetail.totalAmount / 100,
				content_type: 'product_group',
				contents: reportItems.map(item => {
					item.id = item.spuNo
					return item
				}),
				client_user_agent: window.navigator.userAgent,
				action_source: 'website',
				event_source_url: location.href,
				// 'external-id': data.orderSn,
			}
			this.reportFB('AddPaymentInfo', fbData, false, { eventID: data.orderSn })
		},
		async deleAddress() {
			const { addressId: billAddressId } = this.billingAddress
			const { addressId: receiverAddressId } = this.shippingAddress
			let res = await this.GET_USERADDRESS({ pageNum: 1, pageSize: 20 })
			let { data } = res
			let receAid = data.list.some(item => item.addressId === receiverAddressId)
			if (!receAid) {
				this.SET_shippingAddress()
			}
			let billAid = data.list.some(item => item.addressId === billAddressId)
			if (!billAid) {
				this.SET_billingAddress()
			}
			setTimeout(() => {
				this.reload()
			}, 1500)
		},
		async payFun(orderSn) {
			let { shopsId } = this.otherParms
			let { data } = await this.queryGetOrderDetail(orderSn)
			if (data.orderResp.orderStatus !== 0) {
				this.toastShow(this.$t('pay.changed'))
				// Toast.fail()
				setTimeout(() => {
					this.reload()
				}, 1500)
				return
			}
			let param = { shopsId, orderChannel: this.otherParms.payType, orderSn }
			this.createPayment(param)
				.then(res => {
					this.setPayInfo(res.data)
					this.emptyData()
					store.set('payBack', orderSn)
					// 创建支付失败:
					if (res.data.paymentStatus == 5) {
						this.$router.replace({ name: 'orderDetail', query: { orderSn } })
						return
					}
					// 如果是stripe 支付
					if (param.orderChannel == 4) {
						loadStripe(res.data.thirdClientKey).then(stripe => {
							stripe.redirectToCheckout({ sessionId: res.data.paymentRespSn })
						})
					} else {
						window.location.href = res.data.thirdPaymentUrl
					}
				})
				.catch(err => {
					// let { msg } = err
					// Toast.fail(msg)
					this.emptyData()
					let { msg } = err
					this.toastShow(msg)
					setTimeout(() => {
						this.$router.replace({ name: 'orderDetail', params: { orderSn } })
					}, 1500)
				})
		},
		selectCountryClick(type) {
			this.showCountry = true
			this.$refs.country.show(true)
			this.showCountryType = type
		},
		selectCountryCallBack(item) {
			this.showCountry = false
			this.selectCountry = item
			this.getAddressList()
			if (this.showCountryType == 2) {
				this.billForm.billRecCity = ''
				this.billForm.billRecState = ''
				this.billForm.billRecPostCode = ''
				return
			}
			this.form.receiverCity = ''
			this.form.receiverState = ''
			this.form.receiverPostCode = ''
		},
		getAddressList() {
			let country = this.selectCountry
			let countrys = window.countrys
			let defaultCountrys = countrys['U'].filter(v => v.name == 'United States')
			let seleCountry = this.$utils.isEmptyObject(country) ? defaultCountrys[0] : country
			let { code, dial_code, name, provinces } = seleCountry
			if (this.showCountryType == 1) {
				this.receiverPhoneCode = code + ' ' + dial_code
				this.provinces = provinces ? Object.keys(provinces) : []
				this.form.receiverPhoneCode = dial_code
				this.form.receiverCountry = name
			} else {
				this.billPhoneCode = code + ' ' + dial_code
				this.billprovinces = provinces ? Object.keys(provinces) : []
				this.billForm.billPhoneCode = dial_code
				this.billForm.billRecCountry = name
			}
		},
		onConfirm(value) {
			if (this.showPicker) {
				this.form.receiverState = value
				this.showPicker = false
			} else {
				this.billForm.billRecState = value
				this.billshowPicker = false
			}
		},
		backfillAddress(data) {
			const { address, emails, familyName, givenName } = data
			const { country, postalCode, streetAddress, locality } = address
			this.provinces = []
			this.form = {
				...this.form,
				userEmail: emails && emails[0] ? emails[0].value : '',
				receiverFirstName: familyName,
				receiverLastName: givenName,
				receiverCountry: paypalAdd[country] || '',
				receiverCity: locality,
				receiverPostCode: postalCode,
				receiverDetailAddressone: streetAddress,
			}
		},
		onFinish(val, bol) {
			console.log('onFinish', !!(this.showJPPicker || bol))
			const [state, city, county] = val.selectedOptions
			if (this.showJPPicker || bol) {
				this.form = {
					...this.form,
					receiverState: state.name,
					receiverCity: city.name,
					receiverTing: county.name,
					receiverPostCode: String(county ? county.code : city.code),
					receiverCountry: 'Japan',
					fieldValue: `${state.name} ${city.name} ${county.name || ''}`,
				}
			} else {
				this.billForm = {
					...this.billForm,
					billRecState: state.name,
					billRecCity: city.name,
					billRecTing: county.name,
					billRecPostCode: String(county ? county.code : city.code),
					billRecCountry: 'Japan',
					fieldValue: `${state.name} ${city.name} ${county.name || ''}`,
				}
			}
			this.showJPPicker = false
			this.billshowJPPicker = false
		},
		getjpCountry() {
			if (!window.jpCity) {
				setTimeout(() => {
					this.getjpCountry()
				}, 1000)
				return
			}
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
		emptyData() {
			setTimeout(() => {
				// 跳转支付链接会有延迟
				this.isCreateOrder = false
			}, 800)
			if (this.token) {
				this.setCarListData(this.carList.filter(item => !item.check)) // 更新购物车数据
			}
			this.setOrderParams({})
			this.form = {
				userEmail: '',
				receiverFirstName: '',
				receiverLastName: '',
				receiverKatakanaFirstName: '',
				receiverKatakanaLastName: '',
				receiverPhoneCode: '+1', // 电话前缀
				receiverPhone: '',
				receiverCountry: 'United States',
				receiverCity: '',
				receiverState: '',
				receiverPostCode: '',
				receiverDetailAddressone: '',
				receiverDetailAddresstwo: '',
				receiverTing: '',
				fieldValue: '',
			}
			this.billForm = {
				billDetailAddressone: '',
				billDetailAddresstwo: '',
				billPhoneCode: '',
				billRecCity: '',
				billRecCountry: 'United States',
				billRecFirstName: '',
				billRecKatakanaFirstName: '',
				billRecKatakanaLastName: '',
				billRecLastName: '',
				billRecPhone: '',
				billRecPostCode: '',
				billRecState: '',
				billRecTing: '',
				fieldValue: '',
			}
		},
	},
	components: {
		AddressShown,
	},
}
