<template>
  <div style="background-color: #fff;" class="m15 bor ">
    <el-descriptions border>
      <el-descriptions-item label="客户编号">{{ cdata.id }}</el-descriptions-item>
      <el-descriptions-item label="客户姓名">{{ cdata.name }}</el-descriptions-item>
      <el-descriptions-item label="客户年龄">
        <el-tag type="warning">{{ age.map(item => item.label)[age.map(item => item.value).indexOf(cdata.age)]
          }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="手机号码">
        {{ cdata.phone }}
      </el-descriptions-item>
      <el-descriptions-item label="电子邮箱">{{ cdata.email }}</el-descriptions-item>
      <el-descriptions-item label="所属公司">{{ cdata.company }}</el-descriptions-item>
      <el-descriptions-item label="备注" span="2">
        {{ cdata.info }}
      </el-descriptions-item>
      <el-descriptions-item label="评级">
        <el-tag type="error" v-if="flag">新客户</el-tag>
        <el-tag type="primary" v-else>老客户</el-tag>
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
  </div>
</template>

<script setup>
import One from '@/components/Details/One.vue';
import Two from '@/components/Details/Two.vue';
import Three from '@/components/Details/Three.vue';
import { ref, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getInfoById } from '@/api/modules/customer'
import { getHaveOrder } from '@/api/modules/order'
const router = useRoute()
//详情客户id
const id = router.params.id
//客户信息
const cdata = reactive({})
//判断是否是新客户
const flag = ref()
async function isOld() {
  const { data } = await getHaveOrder(id)
  flag.value = data
}
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
async function getInfo() {
  getInfoById(id).then((res) => {
    if (res.code == 200) {
      for (var i in res.data) {
        cdata[i] = res.data[i]
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
  }
])
const handleClick = (tab) => {
  // des.value = tab.index
}
//修改当前tab到0
const changeTab = () => {
  des.value = 0
}

onMounted(async () => {
  await getInfo()
  await isOld()
})
</script>

<style scoped></style>@/api/modules/customer