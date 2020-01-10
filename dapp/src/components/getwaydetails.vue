/* eslint-disable */
<template>
  <div id="Getwaydetails">
    <div class="overly_part">
      <div class="overly_title">
        <span>{{info_title}}</span>
      </div>
      <div class="overly_content">
        <li v-for="item in info_list">
          <span>{{item.label}}</span>&nbsp;&nbsp;
          <span>{{item.val}}</span>
        </li>
      </div>
    </div>
  </div>
</template>
<script>
import {Bank} from "@/assets/js/gate-way.js"
import {jsonGetLocalAll} from '@/assets/js/coin/c2c.js';
export default {
  name:"Getwaydetails",
  data(){
    return{
      info_title:"",
      info_list:[],
    }
  },
  methods:{
    handleGetway_detail (v) {
      var gateWay_All = jsonGetLocalAll('gateWay');
      var that = this;
      if (undefined !== gateWay_All) {
        gateWay_All.forEach(function(value) {
          var each_gateway = value.gateWay;
          var arr = each_gateway.split("-");
          if (value.gateWay == v) {
            let info1 = {};
            let info2 = {};
            let info3 = {};
            let info4 = {};
            switch (arr[1]) {
              case 'LB':
                that.info_title = "银行详情"
                info1.label="国家/地区:";
                info1.val=value.country;
                info2.label="收款银行:";
                info2.val=Bank[value.country][value.bank];
                info3.label="收款方户名:";
                info3.val=value.username;
                info4.label="收款方账号:";
                info4.val=value.account;
                that.info_list = [];
                that.info_list.push(info1,info2,info3,info4)
                console.log(that.info_list)
                break;
              case 'PP':
                that.info_title = "PayPal详情"
                info1.label="币种:";
                info1.val=value.coin;
                info2.label="PayPal账号:";
                info2.val=value.Email;
                that.info_list = [];
                that.info_list.push(info1,info2)
                console.log(that.info_list)
                break;
              case 'WP':
                that.info_title = "微信详情"
                info1.label="国家/地区:";
                info1.val=value.country;
                info2.label="币种:";
                info2.val=value.coin;
                info3.label="收款账号:";
                info3.val=value.account;
                that.info_list = [];
                that.info_list.push(info1,info2,info3)
                console.log(that.info_list)
                break;
              case 'AP':
                that.info_title = "支付宝详情"
                info1.label="国家/地区:";
                info1.val=value.country;
                info2.label="币种:";
                info2.val=value.coin;
                info3.label="支付宝账号:";
                info3.val=value.account;
                that.info_list = [];
                that.info_list.push(info1,info2,info3)
                console.log(that.info_list)
                break;
              case 'BIT':
                that.info_title = "加密货币详情"
                info1.label="币种:";
                info1.val=value.coin;
                info2.label="钱包地址:";
                info2.val=value.address;
                that.info_list = [];
                that.info_list.push(info1,info2)
                console.log(that.info_list)
                break;
            }
          }
        });
      }
    },
  }
}



</script>
<style lang="scss" scoped>
#Getwaydetails{
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: .6);
  position: fixed;
  top: 0;
  display: flex;
  align-self: center;
  .overly_part{
    min-width:480px;
    height: auto;
    max-height: 600px;
    max-width: 750px;
    position: relative;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background-color: #fff;
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
        height: 55px;
        line-height: 50px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        font-size: 22px;
        color: #333;
        border-bottom: 1px solid #e6e6e6;
      }
    }
  }
}


</style>
