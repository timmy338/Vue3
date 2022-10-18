<template>
  <div>
    <slot name="discussionArea" :comments="arr"></slot>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, watchEffect, watch, onMounted, onUnmounted } from "vue";
//引入類型
import { replyType, videoPageInfo } from "../request/api";
//引入接口
import { getVideoComments } from "../request/api";
let timer: any = null;
const props = defineProps<{
  comments: replyType[]; //評論對象數組
  size: number;
}>();

const data = reactive({
  arr: [] as replyType[],
  page: 1,
  scrollTop: 0,
});

const emit = defineEmits<{ (event: "loadMoreFn", page: number, size: number): void }>();

//滾動加載視頻Comments

let { arr } = toRefs(data);
function sliceArr() {
  if (props.comments.length > props.size) {
    console.log((data.page-1)*props.size, props.size * data.page);
    data.arr = data.arr.concat(props.comments.slice((data.page-1)*props.size, props.size * data.page));
  } else {
    data.arr = props.comments;
  }
}
//滾動事件
function scrollFun() {
  if (timer) {
    clearTimeout(timer);
  }
  //節流
  timer = setTimeout(() => {
    //获取滚动时的高度
    let st =
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    // 浏览器窗口（文档）的可视高度(windowHeight)：（就是你肉眼可见的那部分全屏高度）
    let windowHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    // 文档的真实高度(scrollHeight)：
    let scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    console.log("正在滾動", st, windowHeight, scrollHeight);
    /* console.log(data.arr); */
    if (windowHeight + st + 1000 >= scrollHeight) {
      console.log("到底拉");
      data.page++;
      emit("loadMoreFn", data.page, 10);
    }
  }, 1500);
}

watch(
  () => props.comments,
  (newVal, oldVal) => {
    console.log("watch", oldVal, newVal);
    sliceArr();
  },
  { immediate: true, deep: true }
);
onMounted(() => {
  window.addEventListener("scroll", () => {
    scrollFun();
  });
});
onUnmounted(() => {
  window.removeEventListener("scroll", () => {});
});
</script>
<style lang="less" scoped></style>
