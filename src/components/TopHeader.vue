<template>
	<div :class="['top-header', { 'have-down': !hideDown && platformId == 1, 'exist-down': existDown }]">
		<van-swipe class="notice-swiper-notice" vertical :autoplay="3000" loop :show-indicators="false" ref="headerNotice" id="headerNotice">
			<van-swipe-item v-for="item in noticesList" :key="item.id">
				<a class="swiper-slide" :href="item.internalUrl || 'javascript: void(0);'" :key="item.id" v-html="item.content"></a>
			</van-swipe-item>
		</van-swipe>
		<div class="top-header__menu" ref="headerMenu">
			<div :class="['top-header__menu-content', { 'menu--fixed': isMenuFixed }]">
				<div class="th__menu-left">
					<div class="click-area no-right-padding" v-if="iconBack" @click="toBack">
						<img class="th__menu-icon-back th__menu-icon" src="@/assets/images/icons/back.png" alt="" />
					</div>
					<div class="click-area" v-if="iconFenLei" @click="goPage('/category?hideTabbar=1')">
						<img class="th__menu-icon-fenlei th__menu-icon" src="@/assets/images/icons/fenlei.png" alt="" />
					</div>
				</div>
				<div class="th__menu-center" @click="goPage('/')">
					<img class="th__menu-logo" :src="$utils.platList('logo', platformId)" alt="" />
				</div>
				<div class="th__menu-right">
					<div class="click-area" @click="goPage('/search')">
						<img class="th__menu-icon-search th__menu-icon" src="@/assets/images/icons/search.png" alt="" />
					</div>
					<div class="click-area" @click="goPage('/shopping_car?hideTabbar=1')">
						<span class="th__menu-shopcar">
							<img class="th__menu-icon-cart th__menu-icon animate__animated" :class="{ animate__bounce: animation }" src="@/assets/images/icons/bag.png" alt="" />
							<i class="th__menu-cart--num" v-if="totalNum && isMounted">{{ totalNum }}</i>
						</span>
					</div>
				</div>
			</div>
		</div>

		<div class="top-header__other" ref="headerOther">
			<img class="th__other-img" :src="$utils.platList('free', platformId)" alt="" @click="goPage('/otherInfo?id=1')" />
			<img class="th__other-img" :src="$utils.platList('return', platformId)" alt="" @click="goPage('/otherInfo?id=2')" />
		</div>

		<div ref="downPopup" :class="['down-popup', { out: hideDown }]" v-if="platformId == 1 && existDown">
			<i class="down-close icon icon-guanbi" @click="closeDown"></i>
			<div class="down-wrap">
				<img class="down-logo" src="@/assets/images/home/down-logo.png" alt="" />
				<div class="down-cont">
					<h3 class="down-tit">Plushe - Plus Size Fashions Shopping App</h3>
					<p class="down-tips">Curvy Women's Trendy Clothing</p>
					<div class="down-rate">
						<rate :value="5"></rate>
						<span>(463)</span>
					</div>
				</div>
			</div>
			<div class="down-right" @click="goDown">OPEN</div>
		</div>
	</div>
</template>

<script>
import http from '@/api/index.js'
import { mapGetters, mapState } from 'vuex'
import Rate from '@/components/rate/index.vue'
import store from 'store'

export default {
	props: {
		// 控制 返回键
		iconBack: {
			type: Boolean,
			default: false,
		},
		// 控制 分类按钮
		iconFenLei: {
			type: Boolean,
			default: true,
		},
		// 是否需要显示下载弹框:
		showDownPopup: {
			type: Boolean,
			default: false,
		},
	},
	components: {
		Rate: Rate,
	},
	data() {
		return {
			noticesList: [],
			noticesHeight: 0,
			isMenuFixed: false,
			menuHeight: 0,
			otherHeight: 0,
			downHeight: 0,
			animation: false,
			hideDown: true, // 是否需要隐藏下载
			existDown: false,
			isMounted: false, // mounted 是否执行
		}
	},
	computed: {
		...mapGetters({
			totalNum: 'shopCar/totalNum',
		}),
		...mapState({
			client: (state) => state.app.client, // app 才有, 值: ios | android
		}),
	},
	watch: {
		totalNum(val, old) {
			setTimeout(() => {
				this.animation = true
				setTimeout(() => {
					this.animation = false
				}, 1000)
			}, 1000)
		},
	},
	mounted() {
		this.isMounted = true
		if (this.from == 'home') {
			this.noticesList = this.list
			return
		}
		http.home.notices().then((res) => {
			if (res.code == 0) {
				this.noticesList = res.data
			}
		})
	},
	activated() {
		this.isMounted = true
		this.noticesHeight = this.$refs['headerNotice'].offsetHeight
		this.otherHeight = this.$refs['headerOther'].offsetHeight
		this.menuHeight = this.$refs['headerMenu'].offsetHeight
		this.downHeight = this.$refs['downPopup'] ? this.$refs['downPopup'].offsetHeight : 0
		window.addEventListener('scroll', this.pageScroll, true)
		// tabbar 回到首页时,scrollTop 为 0
		let scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
		this.existDown = this.showDownPopup && this.platformId == 1 && !store.get('closeDown') && !(this.client == 'ios' || this.client == 'android')
		if (this.existDown) {
			this.isMenuFixed = scrollTop > this.downHeight + this.noticesHeight
			this.hideDown = scrollTop > this.noticesHeight + 10
		} else {
			this.isMenuFixed = scrollTop > this.noticesHeight + 10
		}
	},
	deactivated() {
		window.removeEventListener('scroll', this.pageScroll)
	},
	methods: {
		// 返回:
		toBack() {
			this.$router.go(-1)
		},
		// 前往页面：
		goPage(path) {
			if (path == this.$route.path) return
			this.$router.push({
				path: path,
			})
		},
		pageScroll() {
			let scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
			if (this.$refs['downPopup'] && this.downHeight == 0) {
				this.downHeight = this.$refs['downPopup'].offsetHeight
			}
			if (this.$refs['headerNotice'] && !this.noticesHeight) {
				this.noticesHeight = document.querySelector('#headerNotice').offsetHeight
			}
			if (this.existDown) {
				this.isMenuFixed = scrollTop > this.downHeight + this.noticesHeight
				this.hideDown = scrollTop > this.noticesHeight + 10
			} else {
				this.isMenuFixed = scrollTop > this.noticesHeight + 10
			}
			this.$emit('scroll', {
				scrollTop: scrollTop,
				noticesHeight: this.noticesHeight,
				menuHeight: this.menuHeight,
				otherHeight: this.otherHeight,
				downHeight: this.existDown ? this.downHeight : 0,
			})
		},
		// 关闭下载弹框:
		closeDown() {
			this.hideDown = true
			this.existDown = false
			store.set('closeDown', 1)
		},
		// 点击下载:
		goDown() {
			const USER_Agent = navigator.userAgent
			const MOBILE_IOS = /(iPhone|iPad|iPod|iOS)/i
			const MOBILE_Android = /(Android)/i
			if (MOBILE_IOS.test(USER_Agent)) {
				window.location.href = 'https://apps.apple.com/ca/app/id1562805836'
			} else if (MOBILE_Android.test(USER_Agent)) {
				window.location.href = 'https://play.google.com/store/apps/details?id=com.plushe.plushe_app'
			}
			this.hideDown = true
			this.existDown = false
			setTimeout(() => {
				window.location.reload()
			}, 3000)
		},
	},
}
</script>

<style lang="less" scoped>
@import '@/style/variable.less';
@downHeight: 78px;

.top-header {
	color: @color-222;
	position: relative;
	z-index: 101;
	&.have-down {
		padding-top: @downHeight;
	}
	&.exist-down {
		padding-top: @downHeight;
	}
	.notice-swiper-notice {
		height: 36px;
		background: #000;

		.swiper-slide {
			display: block;
			text-align: center;
			height: 36px;
			line-height: 36px;
			background: #000;
			font-size: 12px;
			color: @color-222;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
	.top-header__menu {
		height: 50px;

		.top-header__menu-content {
			position: relative;
			z-index: 100;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 50px;
			padding: 0 8px;
			background: @color-bg;
			box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.06);
			&.menu--fixed {
				position: fixed;
				top: 0;
				max-width: 375px;
				margin-top: constant(safe-area-inset-top); /* 兼容 iOS < 11.2 */
				margin-top: env(safe-area-inset-top); /* 兼容 iOS >= 11.2 */
			}
			> div {
				display: flex;
				align-items: center;
				font-size: 0;
				height: 100%;
			}
		}
		.click-area {
			height: 100%;
			display: flex;
			align-items: center;
			padding: 0 8px;
			&.no-right-padding {
				padding-right: 0;
			}
		}
		.th__menu-icon {
			width: 22px;
			height: auto;
		}
		.th__menu-icon-search {
			font-size: 26px;
		}
		.th__menu-center {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			height: 100%;
			display: flex;
			align-items: center;
			font-size: 0;
		}
		.th__menu-logo {
			width: auto;
			height: 18px;
		}
		.th__menu-shopcar {
			position: relative;
			.th__menu-cart--num {
				position: absolute;
				left: 15px;
				top: -5px;
				min-width: 14px;
				padding: 0 4px;
				background: #e84646;
				color: #fff;
				font-size: 12px;
				border-radius: 7px;
				transform: translateX(-4px) scale(0.8);
				text-align: center;
				display: flex;
				align-items: center;
			}
		}
	}
	.top-header__other {
		display: flex;
		overflow: hidden;
		.th__other-img {
			height: 36px;
		}
	}

	// 下载框样式:
	.down-popup {
		position: fixed;
		background: #fafafa;
		top: constant(safe-area-inset-top);
		top: env(safe-area-inset-top);
		left: 50%;
		width: 100%;
		height: @downHeight;
		z-index: 100;
		max-width: 375px;
		transform: translateX(-50%);
		padding: 8px 10px;
		display: flex;
		align-items: center;
		box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
		transition: 0.3s all ease;
		&.out {
			top: -100px;
		}
		.down-close {
			font-size: 20px;
			color: #999;
		}
		.down-wrap {
			flex: 1;
			display: flex;
			align-items: center;
			.down-logo {
				height: 62px;
				width: 62px;
				margin: 0 10px;
			}
			.down-cont {
				.down-tit {
					font-size: 14px;
					font-weight: 700;
					color: #222;
					line-height: 15px;
				}
				.down-tips {
					color: #2fc083;
					font-size: 12px;
					line-height: 14px;
					margin-bottom: 2px;
				}
				.down-rate {
					color: #999;
					font-size: 12px;
					display: flex;
					align-items: center;
					span {
						margin-left: 6px;
					}
				}
			}
		}
		.down-right {
			width: 56px;
			height: 32px;
			line-height: 30px;
			text-align: center;
			border: 1px solid #222;
			font-size: 13px;
			color: 600;
		}
	}
}
</style>
