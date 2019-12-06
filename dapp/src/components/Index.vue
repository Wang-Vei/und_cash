<template>
  <div id="index" style="width:100%;height:100%" v-title data-title="贝住包房管理">
    <span style="color:#fff;">3132100</span>

    <van-cell-group>
      <van-field v-model="value" placeholder="请输入用户名" />
    </van-cell-group>

    <van-radio-group v-model="radio">
      <van-radio name="1" checked-color="#07c160">单选框 1</van-radio>
      <van-radio name="2" checked-color="#07c160">单选框 2</van-radio>
    </van-radio-group>
    <select name="" id="">
      <option value="">1</option>
      <option value="">2</option>
      <option value="">3</option>
    </select>


  </div>
</template>

<script>
import { RadioGroup, Radio } from 'vant';
export default {
  name: 'index',
  props: {
    msg: String
  },
  components:{
    [RadioGroup.name]:RadioGroup,
    [Radio.name]:Radio
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
van-cell-group{
    padding-left: 10px;
    height: 80px;
  }
  .van-field control{
    border: 1px solid #8BF692;
    padding-left: 10px;
    height: 80px;
    border-radius: 10px;
    box-shadow: inset rgba(139,246,146,1) 0px 0px 8px;
    -moz-box-shadow: inset  rgba(139,246,146,1) 0px 0px 8px;
    -webkit-box-shadow: inset  rgba(139,246,146,1) 0px 0px 8px;
  }

#index{
  padding: 0;
  margin: 0;
}



h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
