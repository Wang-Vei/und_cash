/* eslint-disable */
<template>
  <div id="Bitpay">
    <div class="content_info">
      <div>
        <label>币种</label>
        <div class="right_option">
          <select class="i_input" v-model="v_coin" style="color:#ccc" @change="area_select">
            <option style="color:#000;background-color:#ccc;display: none;" disabled="disabled" selected>选择币种</option>
            <option v-for="item in coin_list" v-bind:value="item" style="color:#000;">{{item}}</option>
          </select>
          <span class="getWay_icon_xia"><i class="iconfont icon-xia-copy"></i></span>
        </div>
      </div>
      <div>
        <label>地址</label>
        <div class="right_option">
          <input type="text" class="i_input" placeholder="填写地址" v-model="v_account">
        </div>
      </div>
    </div>
    <!--<div class="QRcode_part">-->
      <!--<div>-->
        <!--<label>收款二维码</label>-->
        <!--<span style="color: #8BF692;"><u>  点击上传图片</u></span>-->
      <!--</div>-->
      <!--<div>-->
        <!--<label></label>-->
        <!--<span class="bit_tip">Tips:地址和收款二维码二选一，推荐使用收款二维码</span>-->
      <!--</div>-->
    <!--</div>-->
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
        <button @click="save">保存</button>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import {jsonGetLocalAll} from '@/assets/js/coin/c2c.js';
export default {
  name: 'Bitpay',
  data () {
    return {
      coin_list:['BTC','ETH','UNDT'],
      v_coin: "选择币种",
      v_account: "",
      gateway_name:"",
    }
  },
  methods:{
    area_select(){
      if(this.v_coin != "选择币种"){
        console.log(this.v_coin);
        this.gateway_name = "ALL-BIT-"+this.v_coin;
      }

      for(let i in this.select_info){
        // console.log(this.coin_list[i]['parentid'])
        if(this.v_area == this.select_info[i]['value']){
          this.coin_list=this.select_info[i]['coin']
        }
      }
    },
    upkeys(){
      this.$emit("upkeys")
    },
    save(){
      if(!this.v_coin || this.v_coin == "选择币种"){
        this.$toast({
          forbidClick: true,
          mask:true,
          message: '请选择币种',
          type: 'fail',
        });
        return;
      }
      if(!this.v_account){
        this.$toast({
          forbidClick: true,
          mask:true,
          message: '钱包地址缺失',
          type: 'fail',
        });
        return;
      }
      if(!this.gateway_name){
        this.$toast({
          forbidClick: true,
          mask:true,
          message: '未找到网关',
          type: 'fail',
        });
        return;
      }
      var gateWay_All = jsonGetLocalAll();
      var that = this
      if (undefined !== gateWay_All) {
        gateWay_All.forEach(function (value,index) {
          if (value.gateWay == that.gateway_name) {
              gateWay_All.splice(index, 1);
              return false;
          }
        })
        var obj = {};
        obj.gateWay = this.gateway_name;
        obj.coin = this.v_coin;
        obj.address = this.v_account;
        gateWay_All.push(obj);
        localStorage.setItem("gateWay", JSON.stringify(gateWay_All));
    } else {
        var newobj = [];
        var obj = {};
        obj.gateWay = this.gateway_name;
        obj.coin = this.v_coin;
        obj.address = this.v_account;
        newobj.push(obj);
        localStorage.setItem("gateWay", JSON.stringify(newobj));
    }
    this.$toast.loading({
        forbidClick: true,
        mask:true,
        message: '添加成功',
        type: 'success',
      });
      setTimeout(function () {
        location.reload()
      },1000)                         //添加成功 刷新页面
    },
  },
}

</script>
<style lang="scss" scoped>
@import "@/assets/css/vant_new.scss";
  #Bitpay{
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
