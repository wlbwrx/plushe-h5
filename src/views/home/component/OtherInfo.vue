<template>
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
		<div class="other-icons" @click="goPage(list[2])" v-if="platformId == 1">
			<img class="other-icons-img" :src="item.icon" alt="" v-for="item of iconList" :key="item.name" />
		</div>
		<h3 class="other-info__plushe">{{$t("other.name6")}}</h3>
		<ul class="info-list">
			<li class="info-item" v-for="item of info" :key="item.name" @click="goPage(item)">
				<span>{{ item.name }}</span>
				<i class="icon icon-fanhui-copy"></i>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{ icon: require('@/assets/images/icons/home-yunshu.png'), path: '/otherInfo', id: 1, name: this.$t("other.name1"), desc: this.$t("other.desc1") },
				{ icon: require('@/assets/images/icons/home-tuihuan.png'), path: '/otherInfo', id: 2, name: this.$t("other.name2"), desc:this.$t("other.desc2") },
				{ icon: require('@/assets/images/icons/home-kefu.png'), path: '/connectToUs', id: 9, name: this.$t("other.name9"), desc: this.$t("other.desc9") },
			],
			info: [
				// { name: 'Shipping Information', path: '/otherInfo', id: 1 },
				// { name: 'Return & Exchanges', path: '/otherInfo', id: 2 },
				{ name: this.$t("other.name8"), path: '/otherInfo', id: 3 },
				{ name: this.$t("other.name4"), path: '/otherInfo', id: 4 },
				{ name: this.$t("other.name5"), path: '/otherInfo', id: 5 },
				{ name: this.$t("other.name6"), path: '/otherInfo', id: 6 },
				{ name: this.$t("other.name7"), path: '/otherInfo', id: 7 },
			],
			iconList: [
				{ icon: require('@/assets/images/icons/icon-facebook.png'), name: 'fackbook' },
				{ icon: require('@/assets/images/icons/icon-instagram.png'), name: '' },
				{ icon: require('@/assets/images/icons/icon-pinterest.png'), name: 'pinterest' },
				{ icon: require('@/assets/images/icons/icon-twitter.png'), name: 'twitter' },
				{ icon: require('@/assets/images/icons/icon-youtube.png'), name: 'youtube' },
			],
		}
	},
	methods: {
		// 前往页面：
		goPage(item) {
			this.$router.push({
				path: item.path,
				query: {
					id: item.id || undefined,
				},
			})
		},
	},
}
</script>

<style scoped lang="less">
@import '@/style/variable.less';

.other-info {
	padding: 40px 24px 60px;
	background: @color-bg;
}
.other-list {
	.other-item {
		display: flex;
		align-items: center;
		margin-bottom: 40px;
		position: relative;
		.other-pic {
			width: 32px;
			height: auto;
			margin-right: 20px;
		}
		.other-cont {
			flex: 1;
			padding-right: 10px;
			.other-name {
				font-size: 14px;
				font-weight: 700;
				line-height: 17px;
				color: @color-222;
			}
			.other-desc {
				font-size: 12px;
				color: @color-595;
				margin-top: 4px;
			}
		}
		.iother-arrow {
			position: absolute;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
		}
	}
}
.other-icons {
	display: flex;
	justify-content: center;
	margin-bottom: 74px;
	.other-icons-img {
		margin-right: 30px;
		width: 28px;
		&:last-child {
			margin-right: 0;
		}
	}
}
.other-info__plushe {
	font-size: 16px;
	font-weight: 700;
	margin-bottom: 10px;
}
.info-list {
	.info-item {
		line-height: 42px;
		height: 42px;
		font-size: 14px;
		color: @color-222;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}
</style>
