/* eslint-disable */
<template>
  <div id="Orderdetails">
    <div class="overly_part">
      <div class="overly_title">
         <i class="iconfont icon-guanbi-cu" @click="handleCloseDetail"></i>
        <span>订单详情</span>
      </div>
      <ul class="overly_content">
        <li>
          <span>订单号：</span>
          <span>{{orderID}}</span>
        </li>
        <li>
          <span>交易时间：</span>
          <span>{{beginTime}}</span>
        </li>
        <li>
          <span>订单状态：</span>
          <span>{{orderStatus}}</span>
        </li>
        <li>
          <span>国家/地区：</span>
          <span>{{area}}</span>
        </li>
        <li>
          <span>金额：</span>
          <span>{{money}} {{coin_name}}</span>
        </li>
        <li>
          <span>收款银行：</span>
          <span>{{bank}}</span>
        </li>
        <li>
          <span>收款方账户名：</span>
          <span>{{username}}</span>
        </li>
        <li>
          <span>收款方账号：</span>
          <span>{{account}}</span>
        </li>
        <li>
          <span>付款单号：</span>
          <span>{{aynubmer}}</span>
        </li>
        <li>
          <span>备注：</span>
          <span>{{remark}}</span>
        </li>
        <li style="text-align: center;color: #319B38;border-bottom: 0;" v-show="chat"><u>沟通记录</u></li>
        <button v-show="chat"> 联系商家 </button>
      </ul>
    </div>
  </div>
</template>
<script>
import {getWeb3, getContract} from '@/assets/js/web3_init.js';
import {CONFIG} from "@/assets/js/config.js";
import {abi_c2c} from  '@/assets/js/abi/abi_c2c.js';
import {Bank} from  '@/assets/js/gate-way.js';
import {formatTime} from  '@/assets/js/func.js';
import {JSEncrypt} from 'jsencrypt';
import {orders,download,} from '@/assets/js/coin/c2c.js';
export default {
  name:"Orderdetails",
  data(){
    return{
      orderID:"",   //订单号
      paytype:"",   //支付方式
      area:"",      //地区
      bank:"",      //银行
      coin:"",      //币种
      money:"",     //金额
      coin_name:"", //单位
      account:"",   //账户
      username:"",  //用户名
      undtnum:"",   //扣除数量
      remark:"",    //附言
      beginTime:"", //时间
      orderStatus:"",    //订单状态
      aynubmer:"",  //付款单号
      chat:false,
    }
  },
  methods: {
    handleCloseDetail(){
      this.$emit('closeDetails');
    },
    handleRecord_detail(orderID,sta){
      this.chat = false;
      if(sta == "5"){
        this.chat = true;
      }
      this.orderID = "";
      this.paytype = "";
      this.coin_name = "";
      this.coin = "";
      this.area = "";
      this.bank = "";
      this.undtnum = "";
      this.username = "";
      this.account = "";
      this.remark = "";
      this.beginTime = "";
      this.orderStatus = "";
      this.money = "";
      this.aynubmer = "";
      this.remark = "";
      let init_exchange = async () => {
        try {
          //实例化web3
          window.web3 = await getWeb3();
          //实例化需要用到的合约
          window.Contract_c2c = await getContract(abi_c2c, CONFIG.c2c_addr);
          var orderInfo = await orders(orderID);
          let gateWayInfo = localStorage.getItem(String('gateWay'));
          gateWayInfo = JSON.parse(gateWayInfo);
          let orderInfoA = await download(orderInfo.orderInfo);
          var mi = orderInfoA.split(",")[0];

          let pKey = localStorage.getItem(String('privKey'));
          var miInfo = this.decrypt1(mi, pKey);
          miInfo = JSON.parse(miInfo);
          console.log(miInfo)
          this.orderID = orderID;
          this.area = miInfo.country;
          this.bank = Bank[miInfo.country][miInfo.bank];
          this.username = miInfo.username;
          this.account = miInfo.account;
          this.remark = miInfo.aolastName;
          this.beginTime = formatTime(orderInfo.beginTime, 'Y.M.D');
          this.orderStatus = CONFIG['status-msg'][orderInfo.orderStatus];
          orderInfo.orderCashAmount = web3.utils.fromWei(orderInfo.orderCashAmount, 'mwei');
          this.money = orderInfo.orderCashAmount;
          var gateWayss = orderInfo.gateWay;
          var gateWay_arr = gateWayss.split("-");
          this.coin_name = gateWay_arr[2];
          switch (gateWay_arr[1]) {
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
          Contract_c2c.events.CompleteOrder({
            filter: {
              ordernum: orderID
            },
            fromBlock: 0
          }, function(error, event) {})
            .on('data', async function(event) {
              if (event) {
                msg = await download(event.returnValues.msg);
                this.aynubmer = msg;
              }
            });
        } catch (e) {
          console.log(e);
        }
      }
      init_exchange();
    },
    decrypt1(encrypted, pKey) {
      var decrypt = new JSEncrypt();
      decrypt.setPrivateKey(pKey);
      var uncrypted = decrypt.decrypt(encrypted);
      return uncrypted;
    },

    banks(property){
      var banks = {}
      for(var i in Bank){
        for(var j in  Bank[i]){
          banks[j] =  Bank[i][j]
        }
      };
      if(!banks[property]){
        return property;
      }else{
        return banks[property]
      }
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
    min-height: 684px;
    max-width: 750px;

    background-color: #1A1C1A;
    margin:30% auto;
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
      button{
        width: 150px;
        height: 50px;
        display: block;
        margin: 0 auto;
        font-size: 24px;
        background-color: #319B38;
        border: none;
        outline: none;
        border-radius: 10px;
      }
    }
  }
}


</style>
