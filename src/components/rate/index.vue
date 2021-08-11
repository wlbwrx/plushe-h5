<template>
	<!-- <van-rate v-model="value" :size="size" :color="color" :void-color="voidColor" :void-icon="voidIcon" :allow-half="allowHalf" :readonly="readonly" /> -->
	<van-rate v-model="value" :size="size" :color="color" :void-color="voidColor" :allow-half="allowHalf" :readonly="readonly" />
</template>
<script>
export default {
	props: {
		value: {
			type: Number,
			default: 0,
		},
		count: {
			type: Number,
			default: 5,
		},
		size: {
			type: [Number, String],
			default: 14,
		},
		voidIcon: {
			type: String,
			default: 'star',
		},
		voidColor: {
			type: String,
			default: '#FFBF00',
		},
		color: {
			type: String,
			default: '#FFBF00',
		},
		allowHalf: {
			type: Boolean,
			default: true,
		},
		readonly: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {}
	},
	components: {},
	methods: {},
}
</script>
<style scoped lang="less"></style>
