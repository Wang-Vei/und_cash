/* eslint-disable */
<template>
  <div id="Orderdetails" @click.self.stop>
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
        <li v-if="this.area">
          <span>国家/地区：</span>
          <span>{{area}}</span>
        </li>
        <li>
          <span>金额：</span>
          <span>{{money}} {{coin_name}}</span>
        </li>
        <li  v-if="this.bank">
          <span>收款银行：</span>
          <span>{{bank}}</span>
        </li>
        <li v-if="this.username">
          <span>收款方账户名：</span>
          <span>{{username}}</span>
        </li>
        <li v-if="this.account">
          <span>收款方账号：</span>
          <span>{{account}}</span>
        </li>
        <li v-if="paynubmer">
          <span>付款单号：</span>
          <span>{{paynubmer}}</span>
        </li>
        <li>
          <span>备注：</span>
          <span>{{aolastName}}</span>
        </li>

        <li style="text-align: left;color: #319B38;border-bottom: 0;" v-if="miInfo1">沟通记录:</li>
        <div class="chat_record" v-if="miInfo1">
          <div style="color: #ccc" v-if="mer_chat"><span style="display:inline-block; margin-bottom: 2px;"> {{chat_time}} 商家：</span><br>
            &nbsp;&nbsp;{{mer_chat}}
          </div>
          <div v-if="user_chat" style="background-color: #333;color: #ccc">
            <span style="display:inline-block; margin-bottom: 2px;">{{chat_time}}   用户 ：</span><br>
            &nbsp;&nbsp;{{user_chat}}
          </div>
          <div v-if="adm_chat" style="color: #319B38">
            <span style="display:inline-block; margin-bottom: 2px;">{{chat_time}}   管理员：</span><br>
            &nbsp;&nbsp;{{adm_chat}}
          </div>
        </div>
        <div class="chat_input" v-show="chat">
          <input type="text" placeholder="联系商家" v-model="msg">
          <button @click="send"> 发送 </button>
        </div>
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
import { orders,ethAccounts,rsaKeys,download,upload, merchants,checker,appealOrderAnswer} from '@/assets/js/coin/c2c.js';
export default {
  name:"Orderdetails",
  data(){
    return{
      orderID : "",   //订单号
      paytype : "",   //支付方式
      area : "",      //地区
      bank : "",      //银行
      coin : "",      //币种
      money : "",     //金额
      coin_name : "", //单位
      account : "",   //账户
      username : "",  //用户名
      undtnum : "",   //扣除数量
      aolastName : "",    //附言
      beginTime : "", //时间
      orderStatus : "",    //订单状态
      paynubmer : "",  //付款单号
      chat : false,

      agent : "" ,      //选择商家沟通
      mer_chat : "",    //商家聊天记录
      user_chat : "",   //用户聊天记录
      adm_chat : "",    //管理员聊天记录
      chat_time : "",   //时间
      miInfo1:"",       //全部聊天记录
      merchantInfo:"",  //商户代理信息（agent）
      address:"",
      msg:"",           //自己输入的内容
    }
  },

  methods: {
    //关闭按钮
    handleCloseDetail(){
      this.$emit('closeDetails');
    },
    //订单详情
    handleRecord_detail(orderID,sta){
      // this.mer_chat = 321
      // this.chat_time = "2019-08-14 12 01";
      this.chat = false;
      this.miInfo1 = "";
      console.log(sta)
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
      this.beginTime = "";
      this.orderStatus = "";
      this.money = "";
      this.paynubmer = "";
      this.aolastName = "";
      this.msg = "";
      let init_exchange = async () => {
        try {
          var that = this
          //实例化web3
          window.web3 = await getWeb3();
          //实例化需要用到的合约
          window.Contract_c2c = await getContract(abi_c2c, CONFIG.c2c_addr);
          var orderInfo = await orders(orderID);
          var account = await ethAccounts();
          let gateWayInfo = localStorage.getItem(String('gateWay'));
          gateWayInfo = JSON.parse(gateWayInfo);
          let orderInfoA = await download(orderInfo.orderInfo);
          var mi = orderInfoA.split(",")[0];

          //提交的方法  相关
          var account1 = localStorage.getItem(String('Merchant'));
          if(account1){
            let merchant = await merchants(account1);
            this.merchantInfo = account1;
            this.agent = merchant.agent;
          }
          this.address = account;
          let pKey = localStorage.getItem(String('privKey'));
          var miInfo = this.decrypt1(mi, pKey);
          miInfo = JSON.parse(miInfo);

          console.log(miInfo)
          this.orderID = orderID;
          if (miInfo.country) {
            this.area = miInfo.country;
          }
          if (miInfo.bank && miInfo.country) {
            this.bank = Bank[miInfo.country][miInfo.bank];
          }
          if (miInfo.username) {
            this.username = miInfo.username;
          }
          if (miInfo.account) {
            this.account = miInfo.account;
          }
          if (miInfo.aolastName){
            this.aolastName = miInfo.aolastName;
          }
          if (miInfo.coin) {
            this.coin = miInfo.coin;
          }
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
          //商家
          let Merchant = localStorage.getItem(String('Merchant'));
          if (Merchant) {
            let merchant = await merchants(Merchant);
            this.agent = merchant.agent;
          }

          //获取订单信息
          Contract_c2c.events.CompleteOrder({
            filter: {
              ordernum: orderID
            },
            fromBlock: 0
          }, function(error, event) {})
            .on('data', async function(event) {
              if (event) {
                that.paynubmer = await download(event.returnValues.msg);
              }
            });

            this.chat = true;

          //读取沟通记录
          Contract_c2c.events.AppealOrderAnswer({
            filter: {
              ordernum: orderID
            },
            fromBlock: 0
          }, function(error, event) {})
          .on('data', async function(event) {
            let hash = event.returnValues.msg;
            let msg = await download(hash);
            console.log(event)
            console.log(msg)

            if (account == orderInfo.orderSellAddress) {
              var mi = msg.split(",")[0];
              console.log(mi)
              var pKey = localStorage.getItem(String('privKey'));
              console.log(pKey)
              var miInfo1 = that.decrypt1(mi, pKey);
              that.miInfo1 = JSON.parse(miInfo1);
              // var miInfo1 = {"time":1578554670,"msg":"u啊是大克里斯蒂克拉斯"};
              // that.miInfo1 = miInfo1;
            } else if (account == orderInfo.orderMerchant || Merchant == orderInfo.orderMerchant) {
              var mi = msg.split(",")[1];
              var pKey = localStorage.getItem(String('privKeyMerchant'));
              var miInfo1 = that.decrypt1(mi, pKey);
              that.miInfo1 = JSON.parse(miInfo1);
              console.log(miInfo1);
            } else {
              var mi = msg.split(",")[2];
              var pKey = localStorage.getItem(String('privKeyManange'));
              var miInfo1 = that.decrypt1(mi, pKey);
              that.miInfo1 = JSON.parse(miInfo1);

              console.log(miInfo1);
            }
          console.log(event.returnValues.user,"     ",event.returnValues.merchant,"     ",event.returnValues.orderselladdress)

            if (event.returnValues.user == event.returnValues.merchant || event.returnValues.user == that.agent) {
                that.chat_time = formatTime(that.miInfo1.time, 'Y-M-D h:m:s');
                that.mer_chat = that.miInfo1.msg;
            } else if (event.returnValues.user == event.returnValues.orderselladdress) {
              that.chat_time = formatTime(that.miInfo1.time, 'Y-M-D h:m:s');
              that.user_chat = that.miInfo1.msg;
            } else {
              that.chat_time = formatTime(that.miInfo1.time, 'Y-M-D h:m:s');
              that.adm_chat = that.miInfo1.msg;
            }
          });
        } catch (e) {
          console.log(e);
        }
      }
      init_exchange();
    },

    //发送消息
    async send(){
      var orderID = this.orderID;
      console.log(orderID)
      var orderInfo = await orders(Number(orderID));
      var agent =  this.agent;
      var address = this.address;
      console.log(agent)
      console.log(address)
      console.log(orderInfo)

      if(address != orderInfo.orderSellAddress && address != orderInfo.orderMerchant && address != agent){
        this.$toast.loading({
          forbidClick: true, // 禁用背景点击
          mask: true,
          message: '无交流权限',
          type:'fail'
        });
        return false;
      }
      var msg = this.msg;
      var timestamp = String(Date.parse(new Date())).slice(0,10);
      const toast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        mask: true,
        message: '提交中...',
        loadingType: "spinner",
      });
      let json_str = {"time":timestamp,"msg":msg};
      json_str = JSON.stringify(json_str);
      let checkerS = await checker(orderInfo.gateWay);
      let hash_user = await rsaKeys(orderInfo.orderSellAddress);
      let hash_merchant = await rsaKeys(orderInfo.orderMerchant);
      let hash_checker = await rsaKeys(checkerS);
      let rsaKey_user = await download(hash_user);
      let rsaKey_merchant = await download(hash_merchant);
      let rsaKey_checker = await download(hash_checker);
      let user_str = this.encrypted(json_str,rsaKey_user);
      let businessStr = this.encrypted(json_str,rsaKey_merchant);
      let checkerStr = this.encrypted(json_str,rsaKey_checker);
      let orderInfoA = user_str+","+businessStr+","+checkerStr;
      let hash = await upload(orderInfoA);

      appealOrderAnswer(orderID,hash).then(
        function (v) {
          toast.message = "提交成功";
          toast.type = 'success';
          setTimeout(toast.clear(),1000);
        },
        function (e) {
          console.log(e);
          toast.message = "提交失败";
          toast.type = 'fail';
          return;
        }
      )
    },


    decrypt1(encrypted, pKey) {
      var decrypt = new JSEncrypt();
      decrypt.setPrivateKey(pKey);
      return decrypt.decrypt(encrypted);
    },
    encrypted(str,key){
      var encrypt = new JSEncrypt();
      encrypt.setPublicKey(key);
      var encrypted = encrypt.encrypt(str);
      return encrypted;
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
  display: flex;
  align-self: center;
  .overly_part{
    width:600px;
    height: auto;
    max-height: 1150px;
    max-width: 750px;
    position: relative;
    background-color: #1A1C1A;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
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
        }
      }
      .chat_record {
        min-height: 0;
        max-height: 270px;
        padding: 5px;
        background-color: #222;
        border: 1.3px solid #319B38;
        border-radius: 20px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        overflow-y: scroll;
        div {
          width: 100%;
          height: auto;
          word-wrap:break-word;
          word-break:break-all;
          line-height: 25px;
          padding: 5px 5px 5px 10px;
          box-sizing: border-box;
          margin-bottom: 7px;
          font-size: 19px;
        }
      }
      .chat_input {
        margin-top: 20px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        input{
          height: 50px;
          width: 350px;
          padding: 5px;
          background-color: transparent;
          border-bottom: 1.2px solid #319B38;
          outline: none;
        }
        button {
          width: 120px;
          height: 50px;
          display: block;
          /*margin: 30px auto 0;*/
          font-size: 24px;
          background-color: #319B38;
          border: none;
          outline: none;
          border-radius: 10px;
        }
      }
    }
  }
}


</style>
