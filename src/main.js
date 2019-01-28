// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//配置axios用来请求数据，并挂载在vue上
import Axios from 'axios'
//配置公共url
Axios.defaults.baseURL = 'http://www.sinya.online/api/'

Vue.prototype.$axios = Axios

//配置mintUI
import MintUI from  'mint-ui'
import 'mint-ui/lib/style.css'   //默认在node_modules下的文件夹
//配置请求拦截器，显示loading图标
Axios.interceptors.request.use(function(config){
     MintUI.Indicator.open({
          text:'加载中...'
     });
     return config;
});
//配置请求拦截器，关闭图标
Axios.interceptors.response.use(function(response){
//response.config类似上面的config
     MintUI.Indicator.close();
     return response;
});
//安装插件，注册全局组件及挂载在属性
Vue.use(MintUI)

//配置组建并注册全局组件
import MyUL from '@/components/common/MyUl'
import MyLi from '@/components/common/MyLi'
import NavBar from '@/components/common/NavBar'
Vue.component(MyUL.name,MyUL);
Vue.component(MyLi.name,MyLi);
Vue.component(NavBar.name,NavBar);

import Comment from '@/components/common/common'
Vue.component(Comment.name,Comment);

//定义全局日期改制
import Moment from 'moment'
//{{'xxx'|convertTime(yyyy-mm-dd_}}
Vue.filter('convertTime',function(data,formatStr){
    return Moment(data).format(formatStr);
})
//将时间对比改成中文显示
Moment.locale('zh-cn');
//时间的对比
Vue.filter('relativeTime',function(previousTime){
    return Moment(previousTime).fromNow();
})
//处理字符串过长的处理
Vue.filter('convertStr',function(str,count){
    return str.substring(0,count)+'...';
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
