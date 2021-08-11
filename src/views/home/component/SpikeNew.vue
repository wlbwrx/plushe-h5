<template>
	<div class="spike-new">
		<div class="spike-new__box" v-if="list.length">
			<div class="spike-new__title">
				<span class="spike-new__name">{{ title }}</span>
				<div class="spkie-new___right" @click="goGoodsFilter">
					<template v-if="type == 2">
						<!-- type == 2 为秒杀时的特殊样式 -->
						<span class="right-label">{{ time > limitTime ? '24h+' : 'End in' }}</span>
						<van-count-down :time="time" v-if="time <= limitTime">
							<template #default="timeData">
								<div class="spike-new__times">
									<span class="spike-new__times-h spike-new__times-sign">{{ timeData.hours }}</span
									>: <span class="spike-new__times-m spike-new__times-sign">{{ timeData.minutes }}</span
									>:
									<span class="spike-new__times-s spike-new__times-sign">{{ timeData.seconds }}</span>
								</div>
							</template>
						</van-count-down>
					</template>
					<span v-else class="right-label">{{ type == 1 ? total + '+' : $t('home.viewMore') }}</span>
					<van-icon name="arrow" class="right-icon"></van-icon>
				</div>
			</div>
			<!-- 店铺时的样式 -->
			<ul class="shops-goods__list" v-if="shopsId">
				<li class="shops-goods__item" v-for="item of list" :key="item.productNo">
					<router-link :to="formatUrl(`/product/`, `${item.productName || item.name}-${item.productNo}`)">
						<template @click="goGoodsDetail(item)">
							<!-- <van-image class="shops-goods__pic" lazy-load fit="cover" :src="item.picUrl" /> -->
							<van-image class="shops-goods__pic" lazy-load fit="cover" :src="$utils.imageHandler(0, item.picKey)" />
							<p class="shops-goods__price">
								<span v-if="item.discountPrice && item.discountPrice < item.price">{{ filterPriceMethod(item.discountPrice) }}</span>
								<span :class="['old-price', { 'original-price': !item.discountPrice || item.discountPrice >= item.price }]">{{ filterPriceMethod(item.price) }}</span>
							</p>
							<!-- 楼层时，要给出新品标记 -->
							<p v-if="type == 3 && item.tags && item.tags.length" class="goods-labels">
								<template v-for="tag of item.tags">
									<span class="goods-sign" v-if="tag == 'new_in'" :key="tag">{{ $t('new') }}</span>
								</template>
							</p>
						</template>
					</router-link>
				</li>
			</ul>
			<!-- 平台时的样式 -->
			<div class="platform-goods-box" v-else>
				<ul class="spike-new__list">
					<li class="spike-new__item" v-for="item of list" :key="item.productNo">
						<router-link :to="formatUrl(`/product/`, `${item.productName || item.name}-${item.productNo}`)">
							<template @click="goGoodsDetail(item)">
								<!-- <van-image class="spike-new__pic" lazy-load fit="cover" :src="item.picUrl" /> -->
								<van-image class="spike-new__pic" lazy-load fit="cover" :src="$utils.imageHandler(0, item.picKey)" />
								<p class="spike-new__name text-hidden-row-2">{{ item.productName }}</p>
								<p class="spike-new__price" v-if="item.discountPrice && item.discountPrice < item.price">{{ filterPriceMethod(item.discountPrice) }}</p>
								<p :class="['spike-new__price-old', { 'original-price': !item.discountPrice || item.discountPrice >= item.price }]">{{ filterPriceMethod(item.price) }}</p>
							</template>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	components: {},
	props: {
		// 标题
		title: {
			type: String,
		},
		list: {
			type: Array,
		},
		total: {
			type: Number,
		},
		// 秒杀时间
		time: {
			type: Number,
		},
		//2-秒杀，1-新品
		type: {
			type: Number,
			default: 2,
		},
		// 楼层唯一Id
		id: {
			type: Number,
		},
	},
	data() {
		return {
			limitTime: 24 * 60 * 60 * 1000,
		}
	},
	methods: {
		// 上报数据
		reportData(obj) {
			// 促销活动：
			this.reportGtag('view_promotion', {
				id: obj.id || undefined,
				name: obj.title,
			})
		},
		// 前往商品详情：
		goGoodsDetail(item) {
			this.$store.commit('ssr/setGoodsDetail', { picKey: item.picKey })
		},
		// 前往商品筛选页
		goGoodsFilter() {
			// 促销活动：
			if (typeof this.reportData == 'function') {
				this.reportData({
					id: this.id,
					name: this.title,
				})
			}

			this.$router.push({
				path: `/category/${this.title}-${this.topicId}`,
				query: {
					categoryId: this.id || undefined,
					title: this.title,
					fromType: this.type, // 1-新品，2-秒杀
				},
			})
		},
	},
}
</script>
<style scoped lang="less">
@import '@/style/variable.less';

.spike-new {
	background: @color-FFF;
	position: relative;
	margin-bottom: 10px;

	.spike-new__box {
		padding: 24px 0 24px;
	}

	.spike-new__title {
		padding: 0 16px;
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;
		color: @color-222;

		.spike-new__name {
			font-weight: 600;
			line-height: 21px;
			font-size: 18px;
		}
		.spkie-new___right {
			display: flex;
			align-items: center;
			font-size: 12px;
			.right-label {
				color: @color-666;
			}
			.right-icon {
				font-size: 12px;
				color: color-666;
			}
		}

		.spike-new__times {
			font-size: 12px;
			display: flex;
			line-height: 17px;
			margin-left: 6px;

			.spike-new__times-sign {
				height: 16px;
				width: 18px;
				background: #000;
				color: @color-FFF;
				text-align: center;
			}
		}

		.spike-new__sale-num {
			color: @color-666;
			font-size: 12px;
			// transform: scale(0.84);
		}
	}

	// 平台样式:
	.platform-goods-box {
		padding: 0 16px;
		overflow-x: auto;
		&::-webkit-scrollbar {
			display: none;
		}
	}
	.spike-new__list {
		display: inline-flex;
		.spike-new__item {
			margin-right: 8px;
			min-width: 136px;
			&:last-child {
				margin-right: 0;
			}
			.spike-new__pic {
				width: 136px;
				height: 204px;
				margin-bottom: 8px;
			}
			.spike-new__name {
				font-size: 14px;
				color: @color-222;
				line-height: 17px;
				height: 34px;
				margin-bottom: 6px;
			}
			.spike-new__price {
				font-size: 12px;
				line-height: 14px;
				font-weight: 600;
				color: @color-promo;
				overflow: hidden;
			}

			.spike-new__price-old {
				overflow: hidden;
				line-height: 12px;
				font-size: 12px;
				color: @color-999;
				text-decoration: line-through;
				margin-top: 3px;
				font-weight: normal;
				&.original-price {
					color: @color-222;
					text-decoration: none;
					font-weight: 600;
				}
			}
		}
	}

	// 店铺样式:
	.shops-goods__list {
		padding: 0 16px;
		display: flex;
		flex-wrap: wrap;
		.shops-goods__item {
			margin-right: 15px;
			margin-bottom: 20px;
			font-size: 0;
			width: 164px;
			position: relative;
			display: block;
			color: inherit;
			&:nth-child(even) {
				margin-right: 0;
			}
			.shops-goods__pic {
				width: 164px;
				height: 246px;
			}
			.shops-goods__price {
				color: @color-promo;
				font-size: 13px;
				margin-top: 10px;
				overflow: hidden;
				font-weight: 600;
				.old-price {
					color: @color-999;
					font-size: 12px;
					margin-left: 4px;
					text-decoration: line-through;
					font-weight: normal;
					&.original-price {
						color: @color-222;
						margin-left: 0;
						font-weight: 600;
					}
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
				}
			}
		}
	}
}
</style>
