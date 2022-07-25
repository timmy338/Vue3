<template>
  <div id="loginView">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      status-icon
      :rules="rules"
      class="loginForm"
    >
      <el-form-item label="帳號" prop="userName">
        <el-input v-model="loginForm.userName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密碼" prop="password">
        <el-input v-model="loginForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button>注冊</el-button>
        <el-button type="primary">登錄</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  setup() {
    const data = reactive({
      loginForm: {
        userName: "",
        password: "",
      },
      rules: {
        userName: [
          { required: true, message: "輸入你的用戶名", trigger: "blur" },
          { min: 3, message: "長度不能少於3", trigger: "blur" },
        ],
        password: [
          { required: true, message: "輸入你的密碼", trigger: "blur" },
          { min: 3, message: "長度不能少於3", trigger: "blur" },
        ],
      },
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped>
#loginView {
  padding: 20px;
  width: 500px;
  height: 300px;
  background-color: rgb(90, 175, 172);
  border-radius: 2vh;
  background-image: url(https://s1.hdslb.com/bfs/seed/jinkela/short/mini-login/img/22_open.72c00877.png),
    url(https://s1.hdslb.com/bfs/seed/jinkela/short/mini-login/img/33_open.43a09438.png);
  background-position: 0 100%, 100% 100%;
  background-repeat: no-repeat, no-repeat;
  background-size: 24%;
}

.loginForm {
  margin: 0 auto;
  width: 300px;
}
</style>
