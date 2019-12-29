
<template>
  <div id="Merchant">
    <div class="overly_part">
      <div class="overly_title">
        <i class="iconfont icon-guanbi-cu" @click="handleClose"></i>
        <span>选择商家</span>
      </div>
      <div class="overly_select"></div>
      <div class="overly_content">
        <div class="merchant_item">
          <div class="item_left">
            <li class="merchant_title">
              <span class="logo_img"><img src="" alt=""></span>&nbsp;&nbsp; conconconcoin &nbsp;&nbsp;
              <span>LV2</span>
            </li>
            <li>汇率：1 UNDT=1 USD</li>
            <li>国家/地区：Hong Kong</li>
            <li>交易金额： $ 10000-$ 30000</li>
          </div>
          <div class="item_right">
            <li >成交率： 98%</li>
            <li class="merchant_price">￥<span>64,375.00</span></li>
            <li>
              <button>购买</button>
            </li>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Merchant',
  data(){
    return {
      v_coin:"",
    }
  },
  methods: {
    handleClose () {
      this.$emit('closeOverly')
    },
    // handleMerchant(gateWay){
    //   console.log('1111111')
    //   // $('.merchant_list').empty();
    //     // let gateWay = $('#unittype option:selected').val();
    //     let gate_split = gateWay.split("-");
    //     if (gateWay) {
    //         let arbitrationMarginRatio = $('#ratio').val();
    //         arbitrationMarginRatio = Number(arbitrationMarginRatio);
    //         payNum = Number(payNum);
    //         if (payNum <= 0) {
    //             layer.msg("请先输入支付金额");
    //             return;
    //         }

    //         $(".merchant_back").css('display', 'block');
    //         $('.main').addClass('fixed');
    //         let Merchant_list = await queryAllMerchantOrders(gateWay); //获取商家信息
    //         $.each(Merchant_list, async function(index, value) {
    //             if (value[0] > 0) {
    //                 var address = await id_address(value[0]);
    //                 console.log("address:" + address)
    //                     //获取订单数和申诉数
    //                 var res = await Statisticss(address);
    //                 var rate = 0;
    //                 var merchant_price = value[2] / Math.pow(10, 18);
    //                 var min_price = value[4] / Math.pow(10, 18);
    //                 var max_price = value[5] / Math.pow(10, 18);
    //                 // var deal_price = value[7] / Math.pow(10, 18);
    //                 var price = payNum * (1 + arbitrationMarginRatio) / merchant_price;
    //                 price = price.toFixed(4);
    //                 if (Number(res[0]) > 0) {
    //                     rate = (Number(res[0]) + Number(res[2]) - Number(res[1])) / Number(res[0]) * 100 + "%"
    //                 }
    //                 var str =
    //                     '<div class="every_merchant">' +
    //                     '<ul class="item_left">' +
    //                     '<li class="item_title">' +
    //                     '<span>id:<span class="merchant_ID">' + value[0] + '</span> </span> <span style="color:#DDC90F;font-size: 14px;">LV' + value[1] + '</span>' +
    //                     '</li>' +
    //                     '<li>汇率：1 UNDT=<span class="merchant_price">' + merchant_price + '</span>' + gate_split[2] + '</li>' +
    //                     '<li>国家/地区：' + gate_split[0] + '</li>' +
    //                     '<li>交易金额：' + min_price + 'UNDT-' + max_price + 'UNDT</li>' +
    //                     ' </ul>' +
    //                     '<ul class="item_right">' +
    //                     '<li style="color: #fff;font-size: 12px;">成交率：' + rate + '</li>' +
    //                     '<li style="color: #DDC90F;font-size: 12px;"><span style="font-size: 20px;font-weight: 600;">' + price + 'UNDT</span></li>' +
    //                     '<button class="changeGateWay">选择</button>' +
    //                     '</ul>' +
    //                     '</div>';
    //                 $('.merchant_list').append(str);
    //             }
    //         })

    //     } else {
    //         layer.msg("请先选择网关")
    //     }
    // }
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
