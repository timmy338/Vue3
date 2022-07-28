<template>
  <div id="loginView">
    <div class="title">
      <text>哔哩哔哩登录</text>
    </div>
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      status-icon
      :rules="rules"
      class="loginForm"
    >
      <el-form-item label="帳號" prop="userName">
        <el-input
          v-model="loginForm.userName"
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
        <el-button class="registerBtn">注冊</el-button>
        <el-button class="loginBtn" color="#00A1D6" @click="submitForm(loginFormRef)">
          登錄
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs ,ref} from "vue";
//獲取element-type
import type { FormInstance } from "element-plus";
const loginFormRef = ref<FormInstance>();

export default defineComponent({
  name:"login",
  setup() {
    const data = reactive({
      loginForm: {
        userName: "",
        password: "",
      },
    });

    const rules = {
      userName: [
        { required: true, message: "輸入你的用戶名", trigger: "blur" },
        { min: 3, message: "長度不能少於3", trigger: "blur" },
      ],
      password: [
        { required: true, message: "輸入你的密碼", trigger: "blur" },
        { min: 3, message: "長度不能少於3", trigger: "blur" },
      ],
    };

    const submitForm = (loginFormRef: FormInstance | undefined) => {
      if (!loginFormRef) return;
      loginFormRef.validate((valid) => {
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };
    return {
      ...toRefs(data),
      rules,
      submitForm,
      loginFormRef
    };
  },
});
</script>

<style lang="scss" scoped>
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

    .btnDiv {
      .registerBtn {
        width: 48%;
      }
      .loginBtn {
        width: 48%;
      }
    }
  }
}
</style>
