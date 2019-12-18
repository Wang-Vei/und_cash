<template>
  <div id="index">
    <div class="header_img"></div>
    <van-tabs swipeable>
      <van-tab title="支付网关">
        <div class="top_part">
          <div class="clock">
            <li>
              <span class="account_label">账户余额&nbsp;&nbsp;&nbsp;
              <i class="iconfont icon-jiesuo" v-if="balance_lock"></i>
              <i class="iconfont icon-suo" v-else></i>
              </span>
            </li>     
            <li><span class="account_balance">175056.17</span>UNDT</li>
          </div>
          <div class="every_form">
            <li class="have_tip">
              <i class="iconfont icon-wangguan" style="display:inline-block;transform:rotate(60deg);"></i>
              <label for="gateWay">选择网关</label>
            </li>
            <div class="form_right_part" v-clickoutside="handleClean_getWay">
              <div class="select_getWay">
                <input readonly :class="`i_input ${getWay_clicked?'getWay_clicked':''}`" placeholder="选择网关" v-model="v_getWay" @click="handleChoise_getWay" >
                <span class="getWay_icon_xia" @click="handleChoise_getWay"><i class="iconfont icon-xia-copy"></i></span>
                <button class="getWay_details" @click="getway_detail = true">详情</button>
                <span @click="getways= true">添加</span><br>
              </div>
              <van-popup v-model="showPicker" position="bottom">
                <van-picker
                  show-toolbar
                  :columns="getway_list"
                  @cancel="showPicker = false"
                  @confirm="onConfirm"
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
              <span @click="merchant_show = true">查看</span><br>
            </div>
          </div>
          <div class="top_entrance">
            <span @click="showGuide = true , guide_content = true" >新手指南</span>
            <span>交易商入口</span>
          </div>
        </div>
        <button @click="confirm">
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
    <van-overlay :show="getway_detail" @click="getway_detail = false">
      <Getwaydetails></Getwaydetails>
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
    <Getways v-show="getways" @closeGetways="getways= false"></Getways>
    <!-- 提示框 -->
    <van-toast id="van-toast"/>
  </div>
</template>
<script>
import { Tab, Tabs, Picker, Field, Popup, Overlay} from 'vant'
import Guide from './guide'
import Merchant from './merchant'
import Orderdetails from './orderdetails'
import Getwaydetails from './getwaydetails'
import Getways from './getways'
export default {
  name: 'index',
  data () {
    return{
      balance_lock: true,    // 账户余额的锁
      getWay_clicked: false, // 点击选择网关变色
      v_getWay: '',
      v_money: '',
      v_postscript: '',
      v_dealer: '',
      value:  '',
      showPicker: false, // 控制picker隐现
      showGuide: false,     // 新手指南框
      guide_content: false, // 新手指南内容
      merchant_show: false, // 商家显示
      record_detail: false, // 订单详情
      getway_detail: false, // 网关详情
      getways: false,       // 添加网关
      getway_list: ['CHINA-LB-CNY', 'HONGKONG-LB-HKD', 'HONGKONG-WP-HKD'],
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
    Getways,
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
  methods:{
    //立即提款
    confirm () {
      this.$toast({
        // duration: 0,       // 持续展示 toast
        forbidClick: true,    // 禁用背景点击
        message: '提现成功',
        type: 'success',
        selector: '#van-toast'
      });
    },
    handleClean_getWay () {
      this.getWay_clicked= false
    },
    handleChoise_getWay () {
      this.showPicker= true;
      this.getWay_clicked= true
    },
    onConfirm (getWay) {
      this.v_getWay = getWay;
      this.showPicker = false
    },
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
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    //账户余额
    .clock{
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
          display: inline-block;
          padding-top: 20px;
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
      .i_input:focus,.getWay_clicked{
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
            top: 30%;
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
