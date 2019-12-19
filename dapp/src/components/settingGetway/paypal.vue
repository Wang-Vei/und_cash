<template>
  <div id="Paypal">
    <div class="content_info">
      <div>
        <label>币种</label>
        <div class="right_option">
          <select class="i_input" v-model="v_coin" style="color:#ccc" @change="area_select">
            <option style="color:#000;background-color:#ccc" disabled="disabled" selected>选择币种</option>
            <option v-for="item in coin_list" v-bind:value="item" style="color:#000;">{{item}}</option>
          </select>
          <span class="getWay_icon_xia"><i class="iconfont icon-xia-copy"></i></span>
        </div>
      </div>
      <div>
        <label>PayPal</label>
        <div class="right_option">
          <input type="text" class="i_input" placeholder="输入邮箱地址" v-model="v_account">
        </div>
      </div>
    </div>
    <div class="getway_necessarily">
      <div>
         <label>网关名称</label>
         <span>asdfsdf</span>
        </div>
      <div>
        <label>公钥</label>
        <span style="color: #8BF692">生成并上传</span>
      </div>
      <div class="button_area">
        <button>保存</button>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant'
export default {
  name: 'Paypal',
  data(){
    return{
      coin_list:["CNY","HKD","USD","EURO"],
      v_coin: "选择币种",
      v_account: "",
    }
  },
  methods:{
    area_select(){
      if(this.v_coin != "选择币种"){
        console.log(this.v_coin);
      }
    }
  },
}

</script>
<style lang="scss" scoped>
@import "@/assets/css/vant_new.scss"; 
  #Paypal{
    width: 100%;
    height: 100%;
    padding-top: 50px;
    box-sizing: border-box;
    position: relative;
    .content_info{
      width: 90%;
      height: 130px;
    }
  }
</style>