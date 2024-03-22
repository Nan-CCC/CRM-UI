<template>
  <div class="bor ml15 mr15">
    <div class="tool">
      <el-button size="small">导出Excel</el-button>
      <div class="fr">
        <el-select v-model="select" size="small" style="width: 90px">
          <el-option size="small" v-for=" item  in  option " :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
        <el-input size="small" v-model="search" style="width: 150px;"></el-input>
        <el-button size="small" type="primary">搜索</el-button>
      </div>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="类型" width="100">
          <template #default="props">
            <el-tag type="danger">{{ props.row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="create" label="创建时间" width="200" />
        <el-table-column prop="cusId" label="客户编号" width="120" />
        <el-table-column prop="content" label="内容" show-overflow-tooltip />
        <el-table-column label="操作" width="320">
          <template #default="props">
            <el-button type="primary" size="small" @click="call(props.row)">回复</el-button>
            <el-button type="warning" size="small">已解决</el-button>
            <el-button type="info" size="small">转处理</el-button>
            <el-select v-model="value" placeholder="Select" size="small" style="width: 90px;margin-left: 10px;"
              @blur="getInfo">
              <el-option v-for="item in option" :label="item.label" :value="item.value" />
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog v-model="dialogFormVisible" :title="dialogTitle" width="500">
      <el-input v-model="input" placeholder="Please input" />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>


  </div>
</template>

<script setup>
import { ref } from 'vue';

const tableData = ref([
  {
    id: 'FW0000000025',
    type: '客户投诉',
    create: '2024-03-22 08:11:02',
    cusId: 'KH0000022',
    content: '近期这批货色差太大，客服态度恶劣',
  },
])

/**
 * 弹窗
 *
 */
const dialogFormVisible = ref(false)
const dialogTitle = ref()
//操作下拉框
const value = ref('投诉客服')
const option = [
  {
    label: '投诉客服',
    value: '投诉客服'
  },
  {
    label: '投诉订单',
    value: '投诉订单'
  },
  {
    label: '投诉产品',
    value: '投诉产品'
  },
  {
    lable: '投诉其他',
    value: '投诉其他'
  }]
function getInfo() {
  dialogTitle.value = value.value
  dialogFormVisible.value = true
  //console.log();
}
</script>

<style scoped lang="scss">
.tool {
  border-top: 1px $plan-color solid;
  padding: 10px 0px;
}

.page {
  padding-bottom: 10px;
}
</style>