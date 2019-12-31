/* eslint-disable */
<template>
  <div id="Paydetail" @click="closePaydetail">
    <div class="overly_part">
      <div class="overly_title">
        <!-- <i class="iconfont icon-guanbi-cu" @click="handleCloseDetail"></i> -->
        <span>支付详情</span>
      </div>
      <div class="overly_content">
        <li>
          <span>支付方式：</span>
          <span>14</span>
        </li>
        <li>
          <span>国家/地区：</span>
          <span>2019.11.12</span>
        </li>
        <li>
          <span>币种：</span>
          <span>正常</span>
        </li>
        <li>
          <span>金额：</span>
          <span>CHINA</span>
        </li>
        <li>
          <span>收款银行：</span>
          <span>15 CNY</span>
        </li>
        <li>
          <span>收款方户名：</span>
          <span>农业银行</span>
        </li>
        <li>
          <span>收款方账号：</span>
          <span>ZCH</span>
        </li>
        <li>
          <span>扣除数量：</span>
          <span>13321 UNDT</span>
        </li>
        <button>确定支付</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:"Paydetail",
  methods: {
    closePaydetail(){
      this.$emit('closePaydetail');
    }
}
}



</script>
<style lang="scss" scoped>
@import "@/assets/css/vant_new.scss"; //引入公共样式
#Paydetail{
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: .7);
  position: fixed;
  top: 0;
  .overly_part{
    width:600px;
    height: 750px;
    max-width: 750px;
    background-color: #1A1C1A;
    margin:40% auto;
    border-radius: 20px;
    overflow: hidden;
    padding-bottom: 20px;
    box-sizing: border-box;
    .overly_title{
      width: 100%;
      height: 80px;
      font-size: 26px;
      letter-spacing: 2px;
      position: relative;
      line-height: 80px;
      background-color: #319B38;
      text-align: center;
      i{
        position: absolute;
        left: 30px;
        font-size: 22px;
        color: #fff;
        font-weight: 600;
      }

    }
    .overly_content{
      padding: 20px;
      li{
        height: 60px;
        line-height: 60px;
        font-size: 20px;
        color: #fff;
        border-bottom: 1px solid #333333;
        span:first-child{
          display: inline-block;
          width: 25%;
          // background-color: red;
          text-align: right;
        }
        span:nth-child(2){
          display: inline-block;
          width: 75%;
          // background-color: green;

        }
      }
      button {
        display: block;
        width: 200px;
        height: 60px;
        margin: 50px auto;
        @include button_common;
        font-size: 26px;
      }
    }
  }
}


</style>
