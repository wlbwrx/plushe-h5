<template>
	<div class="connect-us">
		<nav-bar :title="$t($route.meta.title)" border></nav-bar>
		<div class="connect-us-wrap">
			<p class="cu-txt">{{ $t('connectToUs.txt') }}</p>
			<p class="cu-txt">{{ $t('connectToUs.txt1') }}</p>
			<p class="cu-txt">{{ $t('connectToUs.txt2') }}</p>
			<div class="cu-email">
				<h3 class="cu-email-tit">{{ $t('my.emailUs') }}</h3>
				<div class="cu-email-txt">
					<p>
						<label>{{ $t('email') }}:</label><span>{{ platformEmail }}</span>
					</p>
					<span class="email-copy" v-copy :data-clipboard-text="platformEmail">{{ $t('copy') }}</span>
				</div>
			</div>
		</div>
		<!-- line 聊天入口 -->
		<line-chat v-if="platformId == 3"></line-chat>
	</div>
</template>
<script>
import Clipboard from '@/mixins/Clipboard'
import LineChat from '@/components/LineChat.vue'
import NavBar from '@/components/navbar/index.vue'
export default {
	mixins: [Clipboard], // Copied Email Successful!
	components: {
		LineChat,
		NavBar,
	},
	data() {
		return {}
	},
	methods: {},
}
</script>
<style lang="less" scoped>
@import '@/style/variable.less';

.connect-us {
	height: 100%;
	color: @color-222;
	font-size: @fontSize14;
	.connect-us-wrap {
		padding: 20px 16px;
		.cu-txt {
			margin-bottom: 10px;
			line-height: 22px;
			&:first-child {
				font-weight: 500;
			}
		}
		.cu-email {
			margin-top: 20px;
			padding: 12px 20px;
			background: @color-F0F;
			.cu-email-tit {
				font-weight: bold;
				margin-bottom: 6px;
			}
			.cu-email-txt {
				display: flex;
				justify-content: space-between;
				align-items: center;
				p {
					label {
						font-weight: 500;
					}
					span {
						color: @color-666;
					}
				}
				.email-copy {
					color: @color-666;
					border-bottom: 1px solid @color-666;
				}
			}
		}
	}
}
</style>
