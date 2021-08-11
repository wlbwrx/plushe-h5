<template>
	<!-- 订单列表 -->
	<div class="order-list header-title">
		<div class="order-list-tab">
			<div :class="['order-list-item', { active: currentTabComponent == item }]" v-for="(item, index) in orderTabs" :key="index" @click="handleTabClick(item)">
				<span>{{ item }}</span>
			</div>
			<!-- <van-tabs v-model="currentTabComponent" @click="handleTabClick">
				<van-tab></van-tab>
			</van-tabs> -->
		</div>
		<div class="" v-if="orderList.list && orderList.list.length > 0">
			<orderStatusList v-for="(item, index) in orderList.list" :key="index" :orderDetail="item"></orderStatusList>
		</div>
		<div v-else class="order-list-empty">
			<img src="@/assets/images/sousuowu2x.png" alt="" />
			<p>{{ $t('my.NoOrders') }}</p>
		</div>
	</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import orderStatusList from './modules/OrderList'
import { orderTabs, msgTabs, tabKeyToValue } from '@/utils/enums'
export default {
	computed: {
		...mapState('order', ['orderList']),
	},
	components: {
		orderStatusList,
	},
	data() {
		let { id } = this.$route.query
		let defaultTab = id || orderTabs[0]
		return {
			currentTabComponent: defaultTab,
			orderTabs,
			msgTabs,
			param: {
				pageNum: 1,
				pageSize: 100,
				orderStatusList: tabKeyToValue[defaultTab],
			},
		}
	},
	created() {
		this.getOrderList(this.param)
	},
	mounted() {},
	methods: {
		...mapActions('order', ['getOrderList']),
		handleTabClick(tab) {
			this.currentTabComponent = tab
			this.param.orderStatusList = tabKeyToValue[tab]
			this.getOrderList(this.param)
		},
	},
}
</script>
<style scoped lang="less">
.order-list-tab {
	background: #fff;
	border-bottom: 1px solid #f5f5f5;
	height: 44px;
	line-height: 44px;
	display: inline-flex;
	justify-content: space-between;
	width: 100%;
	padding: 0 16px;
	.order-list-item {
		font-size: 14px;
		color: #666;
		flex-shrink: 0;
		span {
			padding-bottom: 6px;
		}
		&.active {
			span {
				color: #222;
				border-bottom: 3px solid #222;
			}
		}
	}
}
.order-list {
	height: 100%;
	background: #fff;
	/deep/ .van-tabs__line {
		background: #222;
	}
}
.order-list-empty {
	margin-top: 84px;
	text-align: center;
	font-size: 0;
	img {
		width: 112px;
	}
	p {
		margin-top: 10px;
		font-size: 14px;
		color: #666;
	}
}
</style>
