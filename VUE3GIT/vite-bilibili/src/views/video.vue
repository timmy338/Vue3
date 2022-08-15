<!--  -->
<template>
  <TopList></TopList>
  <div class="videoView" v-if="videoInfo.stat != undefined">
    <div class="leftVideoView">
      <text style="font-size: 18px; font-weight: 600">{{ videoInfo.title }}</text>
      <div class="detail">
        <text>{{ millionsHandle(videoInfo.stat.view) }}播放</text>
        <text>总弹幕数{{ millionsHandle(videoInfo.stat.danmaku) }}</text>
        <text>{{ yearToSecondHandle(videoInfo.pubdate) }}</text>
        <text v-if="videoInfo.honor_reply.honor[0].desc != undefined">{{
          videoInfo.honor_reply.honor[0].desc
        }}</text>
      </div>
      <PlayVideo :videoSrc="videoSrc"></PlayVideo>

      <ul class="videoBasicInfo">
        <li>
          <font-awesome-icon icon="fa-solid fa-heart" /><span>{{
            videoInfo.stat.like
          }}</span>
        </li>
        <li>
          <font-awesome-icon icon="fa-solid fa-coins" /><span>{{
            videoInfo.stat.coin
          }}</span>
        </li>
        <li>
          <font-awesome-icon icon="fa-solid fa-star" /><span>{{
            videoInfo.stat.favorite
          }}</span>
        </li>
        <li>
          <font-awesome-icon icon="fa-solid fa-share" /><span>{{
            videoInfo.stat.share
          }}</span>
        </li>
      </ul>
    </div>
    <div class="rightVideoView"></div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from "vue";
import { getVideo, videoPageInfo } from "../request/api";
import { useRoute } from "vue-router";
//數字格式規範化
import { millionsHandle, yearToSecondHandle } from "../ts/global";
//組件導入
import PlayVideo from "../components/playVideo.vue";
import TopList from "../components/topList.vue";

const data = reactive({
  bv: "BV14N4y1G7tY",
  videoInfo: {} as videoPageInfo["data"],
  videoSrc: "",
});

//從別頁傳入bv號
/* const Route=useRoute();
data.bv=""+Route.query.bv; */

let { videoInfo, videoSrc } = toRefs(data);

//請求API
getVideo(data.bv)
  .then((res) => {
    data.videoInfo = res.data;
    console.log(res);
  })
  .catch(() => {
    alert("獲取視頻失敗");
  });
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
    .detail {
      padding-top: 5px;
      text {
        margin-right: 10px;
        font-size: 10px;
        color: #a6a699;
      }
    }
    .videoBasicInfo {
      display: flex;
      font-size: 24px;
      li {
        margin-right: 10px;
      }
      span{
        margin-left: 5px;
      }
    }
  }
  .rightVideoView {
    margin-left: 20px;
    width: 320px;
    height: 300px;
    background-color: antiquewhite;
  }
}
</style>
