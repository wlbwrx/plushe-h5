import { post, get } from '@/utils/request.js'
import requestApi from './getApi'
export default {
	login: data => post(requestApi.login, data),
	register: data => post(requestApi.register, data),
	sendEmail: data => get(requestApi.sendResetEmail, data),
	reset: data => post(requestApi.resetPassword, data),
	modify: data => post(requestApi.modifyPassword, data),
	third: data => post(requestApi.third, data),
	getUser: data => post(requestApi.getUser, data),
	updateUser: data => post(requestApi.updateUser, data),
}
