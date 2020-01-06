/* eslint-disable */
<template>
  <div>
    <div id="Order">

      <table>
            <tr class="record_header">
              <th><i class="iconfont icon-shijian"></i> 时间</th>
              <th><i class="iconfont icon-zhifu"></i> 金额</th>
              <th><i class="iconfont icon-zhuyi"></i> 状态</th>
              <th><i class="iconfont icon-richu2"></i> 操作</th>
            </tr>
            <tr class="record_item" v-if="order_list.length > 0" v-for="item in order_list" @click="handleRecord_detail(item.ID)" >
              <td>{{item.beginTime}}</td>
              <td>{{item.num}} {{item.unit}}</td>
              <td>{{item.status}}</td>
              <td>
                <span class="action" v-if="item.orderStatus == 1" @click="handleAction('cancel',item.ID)" @click.stop>取消交易</span>
                <span class="action" v-else-if="item.orderStatus == 2" @click="handleAction('appeal',item.ID)" @click.stop>申诉</span>
                <span class="action" v-else-if="item.orderStatus == 3">
                  <span @click="handleAction('appeal',item.ID)" @click.stop>申诉</span>
                  <span @click="handleAction('affirm',item.ID)" @click.stop>确认收款</span>
                </span>
                <span class="action" v-else-if="item.orderStatus == 4 || item.orderStatus == 9 || item.orderStatus == 19" @click="handleAction('complain',item.ID)" @click.stop>投诉</span>
                <span class="action" v-else-if="item.orderStatus == 5" @click="handleAction('select',item.ID,item.orderStatus)" @click.stop>查看进度</span>
                <span class="action" v-else-if="item.orderStatus == 12 || item.orderStatus == 10">查看</span>
                <span class="action" v-else-if="item.orderStatus == 13">
                  <span>查看</span>
                  <span @click="handleAction('affirm',item.ID)" @click.stop>确认收款</span>
                </span>
              </td>
            </tr>
            <tr class="none_list" v-if="order_list.length <= 0"> 暂无订单 </tr>
          </table>
    </div>
    <!-- 订单详情 -->
    <Orderdetails v-show="record_detail" @closeDetails='record_detail = false' ref="handleRecord_detail"></Orderdetails>
  </div>
</template>
<script>
/* eslint-disable */
import Orderdetails from './orderdetails'
import {ethAccounts,queryAllOrder,orders,cancelOrder,appealOrder_Wrong,gatewayInfoBase} from '@/assets/js/coin/c2c.js';
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
        const toast=this.$toast.loading({
          duration: 0,          // 持续展示 toast
          forbidClick: true,    // 禁用背景点击
          mask:true,
          message: '加载中，请稍侯',
          loadingType:"spinner",
        });
        let Useraddr = await ethAccounts();
        let gateWay = '';
        let start = 0;
        let limit = 999;
        let orderIDS = await queryAllOrder(Useraddr, 0, gateWay, CONFIG.c2c_addr, start, limit);
        console.log(orderIDS)
        let len = orderIDS.length;
        var order_list = [];
        for (let i = 0; i < len; i++) {
            if (orderIDS[i] > 0) {
              var id = orderIDS[i];
              var info = await orders(id);
              info.ID = orderIDS[i]
              info.beginTime = formatTime(info.beginTime, 'Y-M-D');
              info.status = CONFIG["status-msg"][info.orderStatus];
              var gateWayss = info.gateWay;
              var gateWay_arr = gateWayss.split("-");
              info.unit = gateWay_arr[2]
              info.num = web3.utils.fromWei(info.orderCashAmount, 'mwei');
              order_list.push(info)
            }
        }
        this.order_list=order_list;

        if(this.order_list){
        toast.clear();
        console.log(this.order_list);
        }else{
          toast.clear();
          this.order_list.length = 0;
        }

      },
      //查看订单详情
      handleRecord_detail(orderID,sta){
        this.$refs.handleRecord_detail.handleRecord_detail(orderID,sta)
        this.record_detail= true
      },
      //操作订单
      handleAction(v,orderID,sta){
        var toast = this.$toast.loading({
          duration: 0,          // 持续展示 toast
          forbidClick: true,    // 禁用背景点击
          mask:true,
          message: '请稍等...',
          loadingType:"spinner",
        });
        console.log(orderID)
        if(v == "cancel"){//取消
          cancelOrder(orderID).then(
            function(v) {
              toast.message = '取消成功!';
              toast.type = 'success';
              setTimeout(function () {
                local.reload()
              },1000)
            },
            function(e) {
              console.log(e);
              toast.message = '操作失败!';
              toast.type = 'fail';
              setTimeout(function () {
                local.reload()
              },1000)
            }
          )
        }else if(v == "appeal"){   //申诉
          this.shensu(orderID);
        }else if(v == "affirm"){   //确认收款
          payOrder(orderID).then(
            function(v) {
              toast.message = '确认成功!';
              toast.type = 'success';
              setTimeout(function () {
                local.reload()
              },1000)
            },
            function(e) {
              toast.message = '操作失败!';
              toast.type = 'fail';
              setTimeout(function () {
                local.reload()
              },1000)
              console.log(e);
            }
          )
        }else if(v == "complain"){ //投诉
          appealOrder_Wrong(orderID).then(
            function(v) {
              toast.message = '投诉成功!';
              toast.type = 'success';
              setTimeout(function () {
                local.reload()
              },1000)
            },
            function(e) {
              toast.message = '投诉失败!';
              toast.type = 'fali';
              setTimeout(function () {
                local.reload()
              },1000)
            }
          );
        }else{
          toast.clear();
          this.handleRecord_detail(orderID,sta)
        }
      },
      //申诉
      async shensu(orderID) {
        let orderInfo = await orders(orderID);
        let gateWayInfo = await gatewayInfoBase(orderInfo.gateWay);
        let currentTime = Date.parse(new Date());
        currentTime = String(currentTime).slice(0, 10);
        currentTime = Number(currentTime);
        if ((orderInfo.orderStatus == 2 && (currentTime - orderInfo.beginTime > 2 * gateWayInfo.lockTimestamp)) || (orderInfo.orderStatus == 3 && (currentTime - orderInfo.payTime > gateWayInfo.lockTimestamp))) {
          appealOrder_NoReceive(orderID).then(
            function(v) {
              this.$toast.loading({
                forbidClick: true,
                mask:true,
                message: '成功，等候反馈',
                type:'success'
              });
              setTimeout(function () {
                local.reload()
              },1000)
            },
            function(e) {
              this.$toast.loading({
                forbidClick: true,
                mask:true,
                message: '申诉失败',
                type:'fail'
              });
            }
          );
        } else {
          this.$toast.loading({
            forbidClick: true,
            mask:true,
            message: '申诉时间未到',
            type:'fail'
          });
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
$order_c:#77807A;
#Order{
  .none_list{
    width: 130px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 28px;
    position: absolute;
    top: 38%;
    left: 0;
    right: 0;
    margin: auto;
    border: none;
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
        .action{
          color: #319B38;
        }
      }
    }
  }
}

</style>
