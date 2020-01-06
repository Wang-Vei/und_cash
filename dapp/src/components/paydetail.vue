/* eslint-disable */
<template>
  <div id="Paydetail">
    <div class="overly_part">
      <div class="overly_title">
         <i class="iconfont icon-guanbi-cu" @click="closePaydetail"></i>
        <span>支付详情</span>
      </div>
      <div class="overly_content">
        <li>
          <span>支付方式：</span>
          <span>{{paytype}}</span>
        </li>
        <li v-show="area">
          <span>国家/地区：</span>
          <span>{{area}}</span>
        </li>
        <li>
          <span>币种：</span>
          <span>{{coin}}</span>
        </li>
        <li>
          <span>金额：</span>
          <span>{{money}}</span>
        </li>
        <li  v-show="bank">
          <span>收款银行：</span>
          <span>{{bank}}</span>
        </li>
        <li v-show="bank">
          <span>收款方户名：</span>
          <span>{{username}}</span>
        </li>
        <li v-show="account">
          <span>收款方账号：</span>
          <span>{{account}}</span>
        </li>
        <li>
          <span>扣除数量：</span>
          <span>{{undtnum}} UNDT</span>
        </li>
        <button @click="send">确定支付</button>
      </div>
    </div>
  </div>
</template>
<script>
import {getWeb3, getContract} from '@/assets/js/web3_init.js';
import {CONFIG} from "@/assets/js/config.js";
import {abi_undt} from  '@/assets/js/abi/abi_undt.js';
import {abi_c2c} from  '@/assets/js/abi/abi_c2c.js';
import {Bank} from  '@/assets/js/gate-way.js';
import {ethAccounts,balance_undt,gatewayInfoBase,authorize_coin_num,sellOrder} from '@/assets/js/coin/c2c.js';
export default {
  name:"Paydetail",
  data(){
    return{
      paytype:"",   //支付方式
      area:"",      //地区
      bank:"",      //银行
      coin:"",      //币种
      money:"",     //金额
      coin_name:"", //单位
      account:"",   //账户
      username:"",  //用户名
      undtnum:"",   //扣除数量
    }
  },



  mounted () {

  },
  methods: {
    //加载支付信息
    loadPay(){
      this.paytype = "";
      this.area = "";
      this.bank = "";
      this.coin = "";
      this.money = "";
      this.coin_name = "";
      this.account = "";
      this.username = "";
      this.undtnum = "";
      //上传并重新获取订单内容 用来检验
      let init_exchange = async() => {
        try {
          //实例化web3
          window.web3 = await getWeb3();
          //实例化需要用到的合约
          window.Contract_undt = await getContract(abi_undt, CONFIG.undt_addr);
          window.Contract_c2c = await getContract(abi_c2c, CONFIG.c2c_addr);

          let account = await ethAccounts();
          let num = await balance_undt(account);

          //解密
          let decrypt = new JSEncrypt();
          decrypt.setPrivateKey(localStorage.getItem(String('privKey')));
          let uncrypted = decrypt.decrypt(localStorage.getItem(String('userStr')));
          uncrypted = JSON.parse(uncrypted);

          let order_info = localStorage.getItem('order_info');
          order_info = JSON.parse(order_info);
          console.log(order_info);
          console.log(uncrypted);
          let gatewayInfo = await gatewayInfoBase(order_info.gateWay);
          var arr = order_info.gateWay.split("-");
          switch (arr[1]) {
            case 'LB':
              this.paytype = '银行转账';
              break;
            case 'PP':
              this.paytype = 'PayPal';
              break;
            case 'WP':
              this.paytype = '微信';
              break;
            case 'AP':
              this.paytype = '支付宝';
              break;
            case 'BIT':
              this.paytype = '加密货币';
              break;
          }
          if (uncrypted.country) {
            this.area = uncrypted.country;
          }
          if (uncrypted.bank) {
            this.bank = Bank[uncrypted.country][uncrypted.bank];
          }
          if (uncrypted.username) {
            this.username = uncrypted.username;
          }
          if (uncrypted.account) {
            this.account = uncrypted.account;
          }
          if (uncrypted.coin) {
            this.coin = uncrypted.coin;
          }

          order_info.cashAmount = web3.utils.fromWei(order_info.cashAmount, 'mwei');
          order_info.price = web3.utils.fromWei(order_info.price, 'mwei');
          this.money= Number(order_info.cashAmount);
          console.log(this.money)

          var gateWayss = order_info.gateWay;
          var gateWay_arr = gateWayss.split("-");
          this.coin_name = gateWay_arr[2];
          var undtnum = (Number(order_info.cashAmount) / Number(order_info.price) + Number(order_info.fee) / Math.pow(10, 18)) * (1 + gatewayInfo.arbitrationMarginRatio / Math.pow(10, 18));
          this.undtnum = undtnum;


          if (Number(order_info.cashAmount) / Number(order_info.price) > Number(num)) {
            this.$toast.loading({
              forbidClick: true,    // 禁用背景点击
              mask:true,
              message: '余额不足',
              type:'fail',
            });
            // setTimeout(location.reload(),1000);
            return;
          }

          let authorize_num = await authorize_coin_num(CONFIG['c2c_addr']);
          if (Number(order_info.cashAmount) * Number(order_info.price) > authorize_num) {
            this.$toast.loading({
              forbidClick: true,
              mask:true,
              message: '授权数量不足',
              type:'fail',
            });
            setTimeout(location.reload(),1000);
            return;
          }
        } catch (e) {
          console.log(e);
        }
      }
      init_exchange();
    },

    closePaydetail(){
      this.$emit('closePaydetail');
    },

    async send() {
      let order_info = localStorage.getItem('order_info');
      order_info = JSON.parse(order_info);
      let t = String(order_info.price).split(".");
      let price = web3.utils.toWei(t[0], 'ether');
      if (!isNaN(t[1])) {
        price += web3.utils.toWei('0.' + t[1], 'ether');
      }
      if (String(price).indexOf('e+') != -1) {
        let num_str = String(price).split('e+');
        let new_str = num_str[0] + '0'.repeat(num_str[1]);
        price = new_str;
      }
      price = web3.utils.toBN(price);
      price = price.toString();
      const toast = this.$toast.loading({
        duration: 0,          // 持续展示 toast
        forbidClick: true,
        mask:true,
        message: '提交中...',
        loadingType: 'spinner',
      });


      sellOrder(order_info.merchantID, order_info.gateWay, price, order_info.fee, order_info.cashAmount, order_info.orderInfoA).then(
        function(res) {
          toast.message = "挂单成功";
          toast.type = 'success';
          setTimeout(location.reload(),toast.clear,1000);
        },
        function(e) {
          toast.message = "挂单失败";
          toast.type = 'fail';
          setTimeout(toast.clear,1000);
          console.log(e);
        }
      );
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
    min-height: 530px;
    max-width: 750px;
    background-color: #1A1C1A;
    margin:38.7% auto;
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
        height: 70px;
        line-height: 70px;
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
        width: 220px;
        height: 80px;
        margin: 30px auto 0;
        @include button_common;
        font-size: 26px;
      }
    }
  }
}


</style>
