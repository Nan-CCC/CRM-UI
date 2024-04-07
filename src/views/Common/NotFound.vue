<template>
  <el-empty description=" ">
    <el-button class="return" @click="toBeforePage">返回上一页</el-button>
  </el-empty>
</template>

<script setup>
import { useRouter } from 'vue-router';


const router = useRouter
function toBeforePage() {
  router.go(-1)
}
</script>

<style scoped lang='scss'>
.return {
  border: none;
  background-color: #fff;
  text-decoration: underline;
  color: #5e902f;
}

.return:hover {
  color: #7ba059;
}

.return:active {
  color: #526d1a;
}
</style>