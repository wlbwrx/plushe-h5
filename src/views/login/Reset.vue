<template>
	<div class="reset">
		<nav-bar border backIconNewLogic @clickBack="toBack"></nav-bar>
		<div class="reset__main">
			<div class="reset__before" v-if="!progress">
				<h3 class="reset__before-title">{{ $t('login.resetPassword') }}</h3>
				<p class="reset__before-tips">
					{{ $t('login.hint14') }}
				</p>
				<field-input :value.sync="form.userEmail" :label="$t('login.emailAddress')" :error="errorEmail" @onblur="blurEmail"></field-input>
				<div class="login-submit-box">
					<van-button class="submit-btn-44" block @click="submit('sendRestEmail', 0)">{{ $t('submit') }}</van-button>
				</div>
			</div>
			<div class="reset__after" v-else>
				<van-icon class="reset__after-icon" size="50" name="checked"></van-icon>
				<h3 class="reset__after-tit">{{ $t('login.hint15', { userEmail: form.userEmail }) }}</h3>
				<p class="reset__after-tips">
					{{ $t('login.hint16') }}
				</p>
				<div class="login-submit-box">
					<van-button class="submit-btn-44" block @click="backLogin">{{ $t('login.signIn') }}</van-button>
				</div>
				<span class="reset__after-resend" @click="submit('sendRestEmail', 1)">{{ $t('login.resend') }}</span>
				<!-- <div class="reset__after-support">
					<van-icon class="service-icon" class-prefix="icon" name="kefu"></van-icon>
					<div class="support-txt">Support</div>
				</div> -->
			</div>
		</div>
	</div>
</template>
<script>
import NavBar from '@/components/navbar/index.vue'
import FieldInput from './components/FieldInput.vue'
import login from '@/mixins/login.js'

export default {
	mixins: [login],
	data() {
		return {
			progress: 0, // 0、 1 是否发送了邮箱验证流程
		}
	},
	components: {
		NavBar,
		FieldInput,
	},
	created() {
		this.setEmail()
	},
	mounted() {},
	methods: {
		// 返回登录
		backLogin() {
			this.$router.go(-1)
		},
		// 点击顶部返回Icon：
		toBack() {
			if (this.progress) {
				this.progress = 0
			} else {
				this.$router.go(-1)
			}
		},
		setEmail() {
			this.form.userEmail = this.$route.query.userEmail
		},
	},
}
</script>
<style scoped lang="less">
@import '@/style/variable.less';

.reset {
	height: 100%;
	.reset__main {
		padding: 0 16px;
		.reset__before {
			.reset__before-title {
				margin-top: 50px;
				font-size: 20px;
				font-weight: 700;
				line-height: 18px;
				text-align: center;
			}
			.reset__before-tips {
				font-size: 14px;
				line-height: 17px;
				margin: 10px 0;
				text-align: center;
			}
		}
		.reset__after {
			text-align: center;
			font-size: 14px;
			position: relative;
			.reset__after-icon {
				width: 50px;
				height: 50px;
				border-radius: 50%;
				margin: 50px auto 20px;
			}
			.reset__after-tit {
				font-size: 16px;
				line-height: 16px;
				margin-bottom: 10px;
			}
			.reset__after-tips {
				color: @color-666;
				line-height: 17px;
			}
			.reset__after-resend {
				display: inline-block;
				padding: 0 10px;
				margin-top: 20px;
			}
			.reset__after-support {
				position: fixed;
				bottom: 30px;
				left: 50%;
				transform: translateX(-50%);
				text-align: center;
				.service-icon {
					font-size: 26px;
				}
				.support-txt {
					font-size: 12px;
					transform: scale(0.86);
					color: @color-666;
				}
			}
		}
		.submit {
			margin-top: 50px;
		}
	}
}
</style>
