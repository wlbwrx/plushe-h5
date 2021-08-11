<template>
	<div class="about header-title">
		<van-cell-group class="user-set-list">
			<van-cell v-for="item in info" :key="item.id" :title="item.name" is-link :to="{ path: item.path, query: { id: item.id } }" />
		</van-cell-group>
	</div>
</template>
<script>
export default {
	components: {},
	created() {},
	data() {
		return {
			info: [
				{ name: this.$t('my.shippingInformation'), path: '/otherInfo', id: 1 },
				{ name: this.$t('my.returnExchange'), path: '/otherInfo', id: 2 },
				{ name: this.$t('other.name8'), path: '/otherInfo', id: 3 },
				{ name: this.$t('other.name4'), path: '/otherInfo', id: 4 },
				{ name: this.$t('other.name5'), path: '/otherInfo', id: 5 },
				{ name: this.$t('other.name6'), path: '/otherInfo', id: 6 },
			],
		}
	},
}
</script>
<style lang="less" scoped>
@import '@/style/modules/my.less';
</style>
