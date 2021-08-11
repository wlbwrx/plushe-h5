<template>
	<div class="logistics-details header-title">
		<div class="logistics-list" v-for="(item, index) in logistics" :key="index">
			<h2>
				<span class="logistics-list-process">
					<i class="icon icon-wuliu"></i>
					<label>{{ getLogistics[item.logisticsStatus] }}</label>
				</span>
				<span class="logistics-list-number">{{ item.deliveryCompany }}. {{ item.deliverySn }}</span>
			</h2>
			<ul class="logistics-image-list">
				<li v-for="(item2, index) in item.productShops" :key="index">
					<div class="logistics-image">
						<van-image class="default-image" :src="$utils.imageHandler(0, item2.picKey)" />
					</div>
					<p>
						<span class="text-hidden-row-1">{{ item2.productName }}</span>
						<label>X{{ item2.num }}</label>
					</p>
				</li>
			</ul>
			<div class="logistics-btn">
				<span>{{ item.num }} {{ $t('cart.item') }}</span>
				<van-button type="primary" @click="gotoNext(item)">{{ $t('my.track') }}</van-button>
			</div>
		</div>
	</div>
</template>
<script>
import { mapActions } from 'vuex'
import { getLogistics } from '@/utils/enums'
export default {
	components: {},
	data() {
		return {
			getLogistics,
			logistics: [],
		}
	},
	methods: {
		...mapActions('order', ['getAllLogistics']),
		init() {
			let { orderSn } = this.$route.query
			this.getAllLogistics(orderSn).then((res) => {
				if (res.code === 0) {
					let { data } = res
					data.orderLogisticsRespList &&
						data.orderLogisticsRespList.forEach((item) => {
							let orderSkuList = JSON.parse(item.orderSkuList)
							item.num = 0
							item.productShops = Object.keys(orderSkuList).map((element) => {
								item.num += orderSkuList[element]
								return {
									...data.orderItemResp.filter((item) => item.skuNo == element)[0],
									skuNo: element,
									num: orderSkuList[element],
								}
							})
							this.logistics.push(item)
						})
				}

				console.log('logistics', this.logistics)
			})
		},
		gotoNext(param) {
			let { deliveryCompany, deliverySn, shopsId, orderSn, orderId } = param
			this.$router.push({ name: 'logisticsDetail', query: { deliveryCompany, deliverySn, orderId, orderSn, shopsId } })
		},
	},
	created() {
		this.init()
	},
}
</script>
<style lang="less" scoped>
.logistics-list {
	padding: 20px 16px;
	h2 {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 30px;
		font-size: 12px;
		.logistics-list-process {
			display: flex;
		}
		i {
			font-size: 30px;
		}
		label {
			font-size: 20px;
			line-height: 32px;
			margin-left: 6px;
		}
	}
	.logistics-image-list {
		display: flex;
		margin-top: 20px;
		white-space: nowrap;
		overflow-x: auto;
		li {
			width: 96px;
			flex-shrink: 0;
		}
		li:not(:first-child) {
			margin-left: 10px;
		}
		.logistics-image {
			width: 96px;
			height: 128px;
		}
		.logistics-image-logo {
			margin-top: 8px;
			max-height: 10px;
		}
		p {
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			margin-top: 8px;
			span {
				font-size: 12px;
				color: #666;
			}
			label {
				font-size: 14px;
			}
		}
	}
	.logistics-btn {
		margin-top: 18px;
		span {
			font-size: 14px;
		}
		display: flex;
		justify-content: space-between;
	}
}
.logistics-list:not(:first-child) {
	margin-top: 10px;
}
</style>
