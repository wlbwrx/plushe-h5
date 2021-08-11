<template>
	<div v-show="isShow" class="select-country">
		<form action="/" class="search-form">
			<van-search v-model="searcValue" left-icon="search" show-action :placeholder="$t('addressForm.countryRegion')" :action-text="$t('cancel')" @cancel="slectCoutry(0)" @input="onChange"></van-search>
		</form>
		<van-index-bar class="index-bar" ref="indexBar" :sticky-offset-top="stickyOffsetTop">
			<div v-for="(array, index) in countrys" :key="index">
				<van-index-anchor :index="index"></van-index-anchor>
				<van-cell v-for="(item, key) in array" :key="key" :title="item.name" @click="slectCoutry(item)" />
			</div>
		</van-index-bar>
		<div class="t_arrow" @click="slectCoutry(0)"></div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			isShow: false,
			countrys: [],
			searcValue: '',
			stickyOffsetTop: 96, // 高度
		}
	},
	components: {},
	mounted() {
		this.getCountry()
		if (document.body.offsetWidth >= 750) {
			this.stickyOffsetTop = (96 / 375) * 750
		} else {
			this.stickyOffsetTop = Math.ceil(document.body.offsetWidth * (96 / 375))
		}
	},
	methods: {
		show(isDrag) {
			this.isShow = isDrag
		},
		// 当选择 或取消返回时,清空搜索值,并回到顶部
		slectCoutry(item) {
			this.searcValue = ''
			this.$refs.indexBar.scrollTo('A')
			this.$emit('selectCountry', item)
			let t = setTimeout(() => {
				this.isShow = false
				clearInterval(t)
			}, 50)
		},
		onChange(value) {
			value = value.trim()
			let first = value.charAt().toUpperCase()
			this.$refs.indexBar.scrollTo(first)
		},
		getCountry() {
			if (!window.countrys) {
				setTimeout(() => {
					this.getCountry()
				}, 1000)
				return
			}
			this.countrys = window.countrys
		},
	},
}
</script>
<style scoped lang="less">
.index-bar {
	padding-top: 52px;
}
.t_arrow {
	position: fixed;
	left: 0;
	top: 0;
	z-index: 99999;
	height: 44px;
	width: 54px;
	background: transparent;
	top: constant(safe-area-inset-top); /* 兼容 iOS < 11.2 */
	top: env(safe-area-inset-top); /* 兼容 iOS >= 11.2 */
}
.search-form {
	position: fixed;
	left: 0;
	width: 100%;
	z-index: 10;
	border-bottom: 1px solid #f5f5f5;
	.search-btn {
		height: 22px;
	}
}
</style>
