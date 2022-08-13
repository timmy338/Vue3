<!--  -->
<template>
  <div class="topList">
    <div class="headDiv">
      <ul class="headLeft">
        <img
          class="logo-img"
          width="100"
          height="48"
          src="https://i0.hdslb.com/bfs/archive/5b8cfd2c03e653106b1c9c37ba2025e39afc0ad1.png"
        />
        <li class="jello-horizontal">
          <font-awesome-icon class="icons" icon="fa-brands fa-bilibili" />
          <a>首页</a>
        </li>
        <li v-for="tab in leftTabs" class="jello-horizontal">
          <a>{{ tab }}</a>
        </li>
        <li class="jello-horizontal">
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
        <li v-for="tabs in rightTabs" class="rightTabs jello-horizontal">
          <font-awesome-icon :icon="tabs.icon" class="rightIcons" />
          {{ tabs.name }}
        </li>
        <li class="upLoad" style="color: white">
          <font-awesome-icon icon="fa-cloud-arrow-up" />
          投稿
        </li>
      </ul>
    </div>
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
  rightTabs: [
    { name: "大會員", icon: "fa-solid fa-user-astronaut" },
    { name: "消息", icon: "fa-solid fa-envelope" },
    { name: "動態", icon: "fa-solid fa-fan" },
    { name: "收藏", icon: "fa-brands fa-gratipay" },
    { name: "歷史", icon: "fa-solid fa-clock" },
    { name: "創作中心", icon: "fa-solid fa-lightbulb" },
  ],
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
.topList {
    position: fixed;
    width: 100%;
  .headDiv {
    width: auto;
    padding: 0 20px;
    height: 70px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
    .headLeft {
      padding: 10px 0;
      width: 30%;
      display: flex;
      flex-direction: row;
      align-items: center;
      color: #7b7b7b;
      li {
        height: 15px;
      }
      .icons {
        padding-right: 5px;
        font-weight: normal;
      }
      li,
      .icons {
        font-size: 16px;
        margin-left: 15px;
        cursor: pointer;
      }
    }

    .search {
      margin-left: 10px;
      width: 25%;
      height: 40px;
      .el-input__wrapper,
      .el-input,
      .el-input__inner,
      #el-id-8546-0 {
        opacity: 0.8;
      }
    }

    .headRight {
      width: 24%;
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 45px;
      font-size: 12px;
      color: #7b7b7b;
      .avatar {
        border-radius: 5em;
        width: 40px;
        border: solid 2px white;
      }
      .rightTabs {
        display: flex;
        flex-direction: column;
        margin-left: 30px;
        /* text-shadow: rgb(10, 10, 10) 0.3em 0.3em 0.4em; */
        cursor: pointer;
      }
      .rightIcons {
        font-size: 22px;
        margin-bottom: 5px;
      }
      .upLoad {
        margin-left: 20px;
        width: 110px;
        height: 40px;
        line-height: 40px;
        background-color: #fb7299;
        border-radius: 0.5em;
        text-align: center;
        font-size: 15px;
        text-shadow: none;
        cursor: pointer;
      }
    }
  }
}
</style>
