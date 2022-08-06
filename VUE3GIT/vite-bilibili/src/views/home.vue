<!--  -->
<template>
  <img
    id="img"
    src="https://i0.hdslb.com/bfs/archive/956de2627e2cc1a9da53ea1d8762cea33e8ea6e5.png"
  />
  <div class="headDiv">
  <font-awesome-icon icon="hat-wizard" />
    <ul class="headLeft">
      <li>
        <a>首页</a>
      </li>
      <li v-for="site in sites">
        <a class="shake-slow">{{ site }}</a>
      </li>
      <li>
        <a>下载客户端</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from "vue";

const data = reactive({
  sites: ["番剧", "直播", "游戏中心", "会员购", "漫画", "赛事"],
  show: true,
});

let { sites } = toRefs(data);
</script>
<style lang="less" scoped>
.headDiv {
  width: 100vw;
  padding: 0 20px;
  height: 155px;
}
#img {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 155px;
}
.headLeft {
  padding-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
}
.headLeft li {
  font-size: 16px;
  color: aliceblue;
  font-weight: bold;
  margin-left: 15px;
  /* text-shadow: rgb(10, 10, 10) 0.3em 0.3em 0.4em; */
  text-shadow: 1px 1px 0px black, 3px 3px 0px black;
  cursor: pointer;
}
</style>
