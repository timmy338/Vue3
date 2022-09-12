<template>
  <div>
    <slot name="discussionArea" :comments="comments" :videoUP="videoUP" :videoInfo="videoInfo"></slot>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from "vue";
//引入類型
import { replyType, videoPageInfo } from "../request/api";

const props = defineProps<{
  comments: replyType[]; //評論對象數組
  videoUP: number;
  videoInfo: videoPageInfo["data"];
}>();
</script>
<style lang="less" scoped></style>
