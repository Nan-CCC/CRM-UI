<template>
  <div class="box">
    <div class="title">活动已结束</div>
    <div class="con">
      <p></p>
      <p></p>
    </div>
    <div class="but">
      <el-button type="primary" @click="toSubmit">返回</el-button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';
const emit = defineEmits(['toZero'])
function toSubmit() {
  emit('toZero', 0)
}
</script>

<style scoped lang='scss'>
.box {
  text-align: center;

  .title {
    font-size: 40px;
    font-weight: 700;
    color: #5e902f;

  }

  .con {
    opacity: 0.6;
  }

  .but {
    padding-top: 15px;
    padding-bottom: 20px;
  }
}
</style>