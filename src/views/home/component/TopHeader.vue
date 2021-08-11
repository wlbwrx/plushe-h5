<template>
	<div class="home-header">
		<div class="home-header__content">
			<img class="home-header__logo" :src="logoUrl" alt="" />
			<div class="home-header__search" @click="goSearch">
				search
				<i class="icon icon-sousou search-icon"></i>
			</div>
			<!-- <div class="home-header__msg">
				<i class="icon icon-xinxi mgs-icon"></i>
			</div> -->
		</div>
	</div>
</template>
<script>
export default {
	computed: {
		logoUrl() {
			return this.$store.getters.platformId == 1 ? require('@/assets/images/logo.png') : require('@/assets/images/gee-logo.png')
		},
	},
	methods: {
		// 前往搜索页：
		goSearch() {
			this.$router.push({
				path: '/search',
			})
		},
	},
}
</script>
<style scoped lang="less">
@import '@/style/variable.less';

.home-header {
	height: 50px;

	.home-header__content {
		position: fixed;
		left: 50%;
		top: 0;
		z-index: 101;
		transform: translateX(-50%);
		width: 100%;
		max-width: 375px;
		display: flex;
		align-items: center;
		padding: 9px 16px;
		background: @color-FFF;
		font-size: 0;

		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			border-bottom: 1px solid @color-bg;
		}

		.home-header__logo {
			width: 66px;
			height: 16px;
			&.gee-logo {
				height: 13px;
				width: 73px;
			}
		}

		.home-header__search {
			flex: 1;
			height: 32px;
			border-radius: 4px;
			background: @color-bg2;
			margin-left: 10px;
			padding: 0 10px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: @color-999;
			font-size: 14px;
			.search-icon {
				font-size: 20px;
				color: @color-999;
			}
		}

		.home-header__msg {
			font-size: 26px;
			display: flex;
			align-items: center;
		}
	}
}
</style>
