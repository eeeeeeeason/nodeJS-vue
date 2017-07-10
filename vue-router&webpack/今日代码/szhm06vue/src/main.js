import Vue from 'vue' //const Vue = require('vue')

import App from './App.vue' //es6的导入模块写法，相当于es5的require

//创建一个Vue的根实例
new Vue({
    el:"#app",
    render:function(createElement){
        return createElement(App) //告诉我们Vue实例，到时候启动项目，渲染的就是我们App.vue
    }//根实例将那个组件渲染到id=app的div中去
})