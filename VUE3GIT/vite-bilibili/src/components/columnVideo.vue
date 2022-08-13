<!--  -->
<template>
  <a class="rcmdVideoImgDiv" @click="gotoVideoPage()">
    <img :src="videoData.pic" class="rcmdVideoImg" />
    <div class="videoInfo">
      <div class="videoInfoIcons">
        <font-awesome-icon icon="fa-brands fa-google-play" style="font-size: 14px" />
        {{
          videoData.stat.view > 9999
            ? Math.floor(videoData.stat.view / 1000) / 10 + "万"
            : videoData.stat.view
        }}
        <font-awesome-icon icon="fa-solid fa-chart-simple" />
        {{
          videoData.stat.danmaku > 9999
            ? Math.floor(videoData.stat.danmaku / 1000) / 10 + "万"
            : videoData.stat.danmaku
        }}
      </div>
      {{ videoData.duration }}
    </div>
  </a>
  <div class="rcmdVideoTitle textBlueHover">
    {{ videoData.title }}
  </div>

  <div class="ownInfo textBlueHover">
    <font-awesome-icon icon="fa-solid fa-id-badge" />
    <span style="margin: 0 5px">{{ videoData.owner.name }}</span
    >{{ videoData.pubdate }}
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, defineProps } from "vue";
import { useRouter } from "vue-router";
import { rcmdVideo } from "../request/api";


//獲取當前頁面的對象
let router = useRouter();
const props=defineProps<{
  videoData: rcmdVideo;
}>();

function gotoVideoPage() {
  router.push({
    path:'/video',
    query:{
        bv:props.videoData.bvid,
    }
  });
}
</script>
<style lang="less" scoped>
.rcmdVideoImgDiv {
  position: relative;
  width: 100%;
  height: 70%;
  margin-bottom: 10px;
  .rcmdVideoImg {
    width: 100%;
    height: 100%;
    border-radius: 0.5em;
  }
  .videoInfo {
    /* mix-blend-mode: difference; */
    position: absolute;
    bottom: 8px;
    width: 95%;
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
  height: 50px;
  font-size: 15px;
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 25px;
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
  font-size: 14px;
  cursor: pointer;
}
</style>
