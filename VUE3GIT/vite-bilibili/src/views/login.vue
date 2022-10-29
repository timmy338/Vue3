<template>
  <div id="loginView">
    <div class="title">
      <text>哔哩哔哩登录</text>
    </div>
    <div class="middleDiv">
      <div id="code">
        <div style="text-align: center">
          <text style="font-size: 20px">扫描二维码登录</text>
        </div>
        <canvas id="canvas" @click="getCodeUrl()"></canvas>
        <el-button color="#00A1D6" @click="submitCode()">2維碼登錄</el-button>
      </div>
      <div class="line"></div>
      <div id="loginForm">
        <div style=" margin-bottom: 20px; display: flex;line-height: 20px;">
          <router-link to="/login/account" style="text-decoration: none">
            <text style="font-size: 20px">密碼登录</text>
          </router-link>
          <el-divider direction="vertical" />
          <router-link to="/login/phoneMessage" style="text-decoration: none">
            <text style="font-size: 20px">短信登录</text>
          </router-link>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, onMounted } from "vue";
import { getCodeLoginUrl, getCodeLoginInfo } from "../request/api";
import QRCode from "qrcode";
import { useRouter } from "vue-router";
import { setCookie } from "../ts/getCookieInUrl";
import Cookies from "js-cookie";

const data = reactive({
  codeLoginInfo: {
    url: "text",
    oauthKey: "",
  },
});


//獲取當前頁面的對象
let router = useRouter();

//刷新2維碼
const getCodeUrl = () => {
  getCodeLoginUrl().then((res) => {
    data.codeLoginInfo.oauthKey = res.data.oauthKey;
    data.codeLoginInfo.url = res.data.url;
    //console.log("已獲取code數據", data.codeLoginInfo.oauthKey, data.codeLoginInfo.url);
    useqrcode();
  });
};

//2維碼登錄方法
const submitCode = () => {
  getCodeLoginInfo(data.codeLoginInfo.oauthKey).then((res) => {
    console.log(res);
    if (res.status) {
      if (typeof res.data === "object") {
        setCookie(res.data.url);
      }
      router.push("/home");
      console.log("登錄成功");
    } else {
      alert("請先掃瞄2維碼");
    }
  });
};

//將2維碼渲染到dom元素上
const useqrcode = () => {
  //獲取canvas元素的dom再繪製qrCode,(!由於庫版本不是vue3,無法用ref的方式)
  let canvas = document.getElementById("canvas");
  let text = data.codeLoginInfo.url;
  QRCode.toCanvas(canvas, text, { width: 150 }, function (error) {
    if (error) console.error(error);
  });
};

onMounted(() => {
  /*   if (Cookies.get("SESSDATA")) {
    router.push("/home");
  } */

  useqrcode();
});
</script>

<style lang="less" scoped>
#loginView {
  margin: 0 auto;
  padding: 20px;
  width: 720px;
  height: 430px;
  background-color: rgb(255, 255, 255);
  border-radius: 2vh;
  background-image: url(https://s1.hdslb.com/bfs/seed/jinkela/short/mini-login/img/22_open.72c00877.png),
    url(https://s1.hdslb.com/bfs/seed/jinkela/short/mini-login/img/33_open.43a09438.png);
  background-position: 0 100%, 100% 100%;
  background-repeat: no-repeat, no-repeat;
  background-size: 17%;
  border: 1px black solid;
}
.title {
  text-align: center;
  margin: 0 auto;
  padding: 20px 0;
  color: #4fa5d9;
  font-size: 30px;
  margin-bottom: 10px;
}
.middleDiv {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
#code {
  margin-top: 10px;
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  align-content: center;
}
.line {
  width: 4px;
  height: 230px;
  background-color: #e7e7e7;
}
#loginForm {
  margin-top: 10px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
