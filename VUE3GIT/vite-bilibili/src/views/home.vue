<!--  -->
<template>
  <div class="topImg">
    <img
      id="img"
      src="https://i0.hdslb.com/bfs/archive/956de2627e2cc1a9da53ea1d8762cea33e8ea6e5.png"
    />
    <img
      class="logo-img"
      width="162"
      height="78"
      src="https://i0.hdslb.com/bfs/archive/5b8cfd2c03e653106b1c9c37ba2025e39afc0ad1.png"
    />
  </div>

  <div class="headDiv">
    <ul class="headLeft">
      <li>
        <font-awesome-icon class="icons" icon="fa-brands fa-bilibili" />
        <a>首页</a>
      </li>
      <li v-for="tab in leftTabs">
        <a class="shake shake-slow">{{ tab }}</a>
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
      <li class="upLoad">
        <font-awesome-icon icon="fa-cloud-arrow-up" />
        投稿
      </li>
    </ul>
  </div>

  <div class="secondDiv">
    <ul class="secondLeft">
      <li>
        <img
          src="https://i0.hdslb.com/bfs/face/8f6a614a48a3813d90da7a11894ae56a59396fcd.jpg@92w_92h"
        />
        動態
      </li>
      <li>
        <img
          src="https://i0.hdslb.com/bfs/face/8f6a614a48a3813d90da7a11894ae56a59396fcd.jpg@92w_92h"
        />
        熱門
      </li>
      <li>
        <img
          src="https://i0.hdslb.com/bfs/face/8f6a614a48a3813d90da7a11894ae56a59396fcd.jpg@92w_92h"
        />
        頻道
      </li>
    </ul>
    <ul class="secondMiddle">
      <li v-for="tab in secondTabsMiddle">
        <a>{{ tab }}</a>
      </li>
    </ul>
    <ul class="secondRight">
      <li v-for="tab in secondTabsRight">
        <font-awesome-icon class="secondRightIcons" :icon="tab.icon" />
        <a>{{ tab.name }}</a>
      </li>
    </ul>
  </div>

  <div class="thirdDiv">
    <div class="thirdLeft">
      <div class="block text-center" m="t-4" style="position: relative">
        <!-- <span class="demonstration">Switch when indicator is clicked</span> -->
        <el-carousel trigger="click" height="470px">
          <el-carousel-item v-for="item in thirdCarouselInfo" :key="item">
            <img :src="item.url" style="width: 100%" />
            <h3
              text="2xl"
              style="
                position: absolute;
                color: white;
                bottom: -30px;
                left: 20px;
                font-size: 20px;
                font-weight: bold;
              "
            >
              {{ item.alt }}
            </h3>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="thirdRight">
      <div v-for="tab in thirdVideo" class="rcmdVideo">
        <img :src="tab.pic" class="rcmdVideoImg" />
        <div class="rcmdVideoTitle">
          {{ tab.title }}
        </div>
        <div class="ownInfo">
          <font-awesome-icon icon="fa-solid fa-id-badge" />

          <span style="margin: 0 5px">{{ tab.owner.name }}</span
          >{{ tab.pubdate }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, onMounted } from "vue";
import { getUserInfo, getHomePageRcmdVideo, rcmdVideo } from "../request/api";
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
  secondTabsMiddle: [
    "番剧",
    "电影",
    "国创",
    "电视剧",
    "综艺",
    "纪录片",
    "动画",
    "游戏",
    "鬼畜",
    "音乐",
    "舞蹈",
    "影视",
    "娱乐",
    "知识",
    "科技",
    "美食",
    "生活",
    "汽车",
    "运动",
    "公开课",
    "搞笑",
    "公益",
    "资讯",
    "动物圈",
  ],
  secondTabsRight: [
    { name: "专栏", icon: "fa-solid fa-table-list" },
    { name: "活动", icon: "fa-solid fa-flag" },
    { name: "社区中心", icon: "fa-solid fa-comments" },
    { name: "直播", icon: "fa-solid fa-circle-play" },
    { name: "课堂", icon: "fa-solid fa-school" },
    { name: "新歌热榜", icon: "fa-solid fa-compact-disc" },
  ],
  thirdCarouselInfo: [
    {
      url:
        "https://i0.hdslb.com/bfs/banner/dc8e3b12a4989ccd326afcfe6a1d0a04aa051f87.png@976w_550h_1c.webp",
      alt: "只要有我在，休要伤害邪龙大人！",
    },
    {
      url:
        "https://i0.hdslb.com/bfs/banner/928d1b08bd755e98b68565f0f6a6398f3e218f27.png@976w_550h_1c.webp",
      alt: "曲云突然有了一个妙计",
    },
    {
      url:
        "https://i0.hdslb.com/bfs/banner/5f78b6ea17111d623fb644458374240aa670520d.png@976w_550h_1c.webp",
      alt: "做胆小鬼没什么不好意思的",
    },
  ],
  thirdVideo: [] as rcmdVideo[],
});

//推薦視頻

let {
  leftTabs,
  rightTabs,
  secondTabsMiddle,
  secondTabsRight,
  thirdVideo,
  thirdCarouselInfo,
} = toRefs(data);

onMounted(() => {
  getUserInfo().then((res) => {
    data.avatar = res.data.face;
  });
  getHomePageRcmdVideo().then((res) => {
    data.thirdVideo = res.data.item.slice(0, 6);
    for (let i = 0; i < data.thirdVideo.length; i++) {
      let myDate = new Date(Number(data.thirdVideo[i].pubdate) * 1000);
      data.thirdVideo[i].pubdate =
        "· " + Number(myDate.getMonth() + 1) + "-" + myDate.getDate();
    }
    console.log(res.data.item[0]);
  });
});
</script>
<style lang="less" scoped>
.topImg {
  position: relative;
  #img {
    position: absolute;
    z-index: -1;
    width: 100vw;
    height: 230px;
  }
  .logo-img {
    position: absolute;
    left: 125px;
    top: 120px;
  }
}

.headDiv {
  width: auto;
  padding: 0 20px;
  height: 155px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .headLeft {
    padding: 10px 0;
    padding-top: 20px;
    width: 30%;
    display: flex;
    flex-direction: row;
    .icons {
      padding-right: 5px;
    }
    li,
    .icons {
      font-size: 16px;
      color: aliceblue;
      font-weight: bold;
      margin-left: 15px;
      /* text-shadow: rgb(10, 10, 10) 0.3em 0.3em 0.4em; */
      text-shadow: 1px 1px 0px black, 3px 3px 0px black;
      cursor: pointer;
    }
  }

  .search {
    margin-left: 10px;
    margin-top: 10px;
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
    padding-top: 10px;
    width: 24%;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 45px;
    font-size: 12px;
    color: aliceblue;
    font-weight: bold;
    text-shadow: 1px 1px 0px black, 3px 3px 0px black;
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
      font-size: 23px;
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

.secondDiv {
  margin-top: 80px;
  display: flex;
  padding: 20px 100px;
  height: 90px;
  .secondLeft {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    width: 230px;
    margin-right: 30px;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    img {
      border-radius: 5em;
      width: 50px;
      margin-bottom: 5px;
    }
  }

  .secondMiddle {
    margin-top: 5px;
    width: 1390px;
    height: 70px;
    display: flex;
    justify-content: space-around;
    align-content: space-around;
    flex-wrap: wrap;
    li {
      margin-left: 10px;
      width: 78px;
      text-align: center;
      padding: 8px 12px;
      font-size: 18px;
      background-color: #f6f7f8;
      color: #616d83;
      border-radius: 0.3em;
      margin-bottom: 5px;
    }
  }

  .secondRight {
    margin-top: 10px;
    margin-left: 60px;
    font-size: 16px;
    width: 18%;
    display: flex;
    flex-wrap: wrap;
    color: #61666d;
    .secondRightIcons {
      margin-left: 30px;
      font-size: 18px;
      margin-right: 10px;
    }
    li {
      width: 100px;
    }
  }
}

.thirdDiv {
  display: flex;
  padding: 20px 150px;
  justify-content: space-between;

  .thirdLeft {
    width: 42%;

    .block {
      border-radius: 2em;
      overflow: hidden;
    }
    .demonstration {
      color: var(--el-text-color-secondary);
    }
    .el-carousel__item h3 {
      color: #feffff;
      line-height: 150px;
      margin: 0;
      text-align: center;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
  }

  .thirdRight {
    width: 56%;
    height: 520px;
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    flex-wrap: wrap;
    .rcmdVideo {
      width: 32%;
      display: flex;
      flex-direction: column;
      .rcmdVideoImg {
        width: 100%;
        height: 70%;
        border-radius: 0.5em;
        margin-bottom: 5px;
      }
      .rcmdVideoTitle {
        width: 100%;
        height: 40px;
        white-space: pre-wrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 20px;
        font-weight: bold;
      }
      .ownInfo {
        margin-left: 5px;
        display: flex;
        align-items: center;
        color: #adb1b6;
        font-weight: bold;
        height: 24px;
        line-height: 24px;
        font-size: 14px;
      }
    }
  }
}
</style>
