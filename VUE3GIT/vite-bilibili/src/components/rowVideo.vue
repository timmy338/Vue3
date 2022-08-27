<!--  -->
<template>
  <div class="rcmdVideoImgDiv">
    <a @click="gotoVideoPage()">
      <img :src="videoData.pic" class="rcmdVideoImg" />
      <div class="videoTime">
        {{ durationHandle(videoData.duration) }}
      </div>
    </a>
    <div class="videoDesc">
      <div class="rcmdVideoTitle textBlueHover">
        {{ videoData.title }}
      </div>

      <div class="ownInfo textBlueHover">
        <span>{{ videoData.owner.name }}</span>
      </div>
      <div class="videoInfo">
        {{ millionsHandle(videoData.stat.view) }} 播放 · 
        {{ millionsHandle(videoData.stat.danmaku) }} 彈幕
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { rcmdVideo } from "../request/api";
import { millionsHandle, durationHandle, monthDayHandle } from "../ts/global";

//獲取當前頁面的對象
let router = useRouter();
const props = defineProps<{
  videoData: rcmdVideo;
}>();

function gotoVideoPage() {
  router.push({
    path: "/video",
    query: {
      av: props.videoData.aid,
    },
  });
}
</script>
<style lang="less" scoped>
.rcmdVideoImgDiv {
  position: relative;
  display: flex;
  .rcmdVideoImg {
    width: 150px;
    height: 100%;
    border-radius: 0.1em;
  }
  .videoDesc {
    padding: 5px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 10px;
    .rcmdVideoTitle {
      width: 100%;
      height: 40px;
      white-space: pre-wrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      line-height: 20px;
      cursor: pointer;
    }
    .ownInfo {
      color: #adb1b6;
      font-weight: 550;
      font-size: 13px;
      cursor: pointer;
    }
    .videoInfo{
       color: #adb1b6;
       font-size: 13px;
    }
  }
  .videoTime {
    /* mix-blend-mode: difference; */
    font-size: 12px;
    position: absolute;
    bottom: 1px;
    width: 100%;
    padding: 2px 5px;
    display: flex;
    justify-content: space-between;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: -1px 0 rgba(0, 0, 0, 0.616), 0 1px rgba(0, 0, 0, 0.73),
      1px 0 rgba(0, 0, 0, 0.711), 0 -1px rgba(0, 0, 0, 0.666);
    /* text-shadow: 1px 1px 0px black, 2px 2px 0px black; */
  }
}
</style>
