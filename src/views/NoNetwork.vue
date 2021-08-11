<template>
	<div class="no-network">
		<nav-bar :title="$t('errCode.noNetwork')" border></nav-bar>
		<div class="wrap-404">
			<img src="@/assets/images/fail-status/no-network.png" alt="" />
			<h3>{{ $t('errCode.networdError')}} </h3>
			<p>{{ $t('errCode.tryAgain')}}</p>

			<div class="network-btn" @click="toRefresh">{{ $t('errCode.REFRESH')}}</div>
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
		if (navigator.connection.rtt || navigator.onLine) {
			this.$router.go(-1)
			return
		}
		window.addEventListener('online', this.toRefresh)
	},
	beforeDestroy() {
		window.removeEventListener('online', this.toRefresh)
	},
	methods: {
		toRefresh() {
			if (navigator.connection.rtt || navigator.onLine) {
				this.$router.go(-1)
			}
		},
	},
}
</script>

<style lang="less" scoped>
.no-network {
	min-height: 100vh;
	background: #fff;
	.wrap-404 {
		padding: 80px 0 40px;
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
		.network-btn {
			height: 44px;
			line-height: 44px;
			width: 180px;
			color: #fff;
			background: #222;
			font-size: 18px;
			font-weight: 600;
			margin: 60px auto 0;
			text-align: center;
		}
	}
}
</style>
