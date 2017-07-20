<template>
   <div class='tmpl'>
        <!-- 1.0 标题 -->
        <div class="title">
            <h4>{{goodsArr.title}}</h4>
        </div>

        <!-- 2.0 内容 -->
        <div class="content">
            <div v-html="goodsArr.content"></div>
        </div>
   </div>
</template>
    
<style scoped>
    .title,.content{
        padding: 5px;
    }

    .title h4{
        font-size: 16px;
        color:#0094ff;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(92,92,92,0.3)
    }
</style>
<script>
    import common from '../../common/common.js'
    export default{
        data(){
            return{
                goodsArr:{}
            }
        },
        created(){
            this.getgoodsinfo()
        }
        ,
        methods:{
            getgoodsinfo(){
                const url = common.apihost+'api/goods/getdesc/'+this.$route.params.goodsId
                this.$http.get(url).then(res=>{
                    // console.log(res)
                    this.goodsArr = res.body.message[0]
                    // console.log(this.goodsArr)
                })
            }
        }
    }
</script>