<template>
    <div>
        <nav-bar title="商品详情"/>
        <div class="outer-swiper">
            <div class="swiper">
                <mt-swipe :auto="4000">
                    <!--<mt-swipe-item  v-for="(img,index) in imgs" :key="index">-->
                    <!--<img :src="img.img" alt="">-->
                    <!--</mt-swipe-item>-->
                    <mt-swipe-item>
                        <img class='iimg' src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3531713164,205834745&fm=27&gp=0.jpg" alt="">
                    </mt-swipe-item>
                    <mt-swipe-item>
                        <img class='iimg' src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3649680304,2982869454&fm=27&gp=0.jpg" alt="">
                    </mt-swipe-item>
                </mt-swipe>
            </div>
        </div>
        <div class="product-desc">
            <ul>
                <li>
                    <span class="product-desc-span">{{goodsInfo.title}}</span>
                </li>
                <li class="price-li">
                    市场价值: <s>￥{{goodsInfo.market_price}}</s>
                    销售价：<span>￥{{goodsInfo.sell_price}}</span>
                </li>
                <li class="number-li">
                    购买数量： <span @click="add">+</span>
                    <span>{{pickNum}}</span>
                    <span @click="substract">-</span>
                </li>
                <li>
                    <mt-button type="primary">立即购买</mt-button>
                    <mt-button type="danger" @click="insertBall">加入购物车</mt-button>
                </li>
            </ul>
        </div>
        <!--加入购物车的小球先移除，之所以用v-if是因为他有过渡效果-->
        <transition name="ball" @after-enter="afterEnter">
            <div class="ball" v-if="isExit"></div>
        </transition>
        <div class="product-props">
            <ul>
                <li>商品参数</li>
                <li>商品货号:{{goodsInfo.goods_no}}</li>
                <li>库存情况:{{goodsInfo.stock_quantity}}件</li>
                <li>上架时间:{{goodsInfo.add_time|convertTime('YYYY-MM-DD')}}</li>
            </ul>
        </div>
        <div class="product-info">
            <ul>
                <li>
                    <mt-button @click='showPhotoInfo' type="primary" size="large" plain>图文介绍</mt-button>
                    <mt-button @click='goodsComment' type="danger" size="large" plain>商品评价</mt-button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import EventBus from '@/EventBus.js'
import GoodsTools from '@/GoodsTools.js';

export default {
  name: '',
  data () {
    return {
       goodsInfo:{},
       isExit:false,
       pickNum:1
    }
  },
  methods:{
      insertBall(){
          this.isExit=true;
 EventBus.$emit('addShopcart',this.pickNum);
      },
      afterEnter(){
          this.isExit=false;


          GoodsTools.add({
              id:this.goodsInfo.id,
              num:this,pickNum
          })
      },
      showPhotoInfo(){
          this.$router.push({
              name:'photo.info',
              query:{
                   id:this.$route.params.id
              }
          })
      },
      goodsComment(){
          this.$router.push({
              name:'goods.comment',
              query:{
                   id:this.$route.params.id
              }
          })
      },
      add(){
          if(this.pickNum>=this.goodsInfo.stock_quantity){
              return;
          }
          this.pickNum++;
      },
      substract(){
          if(this.pickNum<=1){
             return;
          }
          this.pickNum--;
      }
  },
  created(){
     let imgid=this.$route.params.id;
     this.$axios.get('goods/getinfo/'+imgid)
         .then(res=>{
            this.goodsInfo  = res.data.message[0];
         })
         .catch(err=>console.log('商品详情异常'));
  }

}

</script>

<style scoped>
       .iimg{
            width:100%;
            height:250px;
       }
       .mint-swipe{
           width:100%;
           height:250px;
       }
       .ball-enter-active{
           animation:bounce-in 1s;
       }
       <!--小球飞-->
       @keyframes bounce-in{
           0%{
              transform:translate(0,0);
           }
           50%{
              transform:translate(180px,-150px);
           }
           75%{
              transform:translate(200px,0px);
          }
          100%{
              transform:translate(140px,600px);
          }
       }
       .swiper{
           border:1px solid rgba(0,0,0,0.2);
           margin:8px;
           width:95%;
           border-radius:15px;
           over-flow:hidden;
       }
       .outer-swiper,.product-desc,.product-props,.product-info{
           border-radius:5px;
           border:1px solid rgba(0,0,0,0.2);
           margin:3px;
       }
       .outer-swiper ul,.product-desc ul,.product-props ul,.product-info ul{
           padding:0;
       }
       .product-desc ul li,.product-props ul li,.product-info ul li{
           list-style:none;
           font-size:15px;
           color:rgba(0,0,0,0.5);
           margin-top:8px;
       }
       .product-desc ul:nth-child(1) span{
           color:blue;
           font-size:22px;
           font-weight:bold;
       }
       .product-desc ul:nth-child(1){
           border-bottom:1px solid rgba(0,0,0,0.5);
       }
       .product-desc ul,.product-info ul,.product-props ul{
           padding-left:10px;
       }
       .price-li span{
           color:red;
           font-size:25px;
       }
       .price-li s{
           margin-right:16px;
       }

       .number-li span{
           display:inline-block;
           border:2px solid rgba(0,0,0,0.1);
           width:25px;
       }

       .product-props ul:nth-child(1){
           text-align:left;
       }
       .product-props ul:not(:nth-child(1)){
           margin-left:4px;
       }
       .product-info ul{
           margin-bottom:70px;
           padding:0 5px;
       }
       .number-li span{
           text-align:center;
       }
       .number-li:nth-child(2){
           width:40px;
       }
       .ball{
           position:absolute;
           top:440px;
           left:120px;
           display:inline-block;
           border-radius:50%;
           background:red;
           width:24px;
           height:24px;
           z-index:999;
       }
</style>
<!--添加到本地存储-->
<!--GoodsTools.add({-->
<!--id:this.goodsInfo.id;-->
<!--num:this,pickNum;-->
<!--})-->


