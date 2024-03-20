<template>
  <div class="bor ml15 mr15">
    <el-steps class="step" :active="active" process-status="process" finish-status="success" align-center>
      <el-step title="创建" description="创建一个新的营销活动" />
      <el-step title="审核" description="活动等待审核" />
      <el-step title="未开始" description="活动尚未开始" />
      <el-step title="进行中" description="活动正在进行" />
      <el-step title="已结束" description="活动已经结束" />
    </el-steps>
    <Create v-if="active == 0"></Create>
    <button @click="next">+1</button>
  </div>
</template>

<script setup>
import Create from '@/components/AddActive/Create.vue';
import { ref } from 'vue'

const active = ref(0)

const next = () => {
  if (active.value++ > 4) {
    active.value = 0
  }
}
function toZero() {
  active.value = 0
}
</script>

<style scoped lang="scss">
.step {
  padding-top: 20px;
  margin-bottom: 20px;
}

.setSolt {
  text-align: center;
  padding-bottom: 30px;
}
</style>