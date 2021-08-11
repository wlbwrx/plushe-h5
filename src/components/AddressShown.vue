<template>
	<div class="address-list" @click="view">
		<div class="contact">
			<div class="concat-info">
				<div class="katakana" v-if="addressObj.katakanaFirstName">
					<div class="item">
						<span class="first">{{ addressObj.katakanaFirstName }}</span>
						<span>{{ addressObj.katakanaLastName }}</span>
					</div>
					<div class="item small">
						<span class="first">{{ addressObj.firstName }}</span>
						<span>{{ addressObj.lastName }}</span>
					</div>
				</div>
				<label class="autoprefixer-text" v-else>{{ (addressObj.firstName || '') + ' ' + (addressObj.lastName || '') }}</label>
				<span>{{ `${addressObj.phoneCode || ''} ${addressObj.phoneNumber || addressObj.phone || ''}` }}</span>
			</div>
			<p class="concat-address autoprefixer">{{ getAddress(addressObj) }}</p>
		</div>
		<i class="icon icon-fanhui-copy"></i>
	</div>
</template>

<script>
export default {
	name: 'AddressShown',
	props: ['addressObj'],
	data() {
		return {}
	},
	methods: {
		getAddress(item) {
			const { firstAddress = '', detailAddressone = '', detailAddresstwo = '', secondAddress = '', city = '', state = '', country = '', postCode = '', county = '', ting = '' } = item
			return this.platformId == 3 ? `${state} ${city} ${county || ting} ${firstAddress || detailAddressone} ${postCode}` : `${firstAddress || detailAddressone} ${secondAddress || detailAddresstwo} ${city} ${state} ${country} ${postCode}`
		},
		view() {
			this.$emit('custClick', this.addressObj)
		},
	},
}
</script>

<style scoped lang="less">
.address-list {
	background: #fff;
	padding: 20px 16px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 16px;
	padding-bottom: 10px;

	.contact {
		// margin-left: 10px;
		flex: 1;

		.concat-info {
			display: flex;
			// align-items: center;
			margin-bottom: 6px;

			label {
				font-size: 18px;
				margin-right: 20px;
				font-weight: bold;
			}

			span {
				font-size: 15px;
				letter-spacing: 0;
			}
		}

		.concat-address {
			padding-top: 3px;
		}
	}
}
.katakana {
	max-width: 190px;
	margin-right: 10px;
	line-height: 1.2;

	.item {
		display: flex;
		min-width: 150px;

		.first {
			text-align: left;
			margin-right: 5px;
		}

		span {
			text-align: right;
			flex: 1;
			overflow: hidden;
			white-space: nowrap;
		}
	}

	.item.small {
		span {
			font-size: 14px;
		}
	}
}
</style>
