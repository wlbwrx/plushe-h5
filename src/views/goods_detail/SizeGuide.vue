<template>
	<div class="size-chart">
		<nav-bar :title="$t('detail.sizeGuide')" border></nav-bar>
		<div class="size-chart__top">
			<span>{{ $t('sizeGuide.switchTo') }}</span>
			<div class="size-chart__select" @click="show = true" v-if="activeCountry">
				<span>{{ activeCountry }}</span>
				<i class="icon icon-xiala"></i>
			</div>
			<div class="size-chart__switch">
				<span :class="{ 'is-active': item == currentName }" v-for="item of switchList" :key="item" @click="toSwitch(item)">{{ item }}</span>
			</div>
		</div>
		<div class="size-chart__wrap">
			<h3 class="size-chart__tit">{{ $t('sizeGuide.productMeasurements') }}</h3>
			<div class="size-chart__table have-left">
				<table class="table-left">
					<tr>
						<td class="table-td td-bg">{{ sizeInfo.xTitle[0] }}</td>
					</tr>
					<template v-for="(arr, i) of sizeInfo.datas">
						<tr :key="i">
							<td class="table-td td-bg">{{ arr[0] || '/' }}</td>
						</tr>
					</template>
				</table>

				<div class="table-right">
					<table>
						<tr>
							<td class="table-td td-bg">{{ activeCountry }}</td>
							<template v-for="(title, i) of sizeInfo.xTitle">
								<td v-if="i > 0" :key="i + 'title'" class="table-td td-bg">{{ title || '/' }}</td>
							</template>
						</tr>
						<template v-for="(arr, index) of sizeInfo.datas">
							<tr :key="index + 'tr'">
								<template v-for="(value, j) of arr">
									<td v-if="j == 0" :key="j + 'val'" class="table-td">{{ getSizeCountryVal(value) }}</td>
									<td v-if="j > 0" :key="j + 'val'" class="table-td">{{ value || '/' }}</td>
								</template>
							</tr>
						</template>
					</table>
				</div>
			</div>
			<p class="size-chart__tips">* {{ currentName == 'IN' ? $t('sizeGuide.text1') : $t('sizeGuide.text') }}.</p>
		</div>
		<div class="size-chart__content">
			<van-collapse v-model="activeNames" :border="false">
				<van-collapse-item :border="false" :name="item.id" v-for="item of contents" :key="item.id">
					<template #title>
						<h3 class="content-title">{{ item.title }}</h3>
					</template>
					<p class="content-tips" v-if="item.tips">{{ item.tips }}</p>
					<ul class="content-list">
						<li class="content-item" v-for="obj of item.list" :key="obj.tit">
							<h6>{{ obj.tit }}</h6>
							<p>{{ obj.text }}</p>
						</li>
					</ul>
					<img :src="item.picUrl" alt="" class="content-pic" />
				</van-collapse-item>
			</van-collapse>
		</div>

		<van-action-sheet v-model="show" :actions="countrySizes" :cancel-text="$t('cancel')" :description="$t('sizeGuide.pleaseChoose')" close-on-click-action @select="onSelect" />
	</div>
</template>

<script>
import NavBar from '@/components/navbar/index.vue'
import http from '@/api/index'
import { mapState, mapActions } from 'vuex'

export default {
	data() {
		return {
			switchList: ['CM', 'IN'],
			currentName: 'IN',
			leftList: [],
			rightList: [],
			sourceData: {}, // 源数据
			activeNames: [1, 2],
			contents: [
				{
					id: 1,
					title: this.$t('sizeGuide.title'),
					picUrl: require('@/assets/images/other-info/yifu1_2x.png'),
					list: [
						{
							tit: '1.' + this.$t('sizeGuide.shoulder'),
							text: this.$t('sizeGuide.shoulderText'),
						},
						{
							tit: '2.' + this.$t('sizeGuide.bust'),
							text: this.$t('sizeGuide.bustText'),
						},
						{
							tit: '3.' + this.$t('sizeGuide.waist'),
							text: this.$t('sizeGuide.waistText'),
						},
						{
							tit: '4.' + this.$t('sizeGuide.hips'),
							text: this.$t('sizeGuide.hipsText'),
						},
						{
							tit: '5.' + this.$t('sizeGuide.length'),
							text: this.$t('sizeGuide.lengthText'),
						},
						{
							tit: '6.' + this.$t('sizeGuide.sleeves'),
							text: this.$t('sizeGuide.sleevesText'),
						},
					],
				},
				{
					id: 2,
					title: this.$t('sizeGuide.title2'),
					picUrl: require('@/assets/images/other-info/yifu2_2x.png'),
					tips: this.$t('sizeGuide.tit2Sub'),
					list: [
						{
							tit: '1.' + this.$t('sizeGuide.bust'),
							text: this.$t('sizeGuide.bustText'),
						},
						{
							tit: '2.' + this.$t('sizeGuide.waist'),
							text: this.$t('sizeGuide.waistText'),
						},
						{
							tit: '3.' + this.$t('sizeGuide.hips'),
							text: this.$t('sizeGuide.hipsText'),
						},
					],
				},
			],
			show: false,
			activeCountry: 'US',
			mayCountry: ['US', 'EU', 'DE', 'UK', 'AU', 'IT', 'BR', 'FR', 'JP'], //  可能的国家
			sizeInfo: {
				xTitle: [],
				datas: [],
			}, // 当前的size 信息, 源数据中的一个
		}
	},
	components: {
		NavBar,
	},
	created() {
		if (this.platformId == 3) this.currentName = 'CM'
		if (this.$route.query.source && this.$route.query.source == 'shopify') {
			this.getPageData(2) // 先截取掉后两位，若没有，截取后 3位再请求
		} else {
			this.getPageData()
		}
		this.getSizeConfig()
	},
	computed: {
		...mapState('detail', ['sizeConfig']),
		// 实际返回的国家:
		countrySizes() {
			if (!this.sizeConfig.length) return
			const keys = Object.keys(this.sizeConfig[0])
			const arr = []
			keys.forEach((item) => {
				if (item.includes('Size')) {
					arr.push({
						name: item.replace('Size', '').toUpperCase(),
					})
				}
			})
			return arr
		},
	},
	methods: {
		...mapActions('detail', ['getSizeConfig']),
		toSwitch(name) {
			if (name == this.currentName) return
			this.currentName = name
			const key = name == 'CM' ? 'sizeCm' : 'sizcInch'
			this.sizeInfo = this.sourceData[key]
		},
		// 获取当前Size 的值,与国家相对应的值:
		getSizeCountryVal(value) {
			let targetValue = '/'
			this.sizeConfig.forEach((item) => {
				// 找到与当前size值相等的 配置项, 并根据当前选中的国家 取对应值
				if (item.size == value) {
					const keys = Object.keys(item)
					console.log(this.activeCountry)
					keys.forEach((k) => {
						if (k.substring(0, 2) == this.activeCountry.toLowerCase()) {
							targetValue = item[k]
						}
					})
				}
			})
			return targetValue
		},
		getPageData(subNum) {
			const { productNo } = this.$route.query
			const params = {
				productNo: subNum ? productNo.substring(0, productNo.length - subNum) : this.$route.query.productNo,
			}
			http.goodsDetailApi.size(params).then((res) => {
				// console.log(res.data)
				if (!subNum) {
					this.sourceData = {
						sizcInch: JSON.parse(res.data.sizcInch),
						sizeCm: JSON.parse(res.data.sizeCm),
					}
					this.sizeInfo = this.sourceData[this.currentName == 'CM' ? 'sizeCm' : 'sizcInch']
				} else {
					if (res.data.id) {
						this.sourceData = {
							sizcInch: JSON.parse(res.data.sizcInch),
							sizeCm: JSON.parse(res.data.sizeCm),
						}
						this.sizeInfo = this.sourceData[this.currentName == 'CM' ? 'sizeCm' : 'sizcInch']
						return
					}
					if (subNum == 3) return
					this.getPageData(3)
				}
			})
		},
		// 选中后:
		onSelect(info) {
			if (this.activeCountry == info.name) return
			this.activeCountry = info.name
		},
	},
}
</script>

<style lang="less" scoped>
@import '@/style/variable.less';

.size-chart {
	min-height: 100vh;
	background: #fff;
	color: @color-222;
	.size-chart__top {
		height: 56px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 16px;
		background: @color-bg2;
		font-size: 14px;
		.size-chart__switch {
			border: 1px solid @color-222;
			line-height: 24px;
			font-size: 13px;
			display: flex;
			align-items: center;
			> span {
				width: 40px;
				text-align: center;
				&.is-active {
					background: @color-222;
					color: #fff;
				}
			}
		}
	}
	.size-chart__wrap {
		padding: 20px 16px;
		.size-chart__tit {
			font-size: 14px;
			font-weight: 700;
			margin-bottom: 10px;
		}
		.size-chart__table {
			position: relative;
			border: 1px solid #d1d1d1;
			border-bottom: none;
			margin-bottom: 10px;
			display: flex;
			table {
				border-collapse: collapse;
				border: none;
				padding: 0;
			}
			.table-left {
				.table-td {
					max-width: 100px;
					overflow: hidden;
				}
			}

			.table-td {
				min-width: 62px;
				white-space: nowrap;
				padding: 0 4px;
				line-height: 34px;
				border-bottom: 1px solid #d1d1d1;
				border-right: 1px solid #d1d1d1;
				text-align: center;
				font-size: 12px;
				font-weight: 700;
				&.td-bg {
					background: @color-bg2;
				}
			}
			.table-right {
				flex: 1;
				overflow-x: auto;
				> table {
					min-width: 100%;
				}
				.table-td:last-child {
					border-right: none;
				}
			}
		}
		.size-chart__tips {
			font-size: 12px;
			line-height: 12px;
			color: @color-999;
		}
	}
	.size-chart__content {
		font-size: 14px;
		.content-title {
			font-size: 18px;
			font-weight: 600;
			color: @color-222;
		}
		.content-pic {
			width: 190px;
			height: auto;
			display: block;
			margin: 20px auto 40px;
		}
		.content-tips {
			color: @color-red;
			line-height: 17px;
			margin-bottom: 20px;
		}
		.content-item {
			color: @color-222;
			margin-bottom: 20px;
			h6 {
				font-weight: 600;
				margin-bottom: 6px;
			}
			p {
				line-height: 17px;
				color: @color-595;
			}
		}
	}
	.size-chart__select {
		width: 100px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		border: 1px solid @color-222;
		padding: 0 10px;
		height: 24px;
		line-height: 22px;
		span {
			font-size: 12px;
		}
		i {
			font-size: 18px;
		}
	}
	/deep/ .van-action-sheet {
		max-height: 60%;
	}
}
</style>
