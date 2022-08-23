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
        <text>{{
          videoInfo.honor_reply.honor ? videoInfo.honor_reply.honor[0].desc : ""
        }}</text>
      </div>
      <!--    <PlayVideo :videoSrc="videoSrc"></PlayVideo> -->
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
        <label class="btn" for="exp1" v-if="videoInfo.desc.length < 30"></label>
      </div>
      <div class="tags">
        <div v-for="tab in videoTags">
          <VidoeTags :tagData="tab" />
        </div>
      </div>
      <div style="margin-top: 30px">
        <text style="font-size: 18px; font-weight: 400"
          >{{ videoInfo.stat.reply }} 评论</text
        >
        <el-tabs v-model="activeName" class="demo-tabs" @tab-change="commentTabClick">
          <el-tab-pane label="按熱度排序" name="hot"></el-tab-pane>
          <el-tab-pane label="按時間排序" name="time"></el-tab-pane>
        </el-tabs>
        <div
          style="
            width: 100%;
            height: 80px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <img
            class="avatar"
            :src="data.avatar"
            style="border-radius: 2em; width: 50px; height: 50px;margin-top: -18px;"
          />
          <el-input
            v-model="textarea"
            :rows="3"
            type="textarea"
            placeholder="Please input"
            style="width: 80%;"
          />
          <el-button type="primary" style="height: 73px">發表評論</el-button>
        </div>
      </div>

      <div
        class="comments"
        v-if="videoComments"
        v-for="(commentRoot, index) of videoComments"
      >
        <img class="ownerAvatar" :src="commentRoot.member.avatar" />

        <div class="divRight">
          <div class="ownerName">
            <span style="color: #fb7299">
              {{ commentRoot.member.uname }}
            </span>

            <div style="margin-left: 10px">
              <text class="level">
                LV{{ commentRoot.member.level_info.current_level }}+
              </text>
            </div>
            <div>
              <text class="up" v-if="commentRoot.mid == videoUP">UP</text>
            </div>
          </div>
          <div class="content">{{ commentRoot.content.message }}</div>
          <div class="contentInfo">
            {{ yearToSecondHandle(videoComments[0].ctime) }}
            <div class="textBlueHover">
              <font-awesome-icon
                icon="fa-solid fa-thumbs-up"
                style="margin-right: 5px"
              />{{ videoComments[0].like }}
            </div>
            <div class="textBlueHover">
              <font-awesome-icon icon="fa-solid fa-thumbs-down" />
            </div>
            <div class="rely">回複</div>
          </div>
          <div v-for="commentRely in commentRoot.replies">
            <CommentRely :commentData="commentRely" :up="videoUP" />
          </div>
          <div
            class="more"
            v-if="commentRoot.rcount > 1 && !commentRoot.folder.is_folded"
          >
            {{ commentRoot.reply_control.sub_reply_entry_text }},<text
              style="color: #00a1d6"
              class="moreBtn"
              @click="changeRootReplies(videoInfo.aid, commentRoot.rpid, index)"
            >
              点击查看</text
            >
          </div>
          <div
            class="morePages"
            style="margin-top: 10px"
            v-if="commentRoot.rcount > 10 && commentRoot.folder.is_folded"
          >
            <div class="pagination-block">
              <el-pagination
                small
                layout="prev, pager, next"
                :total="commentRoot.rcount"
                @current-change="(val:number) => handleCurrentChange(videoInfo.aid, commentRoot.rpid,index,commentRoot.folder.is_folded,val)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="rightVideoView"></div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, onMounted } from "vue";
import {
  getUserInfo,
  getVideo,
  videoPageInfo,
  getVideoTags,
  videoTag,
  getVideoCommentsByHot,
  getVideoCommentsByTime,
  replyType,
  getRootReplies,
} from "../request/api";
import { useRoute } from "vue-router";
//數字格式規範化
import { millionsHandle, yearToSecondHandle, checkNull } from "../ts/global";
//組件導入
import PlayVideo from "../components/playVideo.vue";
import TopList from "../components/topList.vue";
import VidoeTags from "../components/videoTags.vue";
import CommentRely from "../components/commentRely.vue";
import type { TabPanelName } from "element-plus";

//elementPlus 組件
const activeName = ref("hot");
const textarea = ref("");

const commentTabClick = (tab: TabPanelName) => {
  console.log(tab);
  if (tab == "hot") {
    getCommentsByHot(data.av);
  } else {
    getCommentsByTime(data.av);
  }
};
const data = reactive({
  avatar: "",
  av: 599745995,
  videoInfo: {} as videoPageInfo["data"],
  videoSrc: "",
  videoTags: [] as videoTag[],
  videoComments: [] as replyType[],
  videoUP: 0,
});

//從別頁傳入bv號
/* const Route=useRoute();
data.bv=""+Route.query.bv; */

let { videoInfo, videoSrc, videoTags, videoComments, videoUP } = toRefs(data);

//請求某個留言詳情(第一次展開)
function changeRootReplies(oid: number, root: number, index: number) {
  getRootReplies(oid, root, 1)
    .then((res) => {
      data.videoComments[index].replies = res.data.replies;
      data.videoComments[index].folder.is_folded = true;
      console.log("獲取某個留言詳情");
    })
    .catch(() => {
      alert("獲取某個留言詳情失敗");
    });
}
//請求某個留言詳情(展開後換頁)
function handleCurrentChange(
  oid: number,
  root: number,
  index: number,
  test: boolean,
  page: number
) {
  console.log(test);
  getRootReplies(oid, root, page)
    .then((res) => {
      data.videoComments[index].replies = res.data.replies;
      console.log("獲取某個留言詳情");
    })
    .catch(() => {
      alert("獲取某個留言詳情失敗");
    });
}
//請求視頻Comments
function getCommentsByHot(av: number) {
  getVideoCommentsByHot(av)
    .then((res) => {
      data.videoComments = res.data.replies;
      data.videoUP = res.data.top.upper != null ? res.data.top.upper.mid : 0;
      console.log("獲取成功");
    })
    .catch(() => {
      alert("獲取視頻Comments失敗");
    });
}
function getCommentsByTime(av: number) {
  getVideoCommentsByTime(av)
    .then((res) => {
      data.videoComments = res.data.replies;
      data.videoUP = res.data.top.upper != null ? res.data.top.upper.mid : 0;
      console.log("獲取成功");
    })
    .catch(() => {
      alert("獲取視頻Comments失敗");
    });
}

onMounted(() => {
  //獲取用戶頭像
  getUserInfo().then((res) => {
    data.avatar = res.data.face;
  });
  //請求視頻Info
  getVideo(data.av)
    .then((res) => {
      data.videoInfo = res.data;
      console.log("videoInfoApi", data.videoInfo);
    })
    .catch(() => {
      alert("獲取視頻失敗");
    });
  //請求視頻TAG
  getVideoTags(data.av)
    .then((res) => {
      data.videoTags = res.data;
    })
    .catch(() => {
      alert("獲取視頻TAGS失敗");
    });
  //請求視頻Comments
  getCommentsByHot(data.av);
});
</script>
<style lang="less" scoped>
.videoView {
  width: 1519.2px;
  margin-top: 20px;
  padding: 0 168px;
  display: flex;
  background-color: rgb(255, 187, 187);
  .leftVideoView {
    width: 885px;
    background-color: white;
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
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(143, 143, 143, 0.228);
      div {
        margin-right: 10px;
        margin-bottom: 5px;
      }
    }
    .demo-tabs {
      margin-top: 30px;
    }
    .comments {
      display: flex;
      margin-top: 30px;
      .ownerAvatar {
        width: 41px;
        height: 41px;
        border-radius: 2em;
      }
      .divRight {
        width: 100%;
        margin-left: 10px;
        padding-bottom: 20px;
        border-bottom: 1px solid rgba(143, 143, 143, 0.228);
        .ownerName {
          display: flex;
          line-height: 31px;
          font-size: 14px;
          .level {
            padding: 0 1px;
            font-size: 12px;
            border-radius: 0.2em;
            color: white;
            background-color: red;
          }
          .up {
            padding: 1px;
            border-radius: 0.2em;
            color: white;
            font-size: 12px;
            margin-left: 10px;
            background-color: #fb7299;
          }
        }
        .content {
          font-size: 15px;
          margin-top: 2px;
          margin-bottom: 10px;
          line-height: 20px;
          white-space: pre-line;
        }
        .contentInfo {
          display: flex;
          line-height: 20px;
          font-size: 14px;
          color: #99a2aa;
          div {
            margin-left: 15px;
          }
          .rely {
            font-size: 12px;
            padding: 0 5px;
            border-radius: 0.3em;
          }
          .rely:hover {
            background-color: #e5e9ef;
            color: #00a8dd;
          }
        }
        .more {
          margin-top: 10px;
          color: #99a2aa;
          font-size: 12px;
          .moreBtn:hover {
            background-color: #e5e9ef;
            border-radius: 0.2em;
          }
        }
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
