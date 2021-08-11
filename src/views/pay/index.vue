<template>
	<div class="pay-success"></div>
</template>
<script>
import store from 'store'
export default {
	beforeRouteEnter(to, from, next) {
		let {query} = to
		let payInfo = store.get('payInfo')
		let { orderSn } = payInfo || {}
		if(from.name=='paySuccess'){
			next({name: 'orderDetail', query: { orderSn }})
		}else{
			next({name:'paySuccess',query})
		}
		
	}
	// mounted () {
	// 	if (window.history && window.history.pushState) {
	// 		// 向历史记录中插入了当前页
	// 		history.pushState(null, null, document.URL);
	// 		window.addEventListener('popstate', this.goBack, false);
	// 	}
	// },
	// destroyed () {
	// 	window.removeEventListener('popstate', this.goBack, false);
	// },
	// methods:{
	// 	goBack () {
	// 		// console.log("点击了浏览器的返回按钮");
	// 		let orderSn = store.get('payBack')
	// 		this.$router.replace({name: 'orderDetail', query: { orderSn }})
	// 	},
	// },
	// created(){
	// 	let {query} = this.$route
	// 	this.$router.push({name:'paySuccess',query})
	// }
}
</script>

