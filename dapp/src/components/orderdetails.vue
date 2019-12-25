/* eslint-disable */
<template>
  <div id="Orderdetails">
    <div class="overly_part">
      <div class="overly_title">
        <i class="iconfont icon-guanbi-cu" @click="handleCloseDetail"></i>
        <span>订单详情</span>
      </div>
      <div class="overly_content">
        <li>
          <span>订单号：</span>
          <span>14</span>
        </li>
        <li>
          <span>交易时间：</span>
          <span>2019.11.12</span>
        </li>
        <li>
          <span>订单状态：</span>
          <span>正常</span>
        </li>
        <li>
          <span>国家/地区：</span>
          <span>CHINA</span>
        </li>
        <li>
          <span>金额：</span>
          <span>15 CNY</span>
        </li>
        <li>
          <span>收款银行：</span>
          <span>农业银行</span>
        </li>
        <li>
          <span>收款方账户名：</span>
          <span>ZCH</span>
        </li>
        <li>
          <span>收款方账号：</span>
          <span>13321</span>
        </li>
        <li>
          <span>备注：</span>
          <span>asdfas</span>
        </li>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:"Orderdetails",
  methods: {
  handleCloseDetail(){
      this.$emit('closeDetails');
    }
}
}



</script>
<style lang="scss" scoped>
#Orderdetails{
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: .7);
  position: fixed;
  top: 0;
  .overly_part{
    width:600px;
    height: 684px;
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
      
    }
  }
}

  
</style>