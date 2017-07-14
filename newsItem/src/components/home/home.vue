<template>
    <div class="tpl">
    
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in swipeArray" :key='item.url'>
                <a :href="item.url">
                    <img :src="item.img">
                </a>
            </mt-swipe-item>
        </mt-swipe>
    
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/news/newslist">
                        <span class="mui-icon mui-icon-home"></span>
                        <div class="mui-media-body">Home</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-email">
                            <span class="mui-badge">5</span>
                        </span>
                        <div class="mui-media-body">Email</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-chatbubble"></span>
                        <div class="mui-media-body">Chat</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-location"></span>
                        <div class="mui-media-body">location</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-search"></span>
                        <div class="mui-media-body">Search</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-phone"></span>
                        <div class="mui-media-body">Phone</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-gear"></span>
                        <div class="mui-media-body">Setting</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-info"></span>
                        <div class="mui-media-body">about</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-more"></span>
                        <div class="mui-media-body">more</div>
                    </a>
                </li>
            </ul>
        </div>
    
    </div>
</template>
<style scoped>
.swipeBox {
    height: 250px;
    width: 100%;
}

img {
    height: 250px;
    width: 100%;
}

.mui-grid-view.mui-grid-9 {
    background-color: #fff;
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border-right: 0px;
    border-bottom: none;
}

.mui-icon {
    width: 50px;
    height: 50px;
}

.mui-icon.mui-icon-home {
    background-image: url('../../../statics/img/menu3.png');
    background-repeat: round;
}

.mui-icon.mui-icon-email {
    background-image: url('../../../statics/img/menu4.png');
    background-repeat: round;
}

.mui-icon.mui-icon-chatbubble {
    background-image: url('../../../statics/img/menu5.png');
    background-repeat: round;
}

.mui-icon.mui-icon-location {
    background-image: url('../../../statics/img/menu6.png');
    background-repeat: round;
}

.mui-icon.mui-icon-search {
    background-image: url('../../../statics/img/menu9.png');
    background-repeat: round;
}

.mui-icon.mui-icon-phone {
    background-image: url('../../../statics/img/menu10.png');
    background-repeat: round;
}

.mui-icon-home:before,
.mui-icon-email:before,
.mui-icon-chatbubble:before,
.mui-icon-location:before,
.mui-icon-search:before,
.mui-icon-phone:before {
    content: '';
}
</style>
<script>
import common from '../../common/common.js'

export default {
    data() {
        return {
            swipeArray: []
        }
    },
    created() { this.getSwipeData() },
    methods: {
        getSwipeData() {
            console.log('获取了信息')
            const url = common.apihost + "api/getlunbo"
            this.$http.get(url).then(function (res) {
                console.log(res.body.message)
                this.swipeArray = res.body.message
            })
        }
    }
}
</script>
