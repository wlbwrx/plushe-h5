import requestApi from '@/api/getApi.js'
import { post, get } from '@/utils/request.js'

const convertCoupon = data => post(requestApi.convertCoupon, data)
const queryUserCoupon = data => post(requestApi.queryUserCoupon, data )
const orderConfig = data => post(requestApi.orderConfig, data )
const addUserAddress = data => post(requestApi.addUserAddress, data )
const querytUserAddress = data => post(requestApi.queryUserAddress, data )
const updatetUserAddress = data => post(requestApi.updateUserAddress, data )
const deleteByAddress = params => get(requestApi.deleteByAddress, params )
const getByAddress = params => get(requestApi.getByAddress, params )
const makeDefaultAddress = params => get(requestApi.makeDefaultAddress, params )
const getUserDefaultAddress = params => get(requestApi.getUserDefaultAddress, params )
const addWishList = data => post(requestApi.addWishList, data )
const deleteWishList = params => get(requestApi.deleteWishList, params )
const queryWishList = data => post(requestApi.queryWishList, data )
const updateWishList = data => post(requestApi.updateWishList, data )
const getNewComerCoupon = params => get(requestApi.getNewComerCoupon, params )
const getUserEnableSpecialCoupon = data => post(requestApi.getUserEnableSpecialCoupon, data )
const isUserCollect = data => post(requestApi.isUserCollect, data )  
const addBatchWishList = data => post(requestApi.addBatchWishList, data )  


export default {
    isUserCollect,
    convertCoupon, 
    queryUserCoupon,
    getNewComerCoupon,
    getUserEnableSpecialCoupon,
    orderConfig, 
    addUserAddress, 
    querytUserAddress, 
    updatetUserAddress, 
    deleteByAddress,
    getByAddress,
    makeDefaultAddress,
    getUserDefaultAddress,
    addWishList,
    deleteWishList,
    queryWishList,
    updateWishList,
    addBatchWishList
}