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
    <el-table :data="tableData" class="mt10" @cell-click="getContent">
      <el-table-column prop="id" label="投诉编号" width="200" />
      <!-- 加个内容过多折叠的 -->
      <el-table-column prop="content" label="投诉内容" />
      <el-table-column prop="sCreate" label="发起时间" width="270" />
      <el-table-column label="状态" width="180">
        <template #default="prpos">
          <el-tag type="error">{{ prpos.row.status }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getHistoryService } from '@/api/modules/service'
const router = useRoute()
//详情客户id
const id = router.params.id
/**
 * 搜索
 */
const select = ref('id')
const option = [
  {
    label: '服务编号',
    value: 'id'
  },
  {
    label: '经办员工',
    value: 'user'
  },
  {
    label: '投诉时间',
    value: 'date'
  },
]
//表格数据
const tableData = ref([])
async function getServeList() {
  const { data } = await getHistoryService(id, '1')
  for (let i in data) {
    tableData.value[i] = data[i].service
  }
  console.log(tableData.value);
}

/**
 * 获取全部投诉内容
 */
//弹窗
const dialogVisible = ref(false)
//投诉内容
const con = ref()
const getContent = (row, column) => {
  if (column.label == '投诉内容') {
    dialogVisible.value = true
    con.value = row.content
  }

}

onMounted(() => {
  getServeList()
})
</script>

<style scoped lang="scss">
@import '@/assets/scss/customDetails.scss';
</style>