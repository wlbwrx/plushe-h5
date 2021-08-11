<template>
	<div class="gee-top">
		<div class="gee-top__header">
			<div class="gee-top__brand" @click="goHome">
				<van-icon class="gee-top__back-icon" name="arrow-left"></van-icon>
				<div class="gee-top__brand-cont">
					<h3 class="gee-top__brand-name">GeeMart Mall</h3>
					<p class="gee-top__brand-txt">More products to GeeMart</p>
				</div>
			</div>
			<div class="gee-top__icons">
				<van-icon class="gee-top__gwd" class-prefix="icon" name="gouwudai" :badge="totalNum || null" @click="goPage('/shopping_car')"></van-icon>
				<van-icon class-prefix="icon" name="wode" @click="goPage('/my')"></van-icon>
			</div>
		</div>
		<div :class="['gee-top__head', { 'gee-top__fixed': fixed }]">
			<van-icon class-prefix="icon" name="sousuo" @click="goPage('/search')"></van-icon>
			<span class="brand-name">{{ brandName }}</span>
			<van-icon class="head-fenlei" class-prefix="icon" :name="iconName" @click="goPage('/category')"></van-icon>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
	props: {
		fixed: {
			type: Boolean,
			default: false,
		},
		iconName: {
			type: String,
			default: 'fenlei1',
		},
	},
	components: {
	},
	data() {
		return {}
	},
	computed: {
		...mapGetters('shopCar', {
			totalNum: 'totalNum',
		}),
		...mapState('app', {
			shopsId: 'shopsId',
			shopsInfo: 'shopsInfo',
		}),
		brandName() {
			let obj = this.shopsInfo.find((item) => item.id == this.shopsId)
			return obj.name
		},
	},
	methods: {
		goPage(path) {
			if (path == '/category') {
				if (this.iconName == 'fenlei1') {
					this.$router.push({
						path: path,
						query: {
							shopsId: this.$route.query.shopsId,
						},
					})
				} else {
					this.$router.go(-1)
				}
				return
			}
			this.$router.push({
				path: path,
				query: {
					shopsId: this.$route.query.shopsId,
				},
			})
		},
		goHome() {
			this.$router.push({
				path: '/',
			})
		},
	},
}
</script>

<style lang="less" scoped>
@import '@/style/variable.less';

.gee-top__header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 16px;
	height: 56px;
	position: fixed;
	left: 50%;
	top: 0;
	transform: translateX(-50%);
	max-width: 375px;
	z-index: 101;
	width: 100%;
	background: #fff;
	&::after {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 56px;
		z-index: 0;
		background: linear-gradient(90.01deg, rgba(211, 255, 118, 0.6) 2.81%, rgba(245, 255, 242, 0.6) 71.74%, rgba(186, 254, 233, 0.6) 101.98%);
	}
	.gee-top__brand {
		position: relative;
		z-index: 1;
		display: flex;
		.gee-top__back-icon {
			font-size: 24px;
		}
	}
	.gee-top__brand-name {
		color: @color-222;
		font-size: 20px;
		font-weight: 500;
	}
	.gee-top__brand-txt {
		font-size: 14px;
		color: #a3b088;
	}
}
.gee-top__icons {
	position: relative;
	z-index: 1;
	.icon {
		font-size: 28px;
		margin-left: 6px;
		position: relative;
		color: #000;
	}
	/deep/ .van-info {
		position: absolute;
		left: 12px;
		top: -2px;
		right: auto;
		padding: 0 4px;
		border-radius: 12px;
		background: #e84646;
		color: #fff;
		font-size: 12px;
		display: flex;
		height: 16px;
		align-items: center;
		transform: translateX(-4px) scale(0.8);
	}
}
.gee-top__head {
	margin-top: 56px;
	background: #fff;
	height: 44px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: relative;
	z-index: 100;
	padding: 0 16px;
	&.gee-top__fixed {
		margin-top: 0;
		position: fixed;
		top: 56px;
		max-width: 375px;
		width: 100%;
	}
	.gee-top__logo {
		width: 200px;
		height: 18px;
	}
	.icon {
		font-size: 24px;
		color: @color-666;
	}
	.head-fenlei {
		font-size: 18px;
	}
	.brand-name {
		font-size: 18px;
	}
}
</style>
