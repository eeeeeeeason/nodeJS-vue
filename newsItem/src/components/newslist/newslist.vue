<template>
    <div class='tpl'>
        <ul class="mui-table-view">
				<li v-for="item in newsArray"  :key="item.id" class="mui-table-view-cell mui-media">
					<router-link :to="'/news/newsdetail/'+item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body mytext">
							<span>{{item.title}}</span>
							<p class='mui-ellipsis'><span class="timefilter">{{item.add_time | dateFmt("YYYY-MM-DD HH:mm")}}</span><span class="rightclicktime">点击次数为：{{item.click}}</span></p>
						</div>
					</router-link>
				</li>
			</ul>
            
    </div>
</template>
<style scoped>
    .mui-table-view-cell.mui-media img{
        min-width: 62px;
        height: 60px;
    }
    .rightclicktime{
        float: right;
    }
    .timefilter{
        color: skyblue
    }
    .mytext{
        font-size: 14px;
        color:gray;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
</style>

<script>

import common from '../../common/common.js'
export default {
  data(){
      return {
          newsArray:[]
      }
  },
  created(){this.getnewsData()},
  methods:{
      getnewsData(){
          const url =common.apihost +'api/getnewslist'
          this.$http.get(url).then((res)=>{
              console.log(res.body.message)
              this.newsArray = res.body.message
          })
      }
  },

}
</script>
