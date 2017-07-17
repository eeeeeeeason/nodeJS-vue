<template>
    <div>
        <div class="lunboStyle">
            <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in swipeArray" :key="item.src">
                <a href="item.url">
                <img :src="item.img">
            </a>
            </mt-swipe-item>

        </mt-swipe>
        </div>
    </div>
</template>
<style scoped>
.lunboStyle{
        z-index: 1;
    }

    img {
        height: 100%;
        width: 100%
    }

    .mint-swipe {
        height: 250px;
        width: 100%
    }
</style>
<script>
    import common from '../../common/common.js'

    export default {
        data(){
            return {
                swipeArray:[]
            }
        },
        created(){
            this.getSwipeData()
        },
        methods:{
            getSwipeData(){
                const url = common.apihost+this.swipeurl
                this.$http.get(url).then(res=>{
                    this.swipeArray = res.body.message 
                    console.log(this.swipeArray)
                })
            }
        },
        props:['swipeurl']
    }
</script>