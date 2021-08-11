<template>
	<div class="page-404">
		<nav-bar title="404" border></nav-bar>
		<div class="wrap-404">
			<img src="@/assets/images/fail-status/page-404.png" alt="" />
			<h3>{{ $t('errCode.notPage') }}</h3>
			<p>{{ $t('errCode.pageFound') }}</p>
		</div>
	</div>
</template>
<script>
import NavBar from '@/components/navbar/index.vue'
export default {
	components: {
		NavBar,
	},
	created() {
		this.$router.push('/')
	},
}
</script>
<style lang="less" scoped>
.page-404 {
	min-height: 100vh;
	background: #fff;
	.wrap-404 {
		padding: 80px 0;
		text-align: center;
		img {
			width: 116px;
			height: auto;
			margin-bottom: 20px;
		}
		h3 {
			color: #222;
			font-size: 20px;
			font-weight: 600;
			margin-bottom: 4px;
		}
		p {
			font-size: 14px;
			color: #666;
		}
	}
}
</style>
