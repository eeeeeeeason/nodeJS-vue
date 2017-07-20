<template>
    <div class='tmpl'>
        <div class="mui-content" style="background-color:#fff">
            <ul class="mui-table-view mui-grid-view">
                    <li v-for="item in goodsArr" :key="item.id" class="mui-table-view-cell mui-media mui-col-xs-6">
                         <div class="goodsContentStyle">
                            <router-link :to="'/shop/shopdetail/'+item.id">
                                <img class="mui-media-object" :src="item.img_url">
                                <div class="mui-media-body">
                                    <!-- 1.0 标题 -->
                                    <p>{{item.title}}</p>
                                    <!-- 2.0 价格信息 -->
                                    <div class="price">
                                        <span>{{item.sell_price}}</span>
                                        <s>{{item.market_price}}</s>
                                    </div>
                                    <!-- 3.0 提示信息 -->
                                    <div class="tips">
                                        <span>热卖中</span>
                                        <span>剩余{{item.stock_quantity}}件</span>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </li>
            </ul>
        </div>
    </div>
</template>
    
<style scoped>
    .goodsContentStyle{
        padding: 10px;
        border:1px solid rgba(92,92,92,0.3);
        border-radius: 5px;
        box-shadow: 0px 0px 5px rgba(92,92,92,0.3) 
    }

    .mui-grid-view .goodsContentStyle .mui-media-body{
        height: 100px;
    }

    .mui-media-body p{
        font-size: 12px;
        text-align: left;
        color: black;
        overflow:hidden; 
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2; 
        /* 两行显示不下... */
        /* http://blog.csdn.net/bing0728004/article/details/51509435 */
    }

    .price{
        margin-top: 10px;
        text-align: left;
        background-color: #f0f0f0;
        padding-top: 10px;
        height: 35px;
    }

    .price span{
        color: red;
        font-size: 16px;
    }

    .price s{
        margin-left: 10px;
        font-size: 12px;
        color: gray;
    }

    .tips{
        text-align: left;
        background-color: #f0f0f0;
        padding-top: 10px;
        height: 30px;
        font-size: 13px;
        display: flex;
        justify-content: space-between
    }
</style>
<script>
    import common from '../../common/common.js'
    export default{
        data(){
            return {
                goodsArr:[]
            }
        },
        created(){
            this.getgoodsinfo()
        }
        ,
        methods:{
            getgoodsinfo(){
                const url = common.apihost+'api/getgoods'
                this.$http.get(url).then(res=>{
                    this.goodsArr = res.body.message
                    // console.log(this.goodsArr)
                    
                })
            }
        }
    }
</script>