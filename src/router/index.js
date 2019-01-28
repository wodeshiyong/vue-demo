import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home/Home'
import Member from '@/components/Member/Member'
import Search from '@/components/Search/Search'
import Shopcarts from '@/components/Shopcarts/Shopcarts'

import NewsList from '@/components/News/NewsList'
import NewsDetail from '@/components/News/NewsDetail'
import PhotoList from '@/components/Photo/PhotoList'
import PhotoDetail from '@/components/Photo/PhotoDetail'
import goodsList from '@/components/Goods/List'
import GoodsDetail from '@/components/Goods/GoodsDetail'
import GoodsComment from '@/components/Goods/GoodsComment'




Vue.use(Router)

export default new Router({
//mode:'history',
  routes: [
  {
            path: '/',
            redirect: { name: 'home'}//一开始就进入到home主页去
  },{
            path: '/home',
            name: 'home',
            component: Home
    },{
            path: '/member',
            name: 'member',
            component: Member
    },{
            path: '/search',
            name: 'search',
            component: Search
    },{
            path: '/shopcart',
            name: 'shopcart',
            component: Shopcarts
    },{//新闻列表
            path: '/news/list',
            name: 'news.list',
            component: NewsList
    },{//新闻细节
            path: '/news/detail',
            name: 'news.detail',
            component: NewsDetail
    },{//图文分享
            path: '/photo/list/:categoryId',
            name: 'photo.list',
            component: PhotoList
    },{//图文详情
            path: '/photo/detail',
            name: 'photo.detail',
            component: PhotoDetail
    },{//商品列表
            path: '/goods/list',
            name: 'goods.list',
            component: goodsList
    },{//商品详情
            path: '/goods/detail/:id',
            name: 'good.detail',
            component: GoodsDetail
    },{//商品图文介绍
            path: '/goods/photo/info',
            name: 'photo.info',
            component:NewsDetail
    },{//商品评论
            path: '/goods/comment',
            name: 'goods.comment',
            component:GoodsComment
    },
  ]
})
