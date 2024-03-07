<template>
  <div style="overflow:hidden;">
    <div class="base info">
      <p>{{ now }}</p>
      <p>欢迎回来，<span>叶翘</span></p>
      <p>您目前所属：<span>市场部</span></p>
    </div>
    <div class="base calendar">日历</div>

    <div class="base notice">通知</div>
  </div>
</template>

<script setup>
import { ref, relative } from 'vue'
const now = ref(new Date().toLocaleString())
</script>

<style scoped lang="scss">
.base {
  background-color: white;
  box-shadow: 0px 1px 3px #d5e0ca;
  margin-top: 15px;
  margin-left: 15px;
}

.info {
  width: 46%;
  height: 300px;
  float: left;
  text-align: center;
  font-size: 18px;
  font-weight: 200;
  color: $header-color;

  span {
    color: rgb(145, 60, 0);
  }
}

.calendar {
  width: 50%;
  height: 500px;
  float: left;
}

.notice {
  width: 46%;
  height: 500px;
  float: left;
  margin-top: -190px;
}
</style>