<template>
  <div>
    <el-form ref="loginFormRef" :model="loginForm" :rules="rules" >

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
        <el-button class="registerBtn">注冊</el-button>
        <el-button class="loginBtn" color="#00A1D6" @click="submitForm()">
          登錄
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from "vue";
//獲取Form的dom對象
let loginFormRef = ref();

const data = reactive({
  loginForm: {
    userName: "",
    password: "",
  },

});

let { loginForm } = toRefs(data);

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

const submitForm = () => {
  loginFormRef.value
    .validate()
    .then(() => {})
    .catch(() => {
      alert("登錄失敗,請重試");
    });
};

</script>
<style lang="less" scoped>
.registerBtn {
  width: 48%;
}
.loginBtn {
  width: 48%;
}
</style>
