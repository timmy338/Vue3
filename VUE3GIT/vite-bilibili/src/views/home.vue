<!--  -->
<template>
  <img
    id="img"
    src="https://i0.hdslb.com/bfs/archive/956de2627e2cc1a9da53ea1d8762cea33e8ea6e5.png"
  />
  <div class="headDiv">
    <ul class="headLeft">
      <li>
        <font-awesome-icon class="icons" icon="fa-brands fa-bilibili" />
        <a>首页</a>
      </li>
      <li v-for="tab in leftTabs">
        <a class="shake-slow">{{ tab }}</a>
      </li>
      <li>
        <font-awesome-icon class="icons" icon="fa-download" />
        <a>下载客户端</a>
      </li>
    </ul>
    <el-input
      v-model="input1"
      class="search"
      size="small"
      placeholder="Please Input"
      :suffix-icon="Search"
    />

    <ul class="headRight">
      <li>
        <img class="avatar" :src="data.avatar" />
      </li>
      <li v-for="tabs in rightTabs" class="rightTabs">
        <font-awesome-icon :icon="tabs.icon" class="rightIcons" />
        {{ tabs.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, onMounted } from "vue";
import { getUserInfo } from "../request/api";
//搜索條
import { Search } from "@element-plus/icons-vue";
const input1 = ref("");
const data = reactive({
  leftTabs: ["番剧", "直播", "游戏中心", "会员购", "漫画", "赛事"],
  rightTabs: [{ name: "大會員", icon: "fa-solid fa-user-astronaut" }, {name: "消息", icon: "fa-solid fa-envelope" }, {name: "動態", icon: "fa-solid fa-fan" },{name: "收藏", icon: "fa-brands fa-gratipay" },{name: "歷史", icon: "fa-solid fa-clock" },{name: "創作中心", icon: "fa-solid fa-lightbulb" }],
  avatar: "",
});

let { leftTabs, rightTabs } = toRefs(data);

onMounted(() => {
  getUserInfo().then((res) => {
    data.avatar = res.data.face;
  });
});
</script>
<style lang="less" scoped>
.headDiv {
  width: auto;
  padding: 0 20px;
  height: 155px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
#img {
  position: absolute;
  z-index: -1;
  width: 100vw;
  height: 155px;
}
.headDiv .headLeft {
  padding: 10px 0;
  padding-top: 20px;
  width: 30%;
  display: flex;
  flex-direction: row;
}
.headDiv .headLeft li,
.headDiv .headLeft .icons {
  font-size: 16px;
  color: aliceblue;
  font-weight: bold;
  margin-left: 15px;
  /* text-shadow: rgb(10, 10, 10) 0.3em 0.3em 0.4em; */
  text-shadow: 1px 1px 0px black, 3px 3px 0px black;
  cursor: pointer;
}
.headDiv .headLeft .icons {
  padding-right: 5px;
}
.headDiv .search {
  margin-left: 10px;
  margin-top: 10px;
  width: 25%;
  height: 40px;
}
.el-input__wrapper,
.el-input,
.el-input__inner,
#el-id-8546-0 {
  opacity: 0.8;
}
.headDiv .headRight {
  padding-top: 10px;
  width: 30%;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 45px;
}
.headDiv .headRight .avatar {
  border-radius: 5em;
  width: 40px;
  border: solid 2px white;
}
.headDiv .headRight .rightTabs {
  display: flex;
  flex-direction: column;
  font-size: 1px;
  color: aliceblue;
  font-weight: bold;
  margin-left: 20px;
  /* text-shadow: rgb(10, 10, 10) 0.3em 0.3em 0.4em; */
  text-shadow: 1px 1px 0px black, 3px 3px 0px black;
  cursor: pointer;
}
.headDiv .headRight .rightIcons{
  font-size: 23px;
  margin-bottom: 5px;
}
</style>
