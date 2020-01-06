
<template>
  <div id="index">
    <div class="header_img"></div>
    <van-tabs swipeable>
      <van-tab title="支付网关">
        <div class="top_part">
           <div class="lock_overly" v-if="balance_lock" @click.self.stop></div>
          <div class="lock" id="unlock" @click="handleUnlock()">
            <li>
              <span class="account_label">账户余额
                <i class="iconfont icon-jiesuo" v-if="balance_lock"></i>
                <i class="iconfont icon-suo" v-else></i>
              </span>
            </li>
            <li><span class="account_balance">{{balance}}</span>UNDT</li>
          </div>
          <div class="every_form">
            <li class="have_tip">
              <i class="iconfont icon-wangguan" style="display:inline-block;transform:rotate(60deg);"></i>
              <label>选择网关</label>
            </li>
            <div class="form_right_part" v-clickoutside="handleClean_getWay">
              <div class="select_getWay">
                <input readonly :class="`i_input ${gateWay_click?'gateWay_click':''}`" placeholder="选择网关" v-model="v_gateWay" @click="handleChoise_getWay">
                <span class="getWay_icon_xia" @click="handleChoise_getWay"><i class="iconfont icon-xia-copy"></i></span>
                <button class="getWay_details" @click="handleGetway_detail" v-show="v_gateWay">详情</button>
                <span @click="gateWay= true">添加</span><br>
              </div>
              <van-popup v-model="showPicker" position="bottom">
                <van-picker
                  show-toolbar
                  :columns="gateWay_list"
                  @cancel="showPicker = false"
                  @confirm="handleOnConfirm"
                />
              </van-popup>
              <span class="form_tip">参考汇率：1 UNDT = {{v_exRate}} {{v_coin}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;保证金：1%</span>
            </div>
          </div>
          <div class="every_form">
            <li class="have_tip">
              <i class="iconfont icon-jine"></i>
              <label for="money">提款金额</label>
            </li>
            <div class="form_right_part">
              <input type="text" class="i_input" id="money" v-model="v_money" @keydown="costUNDT(v_money)" @keyup="costUNDT(v_money)" placeholder="输入金额">
              <span @click="handleAll">全部</span><br>
              <span class="form_tip">扣除金额：{{v_costUNDT}} UNDT</span>
            </div>
          </div>
          <div class="every_form">
            <li>
              <i class="iconfont icon-beizhu1"></i>
              <label for="postscript">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</label>
            </li>
            <div class="form_right_part">
              <input type="text" class="i_input" id="postscript" v-model="v_postscript" placeholder="输入附言，70字以内">
            </div>
          </div>
          <div class="every_form">
            <li>
              <i class="iconfont icon-tubiaozhizuomoban" style="font-weight:600;"></i>
              <label for="dealer">交&nbsp;&nbsp;易&nbsp;&nbsp;商</label>
            </li>
            <div class="form_right_part">
              <input type="text" class="i_input" id="dealer" v-model="merchantID" placeholder="系统推荐">
              <span @click="handleMerchant_show">查看</span><br>
            </div>
          </div>
          <div class="top_entrance">
            <span @click="showGuide = true , guide_content = true" >新手指南</span>
            <span>交易商入口</span>
          </div>
        </div>
        <button @click="handleConfirm">
          立即提款
        </button>
      </van-tab>
<!-- 交易记录页 -->
      <van-tab title="交易记录">
        <Order></Order>
      </van-tab>
<!-- 交易记录页结束 -->
    </van-tabs>
    <!-- 遮罩层 -->
    <van-overlay :show="showGuide">
      <div class="guide">
        <div class="guide_title">
          <i class="iconfont icon-guanbi-cu" @click="showGuide = false , guide_content = false"></i>
          支付网关系统操作指南
        </div>
      </div>
    </van-overlay>
     <!-- 网关详情 -->
    <van-overlay :show="gateway_detail" @click="gateway_detail = false">
      <Getwaydetails ref="Getwaydetails"></Getwaydetails>
    </van-overlay>
    <!-- 新手指南 -->
    <transition name="fade">
      <Guide v-show="guide_content" transiton="fade"></Guide>
    </transition>
    <!-- 交易商 -->
    <Merchant v-show="merchant_show" @closeOverly='merchant_show = false' ref ='SelectMerchant' @handleChoiced = "handleChoiced"></Merchant>
    <!-- 添加网关 -->
    <Gateways v-show="gateWay" @closeGateways="gateWay= false"></Gateways>
    <!-- 支付详情 -->
    <Paydetail v-show="Paydetail" @closePaydetail="Paydetail= false" ref="loadOrders"></Paydetail>
  </div>
</template>
<script>
/* eslint-disable */
import { Tab, Tabs, Picker, Field, Popup, Overlay} from 'vant'
import Guide from './guide'
import Merchant from './merchant'
import Getwaydetails from './getwaydetails'
import Gateways from './gateways'
import Order from './order'
import Paydetail from './paydetail'

import {getWeb3, getContract} from '@/assets/js/web3_init.js';
import {abi_undt} from  '@/assets/js/abi/abi_undt.js';
import {abi_c2c} from  '@/assets/js/abi/abi_c2c.js';
import {authorize_coin,queryAllMerchantOrders,balance_undt,
  ethAccounts,authorize_coin_num,jsonGetLocalAll ,
  gatewayInfoBase,rsaKeys,download,upload,
  merchants,encrypted,encrypted2,id_address,checker} from '@/assets/js/coin/c2c.js';
import {onlyNumber} from "@/assets/js/func.js";
import {CONFIG} from "@/assets/js/config.js";
import Web3 from 'web3';

export default{
  name: 'index',
  data () {
    return{
      address:"",            //地址
      balance:"",            //账户余额
      balance_lock: false,    // 账户余额的锁
      gateWay_click: false, // 点击选择网关变色
      v_coin: '',           // 单位(CNY USD ...)
      v_gateWay: '',
      v_money: '',
      v_postscript: '',
      v_dealer: '',
      v_ratio:0,
      v_exRate:0,           //汇率 1UNDT 等于 __ v_coin
      v_costUNDT:"",        //扣除的 UNDT
      merchantID:"",        //系统推荐的商家ID
      showPicker: false,    // 控制picker隐现
      showGuide: false,     // 新手指南框
      guide_content: false, // 新手指南内容
      merchant_show: false, // 商家显示
      desc_MerchantOrders:[],//按价格倒序商户信息列表
      current_id:"",         //当前使用的商户信息索引
      // fee:"",             //手续费

      gateway_detail: false,  // 网关详情
      gateWay: false,         // 添加网关
      Paydetail: false,        // 支付详情
      gateWay_list: [],
    }
  },

  components:{
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Picker.name]: Picker,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Overlay.name]: Overlay,
    Guide,
    Merchant,
    Getwaydetails,
    Gateways,
    Order,
    Paydetail,
  },
   //自定义指令  定义点击为非指定节点的行为 v-clickoutside（选择网关边框变色）
  directives: {
    clickoutside: {
      bind:function (el,binding,vnode) {
          function documentHandler (e) {
              if (el.contains (e.target)) {
                  return false;
              }
              if(binding.expression){
                  binding.value(e)
              }
          }
          el._vueClickOutside_ = documentHandler;
          document.addEventListener('click',documentHandler);
      },
      unbind:function(el,binding){
          document.removeEventListener('click',el._vueClickOutside_)
          delete el._vueClickOutside_;
      }
    }
  },
  mounted(){
    let init_exchange = async() => {
        try {
            //实例化web3
            window.web3 = await getWeb3();
            // 实例化需要用到的合约
            window.Contract_undt = await getContract(abi_undt, CONFIG['undt_addr']);
            window.Contract_c2c = await getContract(abi_c2c, CONFIG['c2c_addr']);
            //调用合约方法
            let account = await ethAccounts();
            this.address = account;
            //首页显示余额 保留4位小数
            let num = await balance_undt(account);
            let numStr = num.toString();
            let index = numStr.indexOf(".")
            this.balance=numStr.slice(0,index+5)
            //授权额度
            let authorize_num = await authorize_coin_num(CONFIG['c2c_addr']);
            authorize_num = Number(authorize_num);
            console.log(authorize_num);
            if (authorize_num >= 100) {
                this.balance_lock=true;
            }
            // orderList();
        }
        catch (e) {
            console.log(e);
        }
      };
      init_exchange();
      this.setrsakey();
  },
  methods:{

    //解锁
    handleUnlock(){
      var that = this
      const toast=this.$toast.loading({
        duration: 0,          // 持续展示 toast
        forbidClick: true,    // 禁用背景点击
        mask:true,
        message: '解锁中，请稍侯',
        loadingType:"spinner",
      });
        authorize_coin(CONFIG.c2c_addr, 10000000000000).then(
            function(v) {
              console.log(v);
                //成功
                toast.message ="解锁成功"
                toast.type = 'success'
                that.balance_lock = true;
                setTimeout(toast.clear(),1000);
            },
            function(e) {
              console.log('解锁失败')
              toast.message ="解锁失败"
              toast.type = 'fail'
              setTimeout(toast.clear(),2000);
            }
        )
    },

    //点击其他地方 选择网关框 变回本色
    handleClean_getWay () {
      this.gateWay_click = false
    },

    //点击选择网关
    handleChoise_getWay () {
      this.showPicker = true;     //选择器弹出
      this.gateWay_click= true    //边框变色
      this.gateWay_list = [];
      var that = this
      var gateWay_All = jsonGetLocalAll('gateWay');
      //从LocalStorage 里面取出 渲染到 picker中
      if (undefined !== gateWay_All) {
        gateWay_All.forEach(function(value) {
          that.gateWay_list.push(value.gateWay);
        });
      }
    },

    //全部
    handleAll(){
      let temp_num = Number(this.balance);
      console.log(temp_num);
      if (temp_num) {
        let price = this.v_exRate;
        let arbitrationMarginRatio = this.v_ratio;
        price = Number(price);
        console.log(price);

        if (price > 0 && arbitrationMarginRatio > 0) {
          arbitrationMarginRatio = Number(arbitrationMarginRatio);
          var costNum = temp_num / (1 + arbitrationMarginRatio) * price;
          var costNum0 = costNum.toString();
          var costNum1 = costNum0.indexOf(".");
          costNum = costNum0.slice(0,costNum1+5)
          console.log(costNum)

          this.v_costUNDT = this.balance;
         this.v_money = costNum;
        }
      }
    },

    //选择器的 确定
    async handleOnConfirm (gateWay) {
      //当前使用的商户信息索引
      var current_id = this.current_id;
      if (gateWay != '') {
        this.v_gateWay = gateWay;
        this.showPicker = false
        let gateWay_arr = gateWay.split("-");
        this.v_coin=gateWay_arr[2];
        var maxPrice = 0;
        let gateWayInfo = await gatewayInfoBase(gateWay);
        console.log(gateWayInfo);
        let MerchantOrders = await queryAllMerchantOrders(gateWay);
        //按价格倒序商户信息列表
        this.desc_MerchantOrders = MerchantOrders.sort(function(a, b) {
            return b[2] - a[2]
        });

        if (gateWayInfo.status != true) {
            this.$toast.loading({
              forbidClick: true,    // 禁用背景点击
              mask:true,
              message: '该网关停止使用',
              type:'fail',
            });
            this.v_ratio = 0;
            this.v_money = "";
            this.v_postscript = ""
            this.v_exRate = 0;
            this.v_costUNDT = "";
            this.merchantID = "";
            return;
        }

        MerchantOrders.forEach(function(n, i) {
          console.log(n);
            if (n[2] > maxPrice) {
                maxPrice = Number(n[2]);
                current_id = i;
            }
        });

        if (maxPrice > 0) {
            maxPrice = String(maxPrice);
            maxPrice = this.toolNumber(maxPrice);
            maxPrice = web3.utils.fromWei(maxPrice, 'ether');
            maxPrice = web3.utils.fromWei(maxPrice, 'mwei');
            maxPrice = Number(maxPrice);
            console.log(maxPrice);
            this.v_exRate = maxPrice;
        }

        gateWayInfo.arbitrationMarginRatio = Number(gateWayInfo.arbitrationMarginRatio);
        if (gateWayInfo.arbitrationMarginRatio > 0) {
            gateWayInfo.arbitrationMarginRatio = gateWayInfo.arbitrationMarginRatio / Math.pow(10, 18);
            this.v_ratio = gateWayInfo.arbitrationMarginRatio;
        }
        this.merchantID = this.desc_MerchantOrders[current_id][0];
        this.costUNDT(this.v_money);
      }
      this.current_id = current_id;
    },

    //网关详情  到子组件中
    handleGetway_detail () {
      this.gateway_detail = true
      this.$refs.Getwaydetails.handleGetway_detail(this.v_gateWay);
    },


    //查看商家
    handleMerchant_show(){
      if(!this.v_gateWay){
          this.$toast.loading({
          //duration: 0,          // 持续展示 toast
          forbidClick: true,    // 禁用背景点击
          mask:true,
          message: '请选择网关',
          type:'fail',
        });
        return;
      }else if(Number(this.v_money) <= 0){
        this.$toast.loading({
          forbidClick: true,
          mask:true,
          message: '请输入金额',
          type:'fail',
        });
        return;
      }else{
       this.merchant_show = true
       this.$refs.SelectMerchant.handleMerchant(this.v_gateWay,this.v_ratio,this.v_money);
      }
    },

    //立即提款
    async handleConfirm () {
      var that = this
      var toast = this.$toast.loading({
        forbidClick: true,    // 禁用背景点击
        message: '请稍候！',
        overlay:true,
        loadingType: 'spinner',
      });
      let desc_MerchantOrders =this.desc_MerchantOrders;
      let submit = false;
      let costUNDTnum = 0;
      let price = 0;
      let ratio = this.v_ratio;
      let payNum = this.v_money;
      let costUNDTs = this.v_costUNDT;
      let gateWay = this.v_gateWay;
      let balance = this.balance;
      let localJson = localStorage.getItem(String('gateWay'));
      localJson = JSON.parse(localJson);
      console.log(payNum);

      if (payNum <= 0) {
        this.$toast.loading({
            forbidClick: true,    // 禁用背景点击
            message: '请输入提款金额',
            type: 'fail',
          });
        return;
      }

      if (costUNDTs < 10) {
        this.$toast.loading({
          forbidClick: true,
          message: '扣除金额小于10',
          type: 'fail',
        });
        return;
      }
      var current_id = this.current_id
      for (let i = 0; i < desc_MerchantOrders.length; i++) {
        if (desc_MerchantOrders[i][0] > 0) {
          price = web3.utils.fromWei(desc_MerchantOrders[i][2], 'ether');
          price = web3.utils.fromWei(price, 'mwei');
          price = Number(price);
          costUNDTnum = Number(payNum * (1 + ratio) / price).toFixed(4);


          let temp_bond = Number(web3.utils.fromWei(desc_MerchantOrders[i][7], 'ether'));
          let temp_bondUser = Number(web3.utils.fromWei(desc_MerchantOrders[i][8], 'ether'));
          let temp_level = Number(desc_MerchantOrders[i][1]);
          let temp_minNum = Number(web3.utils.fromWei(desc_MerchantOrders[i][4], 'ether'));
          let temp_maxNum = Number(web3.utils.fromWei(desc_MerchantOrders[i][5], 'ether'));
          let goods = Number(desc_MerchantOrders[i][3]);

          if (((temp_bond > temp_bondUser && temp_bond > (costUNDTnum / 2) && temp_level == 1) || temp_level == 2) && temp_minNum <= costUNDTnum && temp_maxNum >= costUNDTnum && goods >= payNum) {
            current_id = i; //满足条件的商户索引
            this.v_exRate = price;
            this.v_costUNDT = costUNDTnum;
            submit = true;
            break;
          }
        }
      }
      if (Number(costUNDTnum) > Number(balance) || Number(balance) <= 0) {
        this.$toast.loading({
          forbidClick: true,
          message: '余额不足000',
          type: 'fail',
        });
        return;
      }

      if (submit == false) {
        this.$toast.loading({
          forbidClick: true,
          message: '未找到满足条件的商户',
          type: 'fail',
        });
        return;
      }
      let my_address = this.address;
      let is_merchants = await merchants(my_address);
      let is_merchants_id = Number(is_merchants.merchantID);
      if (is_merchants_id != 0) {
        this.$toast.loading({
          forbidClick: true,
          message: '您已经是商户，请更换账号下单',
          type: 'fail',
        });
        return;
      };

      let fee = desc_MerchantOrders[current_id][6]; //手续费
      let tokenNum = costUNDTnum; //toekn数量
      let exPrice = Number(this.v_exRate); //兑换价格
      let country = ''; //国家
      let SWIFT = ''; //SWIFT CODE
      let bank = ''; //银行名称
      let username = ''; //收款方户名
      let account = ''; //收款方账号
      let coin = ''; //币种
      let aolastName = this.v_postscript; //附言

      //
      // if (fee > 0) {
      //   $("#hidden_fee").css('display', '-webkit-flex');
      //   $("#fee").text(fee / Math.pow(10, 18));
      // }

      let flag = false;
      localJson.forEach(function(n,i) {
        if (gateWay == n.gateWay) {
          country = n.country;
          SWIFT = n.code;
          bank = n.bank;
          username = n.username;
          account = n.account;
          coin = n.coin;
          flag = true;
          return false;
        }
      });
      if (flag == false) {
        this.$toast.loading({
          forbidClick: true,
          message: '未找到匹配网关',
          type: 'fail',
        });
        return;
      }

      let authorize_num = await authorize_coin_num(CONFIG['c2c_addr']);
      authorize_num = Number(authorize_num);
      if (authorize_num <= 0 || authorize_num < tokenNum) {
        this.$toast.loading({
          forbidClick: true,
          message: '请先解锁',
          type: 'fail',
        });
        return;
      }
      let json_str = {
        "token": tokenNum,
        "exPrice": exPrice,
        "fee": fee,
        "country": country,
        "swift": SWIFT,
        "bank": bank,
        "username": username,
        "account": account,
        "aolastName": aolastName,
        "coin": coin
      };
      json_str = JSON.stringify(json_str);
      let user_str = encrypted(json_str);

      let address = await id_address(desc_MerchantOrders[current_id][0]);
      let checkerS = await checker(gateWay);
      let hash_checker = await rsaKeys(checkerS);
      let rsaKey_checker = await download(hash_checker);
      let hash = await rsaKeys(address);
      let rsaKey = await download(hash);
      let businessStr = encrypted2(json_str, rsaKey);
      let checkerStr = encrypted2(json_str, rsaKey_checker);
      let orderInfoB = user_str + "," + businessStr + "," + checkerStr;
      let orderInfoA = await upload(orderInfoB);
      payNum = payNum.toString();
      exPrice = exPrice.toString();
      payNum = web3.utils.toWei(payNum, 'mwei');
      exPrice = web3.utils.toWei(exPrice, 'mwei');

      let order_info = {
        "merchantID": desc_MerchantOrders[current_id][0],
        "gateWay": gateWay,
        "price": exPrice,
        "fee": fee,
        "cashAmount": payNum,
        "orderInfoA": orderInfoA
      };

      localStorage.setItem('userStr', user_str);
      localStorage.setItem('order_info', JSON.stringify(order_info));
      that.Paydetail = true;
      setTimeout(function() {
        toast.clear();
      }, 500);
      this.desc_MerchantOrders = desc_MerchantOrders;
      this.current_id = current_id;
      this.$refs.loadOrders.loadPay()
    },

    //设置公钥私钥
    setrsakey() {
      var pubKey = localStorage.getItem(String('pubKey'));
      if (!pubKey) {
        this.$axios.get("https://query.uniondao.com/queue/new_rsa_key").then((e)=>{
          localStorage.setItem('pubKey', e.data.pubKey);
          localStorage.setItem('privKey', e.data.privKey);
        })
      }
    },

    //扣除手续费（UNDT）
    async costUNDT(obj) {
        onlyNumber(obj);
        let temp_num = Number(obj);
        if (temp_num) {
            let price = Number(this.v_exRate);
            let arbitrationMarginRatio = Number(this.v_ratio);
            if (price > 0 && arbitrationMarginRatio > 0) {
                arbitrationMarginRatio = Number(arbitrationMarginRatio);
                let costNum = temp_num * (1 + arbitrationMarginRatio) / price;
                this.v_costUNDT = costNum.toFixed(4);

                const authorize_num = await authorize_coin_num(CONFIG['c2c_addr']);
                if (authorize_num <= 0 || authorize_num < costNum) {
                    // $("#opt").attr("onclick", "shouquan(10000000000000)");
                    // $("#opt").text("解锁");
                }
            }
            if (temp_num <= 0) {
                this.v_costUNDT = "0.0000";
            }
        } else {
            this.v_costUNDT = "0.0000";
        }
    },

    //选中商家
    handleChoiced(id,price) {

      console.log(id,",",price);
      this.merchantID = id;
      this.v_exRate = Number(price);
      this.merchant_show = false;
      this.costUNDT(this.v_money);
    },

    //处理小数位
    toolNumber(param) {
        let strParam = String(param)
        let flag = /e/.test(strParam)
        if (!flag) return param

        // 指数符号 true: 正，false: 负
        let sysbol = true
        if (/e-/.test(strParam)) {
            sysbol = false
        }
        // 指数
        let index = Number(strParam.match(/\d+$/)[0])
            // 基数
        let basis = strParam.match(/^[\d\.]+/)[0].replace(/\./, '')

        if (sysbol) {
            return basis.padEnd(index + 1, 0)
        } else {
            return basis.padStart(index + basis.length, 0).replace(/^0/, '0.')
        }
    }




  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped >
@import "@/assets/css/vant_new.scss"; //引入公共样式
$tc:#8BF692;
$i_bor:#7B7780;
$font_c:#319B38;
$order_c:#77807A;
$g_c:#666;
* {
    padding: 0;
    margin: 0;
    list-style: none;
    color: #fff;
    font-size: 22px;
    image {
        width: 100%;
        height: 100%;
    }
}
//自定义样式（非vant组件）
#index{
  height:100%;
  margin:0 auto;
  //动态地图
  .header_img{
    width: 100%;
    height: 326px;
    background-image: url('../assets/img/map.gif');
    background-size: 120% 326px;
    background-position-x: 50%;
  }
  /*按钮和按钮以上分开*/
  //按钮以上部分
  .top_part{
    width: 85.5%;
    max-width: 750px;
    margin: 0 auto 15px;
    min-height: 688px;
    height: 56vh;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .lock_overly{
      width: 100%;
      height: 150px;
      position: absolute;
      border-radius: 12px;
      margin: 0 auto;
      float: left;
      top: 2%;
    }
    //账户余额
    .lock{
      width: 100%;
      height: 120px;
      border-radius: 12px;
      box-sizing: border-box;
      border: 1px solid #D4BE9B;
      overflow: hidden;
      margin: 0 auto;
      background:url('../assets/img/lock.png');
      background-size: 100% 100%;
      display: flex;
      justify-content: space-around;
      padding: 30px;
      padding-left: 15px;
      li{
        align-items: flex-end;
        color: #000;
        span{
          color: #000;
          font-size: 24px;
          padding-bottom: 5px;
          i{
            font-size: 36px;
            font-weight: 600;
            color: #000;
          }
        }
        .account_label{
          width: 140px;
          font-size: 24px;
          // line-height: 50px;
          display: inline-block;
          padding-top: 18px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .account_balance{
          font-size: 60px;
        }
      }
    }
    //输入或选择部分
    .every_form{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      li{
        width: 150px;
        display: flex;
        align-items: center;
        i{
          font-size: 30px;
          color: #fff;
          margin-right: 10px;
        }
      }
      .i_input {
        width: 82%;
        height: 80px;
        font-size: 22px;
        border-color:$i_bor;
        margin-right: 10px;
        z-index: 11;
        @include input_common;
      }
      .i_input:focus,.gateWay_click{
        border-color:$tc;
        box-shadow: inset $font_c 0px 0px 15px;
        -moz-box-shadow: inset $font_c 0px 0px 15px;
        -webkit-box-shadow: inset $font_c 0px 0px 15px;
      }
      .have_tip{
        padding-bottom: 30px;
        box-sizing: border-box;
      }
      .form_right_part{
        width: 73%;
        .select_getWay{
          position: relative;
          .getWay_icon_xia{
            position: absolute;
            top: 40%;
            right: 85px;
          }
          .getWay_details{
            width: 70px;
            height: 40px;
            font-size: 18px;
            padding-top: 2px;
            box-sizing: border-box;
            position: absolute;
            top: 23%;
            right: 120px;
          }
        }
        .form_tip{
          display: inline-block;
          margin-top: 10px;
          font-size: 16px;
          color: #7B7780;
        }
      }
    }
    .top_entrance{
      display: flex;
      justify-content: space-around;
      span{
        font-size: 28px;
        color:$font_c;
      }
    }
  }
  .guide{
    width: 600px;
    height: 945px;
    color:$g_c;
    background-color: #fff;
    border-radius: 30px;
    margin: 20% auto;
    padding: 0 18px;
    position: relative;
    transition: all .1s !important;
    .guide_title{
      width: 100%;
      height: 80px;
      color:#333;
      display: flex;
      align-items: center;
      font-size: 26px;
      letter-spacing: 2px;
      justify-content: center;
      text-align: center;
      border-bottom: 1px solid $g_c;
      i{
        position: absolute;
        left: 30px;
        font-size: 22px;
        color: #000;
        font-weight: 600;
      }
    }
  }
    //遮罩层过度
    .fade-enter-active{
      transition: all .08s !important;
    }
    .fade-leave-active {
      transition: all 0s !important;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
  button {
    width: 480px;
    height: 80px;
    margin: 0 auto;
    // margin-top: 2%;
    @include button_common;
  }
}
</style>
