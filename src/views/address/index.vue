<template>
	<div class="my-address header-title">
		<van-radio-group v-if="addressList.length > 0" v-model="defaultAddress">
			<div class="my-address-list" v-for="(item, index) in addressList" :key="index">
				<AddressShown :addressObj="item" @custClick="view(item.addressId)" />
				<div class="default-address border-top border-bottom">
					<div class="address-radio">
						<van-radio @click="setAddress" :name="item.addressId">{{ $t(`addressForm.${defaultAddress === item.addressId ? 'defaultAddress' : 'setDefaultAddress'}`) }} </van-radio>
					</div>
					<i class="icon icon-shanchu" @click="delConfig(item.addressId)"></i>
				</div>
			</div>
		</van-radio-group>
		<div v-else class="my-address-empty-gao">
			<van-empty class="custom-image" :image="address" :description="$t('addressForm.noAddress')" />
		</div>

		<div class="submit-order-box">
			<van-button type="primary" class="submit-order" @click="gotoNext"> {{ $t('addressForm.AddAddress') }}</van-button>
		</div>
		<van-popup v-model="showConfirm" @click-overlay="showConfirm = false">
			<div class="delete-popup">
				<h3 class="delete-popup__tips">
					{{ $t('addressForm.text12') }}
				</h3>
				<div class="delete-popup__btns">
					<van-button color="#222" plain @click="showConfirm = false">{{ $t('cancel') }}</van-button>
					<van-button color="#222" @click="toConfirm">{{ $t('delete') }}</van-button>
				</div>
			</div>
		</van-popup>
	</div>
</template>
<script>
import AddressShown from '@/components/AddressShown.vue'
import mixin from './mixin'

export default {
	mixins: [mixin],
	data() {
		return {
			showConfirm: false,
			addressId: '',
		}
	},
	components: {
		AddressShown,
	},
	methods: {
		delConfig(addressId) {
			this.addressId = addressId
			this.showConfirm = true
		},
		toConfirm() {
			this.delAddress(this.addressId)
			this.showConfirm = false
		},
	},
}
</script>
<style lang="less" scoped>
@import '@/style/modules/address.less';

.my-address-empty-gao {
	min-height: calc(100vh - 140px);
	background: #fff;
}
.my-address-list {
	background: #fff;
}
.default-address {
	margin: 0 16px 10px;
	padding: 10px 0;
	font-size: 14px;
	display: flex;
	justify-content: space-between;
}
.my-address-list:not(:first-child) {
	margin-top: 10px;
}
</style>
