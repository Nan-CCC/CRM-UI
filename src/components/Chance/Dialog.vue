<template>
  <div>
    <el-dialog v-model="dialogVisible" destroy-on-close :title="cusId ? '修改客户信息' : '新建客户信息'" width="540">
      <div>
        <el-form :model="customInfo" label-position="right" label-width="80px" style="max-width: 480px;">
          <el-form-item label="客户名称">
            <el-input v-model="customInfo.name" disabled />
          </el-form-item>
          <el-form-item label="活动来源">
            <el-select v-model="customInfo.mid" filterable allow-create default-first-option :reserve-keyword="false">
              <el-option v-for="item in activeList" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="平台来源">
            <el-select v-model="customInfo.pid" filterable allow-create default-first-option :reserve-keyword="false">
              <el-option v-for="item in platformList" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save()">
            保存
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, defineProps } from 'vue';
import { getAll } from '@/api/modules/platform'
import { getInfoById, setMarket } from '@/api/modules/customer'
import { selectAllList } from '@/api/modules/market'
const dialogVisible = ref(false)
//表单数据
const customInfo = reactive(
  {
    id: '',
    name: '',
    mid: '',
    pid: ''
  }
)
//编辑选中id
const cusId = ref(null)
async function handleOpen(visable, id) {
  dialogVisible.value = visable
  cusId.value = id
  const { data } = await getInfoById(id)
  for (let i in customInfo) {
    customInfo[i] = data[i]
  }
}
//年龄选择
const options = [
  {
    label: '20岁以下',
    value: '20-',
  },
  {
    label: '20岁-30岁',
    value: '20-30',
  },
  {
    label: '30岁-40岁',
    value: '30-40',
  },
  {
    label: '40岁-50岁',
    value: '40-50',
  },
  {
    label: '50岁-60岁',
    value: '50-60',
  },
  {
    label: '60岁以上',
    value: '60+',
  },
]
//活动来源
const activeList = ref([])
async function getMarketList() {
  const { data } = await selectAllList()
  activeList.value = data
}
//平台来源选择
const platformList = ref([])
async function getPlatformList() {
  const { data } = await getAll()
  platformList.value = data
}
//保存
const props = defineProps({
  reMount: Function
})
async function save() {
  const { code } = await setMarket(customInfo.id, customInfo.mid, customInfo.pid)
  dialogVisible.value = false
  props.reMount()
}

defineExpose({
  handleOpen
});
onMounted(() => {
  getPlatformList()
  getMarketList()
})
</script>

<style scoped lang="scss"></style>