<template>
  <div>
     <mt-header fixed title="买买买"></mt-header>
     <div v-show="isShowTabBar" class="backStyle" @click='goBack'>&lt;返回</div>
      <!--1.0 头部导航条-->

      <!--2.0 中间内容-->
      <router-view></router-view>

      <!--3.0 底部的TabBar-->
      <mt-tabbar fixed v-show="!isShowTabBar">
        <router-link class="mint-tab-item" to="/home">
          <mt-tab-item>
            <img src="http://img07.jiuxian.com/bill/2016/0224/cccd8df26a754c139de800406af82178.png">
          </mt-tab-item>
        </router-link>
        <router-link class="mint-tab-item" to="/category">
          <mt-tab-item>
            <img src="http://img06.jiuxian.com/bill/2016/0224/36a49b28ec5e4cdf9dbe37988199487d.png">
          </mt-tab-item>
        </router-link>
        <router-link class="mint-tab-item" to="/shopcart">
          <mt-tab-item>
            <img src="http://img06.jiuxian.com/bill/2016/0224/42baf46987b6460bb43b3396e9941653.png">
            <span id="badgeId" class="badgeStyle">{{count}}</span>
          </mt-tab-item>
        </router-link>
        <router-link class="mint-tab-item" to="/mine">
          <mt-tab-item>
            <img src="http://img08.jiuxian.com/bill/2016/0224/cba9029a8f4444a989a2ab5aa84c6538.png">
          </mt-tab-item>
        </router-link>
      </mt-tabbar>
  </div>
  
</template>
<style>
  *{
    margin: 0;
    padding: 0;
  }
  .tmpl{
    padding-top: 40px;
  }
  .headerStyle{
      z-index:5
    }

    /* 隐藏TabBar的样式 */
    .tabBarStyleHidden{
      display: none;
    }

    .mint-tabbar > .mint-tab-item.is-selected{
        background-color: #fafafa;
    }

    img{
      width:42px;
      height: 35px;
    }

    /* 返回按钮的样式 */
    .backStyle{
      font-size: 14px;
      color:#fff;
      font-weight: 900;
      position: fixed;
      /* width: 50px;
      height: 30px; */
      left: 10px;
      top:10px;
      z-index: 20;
    }

    /* 2.0 购物车徽标样式 */
    .mint-tab-item-label .badgeStyle{
          font-size: 11px;
          line-height: 1.3;  
          position: absolute;
          top: 9px;
          left: 63%;
          text-align: center;
          padding: 1px 5px; 
          color: #fff;
          border-radius: 11px; 
          background: red;
    }
</style>
<script>
  import bus from './common/bus.js'
  import $ from 'jquery'
  bus.$on('goodsCount',(goodsCount)=>{
    const oldVal = $('#badgeId').text()
    const lastVal = parseInt(oldVal)+goodsCount
    $('#badgeId').text(lastVal)
  })
  export default{
    data(){
      return {
        isShowTabBar:true,
        count:0
      }
    },
    created(){
      this.isShow(this.$route.path)
    },
    updated(){
      this.getLocalGoodsCount()
    }
    ,
    methods:{
      goBack(){
        this.$router.go(-1)
      },
      //v-show
      isShow(path){
        if(path=='/home'){
          this.isShowTabBar = false

        }else{
          this.isShowTabBar = true
        }
      },
      getLocalGoodsCount(){
        this.count = this.$store.getters.getGoodsTotalCount
      }
    },
    watch:{
      '$route':function(newVal,oldVal){
        // console.log(newVal)
        this.isShow(newVal.path)
      }
    }
  }
</script>