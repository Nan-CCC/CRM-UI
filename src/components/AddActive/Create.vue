<template>
  <div class="flex-center mt15">
    <el-form :model="formData" label-position="right" label-width="70" class="form">
      <el-form-item label="活动名称">
        <el-input v-model="formData.name" maxlength="20" show-word-limit clearable />
      </el-form-item>
      <el-form-item label="活动详情">
        <el-upload ref="upload" action="" :http-request="toRequest" :limit="1" :on-exceed="handleExceed"
          :on-change="handleChange" :auto-upload="false">
          <template #>
            <el-button type="primary">上传</el-button>
          </template>
        </el-upload>
        <!-- <span class="ml10 tips">仅限pdf/word</span> -->
      </el-form-item>
      <el-form-item label="活动时间">
        <el-date-picker v-model="formData.time" type="daterange" unlink-panels range-separator="To"
          start-placeholder="Start date" end-placeholder="End date" />
      </el-form-item>
      <el-form-item label="策划人">
        <el-select v-model="formData.users" multiple placeholder="Select" filterable default-first-option clearable
          multiple-limit="4" :reserve-keyword="false">
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="活动预算">
        <el-input-number v-model="formData.budget" :step="1000" />
      </el-form-item>
      <el-form-item label="投放平台">
        <el-checkbox-group v-model="formData.platform">
          <el-checkbox v-for="item in optionsPlat" :label="item.label" :value="item.value">
            {{ item.label }}
          </el-checkbox>

          <el-select v-if="!flag" v-model="addPlat" filterable allow-create placeholder="Select" style="width: 60px"
            @keyup.enter="add()" @blur="add()" size="small" class="ml15 mb15">
            <el-option v-for="item in optionsPlat2" :label="item.name" :value="item.id" />
          </el-select>

          <el-button v-else size="small" class="ml15 mb15" @click="flag = false" color="#5e902f" plain>
            <el-icon>
              <Plus />
            </el-icon>
          </el-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-tiem>
        <div style="text-align: center;" class="mb15">
          <el-button @click="save">
            保存
          </el-button>
          <el-button type="primary" @click="next">
            下一步
          </el-button>
        </div>
      </el-form-tiem>
    </el-form>

  </div>
</template>

<script setup>
import { reactive, ref, defineEmits, computed, onMounted } from 'vue';
import { getAllUser } from '@/api/modules/user'
import { getAll, getPlatform } from '@/api/modules/platform';
import { useUserStore } from '@/store/user';
import { insert, uploadFile } from '@/api/modules/market'
import { useNowMarketStore } from "@/store/marketing"
import { getTime } from '@/utils/common'

const userStore = useUserStore()
const marketStore = useNowMarketStore()
const formData = reactive({
  name: '',
  content: '',
  time: [],
  users: [userStore.userInfo.id],
  platform: [],
  budget: '10000'
})


//员工多选
const options = ref([])
async function getUserList() {
  const { data } = await getAllUser()
  let list = data
  options.value = list
}

//上传 
const upload = ref({})
//上传文件超过1个，清除已上传的重新上传
const handleExceed = (files) => {
  upload.value.clearFiles()
  upload.value.handleStart(files[0])
}
//文件
const file = ref()
//获取文件
const handleChange = (rawFile) => {
  file.value = rawFile.raw
}
/**
 * 平台复选
 */
//建议常用前5(3年)
const optionsPlat = ref([
  {
    value: 'PT000003',
    label: '抖音'
  },
  {
    value: 'PT000004',
    label: '小红书'
  },
  {
    value: 'PT000005',
    label: 'b站'
  }
])

//添加按钮
const flag = ref(true)

//平台下拉框
const optionsPlat2 = ref([
  {
    label: 'b站2',
    value: 'PT000008'
  },
  {
    label: '抖音3',
    value: 'PT000005'
  },
  {
    label: '小红书4',
    value: 'PT000006'
  },
])
async function getPList() {
  const { data } = await getAll()
  let list = data
  optionsPlat2.value = list
}
//新增平台绑定
const addPlat = ref()
async function add() {
  //判断多选绑定值是否在平台多选框数组中
  let x = optionsPlat.value.some(i => i.value === addPlat.value)
  console.log(x);
  if (x) {
    formData.platform.push(addPlat.value)
  } else {
    const { data } = await getPlatform(addPlat.value)
    optionsPlat.value.push({
      label: data.name,
      value: data.id
    })
    formData.platform.push(addPlat.value)
  }
  flag.value = true
  addPlat.value = ''
}
//控制父元素active状态
const emit = defineEmits(['changeActive'])
async function next() {
  let form = new window.FormData()
  form.append('file', file.value)
  const { msg } = await uploadFile(form)

  let market = {
    name: formData.name,
    info: msg,
    cost: formData.budget,
    start: getTime(formData.time[0]),
    end: getTime(formData.time[1]),
    status: "1",
    pidList: formData.platform,
    uidList: formData.users,
    submit: getTime(new Date())
  }
  await marketStore.setInfo(market)
  await marketStore.getAddMarket()

  formData.name = ''
  formData.content = ''
  formData.time = []
  formData.users = [userStore.userInfo.id]
  formData.platform = []
  formData.budget = 10000
  emit('changeActive', 1)
}

async function save() {
  let form = new window.FormData()
  form.append('file', file.value)
  const { msg } = await uploadFile(form)

  let market = {
    name: formData.name,
    info: msg,
    cost: formData.budget,
    start: getTime(formData.time[0]),
    end: getTime(formData.time[1]),
    status: "0",
    pidList: formData.platform,
    uidList: formData.users,
    submit: getTime(new Date())
  }
  await marketStore.setInfo(market)
  await marketStore.getAddMarket()

  formData.name = ''
  formData.content = ''
  formData.time = []
  formData.users = [userStore.userInfo.id]
  formData.platform = []
  formData.budget = 10000
  upload.value.clearFiles()
}

onMounted(() => {

  getUserList()
  getPList()
  if (marketStore.marketInfo.id != '' && marketStore.marketInfo.status == 4) {
    formData.name = marketStore.marketInfo.name
    formData.content = ''
    formData.time = [marketStore.marketInfo.start, marketStore.marketInfo.end]
    formData.users = marketStore.marketInfo.uidList
    formData.platform = marketStore.marketInfo.pidList
    formData.budget = marketStore.marketInfo.cost
  }
})
</script>

<style scoped lang="scss">
.form {
  max-width: 700px;
  width: 500px;

  .tips {
    font-size: 12px;
    opacity: 0.6;
  }
}
</style>