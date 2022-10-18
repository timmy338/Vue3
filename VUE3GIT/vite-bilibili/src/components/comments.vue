<!--  -->
<template>
  <div
    class="comments"
    v-if="comments"
    v-for="(commentRoot, index) of comments"
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
        {{ yearToSecondHandle(comments[0].ctime) }}
        <div class="textBlueHover">
          <font-awesome-icon icon="fa-solid fa-thumbs-up" style="margin-right: 5px" />{{
            comments[0].like
          }}
        </div>
        <div class="textBlueHover">
          <font-awesome-icon icon="fa-solid fa-thumbs-down" />
        </div>
        <div class="rely">回複</div>
      </div>
      <div v-for="commentRely in commentRoot.replies">
        <CommentRely :commentData="commentRely" :up="videoUP" />
      </div>
      <div class="more" v-if="commentRoot.rcount > 3 && !commentRoot.folder.is_folded">
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
            @current-change="(val:number) => handleCurrentChange(videoInfo.aid, commentRoot.rpid,index,val)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from "vue";
//引入類型
import { replyType,videoPageInfo} from "../request/api";
//引入接口
import { getRootReplies } from "../request/api";

//數字格式規範化
import { yearToSecondHandle } from "../ts/global";

const props = defineProps<{
  comments: replyType[]; //評論對象數組
  videoUP:number;
  videoInfo:videoPageInfo["data"];
}>();


//請求某個留言詳情(第一次展開)
function changeRootReplies(oid: number, root: number, index: number) {
  getRootReplies(oid, root, 1)
    .then((res) => {
      props.comments[index].replies = res.data.replies;
      props.comments[index].folder.is_folded = true;
      console.log("獲取某個留言詳情");
    })
    .catch(() => {
      alert("獲取某個留言詳情失敗");
    });
}
//請求某個留言詳情(展開後換頁)
function handleCurrentChange(oid: number, root: number, index: number, page: number) {
  getRootReplies(oid, root, page)
    .then((res) => {
        props.comments[index].replies = res.data.replies;
    })
    .catch(() => {
      alert("獲取某個留言詳情失敗");
    });
}
</script>
<style lang="less" scoped>
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
</style>
