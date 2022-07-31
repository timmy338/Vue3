<template>
  <div id="view404">
    <img src="https://static.hdslb.com/error/very_sorry.png" />
    <el-button class="prePageBtn" type="primary" plain>返回上一頁</el-button>
    <div class="errorSplit"></div>
    <img src="../assets/errorImg.png"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name:"404",
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
#view404 {
  width: 980px;
  margin: 30px auto;
  background: #fff;
  border-radius: 10px;
  flex-direction: column ;
  display: flex;
  padding-bottom: 50px;
  .prePageBtn {
    margin: 0 auto 30px;
    width: 120px;
    height: 50px;
  }
  .errorSplit{
    width: 100%;
    height: 40px;
    background: url('https://static.hdslb.com/images/error/have_rest.png') center no-repeat;
    margin-bottom: 40px;
  }
}
</style>
