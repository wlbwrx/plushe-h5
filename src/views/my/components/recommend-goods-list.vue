<template>
    <ul class="goods-list">
        <li>
            <van-image class="goods-list-img" src="" />
            <p class="goods-list-total">US$16.9</p>   
        </li> 
        <li>
            <van-image class="goods-list-img" src="" />
            <p class="goods-list-total">US$16.9</p>   
        </li>
        <li>
            <van-image class="goods-list-img" src="" />
            <p class="goods-list-total">US$16.9</p>   
        </li> 
        <li>
            <van-image class="goods-list-img" src="" />
            <p class="goods-list-total">US$16.9</p>   
        </li>
        <li>
            <van-image class="goods-list-img" src="" />
            <p class="goods-list-total">US$16.9</p>   
        </li> 
        <li>
            <van-image class="goods-list-img" src="" />
            <p class="goods-list-total">US$16.9</p>   
        </li>
        <li>
            <van-image class="goods-list-img" src="" />
            <p class="goods-list-total">US$16.9</p>   
        </li> 
        <li>
            <van-image class="goods-list-img" src="" />
            <p class="goods-list-total">US$16.9</p>   
        </li>
    </ul>
</template>
<script>
import {Image} from 'vant'
export default {
   components:{
       [Image.name]:Image
   } 
}
</script>
<style lang="less" scoped>
.goods-list{padding:0 6px;display:flex;flex-wrap:wrap;
    li{margin:20px 0 0 10px;
        .goods-list-img{width:108px;height:140px;}
        .goods-list-total{padding-top:10px;font-size:14px;}
    }
}
</style>