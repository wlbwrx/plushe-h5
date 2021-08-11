<template>
	<div class="user-edit header-title">
		<div class="user-edit-avatar">
			<van-image class="user-avatar-img avatar" round :src="headPhoto">
				<template v-slot:error>
					<van-icon class="avatar-error" class-prefix="icon" size="30" name="touxiang" />
				</template>
			</van-image>
			<h1 class="text-hidden-row-1">{{ nickName }}</h1>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		let { nickName, headPhoto } = this.$route.query
		return {
			nickName,
			headPhoto: headPhoto,
		}
	},
	components: {},
}
</script>

<style lang="less" scoped>
@import '@/style/modules/my.less';
.user-edit {
	position: absolute;
	width: 100%;
	height: calc(100% - 45px);
}
.user-edit-avatar {
	width: 100%;
	text-align: center;
	background: #fff;
	.user-avatar-img {
		margin-top: 50px;
	}
	h1 {
		width: 300px;
		margin: 0 auto;
		font-size: 20px;
		margin-top: 14px;
	}
	.user-edit-btn {
		font-size: 12px;
		color: #999;
		padding: 3px 5px;
		border: 1px solid #999;
	}
	padding-bottom: 50px;
}
</style>
