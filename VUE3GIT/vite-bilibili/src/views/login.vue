<template>
  <div id="loginView">
    <div id="code"><canvas id="canvas"></canvas></div>
    <div class="title">
      <text>哔哩哔哩登录</text>
    </div>
    <el-form ref="loginFormRef" :model="loginForm" :rules="rules" class="loginForm">
      <el-form-item label="帳號" prop="userName">
        <el-input
          v-model="loginForm.userName"
          type="text"
          autocomplete="off"
          placeholder="Please input username"
        />
      </el-form-item>
      <el-form-item label="密碼" prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          autocomplete="off"
          placeholder="Please input password"
        />
      </el-form-item>
      <el-form-item class="btnDiv">
        <el-button class="registerBtn" @click="getCode()">注冊</el-button>
        <el-button class="loginBtn" color="#00A1D6" @click="submitForm()">
          登錄
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, onMounted } from "vue";
import { codeLoginApi } from "../request/api";
import QRCode from "qrcode";
import axios from "axios";
//獲取element-type
import type { FormInstance } from "element-plus";

const data = reactive({
  loginForm: {
    userName: "",
    password: "",
  },
});

let { loginForm } = toRefs(data);

//獲取Form的dom對象
const loginFormRef = ref();

//校驗規則
const rules = {
  userName: [
    { required: true, message: "用戶名不能為空", trigger: "blur" },
    { min: 3, message: "長度不能少於3", trigger: "blur" },
  ],
  password: [
    { required: true, message: "密碼不能為空", trigger: "blur" },
    { min: 3, message: "長度不能少於3", trigger: "blur" },
  ],
};

const getCode = () => {
  codeLoginApi().then((res) => {
    console.log(res);
  });
};

const submitForm = () => {
  loginFormRef.value
    .validate()
    .then(() => {
      console.log("successful");
    })
    .catch(() => {
      console.log("error");
    });
};

const useqrcode = () => {
  let canvas = document.getElementById("canvas");
  let text = "string";
  QRCode.toCanvas(canvas, text, function (error) {
    if (error) console.error(error);
    console.log("QRcode success");
  });
};

onMounted(() => {
  getCode();
  /* useqrcode(); */
});
</script>

<style lang="less" scoped>
#loginView {
  margin: 0 auto;
  padding: 20px;
  width: 720px;
  height: 343.5px;
  background-color: rgb(255, 255, 255);
  border-radius: 2vh;
  background-image: url(https://s1.hdslb.com/bfs/seed/jinkela/short/mini-login/img/22_open.72c00877.png),
    url(https://s1.hdslb.com/bfs/seed/jinkela/short/mini-login/img/33_open.43a09438.png);
  background-position: 0 100%, 100% 100%;
  background-repeat: no-repeat, no-repeat;
  background-size: 17%;
}
.title {
  text-align: center;
  margin: 0 auto;
  padding: 20px 0;
  color: #4fa5d9;
  font-size: 25px;
}
.loginForm {
  margin: 0 auto;
  width: 300px;
}
.registerBtn {
  width: 48%;
}
.loginBtn {
  width: 48%;
}
</style>
