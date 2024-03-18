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
      <el-table-column label="投诉内容" in>
        <template #default="props">
          {{ contentLimit(props.row.content) }}
        </template>
      </el-table-column>
      <el-table-column prop="date" label="发起时间" width="270" />
      <el-table-column label="状态" width="180">
        <template #default="prpos">
          <el-tag v-if="prpos.row.user == ''" type="error">{{ prpos.row.status }}</el-tag>
          <el-tag v-else>{{ prpos.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="user" label="经办人员" width="150" />
    </el-table>
    <div class="flex-center mt10 mb10">
      <el-pagination :page-size="20" :pager-count="11" layout="prev, pager, next" :total="1000" />
    </div>

    <el-dialog v-model="dialogVisible" title="投诉详情" width="500" :before-close="handleClose">
      <div class="con p10">{{ con }}</div>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>

</template>

<script setup>
import { ref } from 'vue';
/**
 * 搜索
 */
const select = ref('id')
const option = [
  {
    label: '投诉编号',
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
const tableData = [
  {
    id: 'FW0000000258',
    content: '啊八八八八八八啊八八八八八八八八八八',
    date: '2024-03-14 13:55:20',
    status: '待处理',
    user: '',
  },
  {
    id: 'FW0000000244',
    content: '安七七七七七七啊嘁嘁嘁嘁嘁嘁嘁嘁嘁哈哈哈安七七七七七七啊嘁嘁嘁嘁嘁嘁嘁嘁嘁哈哈哈',
    date: '2024-03-14 13:55:20',
    status: '已处理',
    user: 'YG000002',
  }
]

const contentLimit = (val) => {
  if (val.length > 26) {
    return val.substring(0, 26) + '...'
  }
  else {
    return val
  }
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
</script>

<style scoped lang="scss">
@import '@/assets/scss/customDetails.scss';
</style>