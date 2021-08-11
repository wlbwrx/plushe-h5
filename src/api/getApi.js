//注意不要重名
let requestApiArr = require.context('./getApi', true, /\.js$/)
let requestApi = {}
requestApiArr.keys().forEach((item) => {
    let requestSingleObj = requestApiArr(item).default
    requestApi = Object.assign(requestApi, requestSingleObj)
})
export default requestApi