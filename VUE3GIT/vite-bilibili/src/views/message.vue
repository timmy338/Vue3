<template>
  <div id="messageView">
    <TopList />
    <div id="content">
      <div id="left"></div>
      <div id="right"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, nextTick } from "vue";
//引入組件
import TopList from "../components/topList.vue";
const data = reactive({
  hHeight: 0,
});
let { hHeight } = toRefs(data);
</script>
<style lang="less" scoped>
#messageView {
  height: 100vh;
  background: url(https://s1.hdslb.com/bfs/static/blive/blfe-message-web/static/img/infocenterbg.a1a0d152.jpg)
    center/cover no-repeat fixed;
  #content {
    width: 80%;
    margin: 0 auto;
    height: 100%;
    background-color: white;
    opacity: 0.8;
  }
}
</style>
