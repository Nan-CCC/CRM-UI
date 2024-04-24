<template>
  <div style="background-color: #fff;" class="m15 bor ">
    <el-descriptions border>
      <el-descriptions-item label="客户编号">{{ data.id }}</el-descriptions-item>
      <el-descriptions-item label="客户姓名">{{ data.name }}</el-descriptions-item>
      <el-descriptions-item label="客户年龄">
        <el-tag type="warning">{{ age.map(item => item.label)[age.map(item => item.value).indexOf(data.age)]
          }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="手机号码">
        {{ data.phone }}
      </el-descriptions-item>
      <el-descriptions-item label="电子邮箱">{{ data.email }}</el-descriptions-item>
      <el-descriptions-item label="所属公司">{{ data.company }}</el-descriptions-item>
      <el-descriptions-item label="备注" span="2">
        {{ data.info }}
      </el-descriptions-item>
      <el-descriptions-item label="评级">
        <el-tag type="primary" v-if="!false">老客户</el-tag>
        <el-tag type="info" v-else-if="false">普通</el-tag>
        <el-tag type="error" v-else="false">新用户</el-tag>
      </el-descriptions-item>
    </el-descriptions>
    <el-tabs v-model="des" @tab-click="handleClick">
      <el-tab-pane v-for="item in tabsTitle" :label="item.label" :name="item.value"></el-tab-pane>
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
import One from '@/components/Details/One.vue';
import Two from '@/components/Details/Two.vue';
import Three from '@/components/Details/Three.vue';
import Four from '@/components/Details/Four.vue';
import { ref, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getInfoById } from '@/api/modules/customer'
const router = useRoute()
//详情客户id
const id = router.params.id
//客户信息
const data = reactive({})
//年龄格式
const age = [
  {
    value: '20-',
    label: '20岁以下'
  },
  {
    value: '20-30',
    label: '20岁-30岁'
  },
  {
    value: '30-40',
    label: '30岁-40岁'
  },
  {
    value: '40-50',
    label: '40岁-50岁'
  },
  {
    value: '50-60',
    label: '50岁-60岁'
  },
  {
    value: '60+',
    label: '60岁以上'
  },
]
function getInfo() {
  getInfoById(id).then((res) => {
    if (res.code == 200) {
      for (var i in res.data) {
        data[i] = res.data[i]
      }
    }
  })
}

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
  // des.value = tab.index
}
//修改当前tab到0
const changeTab = () => {
  des.value = 0
}

onMounted(() => {
  getInfo()
})
</script>

<style scoped></style>@/api/modules/customer