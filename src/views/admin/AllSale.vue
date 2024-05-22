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
      <el-table-column prop="id" label="订单编号" />
      <el-table-column label="所属员工">
        <template #default="props">
          {{ props.row.uid }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" />
      <el-table-column label="当前状态">
        <template #default="props">
          <el-tag v-if="props.row.status == 1" type="success">已完成</el-tag>
          <el-tag v-else-if="props.row.status == 0" type="warning">待签约</el-tag>
          <el-tag v-else type="info">{{ props.row.status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="200px">
        <template #default="props">
          <el-button type="primary" size="small" @click="check(props.row.id)">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="mt15 flex-center" :pager-count="11" layout="prev, pager, next,total,sizes"
      v-model:current-page="currentPage" v-model:page-size="pageSize" :total="total" :page-sizes="[10, 20, 30, 40, 50]"
      @size-change="getListSize" @current-change="getListCurrent" />

    <el-dialog v-model="dialogVisible" destroy-on-close :title="title" width="500">
      <div>
        <el-table :data="proList" border style="width: 100%">
          <el-table-column prop="name" label="产品名称" />
          <el-table-column prop="num" label="产品数量" />
          <el-table-column prop="price" label="产品价格" />
        </el-table>
        <div style="margin-top:15px;color:#466c23">
          共计:
          <span style="color:#eb7005;font-size:20px;font-weight:800">{{ getOrderSumPrice(proList) }}</span>
          ￥
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getOrderAll, getProListById } from '@/api/modules/order'
import { getOrderSumPrice } from '@/utils/common'
//用户表
const tableData = ref([])
//分页总数
const total = ref()
//初始页
const currentPage = ref(1)
//初始分页
const pageSize = ref(10)
//分页
async function getList(page, size) {
  const { data } = await getOrderAll(page, size)
  let userList = data.records
  total.value = data.total
  tableData.value = userList
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
const title = ref('订单详情')
const proList = ref([])
async function check(val) {
  dialogVisible.value = true

  const { data } = await getProListById(val)
  proList.value = data
  console.log(data);
}

//搜索
const option = [
  {
    lable: '订单编号',
    value: 'u_id'
  },
  {
    lable: '员工姓名',
    value: 'u_name'
  },
  {
    lable: '所属部门',
    value: 'department'
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