<template>
	<div class="">
		<ul class="recom-goods-list" v-if="wishList.length > 0">
			<li v-for="(item, index) in wishList" :key="index">
				<router-link :to="formatUrl(`/product/`, `${item.productName || item.name}-${item.productNo}`)" class="recom-goods-img">
					<van-image class="default-image" :src="$utils.imageHandler(0, item.defaultPicKey)" @click="goGoodsDetail(item)">
						<template v-slot:loading>
							<img width="100%" height="100%" :src="$utils.platList('goodsDefaultImg', platformId)" alt="" />
						</template>
					</van-image>
					<!-- <i class="icon close iconguanbi" @click.stop="cancel(item.productNo)"></i> -->
				</router-link>
				<p class="recom-goods-cont text-hidden-row-1">
					<span v-if="!commPrice(item)">
						<label class="taxes_text">{{ filterPriceMethod(item.discountPrice) }}</label>
						<em>{{ filterPriceMethod(item.price) }}</em>
					</span>
					<span class="taxes_text" v-else>{{ filterPriceMethod(item.discountPrice) }}</span>
					<span class="like__icon" @click.stop="switchLike(item)">
						<i class="icon icon-like" v-if="item.isWish"></i>
						<i class="icon icon-like2" v-else></i>
					</span>
				</p>
			</li>
		</ul>
		<van-empty v-else class="custom-image" :image="ImageEmpty" :description="$t('my.hint2')" />
		<!-- <van-popup v-model="showWish" @click-overlay="showWish = false">
			<div class="delete-popup">
				<h3 class="delete-popup__tips">
					{{ $t('my.hint1') }}
				</h3>
				<div class="delete-popup__btns">
					<van-button color="#222" plain @click="showWish = false">{{ $t('cancel') }}</van-button>
					<van-button color="#222" @click="toConfirm">{{ $t('delete') }}</van-button>
				</div>
			</div>
		</van-popup> -->
	</div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
	props: {
		// 列表数据:
		wishList: {
			type: Array,
		},
	},
	data() {
		return {
			productNo: '',
			showWish: false,
			ImageEmpty: require('@/assets/images/wishEmpty.png'),
		}
	},
	components: {},
	methods: {
		...mapActions('wish', ['deleteWishList', 'addWishList']),
		// 对比价格是否一致:
		commPrice(item) {
			return item.discountPrice == item.price
		},
		// 前往详情:
		goGoodsDetail(item) {
			this.$store.commit('ssr/setGoodsDetail', item)
		},
		// 收藏 / 取消收藏
		switchLike(item) {
			if (item.isWish) {
				this.deleteWishList({ ...item, unDelete: true })
			} else {
				this.addWishList(item)
			}
		},
	},
}
</script>
<style lang="less" scoped>
@import '@/style/variable.less';

.recom-goods-list {
	display: flex;
	flex-wrap: wrap;
	padding: 0 9px;
	padding-bottom: 20px;

	li {
		font-size: 14px;
		color: @color-222;
		margin: 20px 5px 0;
		width: 158px;
		.default-image {
			background: #f5f5f5;
		}
		.recom-goods-img {
			width: 158px;
			height: 236px;
			position: relative;
			display: inline-block;
			.close {
				position: absolute;
				right: 5px;
				top: 5px;
				z-index: 11;
				font-size: 24px;
				color: #c4c4c4;
			}
		}
		.recom-goods-cont {
			display: flex;
			justify-content: space-between;
			margin-top: 10px;
			label {
				color: @color-promo;
			}
			em {
				margin-left: 4px;
				color: @color-999;
				text-decoration: line-through;
				font-size: 11px;
			}
			.like__icon {
				font-size: 0;
				.icon {
					font-size: 16px;
				}
				.icon-like {
					color: @color-222;
				}
			}
		}
	}
}
</style>
