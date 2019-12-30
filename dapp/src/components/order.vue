/* eslint-disable */
<template>
  <div>
    <div id="Order">
      <table>
            <tr class="record_header">
              <th><i class="iconfont icon-shijian"></i> 时间</th>
              <th><i class="iconfont icon-zhifu"></i> 金额</th>
              <th><i class="iconfont icon-richu2"></i> 操作</th>
              <th><i class="iconfont icon-zhuyi"></i> 状态</th>
            </tr>
            <tr class="record_item" v-for="item in order_list" @click="record_detail= true">
              <td>{{item.beginTime}}</td>
              <td>{{item.num}} {{unit}}</td>
              <td>正常</td>
              <td>{{item.status}}</td>
            </tr>
          </table>
    </div>
    <!-- 订单详情 -->
    <Orderdetails v-show="record_detail" @closeDetails='record_detail = false'></Orderdetails>
  </div>
</template>
<script>
/* eslint-disable */
import Orderdetails from './orderdetails'
import {ethAccounts,queryAllOrder,orders} from '@/assets/js/coin/c2c.js';
import {formatTime} from '@/assets/js/func.js';
import {CONFIG} from '@/assets/js/config.js';
export default {
  name:'Order',

  data () {
    return{
      record_detail: false, // 订单详情
      order_list:[],
    }
  },
  mounted(){
    this.orderList()
    },
    components:{
      Orderdetails,
    },
    methods:{
      async orderList() {
        let Useraddr = await ethAccounts();
        let gateWay = '';
        let start = 0;
        let limit = 999;
        let orderIDS = await queryAllOrder(Useraddr, 0, gateWay, CONFIG.c2c_addr, start, limit);
        let len = orderIDS.length;
        for (let i = 0; i < 5; i++) {
          //   if (orderIDS[i] == 0) {
          var id = orderIDS[i];
          var info = await orders(id);

          info.beginTime = formatTime(info.beginTime, 'Y-M-D');
          info.status = CONFIG["status-msg"][info.orderStatus];
          var gateWayss = info.gateWay;
          this.order_list.push(info);
          console.log(this.order_list);
          var gateWay_arr = gateWayss.split("-");
          info.unit = gateWay_arr[2]
          //
          //     var button = "";
          //     if (info.orderStatus == 1) {
          //         button = "<span class='cancle'>取消交易</span>";
          //     }
          //
          //     if (info.orderStatus == 2) {
          //         button = "<span class='upQuestion'>申诉</span>";
          //     }
          //
          //     if (info.orderStatus == 3) {
          //         button = "<span class='upQuestion'>申诉</span>";
          //         button += "<span class='confirm'>确认收款</span>";
          //     }
          //
          //     if (info.orderStatus == 4 || info.orderStatus == 9 || info.orderStatus == 19) {
          //         button = "<span class='appealOrder_Wrong'>投诉</span>";
          //     }
          //
          //     if (info.orderStatus == 5) {
          //         button = "<a href='./dealAppealMobile.html?id=" + id + "'>查看</a>";
          //     }
          //
          //     if (info.orderStatus == 13) {
          //         button = "<a href='./dealAppealMobile.html?id=" + id + "'>查看</a>";
          //         button += "<span class='confirm' style='margin-left: 3px'>确认收款</span>";
          //     }
          //
              info.num = web3.utils.fromWei(info.orderCashAmount, 'mwei');

          //
          //     var str =
          //     "<tr class='detail-link' orderID='" + id + "'><td>" + date + "</td><td><span>" + num + "</span>" + gateWay_arr[2] + "</td><td>" + status + "</td><td class='td-y'>" + button + "</td></tr>";
          //     $("#mylist").prepend(str);
          //   }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
$order_c:#77807A;
#Order{
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
