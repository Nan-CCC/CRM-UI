<template>
  <div>
    <div>
      <el-button size="small">导出Excel</el-button>
      <div class="fr">
        <el-select v-model="select" size="small" style="width: 90px">
          <el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-input v-model="search" style="width: 150px" size="small" clearable />
        <el-button size="small" type="primary">搜索</el-button>
      </div>
    </div>
    <el-table :data="tableData" class="mt10">
      <el-table-column type="expand">
        <template #default="props">
          <div class="expand">
            <div class="title mb20">服务编号：{{ props.row.id }}</div>
            <el-timeline style="max-width: 600px">
              <el-timeline-item v-for="(item, index) in  props.row.processList " :key="index"
                :timestamp="item.changeTime" placement="top"
                :color="item.cid == '' || item.cid == null ? '#bbdd22' : ''">
                {{ item.content }}
              </el-timeline-item>
            </el-timeline>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="oid" label="订单编号" />
      <el-table-column prop="sCreate" label="发起时间" />
      <el-table-column label="服务人员">
        <template #default="props">
          {{ (props.row.processList.find(item => item.uid
          != null)).uid }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="prpos">
          <el-button type="primary" size="small" @click="toOrder(prpos.row.oid)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useOrderStore } from '@/store/CustomerDetailsTabs'
import { useRoute } from 'vue-router';
import { getHistoryService } from '@/api/modules/service'
const router = useRoute()
//详情客户id
const id = router.params.id
const select = ref('id');
const option = [
  {
    label: '订单编号',
    value: 'id'
  },
  {
    label: '经办员工',
    value: 'user'
  },
  {
    label: '售后时间',
    value: 'date'
  }
]
const search = ref()
/**
 * 售后
 */
//时间戳颜色
//客服 （绿）
//客户 （灰）
const tableData = ref([])
async function getServeList() {
  const { data } = await getHistoryService(id, '0')
  for (let i in data) {
    tableData.value[i] = data[i].service
    tableData.value[i].processList = data[i].processList
  }
  console.log(tableData.value);
}

//查看详情（订单id）
//子传父
const emit = defineEmits(['getOrder'])
//当前订单
//将详情对应订单传到历史订单
const useOrder = useOrderStore()
const toOrder = (val) => {
  useOrder.transferOrder(val)
  emit('getOrder')

}

onMounted(() => {
  getServeList()
})
</script>

<style scoped lang="scss">
@import '@/assets/scss/customDetails.scss';
</style>