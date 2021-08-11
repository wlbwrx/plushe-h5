<template>
	<div class="footer">
		<div class="home__you-size" @click="goAbout" v-if="platformId !== 3">
			<h3 class="home__title">{{ $t('youSize.title') }}</h3>
			<h4 class="home__subtitle">{{ $t('youSize.subtitle') }}</h4>
			<img class="home__you-size-pic" src="https://img.plushe.com/eyJidWNrZXQiOiJwcm8tcGx1c2hlIiwia2V5IjoicHJvZHVjdC8yMDIxMDgxMDE4NTE0NDE0OTYzODIxLzIwMjEwODEwMTg1MTQ0MDIzLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJmaXQiOiJjb3ZlciJ9fX0=" alt="" />
			<p class="home__you-size-tit">
				{{ $t('youSize.youSizeTit1') }} <br />
				{{ $t('youSize.youSizeTit2') }}
			</p>
			<p class="home__you-size-desc">
				{{ $t('youSize.desc') }}
			</p>
		</div>
		<!-- 其他 -->
		<div class="footer-wrapper">
			<div class="other-info">
				<ul class="other-list">
					<li class="other-item" v-for="item of list" :key="item.name" @click="goPage(item)">
						<img :src="item.icon" alt="" class="other-pic" />
						<div class="other-cont">
							<h3 class="other-name">{{ item.name }}</h3>
							<p class="other-desc">{{ item.desc }}</p>
						</div>
						<i class="other-arrow icon icon-fanhui-copy"></i>
					</li>
				</ul>
				<h3 class="footer-title">{{ $t('home.moreInformation') }}</h3>
				<ul class="info-list">
					<li class="info-item" v-for="item of info" :key="item.name" @click="goPage(item)">
						<span>{{ item.name }}</span>
						<i class="icon icon-fanhui-copy"></i>
					</li>
				</ul>
			</div>

			<div class="footer-content">
				<div class="footer-pays">
					<h3 class="footer-title">{{ $t('home.supportPayment') }}</h3>
					<div class="footer-pays-pics">
						<img :src="item.src" alt="" class="footer-pays-img" v-for="item of picList" :key="item.name" />
					</div>
				</div>
				<div class="footer-follow">
					<h3 class="footer-title">{{ $t('home.followUs') }}</h3>
					<div class="follow-icons">
						<img class="follow-icons-img" :src="item.icon" alt="" v-for="item of iconList" :key="item.url" @click="goto(item.url)" />
					</div>
				</div>
				<div class="footer-beian">
					<p>© 2020-2021 {{ platformTitle }} ALL RIGHTS RESERVED</p>
					<p v-if="platformId == 1">{{ $t('youSize.title') }}</p>
				</div>
				<!-- <div class="footer-bottom-links" v-if="platformId == 1">
					<span @click="goLink(1)">Best Seller</span> | <span @click="goLink(2)">Plushe</span> |
					<span @click="goLink(3)">New Arrival</span>
				</div> -->
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			picList: [
				{ name: '1', src: require('@/assets/images/cart/cart-img-1.png') },
				{ name: '2', src: require('@/assets/images/cart/cart-img-2.png') },
				{ name: '3', src: require('@/assets/images/cart/cart-img-3.png') },
				{ name: '4', src: require('@/assets/images/cart/cart-img-4.png') },
				{ name: '5', src: require('@/assets/images/cart/cart-img-5.png') },
				{ name: '6', src: require('@/assets/images/cart/cart-img-6.png') },
				{ name: '7', src: require('@/assets/images/cart/cart-img-7.png') },
				{ name: '8', src: require('@/assets/images/cart/cart-img-8.png') },
			],
			list: [
				{ icon: require('@/assets/images/icons/home-yunshu.png'), path: '/otherInfo', id: 1, name: this.$t('other.name1'), desc: this.$t('other.desc1') },
				{ icon: require('@/assets/images/icons/home-tuihuan.png'), path: '/otherInfo', id: 2, name: this.$t('other.name2'), desc: this.$t('other.desc2') },
				{ icon: require('@/assets/images/icons/home-kefu.png'), path: '/connectToUs', id: 9, name: this.$t('other.name9'), desc: this.$t('other.desc9') },
			],
			info: [
				// { name: 'Shipping Information', path: '/otherInfo', id: 1 },
				// { name: 'Return & Exchanges', path: '/otherInfo', id: 2 },
				{ name: this.$t('other.name8'), path: '/otherInfo', id: 3 },
				{ name: this.$t('other.name4'), path: '/otherInfo', id: 4 },
				{ name: this.$t('other.name5'), path: '/otherInfo', id: 5 },
				{ name: this.$t('other.name6'), path: '/otherInfo', id: 6 },
				{ name: this.$t('other.name7'), path: '/otherInfo', id: 7 },
			],
			iconList: [
				{ icon: require('@/assets/images/icons/icon-facebook.png'), url: 'https://www.facebook.com/Plushe-106370298179108' },
				{ icon: require('@/assets/images/icons/icon-instagram.png'), url: 'https://www.instagram.com/plushe_official/' },
				{ icon: require('@/assets/images/icons/icon-pinterest.png'), url: 'https://www.pinterest.com/plushe_official/_created/' },
				{ icon: require('@/assets/images/icons/icon-twitter.png'), url: 'https://twitter.com/Plushe_Plushe' },
				{ icon: require('@/assets/images/icons/icon-youtube.png'), url: 'https://www.youtube.com/channel/UC1zimeXXIcF7HObrwtvoFFA/featured' },
			],
		}
	},
	computed: {},
	methods: {
		// 前往about
		goAbout() {
			this.$router.push({
				path: '/otherInfo',
				query: {
					id: 6,
				},
			})
		},
		// 前往页面：
		goPage(item) {
			this.$router.push({
				path: item.path,
				query: {
					id: item.id || undefined,
				},
			})
		},
		// 前往指定链接:
		goLink(type) {
			if (type == 1) {
				window.location.href = '/category/BEST%20SELLERS-763'
			} else if (type == 2) {
				window.location.href = '/'
			} else if (type == 3) {
				window.location.href = '/category/Summer%20Camp-761'
			}
		},
		goto(url) {
			window.location.href = url
		},
	},
}
</script>

<style lang="less" scoped>
@import '@/style/variable.less';
.home__you-size {
	padding: 0 16px 34px;
	color: #222;
	font-size: 0;
	.home__you-size-pic {
		width: 343px;
		height: 343px;
		margin-bottom: 10px;
	}
	.home__you-size-tit {
		font-size: 16px;
		font-weight: 500;
		margin-bottom: 10px;
	}
	.home__you-size-desc {
		font-size: 14px;
		line-height: 22px;
		font-weight: 300;
	}
	.home__title {
		text-align: center;
		font-size: 18px;
		color: @color-222;
		margin-bottom: 6px;
		font-weight: 500;
	}
	.home__subtitle {
		font-size: 14px;
		color: @color-222;
		margin-bottom: 15px;
		text-align: center;
		font-weight: normal;
	}
}
.footer-wrapper {
	background: #fafafa;
	padding: 50px 20px 40px;
}
.footer-title {
	font-size: 14px;
	margin-bottom: 24px;
	font-weight: normal;
}
.other-info {
	padding-bottom: 40px;
	font-weight: 300;
	.other-list {
		margin-bottom: 50px;
		.other-item {
			display: flex;
			align-items: center;
			margin-bottom: 30px;
			position: relative;
			&:last-child {
				margin-bottom: 0;
			}
			.other-pic {
				width: 32px;
				height: auto;
				margin-right: 20px;
			}
			.other-cont {
				flex: 1;
				padding-right: 40px;
				.other-name {
					font-size: 14px;
					color: @color-222;
					font-weight: normal;
				}
				.other-desc {
					font-size: 14px;
					color: @color-666;
					margin-top: 4px;
				}
			}
			.other-arrow {
				position: absolute;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
				font-size: 12px;
				font-weight: 500;
			}
		}
	}
	.footer-title {
		margin-bottom: 20px;
	}
	.info-list {
		.info-item {
			font-size: 14px;
			color: @color-222;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20px;
			&:last-child {
				margin-bottom: 0;
			}
			.icon {
				font-size: 12px;
				font-weight: 500;
			}
		}
	}
}

.footer-content {
	font-weight: 300;
	.footer-pays {
		padding-bottom: 30px;
		.footer-pays-pics {
			display: flex;
			flex-wrap: wrap;
			.footer-pays-img {
				&:nth-child(6) {
					margin-right: 0;
				}
				margin: 0 14px 15px 0;
				height: 30px;
			}
		}
	}
	.footer-follow {
		margin-bottom: 50px;
		.follow-icons {
			display: flex;
			.follow-icons-img {
				margin-right: 20px;
				width: 28px;
				&:last-child {
					margin-right: 0;
				}
			}
		}
	}

	.footer-beian {
		font-size: 12px;
		line-height: 14px;
		text-align: center;
		> p:first-child {
			margin-bottom: 6px;
		}
	}
	.footer-bottom-links {
		margin-top: 22px;
		text-align: center;
		color: #666;
		font-size: 12px;
	}
}
</style>
