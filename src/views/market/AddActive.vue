<template>
  <div class="bor ml15 mr15 mt15 ">
    <el-steps class="step" :active="active" process-status="process" finish-status="success" align-center>
      <el-step title="创建" description="创建一个新的营销活动" />
      <el-step title="审核" description="活动等待审核" />
      <el-step title="未开始" description="活动尚未开始" />
      <el-step title="已结束" description="活动已经结束" />
    </el-steps>
    <Create v-if="active == 0" @changeActive="active = 1"></Create>
    <Approve v-if="active == 1" @toZero="active = 0"></Approve>
    <Start v-if="active == 2" @toZero="active = 0"></Start>
    <Ongoing v-if="active == 3" @toZero="active = 0"></Ongoing>
    <End v-if="active == 4" @toZero="active = 0"></End>
  </div>
</template>

<script setup>
import Create from '@/components/AddActive/Create.vue';
import Approve from '@/components/AddActive/Approve.vue';
import Start from '@/components/AddActive/Start.vue';
import Ongoing from '@/components/AddActive/Ongoing.vue'
import End from '@/components/AddActive/End.vue'
import { onMounted, ref, watch } from 'vue'

const active = ref()

//监听active，变化时改变session
watch(active, (newValue, oldValue) => {
  sessionStorage.setItem('active', newValue)
})

onMounted(() => {
  //防止刷新页面数据归零
  if (sessionStorage.getItem('active') != null) {
    active.value = parseInt(sessionStorage.getItem('active'))
  }
  else {
    active.value = 0
    sessionStorage.setItem('active', 0)
  }
})
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