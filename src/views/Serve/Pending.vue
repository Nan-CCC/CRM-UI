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
const des = ref('Service')
const tabs = ref([
  {
    label: '售后服务',
    name: 'Service'
  },
  {
    label: '客户投诉',
    name: 'Complaint'
  },
])
function handleClick(val) {
  router.push({ name: val.props.name })
}
onMounted(() => {
  router.push({ name: des.value })
})
</script>

<style scoped lang="scss"></style>