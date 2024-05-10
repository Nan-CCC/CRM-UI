<template>
  <div class="box">
    <div class="title">活动尚未开始</div>
    <div class="con">
      <p>活动名称：{{ nowMarket.marketInfo.name }}</p>
      <p>活动时间：{{ nowMarket.marketInfo.start }}-{{ nowMarket.marketInfo.end }}</p>
      <p>审核人：{{ nowMarket.marketInfo.approver }}</p>
      <p>审核时间：{{ nowMarket.marketInfo.pass }}</p>
    </div>
    <div class="but">
      <el-button @click="toSubmit">返回</el-button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';
import { useNowMarketStore } from '@/store/marketing';
const nowMarket = useNowMarketStore()
const emit = defineEmits(['toZero'])

function toSubmit() {
  emit('toZero')

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