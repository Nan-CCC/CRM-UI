<template>
  <div>
    <div>
      <el-button size="small">导出Excel</el-button>
      <div class="fr">
        <el-select v-model="select" size="small" style="width: 90px">
          <el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-input v-model="input" style="width: 150px" size="small" clearable />
        <el-button size="small" type="primary" @click="search">搜索</el-button>
      </div>
    </div>

    <el-table :data="tableData" class="mt10">
      <el-table-column type="expand">
        <template #default="props">
          <div class="expand">
            <div class="title">经办员工-{{ props.row.uid }}-{{ props.row.uName }}</div>
            <el-table :data="props.row.productList" border>
              <el-table-column label="产品编号" prop="id" />
              <el-table-column label="产品名称" prop="name" />
              <el-table-column label="数量" prop="num" />
              <el-table-column label="单价" prop="price" />
            </el-table>
            <p class="fr fs20 total">共计：{{ getTotal(props.row.productList) }}￥</p>
            <div class="mt20">
              <span>合同：</span>
              <el-button type="primary" @click="getContent(props.row.id)">点击下载</el-button>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="订单编号" />
      <el-table-column label="订单地址">
        <template #default="props">
          {{ getArea(props.row.province, props.row.city, props.row.district) }}
        </template>
      </el-table-column>
      <el-table-column label="地址详情">
        <template #default="props">
          <div v-if="props.row.address == 0">自提</div>
          <div v-else>{{ props.row.address }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="uName" label="经办员工" />
      <el-table-column prop="createTime" label="创建时间" />
    </el-table>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { getHistory } from '@/api/modules/order'
import { getUser } from '@/api/modules/user'
import { useRoute } from 'vue-router';
import { useOrderStore } from '@/store/CustomerDetailsTabs'
import { EluiChinaAreaDht } from 'elui-china-area-dht'
const router = useRoute()
//详情客户id
const id = router.params.id
/**
 * 搜索框
 */
//条件
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
    label: '订单时间',
    value: 'date'
  }
]
//input
const input = ref('')
//从售后记录跳转到具体订单
//使用搜索完成
//获取售后的对应的order
const useOrder = useOrderStore()
input.value = useOrder.nowOrderId

async function search() {
  getOrders(input.value)
}
/**
 * 表格
 */
const tableData = ref([])
const chinaData = new EluiChinaAreaDht.ChinaArea().chinaAreaflat
function getArea(v1, v2, v3) {
  //打印省市区 编码转文字
  return chinaData[v1].label + '-' + chinaData[v2].label + '-' + chinaData[v3].label;
}
async function getOrders(val) {
  tableData.value = []
  if (val == undefined) {
    const { data } = await getHistory(id, '')
    for (let i in data) {
      tableData.value[i] = data[i].orders
      tableData.value[i].uName = await getUName(data[i].orders.uid)
      tableData.value[i].productList = data[i].productList
    }
  }
  else {
    const { data } = await getHistory(id, val)
    for (let i in data) {
      tableData.value[i] = data[i].orders
      tableData.value[i].uName = await getUName(data[i].orders.uid)
      tableData.value[i].productList = data[i].productList
    }
  }
  console.log(tableData.value);

}
//计算总价
function getTotal(val) {
  let sum = 0
  for (let i in val) {
    sum += val[i].price * val[i].num
  }
  return sum
}
//查找对应员工
async function getUName(uid) {
  const { data } = await getUser(uid)
  return data.name
}
//下载合同
async function getContent(val) {
  let url = '/api/contract/download?oid=' + val
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
  getOrders()
})
</script>

<style scoped lang="scss">
@import '@/assets/scss/customDetails.scss';
</style>