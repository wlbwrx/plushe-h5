<template>
	<div class="login-register">
		<nav-bar border backIconNewLogic @clickBack="closeLogin"></nav-bar>
		<!-- <div class="login-register__logo">
			<img class="login-logo" :src="platform[platformId].logo" alt="" />
		</div>
		<van-icon class="login-register__close" class-prefix="icon" name="guanbi" @click="closeLogin"></van-icon> -->
		<ul class="login-register__menu">
			<li :class="['menu-item', { 'is-active': item.id == loginSwipeIndex }]" v-for="item of navList" :key="item.id" @click="switchLoginRegister(item.id)">{{ $t(item.name) }}</li>
		</ul>
		<van-swipe :touchable="false" :show-indicators="false" ref="swipe">
			<van-swipe-item>
				<login ref="login"></login>
				<third-login></third-login>
			</van-swipe-item>
			<van-swipe-item>
				<register ref="register"></register>
				<third-login></third-login>
				<i18n path="login.hint9" class="register__desc" tag="p" for="tos">
					<template #privacy>
						<span class="register__link" @click="goPage(4)">{{ $t('login.privacy') }}</span>
					</template>
					<template #terms>
						<span class="register__link" @click="goPage(5)">{{ $t('login.terms') }}</span>
					</template>
					<!-- <a :href="url" target="_blank">{{ $t('tos') }}</a> -->
				</i18n>
				<!-- <p class="register__desc">
					By clicking register, you agree to our
					<span class="register__link" @click="goPage(4)">Privacy & Cookies Policy </span>
					and <span class="register__link" @click="goPage(5)"> Terms & Conditions.</span>
				</p> -->
			</van-swipe-item>
		</van-swipe>
	</div>
</template>
<script>
import NavBar from '@/components/navbar/index.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import ThirdLogin from './components/ThirdLogin.vue'

import { mapState, mapMutations } from 'vuex'
import { platform } from '@/utils/enums.js'

export default {
	data() {
		return {
			platform: platform,
			navList: [
				{ name: 'login.signIn', id: 0 },
				{ name: 'login.register', id: 1 },
			],
		}
	},
	components: {
		Login,
		Register,
		ThirdLogin,
		NavBar,
	},
	created() {},
	activated() {
		this.SET_USER({})
		if (this.loginSwipeIndex == 1) {
			this.$refs.swipe.swipeTo(this.loginSwipeIndex, { immediate: true })
			this.$refs.swipe.resize()
		}
	},
	computed: {
		...mapState({
			userEmail: (state) => state.user.userEmail,
			loginSwipeIndex: (state) => state.user.loginSwipeIndex,
		}),
	},
	methods: {
		...mapMutations('user', ['SET_LOGINSWIPEINDEX', 'SET_USER']),
		// 选择登录or注册：
		switchLoginRegister(id) {
			if (id == this.loginSwipeIndex) return
			if (this.userEmail) {
				const key = id == 0 ? 'login' : 'register'
				this.$refs[key].setEmail()
			}
			this.SET_LOGINSWIPEINDEX(id)
			this.$refs.swipe.swipeTo(id)
		},
		goPage(id) {
			this.$router.push({
				path: '/otherInfo',
				query: {
					id: id,
				},
			})
		},
		// 关闭登录：
		closeLogin() {
			if (this.$route.query.redirect == '/') {
				// 主动退出登录的情况，回到首页
				this.$router.push({
					path: this.$route.query.redirect,
				})
			} else {
				this.$router.go(-1)
			}
		},
	},
}
</script>
<style scoped lang="less">
@import '@/style/variable.less';

.login-register {
	position: relative;
	min-height: 100%;
	padding: 0 16px 16px;
	.login-register__logo {
		text-align: center;
		height: 25px;
		margin: 10px auto 42px;
		.login-logo {
			height: 25px;
			width: auto;
		}
	}
	.login-register__close {
		position: absolute;
		right: 16px;
		top: 16px;
		font-size: 28px;
	}
	.login-register__menu {
		margin-top: 42px;
		display: flex;
		justify-content: center;
		color: @color-222;
		.menu-item {
			font-size: 16px;
			line-height: 17px;
			position: relative;
			font-weight: 500;
			&:first-child {
				margin-right: 60px;
			}
			&.is-active {
				font-weight: 700;
			}
			&.is-active::after {
				content: '';
				position: absolute;
				left: 0;
				bottom: -5px;
				width: 100%;
				border-bottom: 2px solid @color-222;
			}
		}
	}
	.register__desc {
		font-size: 12px;
		line-height: 17px;
		color: @color-999;
		text-align: center;
		.register__link {
			color: @color-222;
		}
	}
}
</style>
