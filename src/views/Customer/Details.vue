<template>
  <div style="border: 1px red solid;background-color: #fff;" class="m15">
    <el-descriptions border>
      <el-descriptions-item label="客户编号">{{ data.id }}</el-descriptions-item>
      <el-descriptions-item label="客户姓名">{{ data.name }}</el-descriptions-item>
      <el-descriptions-item label="客户年龄">
        <el-tag type="warning">{{ data.age }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="手机号码">
        {{ data.phone }}
      </el-descriptions-item>
      <el-descriptions-item label="电子邮箱">{{ data.email }}</el-descriptions-item>
      <el-descriptions-item label="所属公司">{{ data.company }}</el-descriptions-item>
      <el-descriptions-item label="备注" span="2">
        <el-tag v-for="item in data.info" class="mr10" type="warning">{{ item }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="评级">
        <el-tag type="primary" v-if="false">老客户</el-tag>
        <el-tag type="info" v-else-if="false">普通</el-tag>
        <el-tag type="error" v-else="!false">新用户</el-tag>
      </el-descriptions-item>
    </el-descriptions>
    <el-tabs v-model="des" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="历史订单" name="0">
        <One v-if="store.isTab[0]"></One>
      </el-tab-pane>
      <el-tab-pane label="售后记录" name="1">
        <Two v-if="store.isTab[1]"></Two>
      </el-tab-pane>
      <el-tab-pane label="投诉记录" name="2">Role</el-tab-pane>
      <el-tab-pane label="咨询记录" name="3">Task</el-tab-pane>


    </el-tabs>
  </div>
</template>




<script setup>
import One from '@/components/Details.vue/One.vue';
import Two from '@/components/Details.vue/Two.vue';
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useTabsStore } from '@/store/CustomerDetailsTabs.js'
const router = useRoute()
//详情客户id
const id = router.params.id

/**
 * 描述列表
 */
//模拟详情客户信息
const data = reactive(
  {
    id: 'KH000001',
    name: '花二头',
    age: '20-',
    phone: '14521452145',
    email: '145214521@qq.com',
    company: 'xxx有限公司',
    info: ['经理', '性格好', '大客户']
  },
)
/**
 * 标签
 */
const des = ref('1')
const store = useTabsStore()
const handleClick = (tab, event) => {
  console.log(store.isTab);
  store.changeTab(tab.props.name)
}
</script>

<style scoped></style>