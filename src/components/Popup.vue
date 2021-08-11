<template>
    <div class="pop-up">
        <div class="popup-hide"></div>
        <div class="popup-show">
            <i class="icon icon-close"></i>
            <div class="popup-content">
                Are you sure you want to cancel this shipped item?
            </div>
            <!-- <div class="popup-oper">
                <van-button class="popup-btn" type="primary">CONTINUE TO PAY</van-button>
                <van-button class="popup-btn" plain type="primary"> CONFIRM CANCEL</van-button>
            </div> -->
        </div>
    </div>
</template>
<script>
export default {
    components:{
    }
}
</script>
<style lang="less" scoped>
.popup-hide{position:fixed;background:#000;opacity:0.3;width:100%;height:100%;left:0;top:0;}
.popup-show{position:fixed;left:50%;top:50%;transform: translate(-50%, -50%);width:78.6%;background:#fff;padding:0 16px 6px;
    .icon{font-size:36px;position: fixed;top:-66px;color:#fff;left:50%;transform: translate(-50%, 0);}
}
.popup-btn{width:100%;margin-bottom:10px;}
.popup-content{font-size:16px;padding:30px 0;text-align: center;}
</style>