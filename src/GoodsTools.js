let obj={};
//获取所有商品数据
obj.getGoodsList=function(){
    return JSON.parse(window.localStorage.getItem('goods')||'{}');
}
//保存商品
obj.saveGoods = function(goodsList){
//本地存储
    window.localStorage.setItem('goods',JSON.stringify(goodsList));
}
//新增一个商品
obj.add=function(goods){
    //判断goodsList是否有该商品，有则追加，无则赋值
   let goodsList= this.getGoodsList();
   if(goodsList[goods.id]){
      //有就追加
      goodsList[goods.id]+=goods.num;
   }else{
      goodsList[goods.id]=goods.num;
   }
   //保存数据
   this.saveGoods(goodsList);
}
//获取购物车总数
obj.getTotalCount=function(){
   let goodsList = this.getGoodsList();
   let values = Object.values(goodsList);
   let num=0;
   values.forEach(val=>sum+=val);
   return sum;
}
export default obj;