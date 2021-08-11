const getters = {
	platformId: state => state.ssr.platformConfig.platformId || 1, // 平台ID
	InvitationCode: state => state.app.InvitationCode,
	shopsId: state => state.app.shopsId, // 店铺id
	platformConfig: state => state.ssr.platformConfig,
	token: state => state.user.user.userToken, // token
	nickName: state => state.user.user.nickName, // 用户昵称
	newPeopleCouponVal: state => state.user.newPeopleCouponVal,
}
export default getters
