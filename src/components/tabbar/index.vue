<template>
	<div class="tabbar">
		<van-tabbar class="tabbar-list" route v-model="active" active-color="#222" inactive-color="#999" safe-area-inset-bottom>
			<van-tabbar-item v-for="item of list" :to="item.path" :name="item.id" :key="item.id" :badge="item.id == 'shopBag' && isMounted ? totalNum || '' : ''">
				<span class="tabbar-name">{{ item.name }}</span>
				<template #icon="props">
					<van-icon class-prefix="icon" :name="item.icon" :color="props.active ? '#222' : '#999'"></van-icon>
				</template>
			</van-tabbar-item>
		</van-tabbar>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
	data() {
		return {
			active: 'home',
			list: [
				{
					name: this.$t('tab.home'),
					id: 'home',
					path: '/',
					icon: 'shouye2',
				},
				{
					name: this.$t('tab.category'),
					id: 'category',
					path: '/category',
					icon: 'fenlei2',
				},
				{
					name: this.$t('tab.cart'),
					id: 'shopBag',
					path: '/shopping_car',
					icon: 'gouwuche2',
				},
				{
					name: this.$t('tab.me'),
					id: 'mine',
					path: '/my',
					icon: 'wode2',
				},
			],
			isMounted: false,
		}
	},
	mounted() {
		this.isMounted = true
	},
	computed: {
		...mapGetters({
			totalNum: 'shopCar/totalNum',
		}),
	},
	methods: {},
}
</script>
<style scoped lang="less">
.tabbar {
	/deep/ .van-tabbar {
		z-index: 1000;
		max-width: 375px;
		left: 50%;
		transform: translateX(-50%);
		.icon {
			font-size: 24px;
		}
		.van-tabbar-item__icon {
			margin-bottom: 0;
		}
		.van-info {
			position: absolute;
			left: 15px;
			top: -5px;
			right: inherit;
			min-width: 14px;
			padding: 0 4px;
			background: #e84646;
			color: #fff;
			font-size: 12px;
			border-radius: 7px;
			transform: translateX(-4px) scale(0.8);
			text-align: center;
			display: flex;
			align-items: center;
			border: none;
		}
		.van-tabbar-item--active {
			.tabbar-name {
				font-weight: normal;
			}
		}
	}
	.tabbar-name {
		font-size: 12px;
	}
}
</style>
