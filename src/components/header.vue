<template>
	<div class="header">
		<van-nav-bar :title="$utils.isEmpty(title) ? $t($route.meta.title) : title">
			<template #left>
				<span class="navbar__back" @click="goBack">
					<img class="navbar__icon-back" src="@/assets/images/icons/back.png" alt="" />
				</span>
			</template>
			<template v-if="operHead" #right>
				<van-icon class-prefix="icon" name="bianji" size="18" />
			</template>
		</van-nav-bar>
	</div>
</template>
<script>
import { mapState } from 'vuex'
export default {
	computed: {
		...mapState('app', ['title', 'goBackUrlList']),
	},
	props: {
		retBack: {
			type: Boolean,
			default: true,
		},
		operHead: {
			type: Boolean,
			default: false,
		},
	},
	components: {
	},
	mounted() {},
	methods: {
		goBack() {
			let { goBackUrl } = this.$route.meta
			if (this.goBackUrlList.length !== 0) {
				// paypal回调地址,返回无路径问题
				this.$router.replace(this.goBackUrlList[0])
				return
			}
			if (goBackUrl) {
				if (goBackUrl == 'shoppingCar') {
					// 购物车和订单结算有循环返回的问题,加个判断
					// this.$router.replace({ name: goBackUrl })
					this.$router.go(-1)
					return
				}
				this.$router.push({ name: goBackUrl })
			} else {
				this.$router.go(-1)
			}
		},
	},
}
</script>
<style lang="less" scoped>
.header {
	position: fixed;
	width: 100%;
	max-width: 375px;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	z-index: 9999;
}
.navbar__icon-back {
	height: 22px;
}
</style>
