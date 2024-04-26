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
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from "vue-router"
const router = useRouter()
//tab
const des = ref('AddOrder')
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
onMounted(() => {

  //router.push({ name: 'AddOrder' })

})
</script>

<style scoped lang="scss"></style>