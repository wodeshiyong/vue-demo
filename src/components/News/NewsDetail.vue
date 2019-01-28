<template>
    <div class="tmpl">
        <nav-bar  :title="title"> </nav-bar>
        <div class ='news-title'>
            <p>{{newsDetail.title}}</p>
            <div>
                <span>{{newsDetail.click}}</span>
                <span>分类：民生经济</span>
                <span>添加时间：{{newsDetail.add_time|convertTime('YYYY-MM-DD')}}</span>
            </div>
        </div>
        <!--用v-html绑定的属性想要给它添加样式，就必须在全局样式里面进行更改，在本组件中的style里面更不行，因为他有scoped，如果去掉scoped也可以-->
        <div class = 'news-contfent' v-html="newsDetail.content">新闻细节</div>
    </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
       newsDetail:{},
       title:''
    }
  },
  created(){
     let id = this.$route.query.id;
     this.$axios.get('getnew/'+id)
          .then(res=>{
              this.newsDetail = res.data.message[0];
          })
          .catch(err=>console.log('错误'));
  },
  beforeRouteEnter(to,from,next){
      let title='';
      if(from.name==null){
          if(to.name=='news.detail'){
               title='新闻详情';
          }else if(to.name=='photo.info'){
               title='商品图文介绍';
          }
      }else if(from.name=='news.list'){
           title='新闻详情';
      }else if(from.name=='good.detail'){
          title='商品图文介绍';
      }

      next(vm=>{
           vm.title=title;
      });
  }
}

</script>

<style scoped>
       .news-title p{
             color:#0a87f8;
             font-size:20px;
             font-weight:bold;
       }
       .news-title span{
             margin-right:30px;
       }
       .news-title{
             margin-top:5px;
             border-bottom:1px solid rgba(0,0,0,0.2);
       }
       .news-content{
             margin-bottom:150px;
             padding:10px 5px;
       }
       .news-contfent{
             width:100%;
       }
</style>
<!--beforeRouteEnter(to,from,next){-->
<!--判断from 万一是from的name是空，说明是粘贴地址栏，继续判断，根据to来判断titile-->
<!--如果from 是新闻列表，就给title为新闻详情-->
<!--如果from 是商品详情，就给title为商品图文介绍-->
<!---->
<!--next();-->
<!--}-->


