<template>
  <div class="bor ml15 mr15">
    <div class="tool">
      <el-button size="small">导出Excel</el-button>
      <div class="fr">
        <el-select v-model="select" size="small" style="width: 90px">
          <el-option size="small" v-for=" item  in  option2 " :key="item.value" :label="item.label"
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
            <el-tag type="danger">客户投诉</el-tag>
          </template>

        </el-table-column>
        <el-table-column prop="content" label="内容" show-overflow-tooltip />
        <el-table-column prop="cid" label="客户编号" width="150" />
        <el-table-column prop="screate" label="创建时间" width="200" />


        <el-table-column label="操作" width="300">
          <template #default="props">
            <el-select v-model="value" placeholder="Select" size="small" style="width: 90px;margin-right: 12px;">
              <el-option v-for="item in option" :label="item.label" :value="item.value" />
            </el-select>
            <el-button type="primary" size="small" @click="getInfo(props.row.id)">转处理</el-button>
            <el-button type="warning" size="small" @click="end(props.row.id)">已解决</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="mt15 flex-center foot" :pager-count="11" layout="prev, pager, next,total,sizes"
        v-model:current-page="currentPage" v-model:page-size="pageSize" :total="total"
        :page-sizes="[10, 20, 30, 40, 50]" @size-change="getListSize" @current-change="getListCurrent" />
    </div>


  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { selectAll, updateById } from '@/api/modules/service'
import { useUserStore } from '@/store/user';

const userStore = useUserStore()

const select = ref('oid')
const option2 = [
  {
    label: '订单编号',
    value: 'oid'
  }
]
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
  const { data } = await selectAll(page, size, userStore.userInfo.id, '1')
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
  const { data } = await selectAll(1, 10, userStore.userInfo.id, '1')
  total.value = data.total
  tableData.value = data.records
}

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
async function getInfo(val) {
  await updateById(val, value.value)
  getList(currentPage.value, pageSize.value)
}
async function end(val) {
  await updateById(val, '2')
  getList(currentPage.value, pageSize.value)

}

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

.foot {
  padding-bottom: 15px;
}
</style>