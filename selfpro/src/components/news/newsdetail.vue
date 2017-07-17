<template>
    <div class="tmpl">
        <div class="title">
            <h3>{{newsdetail.title}}</h3>
            <p>
                {{newsdetail.add_time | dateFmt}}&nbsp;&nbsp;
                {{newsdetail.click}}次浏览&nbsp;&nbsp;分类:民生经济
            </p>
        </div>

        <div class="content">
            <div v-html="newsdetail.content"></div>
        </div>
        <mycomment :myrouteid="this.$route.params.newsid"></mycomment>
        
    </div>
</template>
<script>
    import mycomment from '../conponents/subcomponent.vue'
    import common from '../../common/common.js'
    export default{
        data(){
            return {
                newsdetail:{}
            }
        },
        created(){
            this.getNewsDetailData()
        }
        ,
        methods:{
            getNewsDetailData(){
                const url = common.apihost+'api/getnew/'+this.$route.params.newsid
                this.$http.get(url).then((res)=>{
                    this.newsdetail = res.body.message[0]
                    console.log(this.newsdetail)
                })
            }
        },
        components:{
            mycomment
        }
    }
</script>