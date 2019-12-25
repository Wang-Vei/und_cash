/* eslint-disable */
<template>
  <div id="Bankpay">
    <div class="content_info">
      <div>
        <label>国家/地区</label>
        <div class="right_option">
          <select class="i_input" v-model="v_area" style="color:#ccc" @change="area_select">
            <option style="color:#000;background-color:#ccc" disabled="disabled" selected='selected'>选择国家/地区</option>
            <option v-for="item in area_list" v-bind:value="item.value" style="color:#000;">{{item.name}}</option>
          </select>
          <span class="getWay_icon_xia"><i class="iconfont icon-xia-copy"></i></span>
        </div>
      </div>
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
        <label>银行名称</label>
        <div class="right_option">
          <select class="i_input" v-model="v_bank" style="color:#ccc" @change="area_select">
            <option style="color:#000;background-color:#ccc" disabled="disabled" selected>选择银行</option>
            <option v-for="item in bank_list" v-bind:value="item.value" style="color:#000;">{{item.name}}</option>
          </select>
          <span class="getWay_icon_xia"><i class="iconfont icon-xia-copy"></i></span>
        </div>
      </div>
      <div>
        <label>SEIFT CODE</label>
        <div class="right_option">
          <input type="text" class="i_input" placeholder="输入银行CODE" v-model="v_code">
        </div>
      </div>
      <div>
        <label>收款方户名</label>
        <div class="right_option">
          <input type="text" class="i_input" placeholder="输入收款方户名" v-model="v_username">
        </div>
      </div>
      <div>
        <label>收款方账号</label>
        <div class="right_option">
          <input type="text" class="i_input" placeholder="输入收款方账号" v-model="v_account">
        </div>
      </div>
    </div>
    <div class="getway_necessarily">
      <div>
         <label>网关名称</label>
         <span>{{gateway_name}}</span>
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
/* eslint-disable */
import { Toast } from 'vant'
export default {
  name: 'Bankpay',
  data () {
    return {
      area_list:[{value:'CHINA',name:"中国大陆"}, {value:'HOKONG',name:"中国香港"}],
      coin_list:"",
      bank_list:"",
      v_area: "选择国家/地区",
      v_coin: "选择币种",
      v_bank: "选择银行",
      v_code: "",
      v_username: "",
      v_account: "",
      gateway_name:"",
      select_info:[
        {value:'CHINA',
          coin:['CNY'],
          bank:[
          {value:"BOC",name:"农业银行"},
          {value:"BCCB",name:"北京银行"},
          {value:"CCB",name:"建设银行"},
          {value:"CEB",name:"光大银行"},
          {value:"CIB",name:"兴业银行"},
          {value:"CITIC",name:"中信银行"},
          {value:"CMBA",name:"招商银行"},
          {value:"CMBC",name:"民生银行"},
          {value:"COMM",name:"交通银行"},
          {value:"GDB",name:"广发银行"},
          {value:"ICBC",name:"工商银行"},
          {value:"PSBC",name:"邮政银行"},
          {value:"SPDB",name:"浦发银行"},
          {value:"SZPAB",name:"平安银行"}
          ]
        }, 
        {value:'HOKONG',
        coin:["HKD","USD"],
        bank:[
          {value:"CMB",name:"招商銀行香港分行"},
          {value:"SCB",name:"渣打銀行"},
          {value:"CAI",name:"東方匯理銀行"},
          {value:"CNA",name:"花旗銀行"},
          {value:"THE",name:"東亞銀行"},
          {value:"WLBL",name:"永隆銀行"},
          {value:"MBL",name:"豐明銀行"},
          {value:"SHBL",name:"恒生銀行"},
          {value:"DBL",name:"星展銀行"},
          {value:"BOCL",name:"中國銀行香港分行"},
          {value:"WHBL",name:"永亨銀行"},
        ]
        }, 
      ],
    }
  },
  methods:{
    area_select(){
      if( this.v_area != "选择国家/地区" && this.v_coin != "选择币种" && this.v_bank != "选择银行"){
        console.log(this.v_area);
        console.log(this.v_coin);
        console.log(this.v_bank);
        this.gateway_name = this.v_area+"-LB-"+this.v_coin;
      }
      
      for(let i in this.select_info){
        // console.log(this.coin_list[i]['parentid'])
        if(this.v_area == this.select_info[i]['value']){
          this.coin_list=this.select_info[i]['coin']
          this.bank_list=this.select_info[i]['bank']
        }
      }
    }
  },
}

</script>
<style lang="scss" scoped>
@import "@/assets/css/vant_new.scss"; 
  #Bankpay{
    width: 100%;
    height: 100%;
    // background-color: aquamarine;
    padding-top: 50px;
    box-sizing: border-box;
    position: relative;
    .content_info{
      width: 90%;
      height: 420px;
    }
      
  }
</style>