<template>
	<el-dialog title="" :visible.sync="dialogFormVisible">
		<h1 class="address-title">{{ $t('myAddresses') }}</h1>
		<div class="address-box">
			<div v-for="item in addressList" :key="item.id" class="address-list">
				<div class="address-item">
					<div class="address-contact">
						<b>{{ getName(item) }}</b>
						<span>{{ item.phoneCode + ' ' + item.phoneNumber }}</span>
					</div>
					<span class="set-default-address" @click.stop="setAddress('set', item)">{{ $t('addressForm.useAddress') }}</span>
				</div>
				<div class="address-detail">
					<span>
						<i v-if="item.isDefaultAddress === 1" class="default">
							{{ $t('addressForm.default') }}
						</i>
						{{ getAddress(item) }}
					</span>
					<a @click.stop="setAddress('edit', item.addressId)">{{ $t('edit') }}</a>
				</div>
			</div>
		</div>
		<div class="new-address-btn">
			<el-button type="primary" @click.stop="setAddress('new')">{{ $t('addressForm.AddAddressBtn') }}</el-button>
		</div>
	</el-dialog>
</template>
<script>
import mixin from '@/views/address/mixin'
export default {
	props: ['addressType'],
	mixins: [mixin],
	data() {
		return {
			dialogFormVisible: false,
		}
	},
	methods: {
		setAddress(type, item) {
			this.dialogFormVisible = false
			this.$emit('click-addres', type, item)
		},
		showDialogs() {
			this.dialogFormVisible = true
			this.getUserAddresList()
		},
	},
}
</script>
<style scoped lang="less">
.address-title {
	font-size: 24px;
	color: #222;
}
.address-box {
	height: 400px;
	overflow-y: scroll;
}
.address-list {
	margin-top: 40px;
	.address-item {
		display: flex;
		justify-content: space-between;
		.address-contact {
			b {
				font-size: 22px;
				color: #222;
			}
			span {
				font-size: 20px;
				color: #595959;
				margin-left: 20px;
			}
		}
		.set-default-address {
			padding: 6px 10px;
			border: 1px solid #222;
		}
	}
	.address-detail {
		padding: 8px 0 20px;
		display: flex;
		justify-content: space-between;
		.default {
			color: #ff5269;
			background: #f6d5d5;
			padding: 2px 6px;
			font-style: normal;
			margin-right: 5px;
		}
		a {
			color: #5689c6;
			font-size: 14px;
		}
	}
}
.new-address-btn {
	width: 100%;
	margin: 40px 0 20px;
	text-align: center;
}
</style>
