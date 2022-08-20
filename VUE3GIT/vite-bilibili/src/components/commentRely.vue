<!--  -->
<template>
  <div style="display: flex; margin-top: 10px">
    <img class="ownerAvatar" :src="commentData.member.avatar" />
    <div style="margin-left: 10px">
      <div class="content">
        <span style="color: #fb7299"> {{ commentData.member.uname }} </span>

        <div style="margin-left: 10px">
          <text class="level">
            LV{{ commentData.member.level_info.current_level }}+
          </text>
        </div>
        <div>
          <text class="up" v-if="commentData.mid == up">UP</text>
        </div>
        <div style="margin-left: 10px; white-space: pre-line;">
          {{ commentData.content.message }}
        </div>
      </div>
      <div class="contentInfo" >
        {{ yearToSecondHandle(commentData.ctime) }}
        <div class="textBlueHover">
          <font-awesome-icon icon="fa-solid fa-thumbs-up" style="margin-right: 5px" />{{
            commentData.like
          }}
        </div>
        <div class="textBlueHover"><font-awesome-icon icon="fa-solid fa-thumbs-down" /></div>
        <div class="rely">回複</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from "vue";
//數字格式規範化
import { millionsHandle, yearToSecondHandle } from "../ts/global";
import { reply } from "../request/api";

const props = defineProps<{
  commentData: reply;
  up: number;
}>();
</script>
<style lang="less" scoped>
.ownerAvatar {
  margin-top: 5px;
  width: 25px;
  height: 25px;
  margin-right: 5px;
  border-radius: 2em;
}
.content {
  display: flex;
  line-height: 21px;
  margin-top: 10px;
  margin-bottom: 10px;
  word-break: break-all;
  font-size: 14px;
  .up {
    padding: 1px;
    border-radius: 0.2em;
    color: white;
    font-size: 12px;
    margin-left: 10px;
    background-color: #fb7299;
    transform: scale(2);
  }
  .level {
    padding: 0 1px;
    font-size: 12px;
    border-radius: 0.2em;
    color: white;
    background-color: red;
  }
}
.contentInfo {
  display: flex;
  line-height: 20px;
  font-size: 12px;
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
</style>
