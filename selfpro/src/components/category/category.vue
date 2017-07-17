<template>
    <div class="tmpl">
        <div class="title">
            <ul class="titleul">
                <li v-for='item in titleArray' :key="item.id">{{item.title}}</li>
            </ul>
        </div>
        <div class="imgData">
            <ul class="imgUl">
                <li v-for="item in imgDataArray" class="imgLi">
                    <router-link :to="'/category/photodetail/'+item.id">                       <img :src="item.img_url" alt="">
                    <p class="abstract">{{item.zhaiyao}}</p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
    .title {
        overflow-x: auto
    }

    .titleul {
        min-width: 900px;
    }

    .title li {
        color: #0094ff;
        margin: 0 5px;
        display: inline-block;
    }

    .imgUl img {
        width: 100%;
        height: 300px;
    }

    .imgLi {
        position: relative;
    }

    .abstract {
        background-color: rgba(0, 0, 0, 0.3);
        position: absolute;
        bottom: 0;
        color: #fff;
    }
</style>
<script>
    import common from '../../common/common.js'
    export default {
        data() {
            return {
                titleArray: [],
                imgDataArray: []
            }
        },
        created() {
            this.gettitle(),
                this.getImgData(0)
        },
        methods: {
            gettitle() {
                const url = common.apihost + 'api/getimgcategory'
                this.$http.get(url).then(res => {
                    this.titleArray = res.body.message
                    // console.log(this.titleArray)

                })
            },
            getImgData(id) {
                const url = common.apihost + 'api/getimages/' + id
                this.$http.get(url).then(res => {
                    // console.log(res)
                    this.imgDataArray = res.body.message
                })
            }
        }
    }
</script>