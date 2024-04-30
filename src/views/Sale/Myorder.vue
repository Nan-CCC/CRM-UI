<template>
  <div>
    <el-tabs v-model="des" type="card" class="demo-tabs ml15" @tab-click="handleClick">
      <el-tab-pane v-for="item in tabs" :label="item.label" :name="item.name">
      </el-tab-pane>
    </el-tabs>
    <router-view />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, onUpdated } from 'vue';
import { useRouter, useRoute } from "vue-router"
const router = useRouter()
//tab
const des = ref()

const tabs = ref([
  {
    label: '新增订单',
    name: 'AddOrder'
  },
  {
    label: '进行中订单',
    name: 'Ordering'
  },
  {
    label: '已结束订单',
    name: 'Orders'
  }
])
function handleClick(val) {
  router.push({ name: val.props.name })
}
//监听
watch(des, (newValue, oldValue) => {
  sessionStorage.setItem('tab', des.value)
})
onUpdated(() => {
  if (sessionStorage.getItem('tab') != null) {
    des.value = sessionStorage.getItem('tab')
  }
})
onMounted(() => {
  //页面刷新不变
  if (sessionStorage.getItem('tab') != null) {
    des.value = sessionStorage.getItem('tab')
  }
  else {
    des.value = "AddOrder"
    sessionStorage.setItem('tab', des.value)
  }
  router.push({ name: des.value })
})
</script>

<style scoped lang="scss"></style>