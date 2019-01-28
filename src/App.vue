<template>
  <div id="app">
    <mt-header  title="我们的项目"></mt-header>
    <router-view></router-view><!--记得加这个才会显示出个页面的内容-->
    <mt-tabbar v-model="selected"  fixed="true">
      <!--之所以给加了个事件，是因为直接 用watch方法后面跳转就会出现问题，回跳不行，因此就用绑定函数方法进行跳转-->
      <!--用this.$nextTick，是因为vue中子组件向父组件传值时，在你获取到selected时值还没传完呢，所以用此方法-->
      <!--在vue完成渲染任务以后的执行，紧急父组件不可以有事件-->
      <mt-tab-item id="home">
        <img slot="icon" src="../static/img/首页.png" @click="changepage">
        首页
      </mt-tab-item>
      <mt-tab-item id="member">
        <img slot="icon" src="../static/img/会员.png" @click="changepage">
        会员
      </mt-tab-item>
      <mt-tab-item id="shopcart">
        <img slot="icon" src="../static/img/购物车.png" @click="changepage">
        购物车<mt-badge type="error" size="small">{{num}}</mt-badge>
      </mt-tab-item>
      <mt-tab-item id="search">
        <img slot="icon" src="../static/img/查找.png" @click="changepage">
        查找
      </mt-tab-item>
    </mt-tabbar>

  </div>
</template>


<script>
import EventBus from './EventBus.js';

export default {
  name: 'app',
  data () {
    return {
      selected: '',
      num:0
    }
  },
  created(){
     EventBus.$on('addShopcart',data=>{
          this.num+=5;
     })
  },
  methods:{
      changepage(){
        this.$nextTick(function(){
             this.$router.push({
                 name:this.selected
            })
        });
      }
  }
}
</script>

<style>
     body{
        margin:0;
     }
</style>
