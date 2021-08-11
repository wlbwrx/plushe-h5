<template>
	<div class="line-chat">
		<a href="https://page.line.me/358mfide">
			<img class="line-chat__pic" src="@/assets/images/componentLine.png" alt="" />
		</a>
	</div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
.line-chat {
	position: fixed;
	z-index: 10;
	bottom: 70px;
	left: 8px;
	width: 64px;
	height: 64px;
	margin-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
	margin-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
	border-radius: 50%;
	box-shadow: 0 0 2px #fff;
	a,
	img {
		display: block;
		width: 100%;
		height: 100%;
	}
}
</style>
