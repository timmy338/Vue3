<!--  -->
<template>
  <a class="rcmdVideoImgDiv" @click="gotoVideoPage()">
    <img :src="videoData.pic" class="rcmdVideoImg" />
    <div class="videoInfo">
      <div class="videoInfoIcons">
        <font-awesome-icon icon="fa-brands fa-google-play" style="font-size: 14px" />
        {{ millionsHandle(videoData.stat.view) }}
        <font-awesome-icon icon="fa-solid fa-chart-simple" />
        {{ millionsHandle(videoData.stat.danmaku) }}
      </div>
      {{ durationHandle(videoData.duration) }}
    </div>
  </a>
  <div class="rcmdVideoTitle textBlueHover">
    {{ videoData.title }}
  </div>

  <div class="ownInfo textBlueHover">
    <font-awesome-icon icon="fa-solid fa-id-badge" />
    <span style="margin: 0 5px">{{ videoData.owner.name }}</span
    >{{ monthDayHandle(videoData.pubdate) }}
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
  width: 100%;
  height: 80%;
  .rcmdVideoImg {
    width: 100%;
    height: 167px;
    border-radius: 0.5em;
  }
  .videoInfo {
    /* mix-blend-mode: difference; */
    font-size: 12px;
    position: absolute;
    bottom: 6px;
    width: 90%;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: -1px 0 rgba(0, 0, 0, 0.616), 0 1px rgba(0, 0, 0, 0.73),
      1px 0 rgba(0, 0, 0, 0.711), 0 -1px rgba(0, 0, 0, 0.666);
    /* text-shadow: 1px 1px 0px black, 2px 2px 0px black; */
    .videoInfoIcons {
      line-height: 15px;
    }
  }
}

.rcmdVideoTitle {
  width: 100%;
  height: 43px;
  font-size: 13px;
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 20px;
  font-weight: bold;
  cursor: pointer;
}
.ownInfo {
  display: flex;
  align-items: center;
  color: #adb1b6;
  font-weight: 550;
  height: 24px;
  line-height: 24px;
  font-size: 13px;
  cursor: pointer;
}
</style>
