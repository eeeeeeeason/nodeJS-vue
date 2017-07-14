<template>
    <div class='tmpl'>
        <h4>提交评论</h4>
        <textarea></textarea>
        <button>提交评论</button>
    </div>
</template>
<style scoped>

</style>
<script>
import common from '../../common/common.js'
export default {
    data() {
        return {
        }
    },
    created() {
        console.log(this.myrouteid)
    },
    methods: {
        getcomment(){
            const url = common.apihost+this.myrouteid
        }
    },
    props:['myrouteid']
}
</script>