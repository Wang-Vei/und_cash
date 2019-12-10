<template>
  <div id="index" style="max-width:100%;">
    <div class="header_img">
      <div>
        
      </div>
    </div>
    
    <van-tabs v-model="active" swipeable>
      <van-tab title="支付网关">
        <div class="top_part">
          <div class="clock">
            <li><span>账户余额&nbsp&nbsp&nbsp<i class="iconfont icon-jiesuo"></i></span></li>
            <li><span>175056.17</span>UNDT</li>
          </div>
          <div class="">
            <input type="text" class="i_input" v-model="value" placeholder="请输入用户密码">
          </div>
          <div>
            <input type="text" class="i_input" v-model="value" placeholder="请输入用户密码">
          </div>
          <span style="display:inline-block;transform:rotate(60deg);"><i class="iconfont icon-wangguan" style="color: #fff;font-size:16px;"></i></span>
          <input type="text" class="i_input" v-model="value" placeholder="请输入用户名">
        </div>
        <button>
          立即提款
        </button>
       
      </van-tab>
      <van-tab title="交易记录"> <input class="i_input" v-model="value" placeholder="请输入用户名"></van-tab>
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
      active:"",
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
@import "@/assets/css/vant_new.scss"; //引入公共样式
$tc:#8BF692;
$i_bor:#7B7780;
//自定义样式（非vant组件）
#index{
  height:100%;margin:0 auto;
  .header_img{
    width: 100%;
    height: 326px;
    background-image: url('../assets/img/map.gif');
    background-size: 130% 326px;
    background-position-x: -105px;
  }

  .i_input {
    width: 90%;
    height: 80px;
    font-size: 28px;
    border-color:$i_bor;
    @include input_common;
  }
  .i_input:focus{
    border: 1px solid $tc;
    box-shadow: inset $tc 0px 0px 15px;
    -moz-box-shadow: inset $tc 0px 0px 15px;
    -webkit-box-shadow: inset $tc 0px 0px 15px;
  }

  button {
    width: 480px;
    height: 80px;
    margin: 0 auto;
    @include button_common;
  }
  .top_part{
    min-height: 688px;
    background-color: #ccc
  }
}
</style>
