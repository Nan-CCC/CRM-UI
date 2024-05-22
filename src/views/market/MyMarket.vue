<template>
  <div class="mt15 ml15 mr15 bor">
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
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="活动名称" width="300" />
      <el-table-column label="活动内容">
        <template #default="props">
          <el-button type="primary" size="small" @click="download(props.row.id)">下载</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="start" label="开始时间" />
      <el-table-column prop="end" label="结束时间" />
      <el-table-column prop="status" label="活动状态">
        <template #default="props">
          <el-tag v-if="props.row.status == '0'">草稿</el-tag>
          <el-tag v-if="props.row.status == '1'" type="warning">待审核</el-tag>
          <el-tag v-if="props.row.status == '2'" type="info">未开始</el-tag>
          <el-tag v-if="props.row.status == '3'" color="#ebf2f8" style="color:#1481bb">进行中</el-tag>
          <el-tag v-if="props.row.status == '4'" type="info">已结束</el-tag>
          <el-tag v-if="props.row.status == '5'" type="danger">未通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">

        <template #default="props">
          <el-button v-if="props.row.status == '0'" type="primary" size="small" plain @click="changeById(props.row.id)">
            提交
          </el-button>
          <el-button v-if="props.row.status == '0' || props.row.status == '5'" size="small" type="danger" plain
            @click="delectM(props.row.id)">
            删除
          </el-button>

          <div v-else-if="props.row.status == '4'"></div>
          <el-button v-else size="small" type="primary" plain @click="toDetail(props.row.id, props.row.status)">
            查看进度
          </el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="mt15 flex-center foot" :pager-count="11" layout="prev, pager, next,total,sizes"
      v-model:current-page="currentPage" v-model:page-size="pageSize" :total="total" :page-sizes="[10, 20, 30, 40, 50]"
      @size-change="getListSize" @current-change="getListCurrent" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { selectAll, selectById, deleteMarket, updateStatus } from '@/api/modules/market'
import { useRouter } from 'vue-router';
import { useNowMarketStore } from '@/store/marketing';
const nowMarket = useNowMarketStore()
const router = useRouter()
const select = ref('id')
const option = ref([
  {
    label: '活动编号',
    value: 'id'
  }
])

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
  const { data } = await selectAll(page, size)
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
  const { data } = await selectAll(1, 10)
  total.value = data.total
  tableData.value = data.records
}

//下载
function download(val) {
  let url = '/api/market/download?mid=' + val
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
//跳转进度
async function toDetail(id, status) {
  router.push('/market/addActive')
  const { data } = await selectById(id)
  nowMarket.setInfo(data)
  console.log(nowMarket.marketInfo);
  if (status == 0) {
    sessionStorage.setItem('active', 0)
  }
  else if (status == 1) {
    sessionStorage.setItem('active', 1)
  }
  else if (status == 2) {
    sessionStorage.setItem('active', 2)
  }
  else if (status == 3) {
    sessionStorage.setItem('active', 3)
  }
  else if (status == 4) {
    sessionStorage.setItem('active', 4)
  }
  else if (status == 5) {
    sessionStorage.setItem('active', 0)
  }
}

async function delectM(val) {
  await deleteMarket(val)
  getOrder()

}

async function changeById(val) {
  await updateStatus(val, '1')
  getOrder()
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