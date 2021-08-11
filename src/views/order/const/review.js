
import {mapState, mapActions} from 'vuex'

export default {
    computed:{
        ...mapState('order', ['reviewDetail'])
    },
    created(){
        let {orderSn} = this.$route.query
        this.getOrderDetail(orderSn)
    },
    methods:{
        ...mapActions('order', ['getOrderDetail','UploadImg','createEvaluate']),
        handlePictureCardPreview(file) {
        },
        
       
    }
}