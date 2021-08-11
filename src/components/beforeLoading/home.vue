<template>
	<div class="before-home">
		<div class="bh-top">
			<div class="bh-logo"></div>
			<div class="bh-search"></div>
		</div>
		<div class="bh-banner">
			<ul class="bh-banner-ul">
				<li class="bh-banner-dots"></li>
				<li class="bh-banner-dots is-active"></li>
				<li class="bh-banner-dots"></li>
			</ul>
		</div>
		<ul class="bh-bean">
			<li class="bh-bean-item" v-for="i of 8" :key="i"></li>
		</ul>
		<div class="bh-box" v-for="i of 2" :key="i">
			<h3 class="bh-title"></h3>
			<ul class="bh-box-list">
				<li class="bh-box-item" v-for="i of 4" :key="i"></li>
			</ul>
		</div>
		<div class="bh-box bh-floors">
			<h3 class="bh-title"></h3>
			<ul class="bh-box-list">
				<li class="bh-box-item" v-for="i of 3" :key="i"></li>
			</ul>
		</div>
	</div>
</template>

<style lang="less" scoped>
@bg: #f5f5f5;
.before-home {
	background: @bg;
	position: relative;
	z-index: 999;
	padding-top: 50px;
	.bh-top {
		position: fixed;
		left: 50%;
		top: 0;
		z-index: 999999;
		transform: translateX(-50%);
		width: 100%;
		max-width: 375px;
		height: 50px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 9px 16px;
		background: #fff;
		.bh-logo {
			width: 66px;
			height: 32px;
			background: @bg;
		}
		.bh-search {
			flex: 1;
			height: 32px;
			margin-left: 10px;
			background: @bg;
		}
	}
	.bh-banner {
		position: relative;
		height: 400px;
		.bh-banner-ul {
			position: absolute;
			width: 100%;
			left: 0;
			bottom: 20px;
			display: flex;
			justify-content: center;
		}
		.bh-banner-dots {
			width: 6px;
			height: 6px;
			border-radius: 50%;
			margin: 0 3px;
			background: #999;
			&.is-active {
				background: #fff;
			}
		}
	}
	.bh-bean {
		display: flex;
		justify-content: space-between;
		padding: 20px 16px 10px;
		flex-wrap: wrap;
		background: #fff;
		margin-bottom: 10px;
		.bh-bean-item {
			width: 78px;
			height: 78px;
			border-radius: 50%;
			background: @bg;
			margin-bottom: 10px;
		}
	}
	.bh-box {
		padding: 10px 16px;
		background: #fff;
		margin-bottom: 10px;
		&.bh-floors {
			.bh-box-item {
				height: 140px;
				width: 110px;
				background: @bg;
			}
		}
		.bh-title {
			width: 120px;
			height: 20px;
			background: @bg;
			margin-bottom: 10px;
		}
		.bh-box-list {
			display: flex;
			justify-content: space-between;
		}
		.bh-box-item {
			height: 100px;
			width: 80px;
			background: @bg;
		}
	}
}
</style>
