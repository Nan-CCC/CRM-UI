<template>
  <div class="base bor pad">
    <div class="tool">
      <el-button size="small" @click="getExcel">导出Excel</el-button>
      <div class="fr">
        <el-select v-model="select" size="small" style="width: 90px">
          <el-option size="small" v-for=" item  in  option " :key="item.value" :label="item.lable"
            :value="item.value" />
        </el-select>
        <el-input v-model="searchtext" size="small" style="width: 150px;"></el-input>
        <el-button size="small" type="primary" @click="tosearch">搜索</el-button>
      </div>
    </div>
    <el-table :data="tableData" border>
      <el-table-column prop="id" label="营销编号" />
      <el-table-column prop="name" label="营销名称" />
      <el-table-column label="活动内容">
        <template #default="props">
          <el-button type="primary" plain size="small" @click="download(props.row.id)">下载</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="start" label="开始日期" />
      <el-table-column prop="end" label="结束日期" />
      <el-table-column prop="submit" label="提交时间" />
      <el-table-column label="状态">
        <template #default="props">
          <el-button v-if="props.row.status == '1'" type="danger" size="small"
            @click="changeMarket(props.row)">待审核</el-button>
          <el-tag v-if="props.row.status == '2'" type="warning">未开始</el-tag>
          <el-tag v-if="props.row.status == '3'" color="#ebf2f8" style="color:#1481bb" size="small">进行中</el-tag>
          <el-tag v-if="props.row.status == '4'" type="info" size="small">已结束</el-tag>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination class="mt15 flex-center" :pager-count="11" layout="prev, pager, next,total,sizes"
      v-model:current-page="currentPage" v-model:page-size="pageSize" :total="total" :page-sizes="[10, 20, 30, 40, 50]"
      @size-change="getListSize" @current-change="getListCurrent" />
    <el-dialog v-model="dialogVisible" destroy-on-close :title="title" width="500"
      @close="getList(currentPage, pageSize)">
      <div>
        <el-form :model="marketInfo" label-position="right" label-width="100px" style="max-width: 400px;">
          <el-form-item label="状态">
            <el-radio-group v-model="marketInfo.status" style="margin-top: -5px;">
              <el-radio value="2" size="large">通过</el-radio>
              <el-radio value="5" size="large">未通过</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="评语">
            <el-input v-model="marketInfo.note" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save">
            保存
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { selectAllByStatus, updateMarket } from '@/api/modules/market'
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/store/user';
import { getTime } from '@/utils/common';
const userStore = useUserStore()
const tableData = ref([])
//分页总数
const total = ref()
//初始页
const currentPage = ref(1)
//初始分页
const pageSize = ref(10)
//分页
async function getList(page, size) {
  const { data } = await selectAllByStatus(page, size)
  total.value = data.total
  tableData.value = data.records
  console.log(tableData.value);
  marketInfo.value.note = ''
  marketInfo.value.status = '2'
}

async function getListSize(val) {
  pageSize.value = val
  getList(currentPage.value, val)
}

async function getListCurrent(val) {
  currentPage.value = val
  getList(val, pageSize.value)
}

//弹窗
const dialogVisible = ref(false)
const title = ref('审核详情')
const marketInfo = ref({
  note: '',
  status: '2'
})
//修改
const market = ref({})
async function changeMarket(val) {
  dialogVisible.value = true
  market.value = val
}
async function save() {
  market.value.approver = userStore.userInfo.id
  market.value.notes = marketInfo.value.note
  market.value.pass = getTime(new Date())
  market.value.status = marketInfo.value.status
  const { data } = await updateMarket(market.value)
  dialogVisible.value = false
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
//搜索
const option = [
  {
    lable: '营销编号',
    value: 'u_id'
  },
]
const select = ref('u_id')
const searchtext = ref('')

async function tosearch() {

}

onMounted(() => {
  getList(currentPage.value, pageSize.value)
})
</script>

<style scoped lang='scss'>
.tag {
  margin-right: 25px;
}

.pad {
  padding: 0 10px;
  padding-bottom: 15px;
}

.tool {
  border-top: 1px $plan-color solid;
  padding: 10px 0px;
}
</style>