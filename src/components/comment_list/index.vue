<template>
	<!-- 评论列表 -->
	<ul class="comment-list">
		<li class="comment-list__items" v-for="(item, index) of list" v-show="item.evaluateContent" :key="item.id">
			<div class="comment-list__title">
				<span class="comment-list__name">{{ item.userEmail | formatEmail }}</span>
				<rate :value="item.evaluateStart" size="12"></rate>
			</div>
			<div class="comment-list__info">
				<span class="comment-list__info-time">{{ formatTimeMethod(item.evaluateTime) }}</span>
				<p class="text-hidden-row-1">
					<span class="comment-list__info-attr" v-if="item.attr1 && item.attrVal1">{{ item.attr1 + ':' + item.attrVal1 }}</span>
					<span class="comment-list__info-attr" v-if="item.attr2 && item.attrVal2">{{ item.attr2 + ':' + item.attrVal2 }}</span>
					<span class="comment-list__info-attr" v-if="item.attr3 && item.attrVal3">{{ item.attr3 + ':' + item.attrVal3 }}</span>
				</p>
			</div>
			<p class="comment-list__content">{{ item.evaluateContent }}</p>
			<ul class="comment-list__pictures" v-if="item.evaluatePicsOnekey">
				<li class="comment-list__pictures-item">
					<van-image :src="$utils.imageHandler(0, item.evaluatePicsOnekey)" lazy-load class="comment-list__pictures-pic" @click="toPreviewImage(0, index)"></van-image>
				</li>
				<li class="comment-list__pictures-item" v-if="item.evaluatePicsTwokey">
					<van-image :src="$utils.imageHandler(0, item.evaluatePicsTwokey)" lazy-load class="comment-list__pictures-pic" @click="toPreviewImage(1, index)"></van-image>
				</li>
				<li class="comment-list__pictures-item" v-if="item.evaluatePicsThreekey">
					<van-image :src="$utils.imageHandler(0, item.evaluatePicsThreekey)" lazy-load class="comment-list__pictures-pic" @click="toPreviewImage(2, index)"></van-image>
				</li>
			</ul>
		</li>
	</ul>
</template>
<script>
import { ImagePreview, Image } from 'vant'
import Rate from '@/components/rate/index.vue'

export default {
	props: {
		list: {
			type: Array,
		},
	},
	data() {
		return {}
	},
	components: {
		[Image.name]: Image,
		Rate,
	},
	filters: {
		formatEmail(val) {
			let name = val.split('@')[0]
			return name.charAt(0) + '***' + name.charAt(name.length - 1)
		},
	},
	methods: {
		// 预览图片：
		toPreviewImage(imgIndex, index) {
			const obj = this.list[index]
			console.log(111, obj)
			let imgList = [this.$utils.imageHandler(1, obj.evaluatePicsOnekey)]
			if (obj.evaluatePicsTwokey) imgList.push(this.$utils.imageHandler(1, obj.evaluatePicsTwokey))
			if (obj.evaluatePicsThreekey) imgList.push(this.$utils.imageHandler(1, obj.evaluatePicsThreekey))
			ImagePreview({
				images: imgList,
				startPosition: imgIndex,
				closeable: true,
			})
		},
	},
}
</script>
<style scoped lang="less">
@import '@/style/variable.less';

.comment-list {
	font-size: 14px;
	font-weight: 300;
	// border-bottom: 1px solid @color-bg;

	.comment-list__items {
		padding-bottom: 20px;
		border-bottom: 1px solid @color-EBE;
		margin-bottom: 20px;
		&:last-child {
			margin-bottom: 0;
			border-bottom: none;
		}

		.comment-list__title {
			margin-bottom: 8px;

			.comment-list__name {
				color: @color-4D4;
				margin-right: 8px;
				font-weight: normal;
			}
		}

		.comment-list__info {
			color: @color-666;
			font-size: 14px;
			margin-bottom: 10px;
			.comment-list__info-attr {
				margin-left: 6px;
			}
		}

		.comment-list__content {
			line-height: 22px;
			color: @color-222;
			word-wrap: break-word;
		}

		.comment-list__pictures {
			margin-top: 10px;
			display: flex;

			.comment-list__pictures-item {
				width: 108px;
				height: 108px;
				margin-right: 10px;

				&:last-child {
					margin-right: 0;
				}

				.comment-list__pictures-pic {
					object-fit: cover !important;
					width: 100%;
					height: 100%;
				}
				/deep/ img {
					object-fit: cover !important;
				}
			}
		}
	}
}
</style>
