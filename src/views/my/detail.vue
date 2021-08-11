<template>
	<div class="logistics header-title">
		<div class="logistics-state">
			<i class="icon icon-wuliu"></i>
			<h1>{{ getLogistics[logisticsStatus] }}</h1>
		</div>
		<ul class="logistics-info">
			<li>
				<label>{{ $t('my.trackingNo') }}:</label>
				<b>{{ deliverySn }}</b>
			</li>
		</ul>
		<div class="logistics-step">
			<van-steps direction="vertical" :active="0">
				<van-step v-for="(item, index) in deliveryInfo" :key="index">
					<p>{{ item }}</p>
				</van-step>
			</van-steps>
		</div>
	</div>
</template>
<script>
import { getLogistics } from '@/utils/enums'
import { mapState, mapActions } from 'vuex'
export default {
	data() {
		return {
			getLogistics,
			deliveryCompany: '',
			deliverySn: '',
			deliveryInfo: [],
			logisticsStatus: 0,
		}
	},
	computed: {
		...mapState('order', ['logistics']),
	},
	created() {
		let { deliveryCompany, deliverySn, shopsId, orderSn, orderId } = this.$route.query
		this.getLogisticsDetail({ deliveryCompany, deliverySn, shopsId, orderSn, orderId }).then((res) => {
			let { data } = res
			this.deliveryCompany = data.deliveryCompany
			this.deliverySn = data.deliverySn
			this.logisticsStatus = data.logisticsStatus
			if (data.deliveryInfo) this.deliveryInfo = data.deliveryInfo.split('\n')
		})
	},
	components: {},
	methods: {
		...mapActions('order', ['getLogisticsDetail']),
	},
}
</script>
<style lang="less" scoped>
.logistics {
	padding: 0 16px;
}
.logistics-state {
	padding-top: 69px;
	display: flex;
	h1 {
		font-size: 20px;
		line-height: 30px;
		margin-left: 6px;
	}
	i {
		font-size: 30px;
	}
}
.logistics-info {
	font-size: 14px;
	li {
		margin-top: 18px;
		label {
			color: #999;
			margin-right: 20px;
		}
		b {
			font-weight: normal;
		}
		img {
			max-height: 16px;
		}
	}
}
.logistics-step {
	margin-top: 18px;
	background: #f6f6f6;
}
</style>
