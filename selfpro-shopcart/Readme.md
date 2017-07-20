#Vue&Webpack从入门到放弃14天
###重点包括（3种路由形式，父子及非父子组件间的传值）

##必须的内容及loader导入
```js
npm i vue --save
npm i vue-loader vue-template-compiler css-loader --save-dev
//尽量不用脚手架生成，如果要用使用simple版本
//npm install -g vue-cli
//vue init webpack-simple vue_project
```

##热重载/热更新
```js
  npm i webpack-dev-server -g//全局安装
  npm i webpack webpack-dev-server --save-dev//本地安装
  webpack-dev-server --progress --port 6008 --open --hot//热加载使用添加在package.json的script标签中，如果webpack安装失败可以在cnpm上下载。
```

##html-webpack-plugin插件的使用
```js
//使用template进行首屏绘制，在内存中产生Index.html
npm install html-webpack-plugin --save-dev
//需要在webpack.config.js中去配置这个html-webpack-plugin插件
var HtmlWebpackPlugin = require('html-webpack-plugin')

            plugins: [
                new HtmlWebpackPlugin({
                  filename: 'index.html', //以参数文件生成的最终的文件名称
                  template:'./template.html' //参照文件的路径
                })
            ]
```

##webpack初始配置
```js
//设置输入输出文件名，导入模块
 module.exports = {
         entry: './src/main.js',
         output: {
             path: __dirname + '/dist',
             filename: 'bundle.js'//会自动拼在我们index.html中，不用在template.html加script标签
         },
         module: {
             rules: [{
                 test: /\.vue$/,
                 use: [{
                     loader: "vue-loader"
                 }]
             }]
         }
```

##main初始，创建App.vue
```js
//main
import Vue from 'vue'
import App from './App.vue'
new Vue({
    el:'#app',
    render:h=>h(App)
})
//App.vue
<template>
  <div>
      <!--1.0 头部导航条-->
      hhhhhh

      <!--2.0 中间内容-->

      <!--3.0 底部的TabBar-->
  </div>
</template>
```

##图片预览vue-preview(photoswipe)
```js
//1.下载vue-preview，并在main中导入
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
//纯js的图片预览框架http://photoswipe.com/
//2.配置url-loader
            {
                  test:/\.(png|ttf|svg|gif)$/,
                  use:[{
                      loader:'url-loader'
                  }]
              }
//配置js部分
this.$http.get(url).then(res=>{
    res.body.message.forEach(item=>{
            item.w=600
            item.h=400
         })
    this.imgArray = res.body.message
```
```html
<!--3.vue-preview -html格式-->
<ul class="mui-table-view mui-grid-view mui-grid-9">
	 <li v-for="(item,index) in imgArray" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
     <img @click="$preview.open(index,imgArray)" class="preview-img imgXM" width="100" height="100":src="item.src"  >                    
	 </li>
</ul> 
<!--1、插件目前仅支持vue2.0以上版本
	2、img标签上的class不能去掉
	3、数据必须按照它的格式来，数组的每一项，必须要有src，w，h
	如果没有src图片可能出得来，也可能出不来
	如果w，h可能预览的大小出不来-->
```


##mui使用
```
github下载后将css导入，九宫格中使用的字体图标需要下载loader
同时在webpack中需要配置
            {
                  test:/\.(png|ttf)$/,
                  use:[{
                      loader:'url-loader'
                  }]
              }
```



##

##返回及底部栏v-show设置
```html
<!--//back按钮-->
<div v-show="isShowTabBar"@click='goBack'>&lt;返回</div>
<!--//底部栏-->
<mt-tabbar fixed v-show="!isShowTabBar">
```
```js
//创建时调用isShow
created(){
      this.isShow(this.$route.path)
    },
//默认为true
data(){
    return(){
        isShowTabBar:true
    }
},
//goback()为调用h5中的history返回
methods:{
      goBack(){
        this.$router.go(-1)
      },
      //v-show//用于判断当前路径是不是首页
      isShow(path){
        if(path=='/home'){
          this.isShowTabBar = false

        }else{
          this.isShowTabBar = true
          
        }
      }
    },
    //watch用于监听Vue实例中的元素变化，此处监听的对象是$route，每当变化将新值传入isShow函数
    watch:{
      '$route':function(newVal,oldVal){
        // console.log(newVal)
        this.isShow(newVal.path)
      }
    }
```

##filter----moment模块
npm i moment --save-dev//安装包，用于自定义格式化时间格式

```js
//main.js中配置过滤器
import moment from 'moment'
//定义的全局过滤器
//时间格式化过滤器
//参数1：过滤器的名称
//参数2：过滤器执行的函数
Vue.filter('dateFmt',(input,formatString)=>{
    const lastFormatString = formatString || "YYYY-MM-DD HH:mm:ss"

    //moment中接的,要格式化的原始数据,如果不传，就格式化当前时间
    //format格式化成什么样子,如果不传，就是原始的样子
    return moment(input).format(lastFormatString)
})

```

```html
<!--使用-->
<span>{{item.add_time | dateFmt("YYYY-MM-DD HH:mm")}}</span>
```

##横向滚动条
子盒子与父盒子宽度不同，父盒子设置x轴溢出自动，产生该区域的滚动条
```css
.father{
    overflow-x:auto
}
.son{
    min-width:900px;
}
.son li{
    padding:0 5px;
}
```
##路由的三种配置
```js
//1.router-link to 声明式路由
//2.编程式导航：通常在按钮中触发函数事件,触发的路由中参数被名称Name覆盖需要在main中配置，注意无论如何path都是必须的
import pictureAndText from './components/shop/pictureAndText.vue'
{name:'pictureAndText',path:'/goods/pictureAndText',component:pictureAndText}
//组件中路由跳转设置
this.$router.push({ name: 'pictureAndText', params: { goodsId: this.$route.params.goodsId }})
//子组件中以this.$route.params.goodsId获取父组件发送过来的params对象中的goodsId属性
//3.情况同上，main中正常配置
this.$router.push({
                    path:'/shop/goodscomment',query:{
                        goodsId:this.$route.params.detailid
                    }
                })
//但由于发送过来的对象是query需要在子组件中以this.$route.query.goodsId
```

##轮播图组件抽取,评论组件抽取（父子组件传值）
```js
//1.父组件导入并注册
import subswipe from xxxxxxxxx
export default{
        data(){
            return{}
        },
        created(){},
        methods:{},
        components:{
            subswipe
        }
    }
//2.tpl中设置自定义标签，且标签名为注册名
//3.其中可以设定一个属性用于子组件的路由接收，以更换图片
//3.1需要动态修改的值需要配置冒号以识别
    <subswipe swipeurl="api/getlunbo"></subswipe>
     <myswipe :swipeurl="'api/getthumimages/'+this.$route.params.detailid"></myswipe>
//4.子组件接收父级信息需要通过子组件的props
    props:['swipeurl']

```
##购物车购买数值的传值,并储存购物车数据(非父子组件传值)
五部分：1.加减栏组件；2.发送组件；3.首页组件；4.bus.js空Vue对象组件；5.localstorage缓存保存信息
<!--需求：将购买数存到home组件中的购物车顶上的徽标实时修改-->
<!--1.导入一个公共的空Vue对象，在发送和首页两个组件中同时导入
2.发送组件设置接收值的监听事件，同时触发自身函数,getSubNumberCount将改变的值接收-->
<!--这里的numberChange是subnumber加减栏组件发送到父级的事件，此时父级会触发getSubNumberCount-->
<!--加减栏中每个加减事件都会触发，将它组件中的this.count传到父级中
this.$emit('numberChange', this.count)-->
```js
//父级接收并改变自身的this.myCount
<subnumber v-on:numberChange="getSubNumberCount" class="subNumberStyle"></subnumber>
getSubNumberCount(count){
                this.myCount = count}
```
```js
//点击加入购物车触发，将this.myCount通过bus公共对象传到首页
bus.$emit('goodsCount',this.myCount)
//4.3将goods的id和count存储到localstorage
      const goods={
      goodsId:this.$route.params.detailid,
      count:this.myCount
       }
      addGoods(goods)

```
```js
//3.main中设置接收，并触发自己的事件改变徽标值
bus.$on('goodsCount',(goodsCount)=>{
    const oldVal = $('#badgeId').text()
    const lastVal = parseInt(oldVal)+goodsCount
    $('#badgeId').text(lastVal)
  })
```