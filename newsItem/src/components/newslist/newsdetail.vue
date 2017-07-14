<template>
    <div class="tmpl">
        <div class="title">
            <h3>{{newsInfo.title}}</h3>
            <p>
                {{newsInfo.add_time | dateFmt}}&nbsp;&nbsp;
                {{newsInfo.click}}次浏览&nbsp;&nbsp;分类:民生经济
            </p>
        </div>
        <div class="content">
            <div v-html="newsInfo.content"></div>
        </div>
            <mycomment :myrouteid="this.$route.params.newsId"></mycomment>

    </div>
</template>
<style scoped>
    .title , .content{
        padding: 6px;
    }

    .title h3{
        font-size: 16px;
        color:#0094ff;
    }

    .title p{
        font-size: 14px;
        color: #333333;
    }

    .title{
        border-bottom: 1px solid rgba(92,92,92,0.4)
    }
</style>
<script>
import subcomponent from  '../subcomponents/subcomponent.vue'
import common from '../../common/common.js'
export default {
    data(){
        return {
            newsInfo :{}
        }
    },
    created(){
        this.getNewsDetailData()
    },
    methods:{
        getNewsDetailData(){
            console.log('发送了请求')
            console.log(this.$route.params)
            const url = common.apihost+ "api/getnew/"+this.$route.params.newsId
            this.$http.get(url).then(res=>{
                this.newsInfo = res.body.message[0]
                // console.log(this.newsInfo)
            })

        }
    },
      components:{
        mycomment:subcomponent
  }
}
</script>
