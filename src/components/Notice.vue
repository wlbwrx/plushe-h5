<template>
	<div class="swiper-container notice-swiper-notice">
		<div class="swiper-wrapper">
			<a class="swiper-slide" :href="item.internalUrl || 'javascript: void(0);'" v-for="item in noticesList" :key="item.id">
				{{ item.content }}
			</a>
		</div>
	</div>
	<!-- <swiper class="notice-swiper-notice" :options="options">
		<swiper-slide v-for="item in noticesList" :key="item.id">
			<a class="swiper-slide" :href="item.internalUrl || 'javascript: void(0);'">
				{{ item.content }}
			</a>
		</swiper-slide>
	</swiper> -->
</template>

<script>
import http from '@/api/index.js'

export default {
	props: {
		from: {
			type: String,
		},
		list: {
			type: Array,
		},
	},
	data() {
		return {
			noticesList: [],
			isKeepAlive: false,
		}
	},
	created() {
		if (this.from == 'home') {
			this.noticesList = this.list
			this.$nextTick(_ => {
				new Swiper('.notice-swiper-notice', {
					direction: 'vertical',
					autoplay: 3000,
					autoplayDisableOnInteraction: false,
					loop: true,
				})
			})
			return
		}
		http.home.notices().then(res => {
			if (res.code == 0) {
				this.noticesList = res.data
				this.$nextTick(_ => {
					new Swiper('.notice-swiper-notice', {
						direction: 'vertical',
						autoplay: 3000,
						autoplayDisableOnInteraction: false,
						loop: true,
					})
				})
			}
		})
	},
	mounted() {},
}
</script>

<style lang="less" scoped>
// 文字轮播图:
.notice-swiper-notice {
	height: 36px;

	.swiper-slide {
		display: block;
		text-align: center;
		height: 36px;
		line-height: 36px;
		background: #5c5c5c;
		font-size: 12px;
		color: #fff;
	}
}
</style>
