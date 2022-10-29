<template>
  <div id="messageView">
    <TopList />
    <div id="content">
      <div id="left">
        <div style="width: 120px; margin: 0 auto">
          <text id="title"
            ><font-awesome-icon icon="fa-solid fa-paper-plane" /> 消息中心</text
          >
        </div>
        <ul>
          <router-link to="/message/reply" style="text-decoration: none"
            ><li class="textBlueHover">回複我的</li></router-link
          >
          <router-link to="/message/atMe"
            ><li class="textBlueHover">@ 我的</li></router-link
          >
          <li class="textBlueHover">收到的贊</li>
          <li class="textBlueHover">系統通知</li>
          <li class="textBlueHover">我的消息</li>
          <li class="textBlueHover">私信存檔</li>
        </ul>
        <div id="footer" class="textBlueHover">
          <font-awesome-icon icon="fa-solid fa-gear" /> 消息設置
        </div>
      </div>
      <div id="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, nextTick } from "vue";
//引入組件
import TopList from "../components/topList.vue";
const data = reactive({
  hHeight: 0,
});
let { hHeight } = toRefs(data);
</script>
<style lang="less" scoped>
#messageView {
  overflow: hidden;
  height: 100vh;
  background: url(https://s1.hdslb.com/bfs/static/blive/blfe-message-web/static/img/infocenterbg.a1a0d152.jpg)
    center/cover no-repeat fixed;
  #content {
    padding-top: 70px;
    width: 80%;
    margin: 0 auto;
    height: 100%;
    display: flex;


    #left {
      width: 15%;
      height: 100%;
      background-color: white;
      opacity: 0.8;
      padding: 30px 0;
      /*       display: flex;
      flex-direction: column;
      align-items: center; */
      font-weight: 600;
      .router-link-active {
        text-decoration: none;
        color: #00aeec;
      }
      a {
        color:#6B7597;
        text-decoration: none;
      }
      #title {
        font-size: 20px;
      }
      ul {
        margin-top: 50px;
        list-style-type: disc;
        padding-left: 40px;
        li {
          margin-bottom: 30px;
        }
      }
      #footer {
        margin-left: 20px;
        margin-top: 50px;
        list-style-type: none;
      }
    }
    #right {
      width: 85%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.5);
      padding: 10px 10px;

    }
  }
}
</style>
