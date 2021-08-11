<template>
	<!-- 删除提示弹框 -->
	<van-popup :value="$store.state.shopCar.isDelete" @click-overlay="cancelDelete">
		<div class="delete-popup">
			<h3 class="delete-popup__tips">
				{{ $t('cart.deleteText') }}
			</h3>
			<div class="delete-popup__btns">
				<van-button color="#222" plain @click="cancelDelete">{{ $t('cart.CancelBtn') }}</van-button>
				<van-button color="#222" @click="confirmDelete">{{ $t('cart.deleteBtn') }}</van-button>
			</div>
		</div>
	</van-popup>
</template>
<script>
import { Toast } from 'vant'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
export default {
	data() {
		return {}
	},
	components: {},
	created() {},
	mounted() {},
	computed: {
		...mapState('shopCar', {
			singleDeleteId: (state) => state.singleDeleteId,
		}),
		...mapGetters({
			skuNos: 'shopCar/skuNos', // 选中的商品id
		}),
	},
	methods: {
		...mapMutations({
			switchDelete: 'shopCar/switchDelete', // 切换删除确认框显示隐藏
		}),
		...mapActions('shopCar', {
			deleteGoods: 'deleteItems',
		}),
		// 取消删除
		cancelDelete() {
			this.switchDelete()
		},
		// 确认删除商品：
		confirmDelete() {
			this.deleteGoods().then(() => {
				Toast(this.$t('deleted'))
			})
		},
	},
}
</script>
<style scoped lang="less">
@import '@/style/variable.less';

.delete-popup {
	width: 295px;
	padding: 30px 16px 16px;
	background: @color-FFF;

	.delete-popup__tips {
		font-size: 16px;
		color: @color-222;
		margin-bottom: 24px;
		text-align: center;
	}

	.delete-popup__btns {
		display: flex;
		justify-content: space-between;

		.van-button {
			height: 36px;
			width: 124px;
			border-radius: 0;
		}
	}
}
</style>
