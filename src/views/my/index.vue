<template>
	<!-- tabbar-个人中心页 -->
	<div class="my">
		<div :class="['user-box', { 'user-login-box': haveToken }]">
			<div class="user-info">
				<div v-if="haveToken" class="user">
					<van-image class="avatar" round :src="headPhoto">
						<template v-slot:error>
							<van-icon class="avatar-error" class-prefix="icon" size="30" name="touxiang" />
						</template>
					</van-image>
					<p class="name text-hidden-row-1">{{ $t('my.hint9', { name: user.nickName }) }}</p>
				</div>
				<div v-else class="my-login" @click="goLogin">{{ $t('login.signIn') }} / {{ $t('login.register') }}</div>
				<div class="setting" @click="setting">
					<img class="setting-icon" src="@/assets/images/icons/setting-icon.png" alt="" />
				</div>
			</div>
			<div class="order-box">
				<div class="title">
					<h3 class="tit">{{ $t('my.orders') }}</h3>
				</div>
				<ul class="list pub-list">
					<li class="item" v-for="(item, index) in minOrders" :key="index" @click="goto(item)">
						<img :src="item.img" class="img" />
						<!-- <i :class="'icon ' + item.value" /> -->
						<p class="tit">{{ item.label }}</p>
					</li>
				</ul>
			</div>
		</div>
		<!-- <div class="moreService" v-if="platformId == 3">
			<div class="title">
				<h3 class="tit">More services</h3>
			</div>
			<ul class="list pub-list">
				<li class="item">
					<a href="https://page.line.me/358mfide">
						<i class="icon icon-kefu" />
						<p class="tit">Online Service</p>
					</a>
				</li>
			</ul>
		</div> -->
		<div :class="['other', { ifLine: platformId == 3 }]">
			<van-cell :title="item.label" is-link :value="item.value" v-for="(item, index) in minMenus" @click="goto(item, 'noAuth')" :key="index" />
		</div>
		<!-- <ul>
			<li class="item" v-for="(item, index) in minMenus" :key="index" @click="goto(item.label)">
				<i :class="'icon ' + item.value" />
				<p class="tit">{{ item.label }}</p>
			</li>
		</ul> -->
		<div class="relate-goods">
			<ul class="relate-goods-menu">
				<li class="rg-menu-item is-active">{{ $t('my.wishlist') }}</li>
			</ul>
			<goods-list :wishList="wishList"></goods-list>
			<!-- <recommend-goods-list></recommend-goods-list> -->
		</div>
	</div>
</template>
<script>
import $http from '@/api/modules/mine'
import store from 'store'
import GoodsList from './components/goods-list'
import { minMenus, minOrders } from '@/utils/enums'
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
	components: {
		GoodsList,
	},
	data() {
		return {
			minMenus,
			minOrders,
			active: 'Wishlist',
			nickName: '',
			headPhoto: '',
			// userToken: userToken,
			param: {
				pageNum: 1,
				pageSize: 10,
				couponStatus: 0, //0  3-待使用|   |3-可复用    0待使用|1-锁定|2-已使用|3过期   0-待使用|1-锁定|2-已使用|3-过期
			},
		}
	},
	// activated() {
	// 	this.init()
	// 	console.log('activatedactivated')
	// },
	created() {
		this.init()
	},
	mounted() {},
	computed: {
		...mapGetters({
			platformId: 'platformId',
		}),
		...mapState('user', {
			user: 'user',
		}),
		...mapState('wish', ['wishList']),
		isShops() {
			return !!this.$store.getters.shopsId
		},
		haveToken() {
			return !!this.$store.getters.token
		},
		couponNumText() {
			return this.couponList.length + `${this.$t('coupon.Available')}`
		},
	},
	methods: {
		...mapActions('wish', ['queryWishList']),
		getUser() {
			let userInfo = store.get('userInfo')
			let { nickName, headPhoto } = userInfo || {}
			this.nickName = nickName
			this.headPhoto = headPhoto
		},
		setting() {
			this.$router.push({
				path: '/userSet',
			})
		},
		// 前往页面:
		goto(item, flag) {
			if (this.haveToken || (flag == 'noAuth' && item.path != '/myCoupon')) {
				this.$router.push({
					path: item.path,
				})
			} else {
				this.goLogin()
			}
		},
		// 前往登录:
		goLogin() {
			this.$router.push({
				path: '/login',
				query: {
					redirect: '/my',
				},
			})
		},
		init() {
			console.log('this.haveToken', this.haveToken)
			this.queryWishList({ pageNum: 1, pageSize: 100 })
			this.getUser()
			// 获取优惠券:
			if (this.haveToken) {
				$http.queryUserCoupon(this.param).then((res) => {
					let total = res.data.total
					if (total) {
						this.$set(this.minMenus[0], 'value', total + ` ${this.$t('coupon.Available')}`)
					} else {
						this.$set(this.minMenus[0], 'value', '')
					}
				})
			} else {
				this.$set(this.minMenus[0], 'value', '')
			}
		},
	},
}
</script>
<style scoped lang="less">
@import '@/style/variable.less';
.my {
	color: @color-222;
	padding-bottom: calc(50px + constant(safe-area-inset-bottom)); /* 兼容 iOS < 11.2 */
	padding-bottom: calc(50px + env(safe-area-inset-bottom)); /* 兼容 iOS >= 11.2 */

	.user-box {
		background: url('~@/assets/images/my-header-bg.png');
		background-size: 100% 100%;
		height: 152px;
		padding-top: 40px;
		color: #fff;

		.user-info {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 16px;
			height: 21px;
			margin-bottom: 23px;
			.user-info-content {
				display: flex;
				justify-content: space-between;
				align-items: center;

				&.is-shops {
					position: relative;
					padding-left: 40px;
					> .icon {
						position: absolute;
						left: 8px;
						top: 50%;
						transform: translateY(-50%);
						font-size: 26px;
					}
				}
			}

			.user {
				position: relative;
				padding-left: 60px;
				.avatar {
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
				}
				.name {
					line-height: 19px;
					font-size: 16px;
					font-weight: 500;
					max-width: 200px;
				}
			}

			.setting {
				font-size: 0;
				.setting-icon {
					height: 21px;
				}
			}
			.my-login {
				font-size: 18px;
				font-weight: 500;
			}
		}
		.my-coupon-tips {
			height: 26px;
			display: flex;
			align-items: center;
			color: #e84646;
			padding: 0 10px;
			background: rgba(237, 171, 114, 0.08);
			img {
				height: 14px;
				margin-right: 4px;
			}
			span {
				font-size: 12px;
			}
		}
	}
	.other {
		margin: 60px 10px 10px;
		background: #fff;
		border-radius: 6px;
		overflow: hidden;
		// &.ifLine{
		// 	margin-top:10px;
		// }
		/deep/.van-cell {
			padding: 14px 14px;
			&::after {
				border-color: @color-bg;
			}
			.van-cell__title {
				font-size: 14px;
				color: @color-222;
				font-weight: 300;
			}
			.van-cell__value {
				font-size: 14px;
				color: @color-999;
			}
			.van-cell__right-icon {
				color: @color-999;
			}
		}
	}

	.pub-list {
		display: flex;
		justify-content: space-around;
		.item {
			text-align: center;
			flex: 1;
			font-size: 0;
			.icon {
				font-size: 32px;
				margin-bottom: 10px;
			}

			.tit {
				margin-top: 10px;
				font-size: 12px;
				line-height: 14px;
			}
			img {
				width: 26px;
			}
		}
	}

	.order-box {
		padding: 20px 0;
		background: #fff;
		color: #222222;
		margin: 0 10px;
		margin-bottom: -50%;
		border-radius: 6px;

		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 18px;
			margin-bottom: 14px;

			.tit {
				font-size: 500;
				font-size: 14px;
			}

			.more {
				color: #666;
				font-size: 14px;
			}
		}
	}

	.kf {
		background: #fff;
		padding: 24px;
		display: flex;
		margin-bottom: 10px;

		.icon {
			font-size: 32px;
			margin-right: 22px;
		}

		.txt {
			flex: 1;
			font-size: 14px;
			line-height: 17px;
		}
	}

	.relate-goods {
		background: #fff;
		min-height: 100px;
		margin: 0 10px 30px;
		border-radius: 6px;
		overflow: hidden;
		padding-top: 20px;
		color: #222;
		.relate-goods-menu {
			display: flex;
			justify-content: center;
			.rg-menu-item {
				font-size: 14px;
				font-weight: normal;
				&.is-active {
					border-bottom: 3px solid #222;
				}
			}
		}
		.wishlist-empty {
			width: 100%;
			text-align: center;
			font-size: 14px;
			color: #666;
			margin-top: 22px;
		}
	}
	// 新增
	.moreService {
		padding: 0.53333rem 0;
		margin: 60px 10px 10px;
		background: #fff;
		border-radius: 6px;
		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 0.48rem;
			margin-bottom: 0.37333rem;
			.tit {
				font-size: 0.37333rem;
			}
		}
		.pub-list {
			.item {
				a {
					color: #222222;
				}
			}
		}
	}
}
</style>
