<template>
  <div class="bor m15 ">
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
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="客户名称" />
      <el-table-column prop="company" label="所属公司" />
      <el-table-column prop="phone" label="联系电话" />
      <el-table-column prop="email" label="邮箱地址" />
      <!-- <el-table-column prop="time" label="最近联系时间" width="170px" /> -->
      <!-- <el-table-column label="联系方式">
        <template #default="props">
          <el-tag v-if="props.row.way">
            {{ props.row.way }}
          </el-tag>
        </template>
</el-table-column> -->
      <el-table-column label="操作" width="200px">
        <template #default="props">
          <el-button size="small" type="warning" plain @click="open(props.row.id, '编辑信息')">
            编辑
          </el-button>
          <el-button size="small" color="#6ea235" plain @click="open(props.row.id, '发送邮件')">
            邮件
          </el-button>
          <el-button size="small" color="#409eff" plain @click="open(props.row.id, '发送短信')">
            短信
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="mt15 flex-center foot" :pager-count="11" layout="prev, pager, next,total,sizes"
      v-model:current-page="currentPage" v-model:page-size="pageSize" :total="total" :page-sizes="[10, 20, 30, 40, 50]"
      @size-change="getListSize" @current-change="getListCurrent" />

    <Dialog ref="dialogRef"></Dialog>
  </div>
</template>

<script setup>
import Dialog from '@/components/Contact/Dialog.vue';
import { ref, onMounted } from 'vue';
import { getCustomer } from '@/api/modules/customer'
import { useUserStore } from '@/store/user'

const tableData = ref([])
const way = ['电话', '邮件', '上门', '邮件', '上门', '短信', '短信', '短信', '电话', '邮件', '上门',]
/**
 * 表格
 */
//分页总数
const total = ref()
//初始页
const currentPage = ref(1)
//初始分页
const pageSize = ref(10)
const userStore = useUserStore()
//分页
async function getList(page, size) {
  const { data } = await getCustomer(page, size, userStore.userInfo.id)
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
const dialogRef = ref(null)
function open(id, type) {
  dialogRef.value.handleOpen(true, id, type)
}
onMounted(() => {
  getList(currentPage.value, pageSize.value)
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