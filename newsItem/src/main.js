import Vue from 'vue'
import Mint from 'mint-ui'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import moment from 'moment'
Vue.use(Mint)
Vue.use(VueRouter)
Vue.use(VueResource)
import 'mint-ui/lib/style.css'

import App from './App.vue'
import home from './components/home/home.vue'
import category from './components/category/category.vue'
import newslist from './components/newslist/newslist.vue'
import newsdetail from './components/newslist/newsdetail.vue'
import MintUI from 'mint-ui';
import '../statics/css/site.css'
import '../statics/css/mui.min.css'
Vue.use(MintUI)
const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:home},
        {path:'/category',component:category},
        {path:'/news/newslist',component:newslist},
        {path:'/news/newsdetail/:newsId',component:newsdetail}
        
    ]
})

//过滤器
Vue.filter('dateFmt',(input,formatString)=>{
    const lastFormatString = formatString ||"YYYY-MM-DD HH:mm:ss"
    return moment(input).format(lastFormatString)
})

new Vue({
    el:"#app",
    router,
    render:h=>h(App)
})