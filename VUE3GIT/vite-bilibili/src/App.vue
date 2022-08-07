<!--  -->
<template>
  <div class="scroll">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from "vue";
</script>
<style lang="less" scoped>
.scroll {
  width: auto;
  white-space: nowrap;
  overflow-y: hidden;
  overflow-x: scroll;
}
.scroll::-webkit-scrollbar {
  //隐藏滚动条
  display: none;
}
</style>
