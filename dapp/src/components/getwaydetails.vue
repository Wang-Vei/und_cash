/* eslint-disable */
<template>
  <div id="Getwaydetails">
    <div class="overly_part">
      <div class="overly_title">
        <span>支付宝详情</span>
      </div>
      <div class="overly_content">
        <li>
          <span>交易时间</span>
          <span>2019-01-11</span>
        </li>
        <li>
          <span>付款人</span>
          <span>大老虎</span>
        </li>
        <li>
          <span>付款账号</span>
          <span>366655555555555</span>
        </li>
        <li>
          <span>账户余额</span>
          <span>25118.21</span>
        </li>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:"Getwaydetails",
}



</script>
<style lang="scss" scoped>
#Getwaydetails{
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: .6);
  position: fixed;
  top: 0;
  .overly_part{
    width:480px;
    max-width: 750px;
    background-color: #fff;
    margin:57% auto;
    border-radius: 5px;
    overflow: hidden;
    box-sizing: border-box;
    .overly_title{
      width: 100%;
      height: 60px;
      font-size: 22px;
      letter-spacing: 2px;
      line-height: 60px;
      text-align: center;
      border-bottom: 1px solid #ccc;
      span{
        color: #333;
      }
    }
    .overly_content{
      padding: 0 20px;
      li{
        height: 50px;
        line-height: 50px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        font-size: 20px;
        color: #333;
        border-bottom: 1px solid #e6e6e6;
      }
    }
  }
}

  
</style>