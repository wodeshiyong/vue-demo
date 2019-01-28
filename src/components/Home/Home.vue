<template>
    <div >
        <!--轮播图-->
        <mt-swipe :auto="4000">
            <!--<mt-swipe-item  v-for="(img,index) in imgs" :key="index">-->
            <!--<img :src="img.img" alt="">-->
            <!--</mt-swipe-item>-->
            <mt-swipe-item>
                <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3531713164,205834745&fm=27&gp=0.jpg" alt="">
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3649680304,2982869454&fm=27&gp=0.jpg" alt="">
            </mt-swipe-item>
        </mt-swipe>
        <!--九宫格-->
        <div class = 'grid'>
            <my-ul>
                <my-li  v-for="(grid,index) in grids" :key="index">
                    <router-link :to="grid.router">       <!--被称为描点，和a标签一样能够实现跳转功能-->
                        <img class = 'iimg' :src='grid.className'>
                    </router-link>
                    <span>{{grid.title}}</span>
                </my-li>
            </my-ul>

        </div>

    </div>
</template>

<script>
export default {
  data () {
    return {
      imgs:[],
      grids:[
            {className:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1771679190,2707741714&fm=27&gp=0.jpg',
             title:'新闻资讯',router:{name:'news.list'}},
            {className:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1771679190,2707741714&fm=27&gp=0.jpg',
            title:'图文分享',router:{name:'photo.list',params:{categoryId:0}}},
            {className:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1771679190,2707741714&fm=27&gp=0.jpg',
             title:'商品展示',router:{name:'goods.list',query:{id:1}}},
            {className:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1771679190,2707741714&fm=27&gp=0.jpg',
            title:'新闻资讯',router:{name:'news.list'}}, {className:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1771679190,2707741714&fm=27&gp=0.jpg',
             title:'新闻资讯',router:{name:'news.list'}},
            {className:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1771679190,2707741714&fm=27&gp=0.jpg',
            title:'新闻资讯',router:{name:'news.list'}},
            ]
    }
  },
  created(){
      this.$axios.get('getlunbo')
          .then(res=>{
              this.imgs = res.data.message;
          })
          .catch(err=>console.log('错误'));
  }

}

</script>

<style scoped>
    .mint-swipe{
        height:250px;
    }
    img{
        width:100%;
        height:250px;
    }
     ul{
        margin:0;
        padding:0;
        list-style:none;
        display:flex;
        flex-wrap:wrap;
        justify-content:space-between;
        text-align:center;
    }
     li{
        width:130px;
        height:100px;
    }
    .iimg{
       width:100%;
       height:60px;
    }


</style>



