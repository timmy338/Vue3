<!--  -->
<template>
  <TopList></TopList>
  <div class="videoView">
    <div class="leftVideoView">
      <text style="font-size: 18px;font-weight: 600;">{{ videoInfo.title }}</text>
      <text></text>
    </div>
    <div class="rightVideoView"></div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from "vue";
import { getVideo, videoPageInfo } from "../request/api";
import TopList from "../components/topList.vue";
const data = reactive({
  bv: "BV1fY4y1F7GL",
  videoInfo: {} as videoPageInfo["data"],
});

let { videoInfo } = toRefs(data);

//請求API
getVideo(data.bv)
  .then((res) => {
    data.videoInfo = res.data;
    console.log(res);
  })
  .catch(() => {
    alert("獲取視頻失敗");
  });


/* import { useRoute } from "vue-router";
const Route=useRoute();
console.log(Route.query) */
</script>
<style lang="less" scoped>
.videoView {
  width: 100%;
  height: 300px;
  margin-top: 20px;
  padding: 0 453px;
  display: flex;
  background-color: rgb(255, 156, 156);
  .leftVideoView {
    width: 885px;
    height: 300px;
    background-color: aquamarine;
  }
  .rightVideoView {
    margin-left: 20px;
    width: 320px;
    height: 300px;
    background-color: antiquewhite;
  }
}
</style>
