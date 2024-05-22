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
    <el-table :data="tableData" border table-layout="fixed">
      <el-table-column prop="cname" label="客户名称" />

      <el-table-column label="订单地址" width="190">
        <template #default="props">
          <div v-if="props.row.address != 0">
            {{ getArea(props.row.province, props.row.city, props.row.district) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="详细地址" show-overflow-tooltip>
        <template #default="props">
          <div v-if="props.row.address != 0">
            {{ props.row.address }}
          </div>
          <div v-else>
            自提
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="contact" label="合同" width="75">
        <template #default="props">
          <el-button v-if="props.row.status != 0" color="#88aaef" size="small" plain
            @click="getContent(props.row)">下载</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="sign" label="签署时间" width="120" />
      <el-table-column prop="status" label="发货日期" width="120">
        <template #default="props">
          <div v-if="props.row.status == 0"></div>
          <div v-else>
            {{ props.row.status }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="props">
          <div v-if="props.row.status == '0'">
            <el-button type="primary" size="small" @click="changeOrder(props.row)">待签约</el-button>
            <el-button type="danger" size="small" @click="deleteOrder(props.row)">删除</el-button>
          </div>
          <div v-if="props.row.status !== '0'">
            <el-button type="warning" size="small" @click="toEnd(props.row)">待发货</el-button>
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
import { getOrderByStatus } from '@/api/modules/order';
import { onMounted, reactive, ref } from 'vue';
import { EluiChinaAreaDht } from 'elui-china-area-dht'
import { useNowOrderStore } from '@/store/nowOrder';
import { useRouter } from 'vue-router';
import { deleteOrderById, updateStatus, searchByColumn } from '@/api/modules/order'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
/**
 * 搜索
*/
const select = ref('cid')
const option = [
  {
    value: 'cid',
    label: '客户编号'
  },
  {
    value: 'name',
    label: '客户名称'
  },
  {
    value: 'phone',
    label: '联系电话'
  },
  {
    value: 'date',
    label: '发货日期'
  },
]
const search = ref()
async function getSearch() {
  if (search.value == '') {
    getList(currentPage.value, pageSize.value)
  }
  else {
    currentPage.value = 1
    const { data } = await searchByColumn(1, pageSize.value, '0', select.value, search.value, userStore.userInfo.id)
    tableData.value = data.records
    total.value = data.total
  }

}
//表格
const tableData = ref([])
//省市区 编码->文字
const chinaData = new EluiChinaAreaDht.ChinaArea().chinaAreaflat
function getArea(v1, v2, v3) {
  //打印省市区 编码转文字
  return chinaData[v1].label + '-' + chinaData[v2].label + '-' + chinaData[v3].label;
}
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
  const { data } = await getOrderByStatus("0", page, size, userStore.userInfo.id)
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
  const { data } = await getOrderByStatus("0", 1, 10, userStore.userInfo.id)
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

//待签约
//跳转至AddOrder active=2
const router = useRouter()
const orderStore = useNowOrderStore()
function changeOrder(val) {
  orderStore.getOrderInfo(val, '')
  orderStore.setOid(val.oid)
  sessionStorage.setItem('tab', 'AddOrder')
  sessionStorage.setItem('active', 2)
  router.push({ name: 'AddOrder' })
}

//删除
async function deleteOrder(val) {
  await deleteOrderById(val.oid)
  await getList(currentPage.value, pageSize.value)
}

//待发货
async function toEnd(val) {
  await updateStatus(val.oid, '1')
  await getList(currentPage.value, pageSize.value)
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