<template>
	<div class="receive header-title">
		<couponList />
	</div>
</template>
<script>
import couponList from './couponList'

export default {
	created() {
		console.log(1111, this)
	},
	components: {
		couponList,
	},
}
</script>
<style lang="less" scoped>
</style>