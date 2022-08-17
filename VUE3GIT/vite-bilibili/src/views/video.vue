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
      <div class="videoBottom">
        <ul class="videoBasicInfo">
          <li class="textBlueHover">
            <font-awesome-icon icon="fa-solid fa-heart" /><span>{{
              millionsHandle(videoInfo.stat.like)
            }}</span>
          </li>
          <li class="textBlueHover">
            <font-awesome-icon icon="fa-solid fa-coins" /><span>{{
              millionsHandle(videoInfo.stat.coin)
            }}</span>
          </li>
          <li class="textBlueHover">
            <font-awesome-icon icon="fa-solid fa-star" /><span>{{
              millionsHandle(videoInfo.stat.favorite)
            }}</span>
          </li>
          <li class="textBlueHover">
            <font-awesome-icon icon="fa-solid fa-share" /><span>{{
              millionsHandle(videoInfo.stat.share)
            }}</span>
          </li>
        </ul>
        <div style="display: flex; align-items: center">
          <span style="font-size: 14px">稿件投訴</span>
          <div class="record">
            <font-awesome-icon
              icon="fa-solid fa-feather-pointed"
              style="margin-right: 5px"
            />筆記
          </div>
        </div>
      </div>

      <div class="desc">
        <input id="exp1" class="exp" type="checkbox" />
        <div class="text">
          {{ videoInfo.desc }}
        </div>
        <label class="btn" for="exp1"></label>
      </div>
      <div class="tags">
        <div v-for="tab in videoTags">
          <VidoeTags :tagData="tab"></VidoeTags>
        </div>
      </div>
    </div>
    <div class="rightVideoView"></div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from "vue";
import { getVideo, videoPageInfo, getVideoTags, videoTag } from "../request/api";
import { useRoute } from "vue-router";
//數字格式規範化
import { millionsHandle, yearToSecondHandle } from "../ts/global";
//組件導入
import PlayVideo from "../components/playVideo.vue";
import TopList from "../components/topList.vue";
import VidoeTags from "../components/videoTags.vue";

const data = reactive({
  bv: "BV1US4y1s7aG",
  videoInfo: {} as videoPageInfo["data"],
  videoSrc: "",
  videoTags: [] as videoTag[],
});

//從別頁傳入bv號
/* const Route=useRoute();
data.bv=""+Route.query.bv; */

let { videoInfo, videoSrc, videoTags } = toRefs(data);

//請求視頻API
getVideo(data.bv)
  .then((res) => {
    data.videoInfo = res.data;
    console.log(res);
  })
  .catch(() => {
    alert("獲取視頻失敗");
  });

getVideoTags(data.bv)
  .then((res) => {
    data.videoTags = res.data;
    console.log(res);
  })
  .catch(() => {
    alert("獲取視頻TAGS失敗");
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
    .videoBottom {
      display: flex;
      height: 60px;
      line-height: 60px;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #c4c4c43c;
      .videoBasicInfo {
        margin-top: 10px;
        display: flex;
        align-items: center;
        font-size: 24px;
        color: #757575;
        li {
          margin-right: 40px;
        }
        span {
          margin-left: 5px;
          font-size: 18px;
        }
      }
      .record {
        height: 20px;
        line-height: 20px;
        padding: 3px 20px;
        margin-left: 20px;
        color: #00a1d6;
        border: 1px #00a1d6 solid;
      }
      .record:hover {
        background-color: #00a1d6;
        color: white;
        cursor: pointer;
      }
    }
    .desc {
      margin-bottom: 50px;
      .text {
        margin-top: 20px;
        white-space: pre-line;
        overflow: hidden;
        font-size: 14px;
        line-height: 1.5;
        max-height: 4em;
      }
      .btn {
        margin-top: 50px;
        font-size: 12px;
        color: rgb(20, 20, 20);
        cursor: pointer;
      }
      .btn::after {
        content: "展开更多";
      }
      .exp {
        display: none;
      }
      .exp:checked ~ .text {
        max-height: none;
      }
      .exp:checked ~ .btn::after {
        content: "收起";
      }
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      div{
        margin-right: 10px;
        margin-bottom: 5px;
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
