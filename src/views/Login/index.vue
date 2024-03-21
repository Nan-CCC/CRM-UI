<template>
  <div>
    <h2>login1111</h2>
    <el-button @click="toIndex">sign</el-button>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router"
const router = useRouter()
//获取路由列表
const getRouter = router.options.routes
function toIndex() {
  router.push('index')
}
</script>

<style scoped></style>