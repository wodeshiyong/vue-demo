<template>
    <div class="tmpl">
        <nav-bar title="新闻列表"></nav-bar>
        <div class = 'demo'>
            <ul>
                <li v-for="news in newsList" :key="news.id">
                    <router-link  :to="{name:'news.detail',query:{id:news.id}}">
                        <img :src="news.img_url" alt="图片">
                        <div>
                            <span class="text">{{news.title}}</span>
                            <div class = 'news-desc'>
                                <p>点击数：{{news.click}}</p>
                                <p>发表时间：{{news.add_time|convertTime('YYYY-MM-DD')}}</p>
                            </div>
                        </div>
                    </router-link >
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      newsList:[]
    }
  },
  created(){
    this.$axios.get('getnewslist')
        .then(res=>{
           this.newsList = res.data.message;
        })
        .catch(err=>console.log('错误'));
  }
}

</script>

<style scoped>
  body{
    margin:0;
    padding:0;
  }
  a{
    text-decoration:none;
  }
   li{
     list-style:none;
   }
   .demo a{
     display:block;
     width:330px;
     height:44px;
     padding:10px 15px;
   }
   .demo img{
     float:left;
     width:42px;
     height:42px;
     margin-right:20px;
   }
   .demo a div{
      float:left;
      width:238px;
      margin-right:20px;
   }
   .demo span{
      display:block;
      width:100%;
      font-size:17px;
      line-height:21px;
   }
   .demo a p{
      float:left;
      font-size:14px;
      line-height:21px;
   }
   .demo p:nth-child(2){
      float:right;
   }

</style>



