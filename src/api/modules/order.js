import requestApi from '@/api/getApi.js'
import { post, get } from '@/utils/request.js'

const getOrderStatusList = data => post(requestApi.getOrderStatusList, data)
const allLogistics = id => get(requestApi.allLogistics+id )
const logistics = data => {
    return post(requestApi.logistics, data )
}
const orderDetail = id => get(requestApi.orderDetail, { orderSn: id })
const review = data => post(requestApi.review, data )
const orderColseReason = id => get(requestApi.orderColseReason+id)
const closeOrder = data => post(requestApi.closeOrder, data)
const createEvaluate = data => post(requestApi.createEvaluate, data)
const uploadImg = data => post(requestApi.uploadImg, data)
const createOrder = data => post(requestApi.createOrder, data)
const createGuestUserOrder = data => post(requestApi.createGuestUserOrder, data)





export default {
    getOrderStatusList,
    allLogistics,
    logistics,
    orderDetail,
    review,
    orderColseReason,
    closeOrder,
    createEvaluate,
    uploadImg,
    createOrder,
    createGuestUserOrder
}