<template>
    <div >
        <nav-bar title="图文详情"></nav-bar>
        <div class="photo-title">
            <p>{{info.title}}</p>
            <span>{{info.add_time|convertTime('YYYY-MM-DD')}}</span>
            <span>{{info.click}}次浏览</span>
            <span>分类:民生经济</span>
        </div>
        <ul>
            <li v-for="(img,index) in imgs" :key="index">
                <img :src="img.src" alt="图片">
            </li>
        </ul>
        <div  class = 'photo-desc'>
            <p v-html="info.content"></p>
        </div>
        <!--评论组建-->
        <comment  :cid="$route.query.id"></comment>
    </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      info:{},
      imgs:[]
    }
  },
  created(){
      let id = this.$route.query.id;
      this.$axios.get('getimageInfo/'+id)
          .then(res=>{
              this.info = res.data.message[0];
          })
          .catch(err=>console.log('图文详情获取失败，错误'));

          this.$axios.get('getthumimages/'+id)
              .then(res=>{
                   this.imgs = res.data.message;
              })
              .catch(err=>console.log('图片缩略图获取失败'));
  }
}

</script>

<style scoped>
      ul{
          list-style:none;
          margin:0;
          padding:0;
      }
     .photo-title{
         overflow:hidden;
     }
    .photo-title  .photo-desc{
         border-bottom:1px solid rgba(0,0,0,0.2);
         padding-bottom:5px;
         margin-bottom:5px;
         padding-left:5px;
    }
    .photo-title p{
        color:#13c2f7;
        font-size:20px;
        font-weight:bold;
    }
    .photo-title span{
        margin-right:20px;
    }
    .photo-desc p{
        font-size:18px;
    }
</style>


