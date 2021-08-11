<template>
	<div class="add-bag">
		<van-popup v-model="isShow" position="bottom">
			<div class="add-bag__wrap">
				<van-icon class="add-bag__close" class-prefix="icon" name="guanbi" @click="toClose"></van-icon>
				<div class="add-bag__scroll">
					<ul class="goods-list">
						<li class="goods-item" v-for="(item, index) of goodsInfo.swipeList" :key="index" @click="toPreviewImage(index)">
							<van-image :src="$utils.imageHandler(0, item)" class="goods-pic">
								<template v-slot:loading>
									<img width="100%" height="100%" :src="$utils.platList('goodsDefaultImg', platformId)" alt="" />
								</template>
							</van-image>
						</li>
					</ul>
				</div>
				<div class="add-bag__content">
					<!-- <p class="goods_brand-name" v-if="goodsInfo.brandName">{{ goodsInfo.brandName }}</p> -->
					<p class="add-bag__desc">
						<span v-if="isFlash && goodsInfo.discountRate" class="add-bag__new add-bag__flash">-{{ Math.floor(goodsInfo.discountRate * 100) }}%</span>
						<span v-if="!isFlash && isNew" class="add-bag__new">{{ $t('new') }}</span>
						{{ goodsInfo.productName }}
					</p>
					<p :class="['add-bag__price', { 'have-discount': goodsInfo.discountPrice && goodsInfo.price > goodsInfo.discountPrice }]">
						<span class="taxes_text">{{ filterPriceMethod(goodsInfo.discountPrice || goodsInfo.price) }}</span>
						<span class="goods_old-price" v-if="goodsInfo.discountPrice && goodsInfo.price > goodsInfo.discountPrice">{{ filterPriceMethod(goodsInfo.price) }}</span>
					</p>
					<color-size @change="changeAttr" :list="goodsInfo.list" :skus="goodsInfo.skus"></color-size>
					<!-- <p class="add-bag__info">shoulder: 33cm, Bust: 75 cm, Length: 57 cm, Sleeve</p> -->
				</div>
				<div class="add-bag__bottom">
					<van-button class="add-bag__submit" block color="#222" @click="addBag" square> {{ $t('detail.addToCart') }}</van-button>
				</div>
			</div>
		</van-popup>
	</div>
</template>
<script>
import {  ImagePreview, Toast } from 'vant'
import ColorSize from '@/components/colorsize/index.vue'

import { mapActions, mapState } from 'vuex'
export default {
	props: {
		show: {
			type: Boolean,
			default: false,
		},
		// 这个信息能够修改
		goodsInfo: {
			type: Object,
		},
		// 购物车里的商品SKU,不可变更
		skuNo: {
			type: String,
		},
	},
	data() {
		return {
			swipeList: [],
		}
	},
	components: {
		ColorSize,
	},
	created() {},
	mounted() {},
	computed: {
		...mapState('shopCar', ['carList']),
		isShow: {
			get() {
				return this.show
			},
			set() {
				this.$emit('update:show', false)
			},
		},
		isNew() {
			return this.goodsInfo.tagsMap ? this.goodsInfo.tagsMap.some(item => item == 'new_in') : false
		},
		isFlash() {
			return this.goodsInfo.tagsMap ? this.goodsInfo.tagsMap.indexOf('flash_sale') > -1 : false
		},
	},
	methods: {
		...mapActions('shopCar', {
			changeNum: 'changeNum', // 数量更改
			changeSku: 'changeSku',
		}),
		// 点击关闭：
		toClose() {
			this.isShow = false
		},
		// 预览图片：
		toPreviewImage(index) {
			let images = this.goodsInfo.swipeList.map(item => {
				return this.$utils.imageHandler(1, item)
			})
			ImagePreview({
				images: images,
				startPosition: index,
				closeable: true,
			})
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
		// 属性更改：如 颜色 、尺码
		changeAttr(params) {
			// 更新商品信息:
			if (params.skuNo) {
				this.goodsInfo.attrObj = params.attrValObj
				this.goodsInfo.skuNo = params.skuNo
				this.goodsInfo.discountPrice = params.discountPrice
				this.goodsInfo.discountRate = params.discountRate
				this.goodsInfo.price = params.price
			}
			if (params.swipe.length) {
				this.goodsInfo.swipeList = params.swipe
				this.goodsInfo.defaultPicKey = params.swipe[0]
			}
			this.calculationInventory(this.goodsInfo)
		},
		// 添加到购物车：
		addBag() {
			let attrList = this.goodsInfo.list
			let isAll = true // 是否每一个属性 都有一个选中的项
			for (let i = 0; i < attrList.length; i++) {
				let item = attrList[i]
				isAll = item.attrValList.some(obj => obj.isDefault)
				if (!isAll) break
			}
			if (!isAll) {
				Toast({
					message: this.goodsInfo.skus.length ? this.$t('cart.preference') : this.$t('cart.soldOutText'),
				})
				return
			}
			const obj = this.carList.find(item => item.skuNo == this.goodsInfo.skuNo)
			if (obj && obj.num == 99) {
				Toast(this.$t('detail.addFailed'))
				return
			}
			if (this.goodsInfo.skuNo == this.skuNo) {
				// 如果添加的skuNo 与购物车里的一样，则数量增加,即普通加购流程
				this.changeNum({
					type: 1,
					goods: this.goodsInfo,
				}).then(() => {
					this.isShow = false
					Toast(this.$t('detail.success'))
				})
			} else {
				// 如果添加的skuNo 与购车不一样,则执行修改skuNo(添加新的，删除旧的)
				console.log(this.goodsInfo.num, '购物车的数量')
				const query = {
					newSku: this.goodsInfo.skuNo,
					num: this.goodsInfo.num, // 数量与之前一样
					oldSku: this.skuNo,
					goods: this.goodsInfo,
				}
				this.changeSku(query).then(() => {
					this.isShow = false
					Toast(this.$t('detail.success'))
				})
			}
		},
		// 根据属性计算sku库存
		calculationInventory(obj) {
			if (!obj.skus) return
			const { list, skus } = obj
			const active = []
			const skuObj = {}
			skus.forEach(item => {
				const attrVal1 = item.attrVal1 || '',
					attrVal2 = item.attrVal2 || '',
					attrVal3 = item.attrVal3 || '',
					attrVal4 = item.attrVal4 || ''
				const key = `${attrVal1},${attrVal2},${attrVal3},${attrVal4}`.replace(/(,+$)/gm, '')
				skuObj[key] = { ...item }
			})
			list.forEach((item, index) => {
				active[index] = '.+'
				item.attrValList.forEach(element => {
					if (element.isDefault) {
						active[index] = element.val
					}
				})
			})
			list.forEach((item, index) => {
				item.attrValList.forEach(element => {
					const currentObj = active.map((item, i) => (index == i ? element.val : item)).join(',')
					if (currentObj.includes('.+')) {
						element.disabled = false
						return
					}
					element.disabled = !skuObj[currentObj]
				})
			})
		},
	},
}
</script>
<style scoped lang="less">
@import '@/style/variable.less';

.add-bag {
	position: relative;
	.add-bag__wrap {
		background: @color-FFF;
		position: relative;
		max-height: 75vh;
		overflow-y: auto;
		padding: 30px 0 56px;
		.add-bag__close {
			position: absolute;
			right: 4px;
			top: 4px;
			font-size: 24px;
			color: @color-666;
		}
		.add-bag__scroll {
			position: relative;
			height: 243px;
			overflow-x: auto;
			margin-bottom: 10px;
			&::-webkit-scrallbar {
				display: none;
			}
			.goods-list {
				position: absolute;
				left: 16px;
				top: 0;
				display: flex;
				font-size: 0;
				.goods-item {
					margin-right: 10px;
					.goods-pic {
						width: 162px;
						height: 243px;
					}
				}
			}
		}
		.add-bag__content {
			padding: 0 16px;
			.add-bag__desc {
				font-size: 16px;
				color: @color-666;
				margin-bottom: 10px;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				.add-bag__new {
					font-size: 12px;
					color: #fff;
					background: #87c6a1;
					padding: 2px 4px;
					vertical-align: middle;
					text-align: center;
					&.add-bag__flash {
						background: #ffb84e;
						color: #222;
					}
				}
			}
			.add-bag__price {
				font-size: 18px;
				font-weight: 600;
				margin-bottom: 20px;
				color: @color-222;
				&.have-discount {
					color: @color-promo;
				}
				.goods_old-price {
					color: @color-999;
					font-size: 12px;
					font-weight: 400;
					text-decoration: line-through;
				}
			}
			.add-bag__info {
				margin-top: 10px;
				height: 44px;
				line-height: 44px;
				background: @color-bg;
				font-size: 13px;
				color: @color-222;
				padding-left: 10px;
			}

			.goods_brand-name {
				font-size: 12px;
				font-weight: 700;
				color: @color-222;
				margin-bottom: 4px;
			}
		}
		.add-bag__bottom {
			padding: 8px 16px;
			background: #fff;
			position: fixed;
			max-width: 375px;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
			width: 100%;
			box-shadow: inset 0 1px 0 0 @color-bg;
			.add-bag__submit {
				font-size: 16px;
				height: 40px;
				font-weight: 500;
				line-height: 40px;
			}
		}
	}
	/deep/.van-popup {
		max-width: 375px;
		left: 50%;
		transform: translateX(-50%);
	}
}
</style>
