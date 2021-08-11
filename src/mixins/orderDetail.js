import store from 'store'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  created() {
    let payBack = store.get('payBack')
    if (payBack) store.remove('payBack')
    this.getOrderDetail(this.orderSn)
  },
  computed: {
    ...mapState('order', ['closeReasonList', 'orderDetail'])
  },
  methods: {
    ...mapMutations('order', ['SET_REVIEW']),
    ...mapActions('order', ['getOrderDetail', 'getCloseReason', 'setCloseReason']),
    ...mapActions('pay', ['createPayment']),
    ...mapMutations('pay', ['setPayInfo']),
    getProduceLen(orderDetail) {
      let { orderItemResp } = orderDetail
      if (orderItemResp) {
        let len = orderItemResp.reduce((pre, cur) => {
          return pre + cur.productQuantity
        }, 0)
        return len
      }
      return 0
    },
    closeReaSOn(orderResp) {
      this.param.orderSn = orderResp.orderSn
      this.param.orderId = orderResp.id
      this.showCloseReason = true
      this.getCloseReason(2)
    },
    payFun() {
      let { shopsId, payType, orderSn } = this.orderDetail.orderResp
      this.createPayment({ shopsId, orderChannel: payType, orderSn }).then(res => {
        let { data } = res
        this.setPayInfo(data)
        window.location.href = data.thirdPaymentUrl
      })
    },
    viewReview(item) {
      this.$router.push({
        name: 'orderReview',
        query: { orderSn: item.orderSn, to: 'Orders Detail' }
      })
    },
    getDiscountAmount(orderResp) {
      let { promotionAmountYuan, integrationAmountYuan, couponAmountYuan, discountAmountYuan } = orderResp || {}
      return promotionAmountYuan + integrationAmountYuan + couponAmountYuan + discountAmountYuan
    },
    changeVisible(bool) {
      this.trankOut = bool
    },
    changeVisibleDetail(bool) {
      this.trankInner = bool
    },
    viewLogistics(item) {
      this.trankOut = false
      this.trankInner = false
      let { orderResp, orderLogisticsRespList } = item
      if (orderLogisticsRespList && orderLogisticsRespList.length > 1) {
        this.trankOut = true
        this.itemData = { orderSn: orderResp.orderSn }
      } else if (orderLogisticsRespList && orderLogisticsRespList.length == 1) {
        this.trankInner = true
        let [{ deliveryCompany, deliverySn, orderId, orderSn, shopsId }] = orderLogisticsRespList || []
        this.itemData = {
          deliveryCompany,
          deliverySn,
          orderId,
          orderSn,
          shopsId
        }
      }
    }
  }
}
