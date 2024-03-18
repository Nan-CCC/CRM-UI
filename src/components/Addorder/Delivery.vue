<template>
  <div>

    <div class="flex-center font">
      <h2>此订单预计于{{ formattedDate }}前发货</h2>
    </div>
    <slot name="del"></slot>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 创建一个新的Date对象表示今天
let today = new Date();
console.log(today);
// today.setFullYear(2024, 2, 12); // JavaScript中月份从0开始计算（0-11）
// 按照"YYYY-MM-DD"格式显示日期
//合同提交三天内发货
const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
</script>

<style scoped lang="scss">
.font {
  color: $header-color;
}
</style>