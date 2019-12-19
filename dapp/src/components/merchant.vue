
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
  methods: {
    handleClose () {
      this.$emit('closeOverly')
    }
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
