<template>
	<div class="user-set">
		<van-cell-group class="user-set-list first-set">
			<van-cell v-if="token" :title="user.nickName" @click="$router.push({ name: 'userEdit', query: { nickName: user.nickName, headPhoto: user.headPhoto } })" is-link :label="user.userEmail" />
			<van-cell v-else @click="goLogin" is-link>
				<template #title>
					<span class="user-set-login">{{ $t('login.signIn') }} / {{ $t('login.register') }}</span>
				</template>
			</van-cell>
		</van-cell-group>
		<div class="gao-line-bg"></div>
		<van-cell-group class="user-set-list">
			<van-cell :title="$t('my.addressBook')" @click="$router.push({ name: token ? 'myAddress' : 'login', query: { redirect: '/my' } })" is-link />
			<van-cell v-if="token" :title="$t('my.changePassword')" @click="$router.push({ name: 'changePassword' })" is-link />
			<!-- <van-cell v-if="platformId !== 3" :title="$t('my.countryRegion')" value="United States" /> -->
		</van-cell-group>
		<div class="gao-line-bg"></div>
		<van-cell-group class="user-set-list">
			<!-- <van-cell title="Feedback" is-link /> -->
			<van-cell :title="$t('other.title9')" @click="$router.push({ name: 'connectToUs' })" is-link />
			<van-cell :title="$t('my.aboutUs', { platform })" @click="$router.push({ name: 'about' })" is-link />
		</van-cell-group>
		<div class="gao-line-bg"></div>
		<div class="submit-btn">
			<van-button v-if="token" type="primary" class="submit-order" @click="signOut">{{ $t('login.signOut') }} </van-button>
		</div>

		<van-popup v-model="showConfirm" @click-overlay="toCancel">
			<div class="delete-popup">
				<h3 class="delete-popup__tips">
					{{ $t('my.hint3') }}
				</h3>
				<div class="delete-popup__btns">
					<van-button color="#222" plain @click="toCancel">{{ $t('cancel') }}</van-button>
					<van-button color="#222" @click="toConfirm">{{ $t('login.signOut') }}</van-button>
				</div>
			</div>
		</van-popup>
	</div>
</template>
<script>
// import store from 'store'
import { mapActions, mapState } from 'vuex'
export default {
	data() {
		let platform = this.$store.getters.platformId === 1 ? 'Plushe' : 'GeeMart'
		return {
			platform,
			showConfirm: false,
		}
	},
	created() {
		if (this.token) {
			this.getUser({})
		}
	},
	computed: {
		...mapState('user', ['user']),
	},
	components: {},
	methods: {
		...mapActions('user', ['getUser', 'Signout']),
		// 取消
		toCancel() {
			this.showConfirm = false
		},
		// 确定-退出登录
		toConfirm() {
			this.Signout().then(() => {
				this.showConfirm = false
				// location.replace(location.origin + '/login?redirect=%2Fhome')
				this.$router.replace({
					path: '/login',
					query: {
						redirect: '/',
					},
				})
			})
		},
		// 点击退出登录
		signOut() {
			this.showConfirm = true
		},
		goLogin() {
			this.$router.push({
				path: '/login',
				query: {
					redirect: '/my',
				},
			})
		},
	},
}
</script>
<style lang="less" scoped>
@import '@/style/modules/my.less';
.user-set {
	height: 100%;
	padding-top: 45px;
	.van-cell {
		height: 52px;
	}
	.first-set {
		.van-cell {
			height: 60px;
		}
	}
	.submit-btn {
		background: #fafafa;
	}
}
.gao-line-bg {
	height: 10px;
	background: #f5f5f5;
}
.user-set-login {
	font-size: 16px;
	font-weight: 700;
}
.delete-popup {
	width: 295px;
	padding: 30px 16px 16px;
	background: #fff;

	.delete-popup__tips {
		font-size: 16px;
		color: #222;
		margin-bottom: 24px;
		text-align: center;
	}

	.delete-popup__btns {
		display: flex;
		justify-content: space-between;

		.van-button {
			height: 36px;
			width: 124px;
			border-radius: 0;
		}
	}
}
</style>
