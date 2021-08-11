import { Toast } from 'vant'
import http from '@/api/index.js'
import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      // 购物车step步骤条 共用 只需要修改actived的值即可修改状态
      actived: 0,
      stepList: [
        {
          name: 'Shopping Bag',
          index: 0,
          next: true
        },
        {
          name: 'Place Order',
          index: 1,
          next: true
        },
        {
          name: 'Pay',
          index: 2,
          next: true
        },
        {
          name: 'Order Complete',
          index: 3
        }
      ],
      // 猜你喜欢（推荐） you also like
      recommendList: [] // You Like
    }
  },
  filters: {
    // 过滤过长导致的内容溢出 obj 表示内容  num 表示截取多少长度
    attrVals(obj, num) {
      let vals = ''
      for (let key in obj) {
        vals += obj[key]
      }
      return vals.length > num ? vals.substring(0, num) + '...' : vals
    },
    // 过滤过长的商品描述
    productNameFilter(obj, num) {
      return obj.length > num ? obj.substring(0, num) + '...' : obj
    }
  },
  // 计算属性 公共store值和方法
  computed: {
    // 购物车里的参数
    ...mapState('shopCar', {
      goodsList: state => state.carList, // 购物车有效数据列表
      expiredList: state => state.expiredList, // 购物车失效数据列表
      isEdit: state => state.isEdit,
      totalPrice: state => state.totalPrice, // 购物车选中的商品总共价格
      lackForFreeExpressAmount: state => state.lackForFreeExpressAmount, // 购物车还差多少金额满减
      isAllChecked: state => state.isAllChecked // 购物车编辑时是否已经全选
    }),
    ...mapGetters({
      skuNos: 'shopCar/skuNos', // 选中的商品id
    }),
    // 判断购物车是否为空
    isEmpty() {
      return this.goodsList.length == 0 && this.expiredList.length == 0
    }
  },
  methods: {
    ...mapActions('shopCar', {
      getCarList: 'getCarList', // 获取购物车数据
      selectSingle: 'selectSingle', // 单选
      changeNum: 'changeNum', // 数量更改
      selectAll: 'selectAll' // 是否全选
    }),
    ...mapMutations({
      switchDelete: 'shopCar/switchDelete' // 显示删除框
    }),
    // 获取猜你喜欢（推荐）：
    getRecommend() {
      const query = {
        pageNum: 1,
        pageSize: 20, // 后端做的最大100条
        shopsId: this.$store.getters.shopsId || undefined
      }
      http.home.recommend(query).then(res => {
        this.recommendList = res.data
        this.$nextTick(() => {
          this.initBanner() // 初始化滚动导航
        })
      })
    },
    // 购物车增加/减少数量
    // 增加数量
    addNum(item) {
      if (item.num >= 99) {
        Toast('Only can add up to 99')
        return
      }
      this.changeNum({
        type: 1,
        goods: item
      })
    },
    // 减少数量
    cutNum(item) {
      if (item.num <= 1) {
        Toast('The quantity cannot be reduced anymore')
        return
      }
      this.changeNum({
        type: 0,
        goods: item
      })
    },
    // 数据上报：
    reportData(type) {
      let items = [],
        obj = {
          currentcy: 'USD',
          value: this.totalPrice / 100
        }
      this.goodsList.forEach(item => {
        if (item.check) {
          items.push({
            id: item.productNo,
            name: item.productName,
            brand: item.brandName,
            price: (item.discountPrice || item.price) / 100,
            quantity: item.num,
            skuNo: item.skuNo
          })
        }
      })
      if (type == 'fb') {
        obj.content_type = 'product_group'
        obj.num_items = this.totalNum
        obj.contents = items
      } else {
        obj.items = items
      }
      return obj
    }
  }
}
