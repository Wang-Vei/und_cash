
<template>
  <div id="Merchant">
    <div class="overly_part">
      <div class="overly_title">
        <i class="iconfont icon-guanbi-cu" @click="handleClose"></i>
        <span>选择商家</span>
      </div>
      <div class="overly_select"></div>
      <div class="overly_content">
        <div class="merchant_item" v-for="item in merchant_list" v-bind:key="item.id">
          <div class="item_left">
            <li class="merchant_title">
              <span class="merchant_id">id：{{item[0]}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>LV{{item[1]}}</span>
            </li>

            <li>库存：{{item[3]}} {{unit}}</li>
            <li>限额：{{item[4]}} U-{{item[5]}} U</li>
            <li>交易量：{{item[9]}}</li>
            <li>好评率：{{item[10]}}</li>
          </div>
          <div class="item_right">
            <li class="unit">单价</li>
            <li class="merchant_price"><span>{{item[11]}}</span>&nbsp;U</li>
            <li>
              <button @click="choice(item[0],item[12])">选择</button>
            </li>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {id_address,queryAllMerchantOrders,Statisticss} from '@/assets/js/coin/c2c.js';
export default {
  name: 'Merchant',
  data(){
    return {
      v_coin:"",
      unit:"",
      merchant_list:[],
    }
  },
  methods: {
    //关闭商家选择
    handleClose () {
      this.$emit('closeOverly')
    },

    //商家列表
    async handleMerchant(gateWay,arbitrationMarginRatio1,payNum){
      const toast=this.$toast.loading({
        duration: 0,          // 持续展示 toast
        forbidClick: true,    // 禁用背景点击
        mask:true,
        message: '加载中，请稍侯',
        loadingType:"spinner",
      });
      this.merchant_list = [];
      var that = this
      let gate_split = gateWay.split("-");
      this.unit = gate_split[2]

      let arbitrationMarginRatio = Number(arbitrationMarginRatio1);
      let Merchant_list = await queryAllMerchantOrders(gateWay); //获取商家信息
      if(Merchant_list){
        toast.clear()
      }

      Merchant_list.forEach(async function(value) {
        if (value[0] > 0) {
            var address = await id_address(value[0]);
            var merchant_price = web3.utils.fromWei(value[2], 'ether');
            merchant_price = Number(web3.utils.fromWei(merchant_price, 'mwei'));
            //获取订单数和申诉数
            var res = await Statisticss(address);
            var rate = 0;
            value[2] = value[2] / Math.pow(10, 18);    //汇率
            value[3] = value[3] / Math.pow(10, 6);     //库存(未处理)
            value[4] = value[4] / Math.pow(10, 18);    //最小额度
            value[5] = value[5] / Math.pow(10, 18);    //最大额度
            value[7] = value[7] / Math.pow(10, 18);    //价格
            value[3] = that.toolNumber(value[3]*merchant_price)         //库存（处理后）
            var price = 1/Number(merchant_price);
            console.log(price)
            value[11] = price.toFixed(4);
            value[12] = merchant_price;
            value[9]=res[0]
            if (Number(res[0]) > 0) {                         //好评率
                value[10] = (Number(res[0]) + Number(res[2]) - Number(res[1])) / Number(res[0]) * 100 + "%"
            }else{
              value[10] = 0;
            }
            that.merchant_list.push(value);
            console.log(that.merchant_list);
        }
      })
    },

    //选中商家
    choice(id,price){
      this.$emit('handleChoiced',id,price)
    },

    //处理小数
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
    },
  }
}
</script>

<style lang="scss" scoped>
img{
  width: 100%;
  height: 100%;
  }
#Merchant{
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: .7);
  position: fixed;
  top: 0;
  .overly_part{
    width:600px;
    height: 1070px;
    max-width: 750px;
    margin:10% auto;
    background-color:#1A1C1A;
    border-radius: 20px;
    overflow: hidden;
    padding-bottom: 20px;
    box-sizing: border-box;
    .overly_select{
      width: 100%;
      height: 70px;
      background-color: #232624;
    }
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
        height: 210px;
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
          width: 50%;
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
            .merchant_id{
              color:#fff;
            }
            span{
              font-size:24px;
              color:#DDC90F;
            }
          }
        }
        .item_right{
          width: 50%;
          height: 90%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
          .unit{
            font-size: 26px;
          }
          li{
            button{
              width: 112px;
              height: 44px;
              margin-top: 10px;
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
