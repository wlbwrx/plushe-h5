<template>
	<div class="color-size">
		<div v-for="(item, pIndex) of list" :key="item.attrName">
			<!-- showPicOrText: 1为图片，2为文字 -->
			<div v-if="item.showPicOrText == 1" class="color-size__box">
				<div class="color-size__label">
					<span class="color-size__name">{{ item.attrName }}</span> : <span class="color-size__val">{{ item.attrValList | filterAttrVal }}</span>
				</div>
				<ul class="color-size__colors">
					<li :class="['colors-item', { 'is-active': obj.isDefault, disabled: obj.disabled }]" v-for="(obj, index) of item.attrValList" :key="obj.val" @click="changeAttr(pIndex, index, obj)">
						<img class="colors-item__pic" :src="$utils.imageHandler(2, obj.valKey)" alt="" />
						<img v-if="obj.disabled" class="colors-item__icon" src="@/assets/images/icons/disabled.png" alt="" />
						<!-- <i v-if="obj.disabled" class="icon icon-disabled-color"></i> -->
					</li>
				</ul>
			</div>
			<div v-else class="color-size__box">
				<div class="color-size__label size-labe">
					<span>{{ item.attrName + (showGoSize && item.attrName.toLocaleLowerCase().includes($t('size')) ? '/US' : '') }}</span>
					<div v-if="showGoSize && item.attrName.toLocaleLowerCase().includes($t('size'))" class="size-guide" @click="goSize">
						<img class="size-icon" src="@/assets/images/icons/size-icon.png" alt="" />
						<span>{{ $t('detail.sizeGuide') }}</span
						><i class="van-icon van-icon-arrow"></i>
					</div>
				</div>
				<ul class="color-size__sizes">
					<li :class="['sizes-item', { disabled: obj.disabled, 'is-active': obj.isDefault }]" v-for="(obj, index) of item.attrValList" :key="obj.val" @click="changeAttr(pIndex, index, obj)">
						<span>{{ obj.val }}</span>
					</li>
				</ul>
				<!-- 尺码信息 -->
				<template v-if="item.attrName.toLocaleLowerCase().includes($t('size'))">
					<slot></slot>
				</template>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		// 属性列表
		list: {
			type: Array,
		},
		skus: {
			type: Array,
		},
		showGoSize: {
			type: Boolean,
		},
	},
	data() {
		return {}
	},
	components: {},
	filters: {
		// 选中的属性的值:
		filterAttrVal(list) {
			let obj = list.find((item) => item.isDefault)
			// console.log('zenemle ::', obj)
			return obj ? obj.val : ''
		},
	},
	methods: {
		// 更改属性:
		changeAttr(pIndex, index, obj) {
			if (obj.isDefault || obj.disabled) return
			let swipeList = []
			// 属性列表
			this.list.forEach((item, i) => {
				if (i == pIndex) {
					item.attrValList.forEach((attr, j) => {
						attr.isDefault = false
						if (j == index) {
							attr.isDefault = true
							if (item.isValHavePics) {
								swipeList = attr.picList
							}
						}
					})
				}
			})
			// 是否全部选中,如果都选中, 能得到新的sku信息,并将选中的属性值返回
			let isAll = true,
				attrValObj = {}
			for (let i = 0; i < this.list.length; i++) {
				let item = this.list[i]
				attrValObj['attrVal' + (i + 1)] = ''
				isAll = item.attrValList.some((obj) => {
					if (obj.isDefault) attrValObj['attrVal' + (i + 1)] = obj.val
					return obj.isDefault
				})
				if (!isAll) break
			}
			let info = {}
			if (isAll) {
				let skus = this.skus
				skus.forEach((item) => {
					let bool = this.dealObj(attrValObj, item)
					if (bool) info = item
				})
				info.attrValObj = attrValObj
			}
			let params = {
				list: this.list,
				...info,
			}
			if (swipeList.length) {
				params.swipeList = swipeList
			}

			this.$emit('change', params)
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
		goSize() {
			this.$emit('sizeGuide')
		},
	},
}
</script>
<style scoped lang="less">
@import '@/style/variable.less';

.color-size {
	.color-size__label {
		font-size: 14px;
		line-height: 14px;
		color: @color-222;
		margin-bottom: 12px;
		&.size-labe {
			display: flex;
			justify-content: space-between;
		}
		.color-size__name {
			font-weight: normal;
		}
		.color-size__val {
			color: @color-666;
		}
		.size-guide {
			height: 17px;
			font-size: 14px;
			color: #5689c6;
			display: flex;
			align-items: center;
			overflow: hidden;
			.size-icon {
				width: 26px;
				margin-right: 3px;
			}
			.van-icon {
				color: #999;
				font-size: 14px;
				font-weight: 500;
			}
		}
	}

	.color-size__colors {
		display: flex;
		flex-wrap: wrap;
		padding: 0 4px;
		margin-bottom: 10px;

		.colors-item {
			width: 32px;
			height: 32px;
			border-radius: 50%;
			position: relative;
			margin-right: 10px;
			margin-bottom: 10px;
			font-size: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			&.is-active {
				border: 1px solid @color-222;
			}
			&.disabled {
				.colors-item__pic {
					height: 23px;
					width: 23px;
					opacity: 0.7;
				}
			}
			.colors-item__icon {
				position: absolute;
				top: 3px;
				left: 3px;
				width: 26px;
				height: 26px;
				border-radius: 50%;
				// top: 0;
				// left: 0;
				// width: 100%;
				// height: 100%;
			}
			&:last-child {
				margin-right: 0;
			}
			.colors-item__pic {
				width: 26px;
				height: 26px;
				border-radius: 50%;
				object-fit: cover;
			}
		}
	}

	.color-size__sizes {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 10px;

		.sizes-item {
			margin-right: 10px;
			padding: 0 14px;
			height: 30px;
			border-radius: 4px;
			border: 1px solid @color-D1D;
			font-size: 12px;
			margin-bottom: 10px;
			display: flex;
			align-items: center;
			justify-content: center;

			&.is-active {
				border-color: @color-222;
				font-weight: normal;
			}

			&.disabled {
				background: #e6e6e6;
				color: #bfbfbf;
				border-color: #e6e6e6;
			}
		}
	}
}
</style>
