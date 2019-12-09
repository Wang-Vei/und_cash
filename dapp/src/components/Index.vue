<template>
  <div id="index" style="max-width:750px;height:100%;margin:0 auto">
    <div class="header_img">
      <div>
        
      </div>
    </div>
    
    <van-tabs v-model="active" swipeable>
      <van-tab title="支付网关">
        <input class="i_input" v-model="value" placeholder="请输入用户名">
        <input class="i_input" v-model="value" placeholder="请输入用户密码">
      </van-tab>
      <van-tab title="交易记录">  <input class="i_input" v-model="value" placeholder="请输入用户名"></van-tab>
      <span class="icon">OO</span>
    </van-tabs>
    





  </div>
</template>

<script>
import { Image, Lazyload, Loading, Tab, Tabs } from 'vant';
export default {
  name: 'index',
  data(){
    return{
      value: "",
    }
  },
  components:{
    [Image.name]:Image,
    [Lazyload.name]:Lazyload,
    [Loading.name]:Loading,
    [Tab.name]:Tab,
    [Tabs.name]:Tabs,
  },
  methods:{

  }
}
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped >
$tc:#8BF692;
$i_bor:#7B7780;
#index{
  padding: 0;
  margin: 0;
  .header_img{
    width: 100%;
    height: 326px;
    background-image: url('../assets/img/map.gif');
    background-size: 130% 326px;
    background-position-x: -105px;
  }
  .i_input {
    width: 90%;
    font-size: 28px;
    border: 1px solid $i_bor;
    color: #fff;
    background-color: rgba($color: #000000, $alpha: 0.0);
    padding-left: 10px;
    height: 80px;
    border-radius: 10px;
  }
  .i_input:focus{
    width: 90%;
    font-size: 28px;
    border: 2px solid $tc;
    color: #fff;
    background-color: rgba($color: #000000, $alpha: 0.0);
    padding-left: 10px;
    height: 80px;
    border-radius: 10px;
    box-shadow: inset rgba(139, 246, 146, 1) 0px 0px 15px;
    -moz-box-shadow: inset rgba(139, 246, 146, 1) 0px 0px 15px;
    -webkit-box-shadow: inset rgba(139, 246, 146, 1) 0px 0px 15px;
  }
  .icon{
    width: 30px;
    height: 30px;
    background-color: #7B7780;
    position: absolute;
    top: 0;
  }
}
</style>
