<template>
	<div class="navbar">
		<van-nav-bar :border="border" safe-area-inset-top fixed :placeholder="placeholder">
			<template #left>
				<img v-if="leftArrow" class="navbar__icon-back" @click="back" src="@/assets/images/icons/back.png" alt="" />
				<img v-if="fenlei" class="navbar__fenlei" @click="goFenlei" src="@/assets/images/icons/fenlei.png" alt="" />
			</template>
			<template #title>
				<span class="navbar__title" v-if="title">{{ title }}</span>
				<template v-else>
					<img class="logo-icon" @click="goHome" v-if="platformId == 1" src="@/assets/images/logo.png" alt="" />
					<img class="logo-icon" @click="goHome" v-if="platformId == 2" src="@/assets/images/gee-logo.png" alt="" />
					<img class="logo-icon" @click="goHome" v-if="platformId == 3" src="@/assets/images/bondot-logo.png" alt="" />
				</template>
			</template>
			<template #right>
				<slot name="rightIcons"></slot>
			</template>
		</van-nav-bar>
	</div>
</template>
<script>
export default {
	props: {
		title: {
			type: String,
		},
		border: {
			type: Boolean,
			default: false,
		},
		placeholder: {
			type: Boolean,
			default: true,
		},
		background: {
			type: String,
			default: '#fafafa',
		},
		leftArrow: {
			type: Boolean,
			default: true,
		},
		// 是否显示分类图标
		fenlei: {
			type: Boolean,
			default: false,
		},
		// 返回按钮走新逻辑
		backIconNewLogic: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {}
	},
	methods: {
		back() {
			if (!this.backIconNewLogic) {
				this.$router.go(-1)
			} else {
				this.$emit('clickBack')
			}
		},
		goHome() {
			this.$router.push({
				path: '/',
			})
		},
		goFenlei() {
			this.$router.push({
				path: '/category',
			})
		},
	},
}
</script>
<style scoped lang="less">
.navbar {
	.logo-icon {
		width: 85px;
	}
}
.navbar__fenlei {
	width: 27px;
	height: 24px;
	margin-left: 8px;
}

.navbar__icon-back {
	height: 22px;
}
.navbar {
	/deep/.van-nav-bar {
		left: 50%;
		transform: translateX(-50%);
		max-width: 375px;
		z-index: 1000;
		background: #fafafa;

		&.van-hairline--bottom::after {
			border-color: #ebebeb;
		}
	}
}
.navbar__title {
	font-size: 18px;
}
</style>
