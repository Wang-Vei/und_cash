<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
<style scope>
  .van-field__control{
    border: 1px solid #8BF692;
    padding-left: 10px;
    height: 80px;
    border-radius: 10px;
    box-shadow: inset rgba(139,246,146,1) 0px 0px 8px;
    -moz-box-shadow: inset  rgba(139,246,146,1) 0px 0px 8px;
    -webkit-box-shadow: inset  rgba(139,246,146,1) 0px 0px 8px;  
  }
</style>
