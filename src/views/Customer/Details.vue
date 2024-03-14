<template>
  <div style="background-color: #fff;" class="m15">
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
    <el-tabs v-model="des" @tab-click="handleClick">
      <el-tab-pane v-for="item in tabsTitle" :label="item.label"></el-tab-pane>
    </el-tabs>
    <div v-if="des == 0">
      <One></One>
    </div>
    <div v-else-if="des == 1">
      <Two @getOrder="changeTab"></Two>
    </div>
    <div v-else-if="des == 2">
      <Three></Three>
    </div>
    <div v-else>
      <Four></Four>
    </div>
  </div>
</template>




<script setup>
import One from '@/components/Details.vue/One.vue';
import Two from '@/components/Details.vue/Two.vue';
import Three from '@/components/Details.vue/Three.vue';
import Four from '@/components/Details.vue/Four.vue';
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
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
const des = ref(0)
const tabsTitle = ref([
  {
    label: '历史订单',
    value: 0
  },
  {
    label: '售后记录',
    value: 1
  },
  {
    label: '投诉记录',
    value: 2
  },
  {
    label: '咨询记录',
    value: 3
  },
])
const handleClick = (tab) => {
  des.value = tab.index
}
//修改当前tab到0
const changeTab = () => {
  des.value = '0'
}
</script>

<style scoped></style>