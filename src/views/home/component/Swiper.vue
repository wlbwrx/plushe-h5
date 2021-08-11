<template>
	<div class="banner-wrap">
		<h3 class="home__title" v-if="title">{{ title }}</h3>
		<h4 class="home__subtitle" v-if="subtitle">{{ subtitle }}</h4>
		<div v-swiper="options" :class="[options.customClass]">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="item in list" :key="item.id">
					<a class="swiper-link" href="javascript: void(0)" @click.stop="clickBanner(item)">
						<img class="swiper-img" v-lazy="$utils.imageHandler(3, item.picKey)" :alt="item.docTitle" />
					</a>
				</div>
			</div>
			<div v-if="options.scrollbar" class="swiper-scrollbar"></div>
		</div>
		<div v-if="!options.scrollbar" :class="['swiper-pagination', options.customPaginationClass]">
			<h3 class="slide-title text-hidden-row-1" v-if="list[options.activeIndex]">{{ list[options.activeIndex].docTitle || list[options.activeIndex].name }}</h3>
			<p class="slide-text text-hidden-row-2" v-if="options.customPaginationClass">
				{{ list[options.activeIndex].docContent }}
			</p>
			<ul class="slide-dots">
				<li :class="['slide-dots-item', { 'is-active': options.activeIndex == index }]" v-for="(item, index) of list" :key="item.id"></li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		// 轮播图名称---决定轮播图的配置(样式)
		name: {
			type: String,
		},
		// 标题
		title: {
			type: String,
		},
		// 小标题
		subtitle: {
			type: String,
		},
		// 图片数据:
		list: {
			type: Array,
		},
		// 点击轮播图到 商品列表页的标识
		fromType: {
			type: Number,
		},
		options: {
			type: Object,
		},
	},
	data() {
		return {
			// options: {}, // 轮播图配置
		}
	},
	methods: {
		// 轮播图点击:
		clickBanner(item) {
			// relType 1-链接, 2-专题
			if (item.relType == 1 && item.internalUrl) {
				this.formatLinkToJump(item.internalUrl)
			} else if (item.relType == 2) {
				this.$router.push({
					path: this.formatUrl(`/category/`, `${item.name}-${item.topicId}`),
				})
			}
		},
	},
}
</script>
<style scoped lang="less">
.banner-wrap {
	position: relative;
	text-align: center;
	.swiper-link {
		display: block;
	}
	.swiper-pagination {
		position: absolute;
		left: 50%;
		bottom: 0;
		transform: translateX(-50%);
		text-align: center;
		color: #222;
		.slide-title {
			color: #000;
			font-size: 13px;
			font-weight: 600;
			line-height: 16px;
			max-width: 328px;
			margin: 0 auto;
		}
		.slide-dots {
			margin-top: 10px;
			display: flex;
			justify-content: center;
			.slide-dots-item {
				width: 10px;
				height: 2px;
				background: rgba(34, 34, 34, 0.1);
				margin-right: 8px;
				border-radius: 3px;
				&.is-active {
					background: #222;
				}
				&:last-child {
					margin-right: 0;
				}
			}
		}
	}
	/* 首页 banner swiper */
	.home-banner {
		height: 375px;
		.swiper-img {
			width: 100%;
			height: 375px;
			object-fit: cover !important;
		}
	}
	.home__title {
		text-align: center;
		font-size: 18px;
		color: #222;
		margin-bottom: 15px;
		font-weight: 500;
	}
	.home__subtitle {
		font-size: 14px;
		color: #222;
		margin-top: -10px;
		margin-bottom: 15px;
		text-align: center;
		font-weight: normal;
	}
	.home-pagination {
		bottom: -30px;
		width: 290px;
		background: #fff;
		box-shadow: 0 15px 20px 0 rgba(34, 34, 34, 0.05);
		padding: 10px;
		.slide-title {
			font-size: 17px;
			height: 20px;
			font-weight: 600;
			line-height: 20px;
			margin-bottom: 2px;
		}
		.slide-text {
			min-height: 14px;
			line-height: 14px;
			font-size: 12px;
		}
		.slide-dots {
			margin-top: 12px;
		}
	}

	// new swiper
	.new-swiper {
		padding-bottom: 46px;
		.swiper-slide {
			width: 328px;
		}
		.swiper-img {
			width: 328px;
			height: 328px;
		}
	}

	// summer swiper
	.summer-swiper {
		padding-bottom: 46px;
		.swiper-slide {
			width: 332px;
		}
		.swiper-img {
			width: 332px;
			height: 332px;
			object-fit: cover !important;
		}
	}

	// find-swiper
	.find-swiper {
		padding-bottom: 23px;
		.swiper-scrollbar {
			height: 3px;
			/deep/ .swiper-scrollbar-drag {
				background: #222;
			}
		}
		.swiper-slide {
			width: 343px;
		}
		.swiper-img {
			width: 343px;
			height: 343px;
			object-fit: cover !important;
		}
	}
}
</style>
