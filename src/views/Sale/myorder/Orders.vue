<template>
  <div class="bor ml15 mr15" style="padding-bottom: 10px;">
    <div class="tool">
      <el-button size="small">导出Excel</el-button>
      <div class="fr">
        <el-select v-model="select" size="small" style="width: 90px">
          <el-option size="small" v-for=" item  in  option " :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
        <el-input size="small" v-model="search" style="width: 150px;"></el-input>
        <el-button size="small" type="primary" @click="getSearch">搜索</el-button>
      </div>
    </div>
    <el-table :data="tableData" border style="width: 100%" table-layout="fixed">
      <el-table-column prop="oid" label="订单编号" />
      <el-table-column prop="cid" label="客户编号" />
      <el-table-column prop="contact" label="合同">
        <template #default="props">
          <el-button color="#88aaef" size="small" plain @click="getContent(props.row)">下载</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="status" label="状态">
        <template #default="props">
          <div>
            <el-tag type="success" size="small">已完成</el-tag>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="mt15 flex-center" :pager-count="11" layout="prev, pager, next,total,sizes"
      v-model:current-page="currentPage" v-model:page-size="pageSize" :total="total" :page-sizes="[10, 20, 30, 40, 50]"
      @size-change="getListSize" @current-change="getListCurrent" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getOrderByStatus } from '@/api/modules/order';
import { searchByColumn } from '@/api/modules/order'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
/**
 * 搜索
*/
const select = ref('oid')
const option = [
  {
    value: 'cid',
    label: '客户编号'
  },
  {
    value: 'oid',
    label: '订单编号'
  },
]
const search = ref()
async function getSearch() {
  if (search.value == '') {
    getList(currentPage.value, pageSize.value)
  }
  else {
    currentPage.value = 1
    const { data } = await searchByColumn(1, pageSize.value, '1', select.value, search.value, userStore.userInfo.id)
    tableData.value = data.records
    total.value = data.total
  }

}
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
  const { data } = await getOrderByStatus("1", page, size, userStore.userInfo.id)
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
  const { data } = await getOrderByStatus("1", 1, 10, userStore.userInfo.id)
  total.value = data.total
  tableData.value = data.records
}
//下载
async function getContent(val) {
  let url = '/api/contract/download?oid=' + val.oid
  //创建一个<a>
  const link = document.createElement('a')
  //设置跳转url
  link.href = url
  //设置下载属性
  link.setAttribute('download', '')
  //添加到页面
  document.body.appendChild(link)
  //点击
  link.click()
  //移出页面
  document.body.removeChild(link)
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
</style>