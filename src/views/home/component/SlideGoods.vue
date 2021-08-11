<template>
	<div class="slide-goods">
		<h3 class="home__title" v-if="title">{{ title }}</h3>
		<div v-swiper="options">
			<div class="swiper-wrapper">
				<div class="swiper-slide slide-goods-slide" v-for="(item, index) of list" :key="item.productNo + index">
					<router-link :to="formatUrl(`/product/`, `${item.productName || item.name}-${item.productNo}`)" class="slide-goods__item" @click.native="goGoodsDetail(item)">
						<van-image class="slide-goods__pic" fit="cover" lazy-load :src="$utils.imageHandler(0, item.picKey)" :alt="item.docTitle">
							<template v-slot:loading>
								<img width="100%" height="100%" :src="$utils.platList('goodsDefaultImg', platformId)" alt="" />
							</template>
						</van-image>
						<p class="slide-goods__name text-hidden-row-2">{{ item.productName || item.name }}</p>
						<p class="slide-goods__price">
							<template v-if="item.discountPrice && item.discountPrice < item.price">
								<span class="slide-goods__price-sale taxes_text"> {{ filterPriceMethod(item.discountPrice) }}</span>
								<span class="slide-goods__price-old"> {{ filterPriceMethod(item.price) }}</span>
							</template>
							<span v-else class="original-price taxes_text"> {{ filterPriceMethod(item.price) }}</span>
						</p>
						<p class="goods-labels" v-if="(item.tags || item.tagsMap).length">
							<template v-if="(item.tags || item.tagsMap).indexOf('flash_sale') > -1">
								<span v-if="item.discountRate" class="goods-sign goods-sign-sale">-{{ Math.floor(item.discountRate * 100) }}%</span>
							</template>
							<span class="goods-sign" v-else>{{ $t('new') }}</span>
						</p>
						<!-- <div class="like__icon" @click.stop="switchLike(item, index)">
							<i class="icon icon-like" v-if="item.isWish"></i>
							<i class="icon icon-like2" v-else></i>
						</div> -->
					</router-link>
				</div>
			</div>
		</div>
		<!-- <a class="slide-goods__more" @click="goGoodsFilter">{{$t('home.viewMore')}}</a> -->
	</div>
</template>
<script>
export default {
	props: {
		// 标题
		title: {
			type: String,
		},
		// 商品列表
		list: {
			type: Array,
		},
		// 将要对应的接口:
		fromType: {
			type: Number,
			default: 3, // 楼层
		},
		// 分类id
		id: {
			type: Number,
		},
		// 全部信息
		item: {
			type: Object,
		},
	},
	data() {
		return {
			options: {
				slidesPerView: 'auto', // 显示个数
				freeMode: true,
			},
		}
	},
	components: {},
	methods: {
		// 前往商品详情：
		goGoodsDetail(item) {
			console.log('点击了商品--前往详情')
			this.$store.commit('ssr/setGoodsDetail', item)
		},
	},
}
</script>
<style scoped lang="less">
@import '@/style/variable.less';

.slide-goods {
	.slide-goods-slide {
		width: 160px;
		margin-right: 4px;
		&:first-child {
			margin-left: 16px;
		}
		&:last-child {
			margin-right: 16px;
		}
	}
	.slide-goods__item {
		width: 160px;
		overflow: hidden;
		position: relative;
		font-size: 0;
		display: block;
		color: inherit;
		.slide-goods__pic {
			width: 160px;
			height: 240px;
			margin-bottom: 12px;
		}

		.slide-goods__name {
			font-size: 12px;
			height: 34px;
			line-height: 17px;
			margin-bottom: 8px;
		}

		.slide-goods__price {
			height: 32px;
			font-weight: normal;
			font-size: 14px;
			.slide-goods__price-sale {
				color: @color-promo;
				display: block;
			}

			.slide-goods__price-old {
				color: @color-999;
				text-decoration: line-through;
				font-weight: 300;
			}
			.original-price {
				color: @color-222;
				text-decoration: none;
			}
		}

		.goods-labels {
			position: absolute;
			left: 0;
			top: 0;
			.goods-sign {
				display: block;
				height: 18px;
				line-height: 18px;
				background: #87c6a1;
				color: #fff;
				font-size: 12px;
				padding: 0 6px;
				margin-bottom: 6px;
				&.goods-sign-sale {
					background: #ffb84e;
					color: #222;
				}
			}
		}
		.like__icon {
			position: absolute;
			bottom: 4px;
			right: 4px;
			font-size: 0;
			.icon {
				font-size: 20px;
			}
		}
	}
	.slide-goods__more {
		display: block;
		width: 129px;
		margin: 20px auto 0;
		height: 26px;
		border: 1px solid @color-222;
		line-height: 24px;
		text-align: center;
		color: @color-222;
		font-size: 12px;
	}
}
</style>
