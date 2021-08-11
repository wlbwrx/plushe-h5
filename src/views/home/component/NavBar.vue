<template>
	<div class="navbar">
		<!-- 店铺 -->
		<div class="navbar-shops" v-if="shopsId">
			<div class="navbar-shops__wrap">
				<div class="navbar-shops__list">
					<router-link class="navbar__list-link" v-for="item of list" :key="item.id" :to="formatUrl('/category/', `${item.name}-${item.topicId}`)">
						<div class="navbar-shops__item">
							<!-- <van-image class="navbar__pic" :src="item.picUrl" /> -->
							<van-image class="navbar__pic" lazy-load :src="$utils.imageHandler(2, item.picKey)" :alt="item.docTitle" />
							<p class="navbar__title">{{ item.name }}</p>
						</div>
					</router-link>
				</div>
			</div>
			<p class="navbar-shops__more" @click="goCategory">
				<span>{{ $t('home.viewMore') }}</span>
				<van-icon size="10" name="arrow"></van-icon>
			</p>
		</div>
		<!-- 平台 -->
		<van-swipe v-else @change="swipeChange">
			<van-swipe-item>
				<div class="navbar__list">
					<template v-for="(item, index) of list">
						<router-link v-if="index < 7" class="navbar__list-link" :key="item.id" :to="formatUrl('/category/', `${item.name}-${item.topicId}`)">
							<div class="navbar__item">
								<van-image class="navbar__pic" round lazy-load :src="$utils.imageHandler(2, item.picKey)" :alt="item.docTitle" />
								<p class="navbar__title">{{ item.name }}</p>
							</div>
						</router-link>
					</template>
					<div class="navbar__item navbar__list-link" @click="goCategory">
						<van-image class="navbar__pic" round lazy-load :src="require('@/assets/images/home-navbar-more.png')" />
						<p class="navbar__title">{{ $t('home.viewAll') }}</p>
					</div>
				</div>
			</van-swipe-item>
			<van-swipe-item v-if="list.length > 7">
				<div class="navbar__list">
					<template v-for="(item, index) of list">
						<router-link class="navbar__list-link" v-if="index >= 7 && index < 15" :key="item.id" :to="formatUrl(`/category/`, `${item.name}-${item.topicId}`)">
							<div class="navbar__item">
								<van-image class="navbar__pic" round lazy-load :src="$utils.imageHandler(2, item.picKey)" :alt="item.docTitle" />
								<p class="navbar__title">{{ item.name }}</p>
							</div>
						</router-link>
					</template>
				</div>
			</van-swipe-item>
			<template #indicator>
				<ul class="swipe-indicators" v-if="list.length > 7">
					<li :class="['swipe-indicator', { 'is-active': current == 0 }]"></li>
					<li v-if="list.length > 7" :class="['swipe-indicator', { 'is-active': current == 1 }]"></li>
				</ul>
			</template>
		</van-swipe>
	</div>
</template>
<script>
export default {
	props: {
		list: {
			type: Array,
		},
	},
	data() {
		return {
			current: 0, // 轮播图的当前下标
		}
	},
	components: {},
	computed: {},
	methods: {
		// 前往分类列表
		goCategory() {
			this.$router.push({
				path: '/category',
				query: {
					hideTabbar: 1,
					shopsId: this.shopsId || undefined,
				},
			})
		},
		// 轮播切换
		swipeChange(index) {
			this.current = index
		},
	},
}
</script>
<style scoped lang="less">
@import '@/style/variable.less';

.navbar {
	.navbar__list {
		padding: 60px 20px 30px;
		display: flex;
		flex-wrap: wrap;
		.navbar__list-link {
			display: block;
			width: 75px;
			margin-right: 7px;
			&:nth-child(4n) {
				margin-right: 0;
			}

			&:nth-child(-n + 4) {
				margin-bottom: 20px;
			}
		}
		.navbar__item {
			text-align: center;
			font-size: 0;
			.navbar__pic {
				width: 58px;
				height: 58px;
				border-radius: 50%;
				overflow: hidden;
				margin-bottom: 6px;
			}

			.navbar__title {
				font-size: 12px;
				color: @color-222;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
		}
	}
	.swipe-indicators {
		position: absolute;
		bottom: 15px;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: center;
		.swipe-indicator {
			width: 40px;
			height: 3px;
			background: #d9d9d9;
			&.is-active {
				background: @color-999;
			}
		}
	}

	// 店铺样式
	.navbar-shops {
		padding: 24px 0 20px 16px;
		text-align: center;
		.navbar-shops__more {
			margin-top: 10px;
			color: @color-666;
			font-size: 12px;
			display: flex;
			justify-content: center;
			align-items: center;
			> span {
				margin-right: 6px;
			}
		}
		.navbar-shops__wrap {
			height: 106px;
			position: relative;
			overflow-x: auto;
			-webkit-overflow-scrolling: touch;
			&::-webkit-scrollbar {
				display: none;
			}
		}
		.navbar-shops__list {
			position: absolute;
			left: 0;
			top: 0;
			display: flex;
			flex-wrap: nowrap;
			padding-right: 16px;
			.navbar-shops__item {
				display: inline-block;
				width: 96px;
				margin-right: 10px;
				text-align: center;
				font-size: 0;
				border-bottom-left-radius: 4px;
				border-bottom-right-radius: 4px;
				overflow: hidden;
				background: #fff;
				&:last-child {
					margin-right: 0;
				}
				.navbar__pic {
					width: 96px;
					height: 78px;
				}
				.navbar__title {
					font-size: 12px;
					line-height: 12px;
					color: @color-222;
					margin: 6px 0 10px;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
			}
		}
	}
}
</style>
