/* eslint-disable */
<template>
  <div id="Wepay">
    <div class="content_info">
      <div>
        <label>国家/地区</label>
        <div class="right_option">
          <select class="i_input" v-model="v_area" style="color:#ccc" @change="area_select('area')">
            <option style="color:#000;background-color:#ccc;display:none" disabled="disabled" selected>选择国家/地区</option>
            <option v-for="item in area_list" v-bind:value="item.value" style="color:#000;">{{item.name}}</option>
          </select>
          <span class="getWay_icon_xia"><i class="iconfont icon-xia-copy"></i></span>
        </div>
      </div>
      <div>
        <label>币种</label>
        <div class="right_option">
          <select class="i_input" v-model="v_coin" style="color:#ccc" @change="area_select">
            <option style="color:#000;background-color:#ccc;display:none;" disabled="disabled">选择币种</option>
            <option v-for="item in coin_list" v-bind:value="item" style="color:#000;">{{item}}</option>
          </select>
          <span class="getWay_icon_xia"><i class="iconfont icon-xia-copy"></i></span>
        </div>
      </div>
      <div>
        <label>收款方账号</label>
        <div class="right_option">
          <input type="text" class="i_input" placeholder="微信绑定的手机号码" v-model="v_account">
        </div>
      </div>
    </div>
    <div class="QRcode_part">
      <div>
        <label>收款二维码</label>
        <span style="color: #8BF692;"><u>  点击上传图片</u></span>
      </div>
      <div>
        <label></label>
        <span class="bit_tip">Tips:地址和收款二维码二选一，推荐使用收款二维码</span>
      </div>
    </div>
    <div class="getway_necessarily">
      <div>
         <label>网关名称</label>
         <span>{{gateway_name}}</span>
        </div>
      <div>
        <label>公钥</label>
        <span style="color: #8BF692" v-if="$store.state.upkeys">已上传</span>
        <span style="color: #8BF692" @click="upkeys()" v-else>生成并上传</span>
        
      </div>
      <div class="button_area">
        <button>保存</button>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { Toast } from 'vant'
export default {
  name: 'Wepay',
  data () {
    return {
      area_list:[{value:'CHINA',name:"中国大陆"}, {value:'HOKONG',name:"中国香港"}],
      coin_list:"",
      v_area: "选择国家/地区",
      v_coin: "选择币种",
      v_account: "",
      select_info:[{value:'CHINA',coin:['CNY']}, {value:'HOKONG',coin:["HKD","USD"]}],
      gateway_name:"",
    }
  },
  mounted(){
      
  },
  methods:{
    area_select(v){
      if(v == "area"){
        this.gateway_name = "";
        this.v_coin = "选择币种"; 
        for(let i in this.select_info){ 
          //币种根据国家/地区而显示
          if(this.v_area == this.select_info[i]['value']){
            this.coin_list=this.select_info[i]['coin']
          }
      }   
      }else{
        if( this.v_area != "选择国家/地区" && this.v_coin != "选择币种"){
          this.gateway_name = this.v_area+"-WP-"+this.v_coin;
        }else{
          this.gateway_name = "";
        }
      }
    },
    upkeys(){
      this.$store.dispatch("asyncUpkeys")
    }
  },
}

</script>
<style lang="scss" scoped>
@import "@/assets/css/vant_new.scss"; 
  #Wepay{
    width: 100%;
    height: 100%;
    padding-top: 50px;
    box-sizing: border-box;
    position: relative;
    .content_info{
      width: 90%;
      height: 195px;
    }
      
  }
</style>