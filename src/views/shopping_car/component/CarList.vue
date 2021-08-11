<template>
	<div class="car-list">
		<h3 class="cart-title">{{ $t('cart.item') }}</h3>
		<div>
			<div class="car-list__item" v-for="item of list" :key="item.skuNo">
				<van-swipe-cell>
					<template #right>
						<van-button class="car-list__delete" @click="switchDelete(item.skuNo)">{{ $t('delete') }}</van-button>
					</template>
					<div class="car-list__content">
						<div class="car-list__wrap">
							<van-checkbox :value="item.check" :disabled="expired" shape="square" checked-color="#E81027" @click="clickSelectSingle(item)"></van-checkbox>
							<div :class="['goods-cont', { 'goods-cont__expired': expired }]">
								<div class="goods-pics">
									<van-image :src="$utils.imageHandler(0, item.defaultPicKey || item.picKey)" class="goods-pic" @click="goGoodsDetail(item)" :alt="item.productName || item.name">
										<template v-slot:loading>
											<img width="100%" height="100%" :src="$utils.platList('goodsDefaultImg', platformId)" alt="" />
										</template>
									</van-image>
									<van-image v-if="expired" class="goods-pic-soldout" :src="$utils.platList('soldout', platformId)"></van-image>
								</div>
								<div class="goods-info">
									<!-- <div class="brand-name" v-if="item.brandName">{{ item.brandName }}</div> -->
									<p :class="['goods_price ', { 'have-discount': item.discountPrice && item.discountPrice < item.price }]">
										<span class="taxes_text">{{ filterPriceMethod(item.discountPrice || item.price) }}</span>
										<span class="goods_old-price" v-if="item.discountPrice && item.discountPrice < item.price"> {{ filterPriceMethod(item.price) }}</span>
									</p>
									<p class="goods-desc">{{ item.productName || item.name }}</p>
									<div class="goods-attr" @click="clickSize(item)" v-if="item.itemStatus == 10 || item.itemStatus == 35">
										<span>{{ item.attrObj | attrVals }}</span>
										<van-icon class-prefix="icon" size="16" name="xiala"></van-icon>
									</div>
									<div class="goods-other">
										<div class="g-stepper" v-if="!expired">
											<span v-if="item.num > 1" class="g-stepper-btn g-stepper-cut" @click="cutNum(item)"></span>
											<span v-else class="icon icon-shanchu" @click="cutNum(item)"></span>
											<span class="g-stepper-val">{{ item.num }}</span>
											<span class="g-stepper-btn g-stepper-add" @click="addNum(item)"></span>
										</div>
										<van-icon v-if="expired && item.itemStatus != 35" class-prefix="icon" name="shanchu" @click="switchDelete(item.skuNo)" />
										<p></p>
									</div>
									<div class="goods-other-tips" v-if="item.itemStatus == 35">
										{{ $t('cart.soldOut') }} <br />
										{{ $t('cart.selectAnotherSpecification') }} <span @click="clickSize(item)">{{ $t('cart.reselect') }}</span>
									</div>
								</div>
							</div>
						</div>
						<!-- <p class="car-list__tips" v-if="!expired && index == 0">
						<van-icon class-prefix="icon" name="tishi"></van-icon>
						Final sales can’t be returned.
					</p> -->
					</div>
				</van-swipe-cell>
			</div>
		</div>
		<popup-add-bag :show.sync="showAddBagPopup" :goodsInfo="goodsInfo" :skuNo="skuNo"></popup-add-bag>
	</div>
</template>
<script>
import { Toast } from 'vant'
import PopupAddBag from '@/components/PopupAddBag.vue'
import { mapMutations, mapActions } from 'vuex'
import http from '@/api/index'

export default {
	inject: ['reload'],
	props: {
		// 是否过期：
		expired: {
			type: Boolean,
			default: false,
		},
		list: {
			type: Array,
		},
	},
	data() {
		return {
			showAddBagPopup: false,
			goodsInfo: {},
			skuNo: '', // 点击尺寸时，对应商品的skuNo
			isLoading: false, // 接口是否还在请求中
			timer: null,
		}
	},
	components: {
		PopupAddBag,
	},
	created() {},
	mounted() {},
	filters: {
		// 属性值集合
		attrVals(obj) {
			let vals = ''
			for (let key in obj) {
				vals += obj[key] + '/'
			}
			return vals.substring(0, vals.length - 1)
		},
	},
	methods: {
		...mapMutations({
			switchDelete: 'shopCar/switchDelete', // 显示删除框
		}),
		...mapActions('shopCar', {
			selectSingle: 'selectSingle', // 单选
			changeNum: 'changeNum', // 数量更改
		}),
		// 点击单选
		clickSelectSingle(item) {
			if (this.expired) return
			this.selectSingle(item)
		},
		// 增加数量
		addNum(item) {
			if (this.timer) clearTimeout(this.timer)
			this.timer = setTimeout(() => {
				if (item.num >= 99) {
					Toast(this.$t('cart.only'))
					return
				}
				this.changeNum({
					type: 1,
					goods: item,
				})
			}, 300)
		},
		// 减少数量
		cutNum(item) {
			if (this.timer) clearTimeout(this.timer)
			// eslint-disable-next-line
			this.timer = setTimeout((_) => {
				if (item.num <= 1) {
					this.switchDelete(item.skuNo)
					// Toast('The quantity cannot be reduced anymore')
					return
				}
				this.changeNum({
					type: 0,
					goods: item,
				}).catch((err) => {
					this.isLoading = false
					// 商品在新增时出问题了
					Toast.fail({
						duration: 3000,
						message: err.msg,
					})
					setTimeout(() => {
						this.reload()
					}, 3000)
				})
			}, 300)
		},
		// 点击图片，前往商品详情：
		goGoodsDetail(item) {
			if (this.expired) return
			this.$store.commit('ssr/setGoodsDetail', item)
			this.$router.push({
				path: `/product/${item.productName || item.name}-${item.productNo}`,
			})
		},
		// 找相似的：
		goSimilar(item) {
			console.log(item)
		},
		// 点击尺寸：
		clickSize(goods) {
			console.log('购物车商品信息', goods)
			const params = {
				productNo: goods.productNo,
			}
			this.skuNo = goods.skuNo
			http.goodsDetailApi.detail(params).then((res) => {
				console.log(goods.attrObj, '-----')
				res.data.list.forEach((item) => {
					// 根据购车当前商品属性，回显
					item.attrVal = ''
					item.attrValList.forEach((obj) => {
						obj.isDefault = false
						// if (goods.attrObj['attrVal' + (i + 1)] == obj.val) {
						console.log(goods.attrObj[item.attrName], obj.val, '全部相等?')
						if (goods.attrObj[item.attrName] == obj.val) {
							// 同步购车选中属性
							obj.isDefault = true
							item.attrVal = obj.val
						}
						// 同步属性完成后-取轮播图
						if (item.isValHavePics && obj.isDefault) {
							res.data.swipeList = obj.picList
						}
					})
				})
				this.calculationInventory(res.data) // 对属性进行 禁用项处理.
				res.data.attrObj = goods.attrObj // 当前选中的 属性-属性值
				res.data.skuNo = goods.skuNo
				res.data.price = goods.price
				res.data.discountPrice = goods.discountPrice
				this.goodsInfo = res.data
				console.log(this.goodsInfo, '---')
				this.goodsInfo.num = goods.num //现有的购物车数量
				this.showAddBagPopup = true
			})
		},
		// 根据属性计算sku库存
		calculationInventory(obj) {
			if (!obj.skus) return
			const { list, skus } = obj
			const active = []
			const skuObj = {}
			skus.forEach((item) => {
				const attrVal1 = item.attrVal1 || '',
					attrVal2 = item.attrVal2 || '',
					attrVal3 = item.attrVal3 || '',
					attrVal4 = item.attrVal4 || ''
				const key = `${attrVal1},${attrVal2},${attrVal3},${attrVal4}`.replace(/(,+$)/gm, '')
				skuObj[key] = { ...item }
			})
			list.forEach((item, index) => {
				active[index] = '.+'
				item.attrValList.forEach((element) => {
					if (element.isDefault) {
						active[index] = element.val
					}
				})
			})
			list.forEach((item, index) => {
				item.attrValList.forEach((element) => {
					const currentObj = active.map((item, i) => (index == i ? element.val : item)).join(',')
					if (currentObj.includes('.+')) {
						element.disabled = false
						return
					}
					element.disabled = !skuObj[currentObj]
					if (element.disabled) {
						element.isDefault = false
					}
				})
			})
		},
	},
}
</script>
<style scoped lang="less">
@import '@/style/variable.less';

.car-list {
	background: @color-FFF;
	margin-bottom: 10px;
	padding: 20px 14px 30px;
	border-radius: 6px;
	overflow: hidden;
	.cart-title {
		font-size: 14px;
		color: @color-222;
		margin-bottom: 20px;
	}
	.car-list__item {
		margin-bottom: 20px;
		/deep/ .van-swipe-cell__right {
			right: -1px;
		}
		&:last-child {
			margin-bottom: 0;
		}
		.car-list__delete {
			height: 100%;
			width: 70px;
			border-radius: 0;
			background: @color-red;
			color: @color-FFF;
			font-size: 14px;
			border: none;
		}
		.car-list__content {
			.car-list__wrap {
				display: flex;
				align-items: stretch;
				position: relative;
				.van-checkbox {
					width: 20px;
					// height: 20px;
					margin-right: 10px;
					flex: none;
					/deep/ .van-icon {
						font-size: 16px;
					}
				}
				.goods-cont {
					flex: 1;
					display: flex;

					&.goods-cont__expired {
						.goods-pics {
							position: relative;
							.goods-pic-soldout {
								position: absolute;
								left: 50%;
								top: 50%;
								transform: translate(-50%, -50%);
								width: 72px;
								height: auto;
							}
						}
						.goods-pic {
							position: relative;
							&::after {
								position: absolute;
								content: '';
								left: 0;
								top: 0;
								height: 100%;
								width: 100%;
								background: rgba(0, 0, 0, 0.3);
							}
						}
						.goods-info {
							.brand-name {
								color: #ccc;
							}
							.goods-desc {
								color: #ccc;
							}
							.goods_price {
								color: #ccc;
								&.have-discount {
									color: #ccc;
								}
								.goods_old-price {
									color: #ccc;
								}
							}
							.goods-other-tips {
								width: 100%;
								position: absolute;
								bottom: 0;
								left: 0;
								font-size: 12px;
								line-height: 12px;
								color: #666;
								> span {
									color: #2d9cdb;
									// float: right;
								}
							}
						}
					}
					.goods-pics {
						margin-right: 12px;
						font-size: 0;
					}
					.goods-pic {
						width: 96px;
						height: 144px;
						flex: none;
					}
					.goods-info {
						flex: 1;
						position: relative;
						font-size: 14px;
						width: 0;
						.brand-name {
							height: 12px;
							margin-bottom: 6px;
							font-size: 12px;
						}
						.goods-desc {
							color: @color-666;
							margin: 10px 0;
							height: 14px;
							font-size: 12px;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
						.goods_price {
							font-size: 14px;
							color: @color-222;
							font-weight: normal;
							&.have-discount {
								color: @color-promo;
							}
							.goods_old-price {
								color: @color-999;
								font-size: 12px;
								margin-left: 4px;
								text-decoration: line-through;
								font-weight: 300;
							}
						}
						.goods-attr {
							height: 24px;
							line-height: 24px;
							padding: 0 10px;
							display: inline-block;
							background: #f6f6f6;
							font-size: 12px;
							color: @color-666;
							span {
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
							.icon {
								margin-left: 6px;
							}
						}
						.goods-other {
							position: absolute;
							bottom: 0;
							right: 0;
							.g-stepper {
								display: flex;
								line-height: 24px;
								border-radius: 30px;
								text-align: center;
								color: @color-222;
								.g-stepper-btn {
									width: 26px;
									position: relative;
									&::before {
										content: '';
										position: absolute;
										left: 50%;
										top: 50%;
										transform: translate(-50%, -50%);
										width: 10px;
										border-top: 1.2px solid @color-666;
									}
									&::after {
										content: '';
										position: absolute;
										left: 50%;
										top: 50%;
										transform: translate(-50%, -50%);
									}
								}

								.g-stepper-add::after {
									height: 10px;
									border-right: 1.2px solid @color-666;
								}
								.g-stepper-val {
									width: 36px;
								}
								.icon-shanchu {
									width: 26px;
									font-size: 16px;
								}
							}
						}
					}
				}
			}
			.car-list__tips {
				margin-top: 10px;
				font-size: 12px;
				color: #767676;
				.icon {
					font-size: 14px;
				}
			}
		}
	}
}
</style>
