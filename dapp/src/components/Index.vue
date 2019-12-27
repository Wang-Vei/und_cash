
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
              <label for="gateWay">选择网关</label>
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
              <span class="form_tip">参考汇率：1 UNDT = 0保证金：1%</span>
            </div>
          </div>
          <div class="every_form">
            <li class="have_tip">
              <i class="iconfont icon-jine"></i>
              <label for="money">支付金额</label>
            </li>
            <div class="form_right_part">
              <input type="text" class="i_input" id="money" v-model="v_money" placeholder="输入金额">
              <span>全部</span><br>
              <span class="form_tip">扣除金额：0 UNDT</span>
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
              <input type="text" class="i_input" id="dealer" v-model="v_dealer" placeholder="系统推荐">
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
        <table>
          <tr class="record_header">
            <th><i class="iconfont icon-shijian"></i> 时间</th>
            <th><i class="iconfont icon-zhifu"></i> 金额</th>
            <th><i class="iconfont icon-richu2"></i> 操作</th>
            <th><i class="iconfont icon-zhuyi"></i> 状态</th>
          </tr>
          <tr class="record_item" @click="record_detail= true">
            <td>2019-11-30</td>
            <td>1803.20 UNDT</td>
            <td>正常</td>
            <td>待审核</td>
          </tr>
          <tr class="record_item">
            <td>2019-11-30</td>
            <td>1803.20 UNDT</td>
            <td>正常</td>
            <td>待审核</td>
          </tr>
          <tr class="record_item">
            <td>2019-11-30</td>
            <td>1803.20 UNDT</td>
            <td>正常</td>
            <td>待审核</td>
          </tr>
        </table>
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
    <Merchant v-show="merchant_show" @closeOverly='merchant_show = false'></Merchant>
    <!-- 订单详情 -->
    <Orderdetails v-show="record_detail" @closeDetails='record_detail = false'></Orderdetails>
    <!-- 添加网关 -->
    <Gateways v-show="gateWay" @closeGateways="gateWay= false"></Gateways>
  </div>
</template>
<script>
/* eslint-disable */
import { Tab, Tabs, Picker, Field, Popup, Overlay} from 'vant'
import Guide from './guide'
import Merchant from './merchant'
import Orderdetails from './orderdetails'
import Getwaydetails from './getwaydetails'
import Gateways from './gateways'

import {getWeb3, getContract} from '@/assets/js/web3_init.js';
import {abi_undt} from  '@/assets/js/abi/abi_undt.js';
import {abi_c2c} from  '@/assets/js/abi/abi_c2c.js';
import {authorize_coin,balance_undt,ethAccounts,authorize_coin_num,jsonGetLocalAll} from '@/assets/js/coin/c2c.js';
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
      v_gateWay: '',
      v_money: '',
      v_postscript: '',
      v_dealer: '',
      showPicker: false,    // 控制picker隐现
      showGuide: false,     // 新手指南框
      guide_content: false, // 新手指南内容
      merchant_show: false, // 商家显示
      record_detail: false, // 订单详情
      gateway_detail: false, // 网关详情
      gateWay: false,       // 添加网关
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
    Orderdetails,
    Getwaydetails,
    Gateways,
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

    //选择网关
    handleChoise_getWay () {
      this.showPicker = true;     //选择器弹出
      this.gateWay_click= true    //边框变色
      this.gateWay_list = [];
      var that = this
      var gateWay_All = jsonGetLocalAll('gateWay');
      if (undefined !== gateWay_All) {
        gateWay_All.forEach(function(value) {
          that.gateWay_list.push(value.gateWay);
        });
      }
    },

    //选择器的 确定
    handleOnConfirm (getWay) {
      this.v_gateWay = getWay;
      this.showPicker = false
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
      }else{
       this.merchant_show = true
      }
    },

    //立即提款
    handleConfirm () {
      this.$toast.loading({
        forbidClick: true,    // 禁用背景点击
        message: '提现成功',
        loadingType: 'load',
        // type: 'fail',
        selector: '#van-toast'
      });
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
        width: 83%;
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
            right: 80px;
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
  table{
    width: 100%;
    outline: none;
    tr{
      border-bottom: 1px solid $order_c;
      th{
        width: 25%;
        height: 82px;
        font-size: 22px;
        color: $order_c;
        line-height: 82px;
        text-align: center;
        background-color: #232625;
        i{
          font-size: 26px;
          color: $order_c;
        }
        .icon-shijian{
          font-size: 20px;
          font-weight: 600
        }
      }
      td{
        width: 25%;
        height: 60px;
        font-size: 22px;
        color: #fff;
        line-height: 60px;
        text-align: center;
        background-color: #282E2A;
      }
    }
  }
}
</style>
