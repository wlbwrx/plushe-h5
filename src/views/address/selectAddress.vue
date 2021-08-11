<template>
	<div class="shipping-address header-title">
		<van-radio-group v-if="addressList.length > 0" v-model="addressId">
			<h2 class="default-title" v-if="defaultAddress">{{ $t('addressForm.defaultAddress') }}</h2>
			<div class="address-list-box" v-for="item in addressList" :key="item.id">
				<div class="address-radio">
					<van-radio @click="setAddress('sel', item)" :name="item.addressId"></van-radio>
				</div>
				<AddressShown :addressObj="item" @custClick="view(item.addressId)" />
			</div>
		</van-radio-group>
		<van-empty v-else class="custom-image" :image="address" :description="$t('addressForm.noAddress')" />
		<div class="submit-order-box" style="max-width: 750px; margin: 0 auto">
			<van-button type="primary" class="submit-order" @click="gotoNext">{{ $t('addressForm.AddAddress') }}</van-button>
		</div>
	</div>
</template>
<script>
import mixin from './mixin'
export default {
	data() {
		let { addressId } = this.$route.query
		return {
			addressId,
		}
	},
	mixins: [mixin],
}
</script>
<style lang="less" scoped>
// @import '@/style/modules/address.less';
// .submit-btn{position:fixed;left:16px;right:16px;bottom:30px;}
.address-list-box {
	background: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 16px;
	margin-bottom: 10px;
	padding-left: 16px;
	/deep/ .katakana {
		max-width: 159px;
	}
	/deep/ .address-list {
		flex: 1;
	}
}
</style>
