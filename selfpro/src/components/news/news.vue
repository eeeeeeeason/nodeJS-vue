<template>
     <div class="tmpl">
        <!-- 渲染新闻列表 -->
        <div class="mui-content">
            <ul class="mui-table-view">
				<li v-for="item in newslistArray" :key="item.id" class="mui-table-view-cell mui-media">
					<router-link :to="'/news/newsdetail/'+item.id">
                        <!-- 图片 -->
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
                            <!-- 标题 -->
                            <p class="titleStyle">
							    {{item.title}}
                            </p>
							<p class='mui-ellipsis'>
                                <!-- 时间 -->
                                <span>{{item.add_time | dateFmt("YYYY-MM-DD HH:mm")}}</span>

                                <!-- 点击数 -->
                                <span class="right">点击数{{item.click}}次</span>
                            </p>
						</div>
					</router-link>
				</li>
			</ul>
        </div>
    </div>
</template>
<script>
    import common from '../../common/common.js'
    export default {
        data() {
            return {
                newslistArray: []
            }
        },
        created() {
            this.getnewsData()
        },
        methods: {
            getnewsData() {
                const url = common.apihost + 'api/getnewslist'
                this.$http.get(url).then((res) => {
                    this.newslistArray = res.body.message
                    console.log(this.newslistArray)

                })
            }
        }
    }
</script>