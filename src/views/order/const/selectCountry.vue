<template>
	<div v-show="isShow">
		<van-index-bar>
			<div v-for="(array, index) in countrys" :key="index">
				<van-index-anchor :index="index" />
				<van-cell v-for="(item, key) in array" :key="key" :title="item.name" @click="slectCoutry(item)" />
			</div>
		</van-index-bar>
		<div class="t_arrow" @click="slectCoutry(0)"></div>
	</div>
</template>
<script>
import { IndexBar, Cell, IndexAnchor } from 'vant'
export default {
	data() {
		return {
			isShow: false,
			countrys: window.countrys,
		}
	},
	created() {},
	components: {
		[IndexBar.name]: IndexBar,
		[IndexAnchor.name]: IndexAnchor,
		[Cell.name]: Cell,
	},
	methods: {
		show(isDrag) {
			this.isShow = isDrag
		},
		slectCoutry(item) {
			this.isShow = false
			this.$emit('selectCountry', item)
		},
	},
}
</script>
<style scoped>
.t_arrow {
	position: fixed;
	left: 0;
	top: 0;
	z-index: 99999;
	height: 44px;
	width: 54px;
	background: transparent;
}
</style>
