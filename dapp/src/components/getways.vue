/* eslint-disable */
<template>
  <div id="Getways">
    <div class="overly_part">
      <div class="overly_title">
        <i class="iconfont icon-guanbi-cu" @click="handleClose"></i>
        <span>设置支付网关</span>
      </div>
      <van-tabs animated>
        <van-tab title="银行转账">
          <Bankpay @upkeys="handleUpkeys"></Bankpay>
        </van-tab>
        <van-tab title="PayPal">
          <Paypal @upkeys="handleUpkeys"></Paypal>
        </van-tab>
        <van-tab title="加密货币">
          <Bitpay @upkeys="handleUpkeys"></Bitpay>
        </van-tab>
        <!--<van-tab title="支付宝">-->
          <!--<Alipay @upkeys="handleUpkeys"></Alipay>-->
        <!--</van-tab>-->
        <!--<van-tab title="微信">-->
          <!--<Wepay @upkeys="handleUpkeys"></Wepay>-->
        <!--</van-tab>-->
      </van-tabs>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { Tab, Tabs, Picker, Field, Overlay, Toast } from 'vant'
import Bankpay from './settingGetway/bankpay';
import Paypal from './settingGetway/paypal';
import Bitpay from './settingGetway/bitpay';
import Alipay from './settingGetway/alipay';
import Wepay from './settingGetway/wepay';

import { getWeb3, getContract} from '@/assets/js/web3_init.js';
import {abi_undt} from  '@/assets/js/abi/abi_undt.js';
import {CONFIG} from "@/assets/js/config.js"
import {abi_c2c} from  '@/assets/js/abi/abi_c2c.js';
import {upload, updateRsaKey, authorize_coin,balance_undt,ethAccounts,authorize_coin_num,rsaKeys} from '@/assets/js/coin/c2c.js';

export default {
  name: 'Getways',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Picker.name]: Picker,
    [Field.name]: Field,
    [Overlay.name]: Overlay,
    [Toast.name]: Toast,
    Bankpay,
    Paypal,
    Bitpay,
    Wepay,
    Alipay
  },
  mounted()
  {
    let init_exchange = async() => {
        try {
            //实例化web3
            window.web3 = await getWeb3();
            //实例化需要用到的合约
            window.Contract_undt = await getContract(abi_undt, CONFIG.undt_addr);
            window.Contract_c2c = await getContract(abi_c2c, CONFIG.c2c_addr);
            let account = await ethAccounts();
            console.log(account);
            let rsakeys = await rsaKeys(account);
            if (rsakeys) {
              this.$store.dispatch("asyncUpkeys")
            }
        } catch (e) {
            console.log('实例化失败')
            this.$toast({
              //duration: 0, // 持续展示 toast
              forbidClick: true, // 禁用背景点击
              mask: true,
              message: '实例化失败',
              Type: "fail",
            });
        }
    }

    init_exchange();
  },
  methods: {
    handleClose(){
      this.$emit('closeGetways');
    },
    async handleUpkeys(){
      var that = this;
      var pubKey = localStorage.getItem(String('pubKey'));
      console.log(pubKey);
      if (!pubKey) {
          this.$toast({
              //duration: 0,       // 持续展示 toast
              forbidClick: true, // 禁用背景点击
              message: '未找到您的公钥',
              // loadingType: 'load',
              type: 'fail',
              // selector: '#van-toast'
          });
          return;
      } else {
          const toast = this.$toast.loading({
              duration: 0, // 持续展示 toast
              forbidClick: true, // 禁用背景点击
              mask: true,
              message: '上传中...',
              loadingType: "spinner",
          });
          let hash = await upload(pubKey);
          updateRsaKey(hash).then(
              function(v) {
                  console.log(v);
                  toast.message = "上传成功";
                  toast.type = 'success';
                  that.$store.dispatch("asyncUpkeys")
                  setTimeout(toast.clear(),1000);
              },
              function(e) {
                  console.log(e);
                  toast.message = "上传失败";
                  toast.type = 'fail';
                  setTimeout(toast.clear(),1000);
                  return false;
              }
          );
      }
    }
  }
}
</script>

<style lang="scss" scoped>
img{
  width: 100%;
  height: 100%;
  }
#Getways{
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: .7);
  position: fixed;
  top: 0;
  .overly_part{
    width:600px;
    height: 900px;
    max-width: 750px;
    margin:20% auto;
    background-color:#1A1C1A;
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
      height: 921px;
      background-color:#1A1C1A;
      overflow-y: scroll;
      padding-right: 10px;
      padding-bottom: 50px;
      box-sizing: border-box;
      .merchant_item{
        width: 100%;
        height: 200px;
        border-bottom: 1px solid #333333;
        padding: 30px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-around;
        align-items: center;
        div{
          li{
            font-size: 20px;
            color: #808080;
          }
        }
        .item_left{
          width: 65%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-align:left;
          .merchant_title{
            font-size: 22px;
            color: #fff;
            display: flex;
            align-items: center;
            .logo_img{
              display: inline-block;
              width: 40px;
              height: 40px;
              background-color: #fff;
            }
            span{
              font-size:24px;
              color:#DDC90F;
            }
          }
        }
        .item_right{
          width: 35%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
          // align-items: center;
          li{
            button{
              width: 112px;
              height: 44px;
              // margin: 0 auto;
              border-radius: 22px;
              outline: none;
              background-color: #319B38;
              font-size: 24px;
              color: #fff;
              border: 0;
            }
          }
          .merchant_price{
              color: #8BF692;
              span{
                font-size: 30px;
              }
            }
        }
      }
    }

  }

}


</style>
