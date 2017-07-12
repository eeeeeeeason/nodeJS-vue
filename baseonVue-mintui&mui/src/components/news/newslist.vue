<template>
  <div class="tmpl">
      我是新闻列表
  </div>
</template>

<script>
    import common from '../common/common.js'

    export default {
        created(){
            this.getNewsListData()
        },
        methods:{
            //es6中关于函数还有另外一种写法
            getNewsListData(){
                const url =common.apihost + "api/getnewslist"

                //es6中的箭头函数，如果只有一个参数`()`可以省略
                this.$http.get(url).then(response=>{
                    console.log(response.body)
                },(error)=>{

                })
            }
        }
    }
</script>

<style>

</style>
