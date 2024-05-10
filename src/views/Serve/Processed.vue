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
        <el-table-column label="类型">
          <template #default="props">
            <el-tag type="warning" v-if="props.row.type == '0'">售后服务</el-tag>
            <el-tag type="danger" v-if="props.row.type == '1'">客户投诉</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="服务对象">
          <template #default="props">
            <div v-if="props.row.type == '0'">{{ props.row.oid }}</div>
            <div v-if="props.row.type == '1'">{{ props.row.cid }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="服务状态">
          <template #default="props">
            <el-tag type="info" v-if="props.row.status == '1'">已反馈</el-tag>
            <el-tag v-if="props.row.status == '2'"> 已解决</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="sCreate" label="创建时间" />

        <!-- <el-table-column label="评价" width="320">
          <template #default="props">
            <el-rate v-model="props.row.rate" disabled text-color="#ff9900" score-template="{value} points" />
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="操作" width="320">
          <template #default="props">
            <el-button type="primary" size="small" @click="getInfo(props.row.type)">查看详情</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <el-pagination class="mt15 flex-center foot" :pager-count="11" layout="prev, pager, next,total,sizes"
        v-model:current-page="currentPage" v-model:page-size="pageSize" :total="total"
        :page-sizes="[10, 20, 30, 40, 50]" @size-change="getListSize" @current-change="getListCurrent" />
    </div>

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { selectAll } from '@/api/modules/service'
const tableData = ref([])
/**
 * 分页
 */
//分页总数
const total = ref()
//初始页
const currentPage = ref(1)
//初始分页
const pageSize = ref(10)
//分页
async function getList(page, size) {
  const { data } = await selectAll(page, size, "", "")
  let order = data.records
  total.value = data.total
  tableData.value = order
}

async function getListSize(val) {
  pageSize.value = val
  getList(currentPage.value, val)
}

async function getListCurrent(val) {
  currentPage.value = val
  getList(val, pageSize.value)
}
//初始列表
async function getOrder() {
  const { data } = await selectAll(1, 10, "", "")
  total.value = data.total
  tableData.value = data.records
}

const select = ref('oid')
const option = [
  {
    label: '订单编号',
    value: 'oid'
  }
]

onMounted(() => {
  getOrder()
})
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