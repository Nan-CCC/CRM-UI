<template>
  <el-empty description=" ">
    <el-button class="return" @click="toLogin">返回上一页</el-button>
  </el-empty>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';
const userStore = useUserStore()
const router = useRouter()
function toLogin() {
  //用户信息清空
  userStore.clearUserInfo()
  //session清空
  sessionStorage.clear()
  router.push('/login');
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