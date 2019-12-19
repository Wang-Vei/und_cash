<template>
  <div id="Guide">
      <div class="guide_content">
        <ul>
          <li>• UNDT全球网关支付系统是什么？</li>
          <li class="guide_ans">UNDT全球网关支付系统是由UnionDao社区开发者发布的一个基于以太坊网络的去中心化金融应用工具，方便全球UNDT用户使用UNDT与全球货币便利流通。</li>
          <li>• UNDT全球网关支付系统能做什么？</li>
          <li class="guide_ans">作为用户，将UNDT在此交易平台出售，可提现相应地区的法定货币。作为服务方，接收UNDT，支付相应地区的法币给用户，从而收取服务费获利。</li>
          <li>• 使用前准备</li>
          <li class="guide_ans">以太坊钱包，钱包中备有UNDT，ETH。UNDT用于交易支付，ETH用于支付
            网络矿工费。<br>
            手机端：imToken、Trust等以太坊手机钱包；<br>
            WEB端：MetaMask钱包；<br>
            钱包安装路径：访问各钱包官网，参考如下：<br>
            <a href="./index"><u>imToken</u></a> &nbsp&nbsp&nbsp&nbsp
            <a href="./index"><u> Trust Wallet</u></a>&nbsp&nbsp&nbsp&nbsp
            <a href="http://www.baidu.com"><u> METAMASK</u></a>
            </li>
          <li>• 如何发起支付？</li>
          <li class="guide_ans">支付流程：手机钱包内浏览器打开und.cash支付系统—合约授权—选择网关—
            输入支付金额—填写附言—发起支付—确认支付信息—授权支付UNDT—完成
            支付提交 <br>
            1. 打开手机钱包imToken、Trust等以太坊钱包，用钱包浏览器访问und.cash
            全球网关支付系统；<br>
            2. 合约授权，解锁授权合约访问权限；<br>
            3. 添加设置支付网关，保存收款信息；<br>
            4. 选择网关，根据参考汇率输入需要兑换的金额，发布订单。
          </li>
          <li>• 注意事项：</li>
          <li class="guide_ans">1. 设置网关时必须要上传公钥，用于对支付信息的加密和解密匹配，
            否则支付信息无法正常提交；<br>
            2. 合约交易每一步操作都需要有成功授权，否则支付请求无法正常提交。
          </li>
          <li>• 合约交互异常</li>
          <li class="guide_ans">
            1.	检查网络连接情况。<br>
            2.	合约交互过慢可以考虑提高矿工费以加速。<br>
            3.	如果合约交互成功，页面的状态却迟迟没有刷新，请尝试手动刷新。<br>
            4.	在个别情况下可能会出现您下单的同时买家恰好刚关闭服务，<br>
            这将导致合约交互直接失败，这属于不可控力，为您带来的不便还请谅解。
          </li>
          <li>• </li>
          <li class="guide_ans"></li>
        </ul>
      </div>
  </div>
</template>
<script>
export default {
  name:'Guide',
}
</script>

<style lang="scss" scoped>
#Guide{
  .guide_content{
      width: 600px;
      height: 830px;
      position:fixed;
      top:0;
      bottom: 0;
      left:0;
      right: 0;
      margin: calc(21% + 80px) auto;
      z-index:2;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch !important;
      ul{
        height: 100%;
        width: 100%;
        padding-top: 10px;
        padding-right: 10px;
        box-sizing: border-box;
        li{
          font-size: 20px;
          color:#666666;
          width: 100%;
          min-height: 25px;
          line-height: 26px;
          margin-bottom: 5px;
          letter-spacing: 1px;
          u{
            display: inline-block;
            font-size: 18px;
            margin-top: 3px;
            color: #319B38;
            // text-decoration: ;
          }
        }
        .guide_ans{
          padding-left: 12px;
          box-sizing: border-box;
          margin-bottom: 20px;
          font-size: 18px
        }

      }
    }
  }
  
</style>