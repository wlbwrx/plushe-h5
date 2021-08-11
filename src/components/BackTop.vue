<template>
	<div class="back-top">
		<img v-show="show" class="back-top__pic" @click="backTop" src="@/assets/images/back_top2x.png" alt="" />
	</div>
</template>

<script>
export default {
	data() {
		return {
			show: false,
		}
	},
	mounted() {
		window.addEventListener('scroll', this.scroll)
	},
	methods: {
		scroll() {
			const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
			this.show = scrollTop > 200
		},
		backTop() {
			// document.documentElement.scrollTop = document.body.scrollTop = 0
			let scrollToptimer = setInterval(function() {
				let top = document.body.scrollTop || document.documentElement.scrollTop
				let speed = top / 4
				if (document.body.scrollTop != 0) {
					document.body.scrollTop -= speed
				} else {
					document.documentElement.scrollTop -= speed
				}
				if (top == 0) {
					clearInterval(scrollToptimer)
				}
			}, 30)
		},
	},
}
</script>

<style scoped lang="less">
.back-top__pic {
	position: fixed;
	z-index: 10;
	bottom: 70px;
	right: 8px;
	width: 64px;
	height: 64px;
	margin-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
	margin-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
	border-radius: 50%;
}
</style>
