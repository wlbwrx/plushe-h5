import requestApi from '@/api/getApi.js'
import { post } from '@/utils/request.js'
const createPayment = data => post(requestApi.createPayment, data)
const capturePayment = data => post(requestApi.capturePayment, data)
const queryPayment = data => post(requestApi.queryPayment, data)
const getPublicKeyByChannelId = data => post(requestApi.getPublicKeyByChannelId, data)
const getPaypalUserInfo = data => post(requestApi.getPaypalUserInfo, data)

export default {
	createPayment,
	capturePayment,
	queryPayment,
	getPublicKeyByChannelId,
	getPaypalUserInfo,
}
