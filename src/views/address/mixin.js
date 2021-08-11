// import store from 'store'
import { mapActions, mapMutations } from 'vuex'
import { Toast } from 'vant'
import AddressShown from '@/components/AddressShown.vue'
let mixin = {
	data() {
		let { souceType } = this.$route.query
		return {
			address: require('@/assets/images/address-empty.png'),
			souceType,
			addressList: [],
			defaultAddress: '',
		}
	},
	components: {
		AddressShown,
	},
	created() {
		this.getUserAddresList()
	},
	computed: {},
	methods: {
		...mapActions('address', ['GET_USERADDRESS', 'DEL_ADDRESS', 'SET_DEFAULTARRESSADD_ADDRESS']),
		...mapMutations('address', ['SET_shippingAddress', 'SET_billingAddress']),
		delAddress(addressId) {
			this.DEL_ADDRESS({ addressId }).then(() => {
				this.getUserAddresList()
			})
		},
		getUserAddresList() {
			this.GET_USERADDRESS({ pageNum: 1, pageSize: 30 }).then(res => {
				let { data } = res
				this.addressList = data.list
				this.addressList.forEach(item => {
					if (item.isDefaultAddress) {
						this.defaultAddress = item.addressId
					}
				})
			})
		},
		view(addressId) {
			//   let addressId = encodeURIComponent(JSON.stringify(item))
			this.$router.push({ name: 'shippingAddress', query: { addressId } })
		},
		setAddress(id, item) {
			let addressId = this.defaultAddress
			if (id == 'sel') {
				this[`SET_${this.souceType}Address`](item)
				this[`SET_${this.souceType}Address`](item)
				this.$router.go(-1)
			} else {
				this.SET_DEFAULTARRESSADD_ADDRESS({ addressId }).then(() => {
					Toast.success(this.$t('addressForm.setAddressSuccess'))
				})
			}
		},
		gotoNext() {
			if (this.addressList.length >= 20) {
				Toast.fail(this.$t('addressForm.text11'))
				return
			}
			let param = {}
			if (this.addressList.length === 0) {
				param['isDefaultAddress'] = 1
			}
			this.$router.push({ name: 'shippingAddress', query: param })
			// this.$router.replace({ name: 'shippingAddress', query: param })
		},
		getAddress(item) {
			const { firstAddress, secondAddress, city, state, country, postCode, county } = item
			return this.platformId == 3 ? `${state} ${city} ${county} ${firstAddress} ${postCode}` : `${firstAddress} ${secondAddress} ${city} ${state} ${country} ${postCode}`
		},
		getName(item) {
			const { firstName, lastName } = item
			return `${firstName} ${lastName}`
		},
		getkatakanaName(item) {
			let { katakanaFirstName, katakanaLastName } = item
			return katakanaFirstName ? `${katakanaFirstName} ${katakanaLastName}` : ''
		},
	},
}
export default mixin
