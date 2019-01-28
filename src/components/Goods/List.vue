<template>
    <div style="height:600px">
        <!--在加入高度的同时还得在text目录中的index.html中将doctype html删掉，不知道为甚麽-->
        <nav-bar title="商品展示"></nav-bar>
        <!--loadmore 中上拉加载，下拉刷新都是居于。子元素向上移动得是子元素的底边与父元素的底边平行的时候，在上拉才会进入检测区域-->
        <!--就是 loadmore的数据+1=可视区域（眼睛所能看到的部分）+卷入的高度（scrollTop）这样就进入了检测区域     -->
        <!--而可视区域就是父容器的高度，但是父容器的高度是由子容器撑开的，所以就得固定父容器的高度，不要让他被子容器撑开      -->
        <!--:auto-fill="false"自动帮助发请求填充父元素，:bottom-method="loadBottom"拉动函数，bottom-all-loaded为true中结拉动函数的调用-->
        <!--this.$refs.loadmore.onBottomLoaded();通知元素重新定位 -->
        <mt-loadmore :auto-fill="false" :bottom-method="loadBottom"  :bottom-all-loaded="isAllLoaded" ref="loadmore">
            <ul>
                <li v-for="good in goodsList" :key="good.id">
                    <router-link :to="{name:'good.detail',params:{id:good.id}}" >
                        <!--<img :src="good.img_url" alt="">-->
                        <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4212639482,1816603765&fm=27&gp=0.jpg" alt="图片">
                        <div class="title">{{good.title|convertStr(25)}}</div>
                        <div class="desc">
                            <div class="sell">
                                <span>￥{{good.sell_price}}</span>
                                <s>￥{{good.market_price}}</s>
                            </div>
                            <div class="detail">
                                <div class="hot">热卖中</div>
                                <div class="count">剩{{good.stock_quantity}}件</div>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </mt-loadmore>

    </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
       goodsList:[],
       page:1,
       isAllLoaded:false
    }
  },
  created(){
     this.page=this.$route.query.id||'1';
     this.loadByPage(this.page);
  },
  methods:{
    loadByPage(page){
       this.$axios.get('getgoods?pageindex='+page)
           .then(res=>{
              this.goodsList=res.data.message;
              this.page++;
           })
           .catch(err=>console.log('商品列表获取失败'));
    },
    concatByPage(page){
       this.$axios.get('getgoods?pageindex='+page)
           .then(res=>{
              if(res.data.message.length===0){
                 this.$toast('没有更多数据了');
                 this.isAllLoaded = true;
              }
              this.goodsList=this.goodsList.concat(res.data.message);
              this.$refs.loadmore.onBottomLoaded();
              this.page++;
           })
           .catch(err=>console.log('商品列表获取失败'));
    },
    loadBottom(){
       this.concatByPage(this.page);
    }
  }
}

</script>

<style scoped>
      ul{
         overflow:hidden;
         list-style:none;
      }
      li{
         width:50%;
         float:left;
         padding:6px;
         box-sizing:border-box;
      }
      li a:not(.mui-btn){
         margin:0px;
         padding:0;
         border:1px solid #5c5c5c;
         box-shadow:0 0 4px #666;
         width:100%;
         display:block;
      }
      li a:not(.mui-btn) img{
         width:100%;
      }
      .sell span{
          float:left;
          color:red;
          text-align:left;
      }
      .detail .hot{
          float:left;
          text-align:left;
          txt-size:15px;
      }
      .detail .count {
          float:right;
          text-align:right;
          font-size:15px;
      }
      <!--撑开。去除浮动没有的高度-->
      .detail{
          overflow:hidden;
      }
      .desc{
          color:rgba(92,92,92,0.8);
          background:rgba(0,0,0,0.2);
      }
      img{
          height:200px;
      }
</style>



