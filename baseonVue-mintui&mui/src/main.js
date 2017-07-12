/**
 * 打包的入口文件中最重要的一个职责
 * 
 * 是使用Vue,渲染出我们项目启动之后用户看到的第一个页面
 * 
 */
import Vue from 'vue' //相当于es5 var Vue = require('vue')
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

// 导入基于Vue的第三方包
import MintUI from 'mint-ui'

// 使用基于Vue的第三方包
Vue.use(MintUI)
Vue.use(VueRouter)
Vue.use(VueResource)

// 统一导入css的地方
// 导入mint-ui
import 'mint-ui/lib/style.min.css'
// 导入mui
import '../statics/mui/css/mui.min.css'
import '../statics/mui/css/icons-extra.css'
// 导入自己的css
import '../statics/css/site.css'


//导入Vue项目中要渲染的第一个页面的文件
//vue-loader会帮我们自动把那个当文件组件导出
import App from './App.vue'

// 路由的设置
// 导入组件
import home from './components/home/home.vue'
import message from './components/message/message.vue' 
import shopcart from './components/shopcart/shopcart.vue' 
import settings from './components/settings/settings.vue' 
import newslist from './components/news/newslist.vue'

// 创建并且设置路由
const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:home},
        {path:'/message',component:message},
        {path:'/shopcart',component:shopcart},
        {path:'/settings',component:settings},
        {path:'/news/newslist',component:newslist}
    ],
    linkActiveClass:'mui-active'
})

new Vue({
    el:'#app',
    router, //相当于 router:router
    render:function(createElement){
        //这里的写法有很多，如果我们是直接导入单文件组件，就像下面这样写
        return createElement(App)
    }
})