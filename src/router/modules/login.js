export default [
	{
		path: '/login',
		name: 'login',
		meta: {
			title: '登录',
			keepAlive: true,
		},
		component: () => import('@/views/login/index'),
	},
	{
		path: '/register_success',
		name: 'registerSuccess',
		meta: {
			title: '注册成功',
		},
		component: () => import('@/views/login/Success'),
	},
	{
		path: '/reset_password',
		name: 'resetPassword',
		meta: {
			title: '重置密码',
		},
		component: () => import('@/views/login/Reset'),
	},
	{
		path: '/reset_new',
		name: 'resetNew',
		meta: {
			title: '设置新密码',
		},
		component: () => import('@/views/login/ResetNew'),
	},
	{
		path: '/change_password',
		name: 'changePassword',
		meta: {
			title: '修改密码',
		},
		component: () => import('@/views/login/ChangePassword'),
	},
]
