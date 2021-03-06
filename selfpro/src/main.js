import Vue from 'vue'
import Mint from 'mint-ui'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VuePreview from 'vue-preview'
import moment from 'moment'
Vue.use(VueRouter)//路由
Vue.use(VueResource)//请求
Vue.use(Mint)//UI
Vue.use(VuePreview)
//css
import 'mint-ui/lib/style.min.css'
import '../statics/mui/dist/css/mui.min.css'

//自己的模块
import App from './App.vue'
import home from './components/home/home.vue'
import news from './components/news/news.vue'
import newsdetail from './components/news/newsdetail.vue'
import category from './components/category/category.vue'
import categorydetail from './components/category/photodetail.vue'
import shop from './components/shop/shop.vue'
import shopdetail from './components/shop/shopdetail.vue'
import pictureAndText from './components/shop/pictureAndText.vue'
import shopcomment from './components/shop/goodscomment.vue'
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

const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:home},
        {path:'/news',component:news},
        {path:'/news/newsdetail/:newsid',component:newsdetail},
        {path:'/category',component:category},
        {path:'/category/photodetail/:photoid',component:categorydetail},
        {path:'/shop',component:shop},
        {path:'/shop/shopdetail/:detailid',component:shopdetail},
        {name:'pictureAndText',path:'/goods/pictureAndText',component:pictureAndText},
        {path:'/shop/goodscomment',component:shopcomment}
    ]
})

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})