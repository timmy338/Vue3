<!--  -->
<template>
  <div>
    <a
      ><font-awesome-icon
        icon="fa-solid fa-award"
        v-if="tagData.type >= 3"
        style="margin-right: 10px"
      />{{ tagData.tag_name }}</a
    >
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from "vue";
import { videoTag } from "../request/api";
const props = defineProps<{
  tagData: videoTag;
}>();
</script>
<style lang="less" scoped>
div {
  font-size: 12px;
  padding: 5px 15px;
  color: #61666d;
  background-color: #f6f7f8;
  border-radius: 2em;
  border: 1px solid #ffffff;
  cursor: pointer;
}
div:hover {
  border: 1px solid #00A1D6;
}
</style>
