<template>
    <!--在created里的一系列数据-->
    <!--1.在里获取路由参数categoryId-->
    <!--2.通过url拼接参数发请求-->
    <!--3.获取数据做渲染-->
    <!--beforeRouteUpdate这个函数的作用就是，在当前路由改变时，但当前组件被复用简单就是说路径从foo/1和foo/2之间相互跳转-->

    <div class="tmpl">
        <nav-bar title="图文列表"></nav-bar>
        <div class="photo-header">
            <ul>
                <li v-for="c in categorys" :key="c.id">
                    <a @click='loadImgsByCatagoryId(c.id)'   href="javascript:;">{{c.title}}</a>
                </li>
            </ul>
        </div>
        <!--下方的图片-->
        <div class="photo-list">
            <ul>
                <li v-for="img in imgs" :key="img.id">
                    <router-link  :to="{name:'photo.detail',query:{id:img.id}}">
                        <!--由于请求的图片加载不出来，不知道为啥就是显示不到页面上，所以就得在网上自己找的图-->
                        <!--懒加载时图片的地址必须是v-for遍历出来的img对象点出的-->
                        <!--<img v-lazy="img.img_url" alt="图片">-->
                        <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3534289497,3677101726&fm=27&gp=0.jpg" alt="图片">
                        <p>
                            <span>{{img.title}}</span>
                            <br>
                            <span>{{img.zhaiyao}}</span>
                        </p>
                    </router-link>
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
      imgs:[],
      categorys:[]
    }
  },
  beforeRouteUpdate(to ,from,next){
      this.loadImgsByCatagoryId(to.params.categoryId);
      next();
  },
  created(){
      let categoryId = this.$route.params.categoryId;
      this.loadImgsByCatagoryId(categoryId);

      this.$axios.get('/getimgcategory')
           .then(res=>{
                this.categorys  = res.data.message;
                this.categorys.unshift({
                     id:0,
                     title:'全部'
                });

           })
           .catch(err=>console.log('错误'));
  },
  methods:{
      loadImgsByCatagoryId(categoryId){
           this.$axios.get('getimages/'+categoryId)
               .then(res=>{
                  this.imgs = res.data.message;
                  if(this.imgs.length===0){
                     this.$toast({
                        message:'没有内容了'
                     })
                }
                })
               .catch(err=>console.log('错误'));
      }

  }
}

</script>

<style scoped>

      .photo-header li{
            list-style:none;
            display:inline-block;
            margin-left:10px;
            height:30px;
      }
      .photo-header ul{
            white-space:nowrap;
            overflow-x:auto;
            padding-left:0;
            margin:5;
      }
      .photo-list li{
            list-style:none;
            position:relative;
      }
      .photo-list li img{
            width:100%;
            height:230px;
            vertical-align:top;
      }
      .photo-list ul{
            padding-left:0;
            margin:0;
      }
      .photo-list p{
            position:absolute;
            bottom:0;
            color:white;
            background:rgba(0,0,0, 0.3);
            margin-bottom:0;
      }
       .photo-list p span:nth-child(1){
            font-weight:bold;
            font-size:20px;
            color:skyblue;
            margin-bottom:10px;
       }

</style>
<!--图片懒加载样式，在css进行配置，还要在上面img进行属性绑定-->
<!--image[lazy=loading]{-->
<!--width:40px;-->
<!--height:300px;-->
<!--margin:auto;-->
<!--}-->