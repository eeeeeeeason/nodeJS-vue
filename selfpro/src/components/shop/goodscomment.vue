<template>
    <div class="tmpl">
        <mycomment :myrouteid=this.$route.query.goodsId></mycomment>
    </div>
</template>
<script>
    import mycomment from '../../components/conponents/subcomponent.vue'
    export default{
        data(){return{}},
        components:{
            mycomment
        }
    }
</script>