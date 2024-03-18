<template>
  <div>
    <el-tabs v-model="des" type="card" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane v-for="item in tabs" :label="item.label" :name="item.name">

      </el-tab-pane>

    </el-tabs>
    <router-view />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter, useRoute } from "vue-router"
const router = useRouter()
const route = useRoute()

//tab
const des = ref('Addorder')
const tabs = ref([
  {
    label: '新增订单',
    name: 'Addorder'
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
</script>

<style scoped lang="scss"></style>