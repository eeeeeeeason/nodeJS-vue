<template>
  <div>
      <!--1.0 头部导航条-->
      <mt-header fixed title="固定在顶部">
       
      </mt-header>
 <div  @click="goback" v-show="isshown" class="backway">&lt;返回</div>
      <router-view>
      
      </router-view>
      <!--2.0 中间内容-->

      <!--3.0 底部的TabBar-->
      <mt-tabbar  v-show="!isshown">
        <router-link to='/home'>
  <mt-tab-item id="tab1">
    <img src="http://img09.jiuxian.com/bill/2016/0224/cccd8df26a754c139de800406af82178.png">
  </mt-tab-item>
    </router-link>
        <router-link to='/category'>
  
  <mt-tab-item id="tab2" router-link to='/category'>
    <img src="http://img06.jiuxian.com/bill/2016/0224/36a49b28ec5e4cdf9dbe37988199487d.png">
    
  </mt-tab-item>
    </router-link>
        <router-link to='/category'>
  
  <mt-tab-item id="tab3">
    <img src="http://img06.jiuxian.com/bill/2016/0224/42baf46987b6460bb43b3396e9941653.png">
    
  </mt-tab-item>
    </router-link>
  
        <router-link to='/category'>
  
  <mt-tab-item id="tab4">
    <img src="http://img10.jiuxian.com/bill/2016/0224/cba9029a8f4444a989a2ab5aa84c6538.png">
    
  </mt-tab-item>
    </router-link>
  
</mt-tabbar>
  </div>
</template>
<style>
.backway{
  position: fixed;
  top:0;
  color:white;
  padding:10px;
  width: 70px;
  z-index: 3;
}
.mint-tabbar{
  position: fixed;
  display: flex;
}
  .mint-tabbar>a{
    width: 25%;
    
  }
  .mint-tabbar .mint-tab-item-label img{
    
    width:40px;
    height:35px;
  }
</style>
<script>
export default {
  data(){
    return {
      isshown:false
    }
  },
  methods:{
    goback(){

      this.$router.go(-1)
    },
    changeshow(path){
      if(path=='/home'){
        this.isshown=false;
      }else{
        this.isshown=true;
      }
    }
  },
  watch:{
    '$route':function(newVal,oldVal){
      console.log(newVal)
      this.changeshow(newVal.path)
    }
  }
}
</script>
