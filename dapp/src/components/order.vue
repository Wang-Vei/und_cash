/* eslint-disable */
<template>
  <div>
    <div id="Order">
      <table style="display: block;position: sticky;top: 0;width: 100vw">
        <tr class="record_header" style="display: flex;border-bottom: 1px solid #77807A">
          <th><i class="iconfont icon-shijian"></i> 时间</th>
          <th><i class="iconfont icon-zhifu"></i> 金额</th>
          <th><i class="iconfont icon-zhuyi"></i> 状态</th>
          <th><i class="iconfont icon-richu2"></i> 操作</th>
        </tr>
      </table>
      <table>
        <tr class="record_item" v-if="$store.state.orderList.length > 0" v-for="item in $store.state.orderList" @click="handleRecord_detail(item.ID)" >
          <td>{{item.beginTime}}</td>
          <td>{{item.num}} {{item.unit}}</td>
          <td>{{item.status}}</td>
          <td>
            <span class="action" v-if="item.orderStatus == 1" @click="handleAction('cancel',item.ID)" @click.stop>取消交易</span>
            <span class="action" v-else-if="item.orderStatus == 2" @click="handleAction('appeal',item.ID)" @click.stop>申诉</span>
            <span class="action" v-else-if="item.orderStatus == 3">
              <span @click="handleAction('appeal',item.ID)" @click.stop>申诉</span>&nbsp;
              <span @click="handleAction('affirm',item.ID)" @click.stop>确认收款</span>
            </span>
            <span class="action" v-else-if="item.orderStatus == 4 || item.orderStatus == 9 || item.orderStatus == 19" @click="handleAction('complain',item.ID)" @click.stop>投诉</span>
            <span class="action" v-else-if="item.orderStatus == 5" @click="handleAction('select',item.ID,item.orderStatus)" @click.stop>查看进度</span>
            <span class="action" v-else-if="item.orderStatus == 12 || item.orderStatus == 10 || item.orderStatus == 6 || item.orderStatus == 7" style="color: #666">查看</span>
            <span class="action" v-else-if="item.orderStatus == 13">
              <span>查看</span>&nbsp;
              <span @click="handleAction('affirm',item.ID)" @click.stop>确认收款</span>
            </span>
          </td>
        </tr>
<!--        <tr style="height: 600px"></tr>-->
        <tr class="none_list" v-if="$store.state.orderList.length <= 0"> 暂无订单 </tr>
      </table>
    </div>
    <!-- 订单详情 -->
    <Orderdetails v-show="record_detail" @closeDetails='record_detail = false' ref="handleRecord_detail"></Orderdetails>
  </div>
</template>
<script>
/* eslint-disable */
import Orderdetails from './orderdetails'
import { Sticky } from 'vant';
import {appealOrder_NoReceive,orders,cancelOrder,appealOrder_Wrong,gatewayInfoBase,payOrder} from '@/assets/js/coin/c2c.js';
export default {
  name:'Order',

  data () {
    return{
      record_detail: false, // 订单详情
      order_list:[],
      aaa:"123",
    }
  },
  components:{
    Orderdetails,
    [Sticky.name]:Sticky,
  },
  mounted () {
    this.order_list = this.$store.state.orderList;
      if(this.order_list){
        console.log(this.order_list);
      }else{
        this.order_list = [];
      }
    },
  methods:{
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
                location.reload()
              },1000)
            },
            function(e) {
              console.log(e);
              toast.message = '操作失败!';
              toast.type = 'fail';
              setTimeout(function () {
                location.reload()
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
                location.reload()
              },1000)
            },
            function(e) {
              toast.message = '操作失败!';
              toast.type = 'fail';
              setTimeout(function () {
                location.reload()
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
                location.reload()
              },1000)
            },
            function(e) {
              toast.message = '投诉失败!';
              toast.type = 'fali';
              setTimeout(function () {
                location.reload()
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
                location.reload()
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
    },
  }

</script>

<style lang="scss" scoped>
$order_c:#77807A;
#Order{
  padding-bottom: 80px;
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
    width: 100vw !important;
    margin: 0 auto;
    outline: none;
    display: table;
    tr:nth-child(even){
      background-color: #252525;
    }
    tr{
      border-bottom: 1px solid $order_c;
      background-color: #282E2A;
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
        color: #ccc;
        line-height: 60px;
        text-align: center;
        /*background-color: #282E2A;*/
        .action{
          color: #319B38;
        }
      }
    }
  }
}

</style>
