<template>
	<!-- 通用商品列表 -->
	<div class="goods-list">
		<h3 class="goods-list__title" v-if="title">{{ title }}</h3>
		<slot name="title"></slot>
		<div class="goods-list__wrapper">
			<div class="goods-list__list">
				<router-link v-for="(item, index) of showList" :key="item.productNo + index" :to="formatUrl(`/product/`, `${item.productName || item.name}-${item.productNo}`)" class="goods-list__goods">
					<div class="goods-list__detail" @click="goGoodsDetail(item)">
						<van-image class="goods-list__goods-pic" fit="cover" lazy-load :src="$utils.imageHandler(0, item.picKey)" :alt="item.productName || item.name">
							<template v-slot:loading>
								<img width="100%" height="100%" :src="$utils.platList('goodsDefaultImg', platformId)" alt="" />
							</template>
						</van-image>
						<!-- <p class="goods-list__brand-name" v-if="item.brandName">{{ item.brandName }}</p> -->
						<div class="goods-list__content">
							<p class="goods-list__goods-name text-hidden-row-2">{{ item.productName || item.name }}</p>
							<div class="goods-list__other">
								<div class="goods-list__goods-price">
									<template v-if="item.discountPrice && item.discountPrice < item.price">
										<span class="sale-price taxes_text"> {{ filterPriceMethod(item.discountPrice) }}</span>
										<span class="old-price"> {{ filterPriceMethod(item.price) }}</span>
									</template>
									<span v-else class="original-pirce taxes_text"> {{ filterPriceMethod(item.price) }}</span>
									<!-- 8月3号隐藏列表页加购 -->
									<!-- <img v-if="showCartIcon" class="cart__icon" src="@/assets/images/icons/bag.png" alt="" @click.prevent.stop="clickAddCartIcon(item)" /> -->
								</div>
								<div class="goods-list__goods-rate" v-if="showColors">
									<template v-if="item.evaluateNums">
										<rate :size="12" :value="item.evaluateStartPercentage || 0"></rate>
										<span class="rate-review-num">({{ item.evaluateNums || 0 }})</span>
									</template>
									<span v-else-if="item.evaluateNums !== undefined" class="no-review">
										<span>{{ $t('detail.noReviews') }}</span>
									</span>
								</div>
							</div>
						</div>
						<p class="goods-labels" v-if="(item.tags || item.tagsMap || []).length">
							<template v-if="(item.tags || item.tagsMap).indexOf('flash_sale') > -1">
								<span v-if="item.discountRate" class="goods-sign goods-sign-sale">-{{ Math.floor(item.discountRate * 100) }}%</span>
							</template>
							<span class="goods-sign" v-else>{{ $t('new') }}</span>
						</p>
						<div v-if="showLikeIcon" class="like__icon" @click.prevent.stop="switchLike(item)">
							<i class="icon icon-shoucang2" v-if="!!item.isWish"></i>
							<i class="icon icon-shoucang" v-else></i>
						</div>

						<!-- <van-tabs class="goods-list__tabs" v-if="showColors && item.isShowAttrValPic && item.attrValList && item.attrValList.length" @click="attrClick($event, item.productNo)" :line-width="0">
						<van-tab v-for="obj in item.attrValList" :key="obj.val" :name="obj.val">
							<template #title>
								<div :class="['goods-list__goods-color', { selected: obj.isDefault }]">
									<van-image class="val-pic" round :src="$utils.imageHandler(0, obj.valKey)" fit="cover"></van-image>
								</div>
							</template>
						</van-tab>
					</van-tabs> -->
					</div>
				</router-link>
			</div>
			<div class="goods-list__mask" v-if="showMore && !isEnd">
				<div class="goods-list__more" @click="toMore">
					<span>{{ $t('home.viewMore') }}</span>
					<i class="icon icon-xiala"></i>
				</div>
			</div>
		</div>

		<!-- 加购弹框 -->
		<popup-add-bag :show.sync="showAddBagPopup" :goodsInfo="goodsInfo" @addSuccess="addSuccess"></popup-add-bag>
		<!-- 加购成功弹框 -->
		<add-bag-success :show.sync="cartPopup" :goodsInfo="goodsInfo"></add-bag-success>
	</div>
</template>
<script>
import { Toast } from 'vant'
import Rate from '@/components/rate/index.vue'
import { mapState, mapActions } from 'vuex'
import PopupAddBag from '@/components/PopupAddBag.vue'
import AddBagSuccess from '@/components/AddBagSuccess'

import http from '@/api/index'

export default {
	props: {
		title: {
			type: String,
		},
		showColors: {
			type: Boolean,
			default: false,
		},
		list: {
			type: Array,
		},
		// 是否显示更多按钮：
		showMore: {
			type: Boolean,
			default: false,
		},
		// 是否结束：
		isEnd: {
			type: Boolean,
			default: false,
		},
		// 是否显示加购图标
		showCartIcon: {
			type: Boolean,
			default: false,
		},
		// 是否显示收藏图标:
		showLikeIcon: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			goodsInfo: {}, // 商品信息
			showAddBagPopup: false, // 是否显示加购弹框
			cartPopup: false,
		}
	},
	components: {
		Rate,
		PopupAddBag,
		AddBagSuccess,
	},
	computed: {
		...mapState('wish', ['wishList']),
		showList() {
			const wishIdList = this.wishList.map((item) => item.productNo)
			return this.list.map((item) => ({
				...item,
				isWish: wishIdList.includes(item.productNo),
			}))
		},
	},
	methods: {
		...mapActions('wish', ['deleteWishList', 'addWishList']),
		// 前往商品详情
		goGoodsDetail(item) {
			console.log('点击了商品--前往详情')
			this.$store.commit('ssr/setGoodsDetail', item)
		},
		// 点击属性
		attrClick(name, id) {
			let index = this.list.findIndex((item) => item.productNo == id)
			this.list[index].attrValList.forEach((item) => {
				item.isDefault = false
				if (name == item.val) {
					item.isDefault = true
					this.list[index].picKey = item.picList[0] // 取第一张
				}
			})
		},
		// 加载更多
		toMore() {
			this.$emit('showMore')
		},
		// 收藏 / 取消收藏
		switchLike(item) {
			if (item.isWish) {
				this.deleteWishList(item)
			} else {
				this.addWishList(item)
			}
		},
		// 点击加购icon
		clickAddCartIcon(item) {
			const params = {
				productNo: item.productNo,
			}
			http.goodsDetailApi
				.detail(params)
				.then((res) => {
					let data = res.data
					let attrValObj = {} // 选中的属性值, 为了得到skuNo
					data.list.forEach((item, i) => {
						data['attr' + (i + 1)] = item.attrName
						attrValObj['attrVal' + (i + 1)] = ''
						item.attrValList.forEach((obj) => {
							if (obj.isDefault) {
								attrValObj['attrVal' + (i + 1)] = obj.val
								// 取默认轮播图
								if (item.isValHavePics) {
									data.swipeList = obj.picList
								}
							}
							// 然后 绑定轮播图的属性 默认选中,其它默认不选中:
							if (!item.isValHavePics) {
								obj.isDefault = false
							}
						})
					})
					this.$utils.calculationInventory(data) // 对数据进行处理
					let info = {}
					data.skus.forEach((item) => {
						let bool = this.dealObj(attrValObj, item)
						if (bool) info = item
					})
					data.attrObj = attrValObj
					data.skuNo = info.skuNo
					console.log('-----', data)
					this.goodsInfo = data
					this.showAddBagPopup = true
				})
				.catch((err) => {
					// 商品被下架:
					Toast(this.$t('cart.soldOutText'))
				})
		},
		// 加购成功后:
		addSuccess() {
			this.cartPopup = true
		},
		// 判断属性值是否都相等:
		dealObj(o, o2) {
			for (let key in o) {
				if (o2[key] != o[key]) {
					return false
				}
			}
			return true
		},
	},
}
</script>
<style scoped lang="less">
@import '@/style/variable.less';

.goods-list {
	padding: 20px 10px;
	background: @color-bg;

	.goods-list__title {
		font-size: 18px;
		color: @color-222;
		line-height: 24px;
		margin-bottom: 13px;
		font-weight: 600;
	}

	.goods-list__wrapper {
		.goods-list__list {
			display: flex;
			flex-wrap: wrap;

			.goods-list__goods {
				width: 172px;
				margin-right: 10px;
				margin-bottom: 30px;
				color: @color-222;
				position: relative;

				&:nth-child(even) {
					margin-right: 0;
				}

				.goods-list__goods-pic {
					width: 172px;
					height: 258px;
					margin-bottom: 10px;
				}
				.goods-list__goods-pic-default {
					width: 172px;
					height: 258px;
				}

				.goods-list__brand-name {
					font-size: 12px;
					color: @color-666;
					margin-bottom: 5px;
				}

				.goods-list__goods-name {
					color: @color-666;
					font-size: 12px;
					line-height: 20px;
					max-height: 40px;
					min-height: 20px;
					margin-bottom: 6px;
				}

				.goods-list__goods-price {
					font-size: 14px;
					position: relative;
					font-weight: normal;
					.sale-price {
						color: @color-promo;
						// margin-right: 4px;
					}
					.old-price {
						margin-left: 4px;
						text-decoration: line-through;
						color: @color-999;
						display: inline-block;
						font-weight: 300;
					}
					.original-pirce {
						color: @color-222;
						text-decoration: none;
					}
				}

				.goods-list__goods-color {
					width: 20px;
					height: 20px;
					border-radius: 50%;
					font-size: 0;
					display: flex;
					align-items: center;
					justify-content: center;

					&.selected {
						border: 1px solid @color-222;
					}
					.val-pic {
						width: 14px;
						height: 14px;
						object-fit: cover;
						border-radius: 50%;
						overflow: hidden;
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
				.goods-list__goods-rate {
					margin-top: 5px;
					font-size: 12px;
					color: @color-666;
					display: flex;
					align-items: center;
					.rate-review-num {
						margin-left: 4px;
					}
					.no-review {
						height: 14px;
						color: #ccc;
					}
				}
				.like__icon {
					position: absolute;
					right: 9px;
					top: 9px;
					font-size: 0;
					background: #fff;
					border-radius: 50%;
					padding: 3px;
					height: 26px;
					width: 26px;
					.icon {
						font-size: 20px;
					}
					.icon-like {
						color: @color-222;
					}
				}
				.cart__icon {
					position: absolute;
					top: 0;
					right: 2px;
					width: 18px;
				}
			}
		}
	}

	.goods-list__detail {
		height: 100%;
		display: flex;
		flex-direction: column;
		color: inherit;

		.goods-list__content {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
	}

	.goods-list__mask {
		position: relative;
		z-index: 1;
		margin-top: 20px;
		display: flex;
		justify-content: center;
		background: @color-bg;
		.goods-list__more {
			width: 120px;
			height: 32px;
			display: flex;
			justify-content: center;
			align-items: center;
			border: 1px solid @color-222;
			font-size: 14px;
			.icon {
				margin-left: 6px;
			}
		}
	}

	.goods-list__tabs {
		/deep/ .van-tab {
			flex: none;
		}
	}
}
</style>
