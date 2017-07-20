<template>
    <div class="tmpl">
        <myswipe :swipeurl="'api/getthumimages/'+this.$route.params.detailid"></myswipe>
        <div class="goodsInfoStyle">
            <h4>{{detailInfo.title}}</h4>
            <p>市场价:￥<s>{{detailInfo.market_price}}</s>&nbsp;&nbsp;销售价:￥<span>{{detailInfo.sell_price}}</span></p>
            <!-- 数字选择子组件 -->
            <subnumber @numberChange="getSubNumberCount" class="subNumberStyle"></subnumber>
            <mt-button size="small" type="primary">立即购买</mt-button>
            <mt-button @click="addTocart" size="small" type="danger">加入购物车</mt-button>
       </div>

       <!-- 3.0 参数描述 -->
       <div class="goodsParamsStyle">
            <h5>商品参数</h5>
            <ul>
                <li>商品货号:{{detailInfo.goods_no}}</li> 
                <li>库存情况:剩余 {{detailInfo.stock_quantity}} 件</li>  
                <li>上架时间:{{detailInfo.add_time | dateFmt}}</li>     
            </ul>
       </div>
       <!-- 4.0 图文信息和商品评论 -->
       <div class="pictureAndTextStyle">
            <mt-button @click="goPictureAndText" plain size="large" type="primary">图文介绍</mt-button>

            <mt-button @click="goGoodsComment" class="goodsCommentStyle" plain size="large" type="danger">商品评论</mt-button>
       </div>
       <mysubcomment :myrouteid=this.$route.params.detailid></mysubcomment>
    </div>
</template>
<style scoped>
    .lunboStyle,.goodsInfoStyle,.goodsParamsStyle,.pictureAndTextStyle{
        margin: 10px;
        padding: 10px;
        border: 1px solid rgba(92,92,92,0.3);
        border-radius: 5px;
    }

    .goodsInfoStyle h4{
        font-size: 16px;
        color:#0094ff;
        border-bottom: 1px solid rgba(92,92,92,0.2);
        padding-bottom: 10px;
    }

    .goodsInfoStyle p span{
        font-size: 16px;
        color: red;
        font-weight: 700;
    }

    .goodsParamsStyle h5{
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(92,92,92,0.2);
    }

    .goodsParamsStyle ul{
        padding-left: 0px;
    }

    .goodsParamsStyle li{
        list-style: none;
        font-size: 15px;
    }

    .goodsCommentStyle{
        margin-top: 20px;
    }

    .subNumberStyle{
        margin-bottom: 5px;
    }
</style>
<script>
    import bus from '../../common/bus.js'
    import {addGoods,name} from '../../common/shopCartTool.js'
    import subnumber from '../conponents/subnumber.vue'
    import mysubcomment from '../conponents/subcomponent.vue'
    import common from '../../common/common.js'
    import myswipe from '../conponents/swipeconponents.vue'
        import {Toast} from 'mint-ui'

    export default{
        data(){
            return{
                detailInfo:{},
                myCount:1
            }
        },
        created(){
            this.getdetailInfo()
        }
        ,
        methods:{
            getdetailInfo(){
                const url = common.apihost+'api/goods/getinfo/'+this.$route.params.detailid
                this.$http.get(url).then(res=>{
                    this.detailInfo = res.body.message[0]
                    console.log( this.detailInfo)
                    
                })
            },
            getSubNumberCount(count){
                this.myCount = count
                // console.log('mycount='+this.myCount)
            },
            addTocart(){
                Toast({
                    message: '添加成功',
                    position: 'middle',
                    duration: 2000
                })
                //更改购物车徽标
                // bus.$emit('goodsCount',this.myCount)
                const goods={
                    goodsId:this.$route.params.detailid,
                    count:this.myCount
                }
                this.$store.commit('addgoods',goods)
                // addGoods(goods)
            },
            goPictureAndText(){
                this.$router.push({
                    name:'pictureAndText',params:{goodsId:this.$route.params.detailid}
                })
            },
            goGoodsComment(){
                this.$router.push({
                    path:'/shop/goodscomment',query:{
                        goodsId:this.$route.params.detailid
                    }
                })
            }
        },
        components:{
            myswipe,
            mysubcomment,
            subnumber
        }
    }
</script>