<template>
    <div class="tmpl">
         <div class="title">
            <h4>{{imgInfo.title}}</h4>
            <p>
                {{imgInfo.add_time | dateFmt('YYYY-MM-DD')}}&nbsp;&nbsp;{{imgInfo.click}}次浏览
            </p>
        </div>
        <!--图片缩略图-->
        <div class="mui-content">
		        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li v-for="(item,index) in imgArray" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                            <img @click="$preview.open(index,imgArray)" class="preview-img imgXM" width="100" height="100":src="item.src"  >
		                    
		                    </li>
		        </ul> 
		</div>
        <div class="mydetail" v-html="imgInfo.content"></div>
        <mysubcomment :myrouteid=this.$route.params.photoid></mysubcomment>
    </div>
    
</template>
<style scoped>
    .imgXM{
        width: 100%;
        height:80%
    }
</style>
<script>
    import common from '../../common/common.js'
    import mysubcomment from '../conponents/subcomponent.vue'
    export default{
        data(){
            return{
                imgInfo:{},
                imgArray:[]
            }
        },
        created(){
            this.getparams()
            this.getImgArr()
        }
        ,
        methods:{
            getparams(){
                const url = common.apihost+'api/getimageInfo/'+this.$route.params.photoid
                this.$http.get(url).then(res=>{
                    this.imgInfo = res.body.message[0]
                    console.log(this.imgInfo)
                    
                })

            },
            getImgArr(){
                const url = common.apihost+'api/getthumimages/'+this.$route.params.photoid
                this.$http.get(url).then(res=>{
                    res.body.message.forEach(item=>{
                        item.w=600
                        item.h=400
                    })
                    this.imgArray = res.body.message
                    console.log(this.imgArray)

                })
            }
        },
        components:{
            mysubcomment
        }
    }
</script>