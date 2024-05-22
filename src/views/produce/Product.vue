<template>
  <div class="base bor ">
    <div class="tool">
      <el-button size="small" type="primary" @click="dialogVisible = true">新建产品</el-button>
      <el-button size="small" @click="getExcel">导出Excel</el-button>
      <div class="fr">
        <el-select v-model="select" size="small" style="width: 90px">
          <el-option size="small" v-for=" item  in  option " :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
        <el-input v-model="searchtext" size="small" style="width: 150px;"></el-input>
        <el-button size="small" type="primary" @click="tosearch">搜索</el-button>
      </div>
    </div>
    <el-table :data="tableData" border>
      <el-table-column prop="id" label="产品编号" />
      <el-table-column prop="name" label="产品名称" />
      <el-table-column prop="price" label="产品价格" />
      <el-table-column prop="num" label="产品库存" />
      <el-table-column prop="critical" label="产品临界值" />
      <el-table-column label="操作" width="190">
        <template #default="props">
          <el-button type="warning" size="small" @click="change(props.row)">
            修改库存临界值
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="mt15 flex-center foot" :pager-count="11" layout="prev, pager, next,total,sizes"
      v-model:current-page="currentPage" v-model:page-size="pageSize" :total="total" :page-sizes="[10, 20, 30, 40, 50]"
      @size-change="getListSize" @current-change="getListCurrent" />

    <el-dialog v-model="dialogVisible" title="新增产品" width="500">
      <el-form :model="product" label-position="right" label-width="100px" style="max-width: 400px;">
        <el-form-item label="产品名称">
          <el-input v-model="product.name" />
        </el-form-item>
        <el-form-item label="产品价格">
          <el-input v-model="product.price" />
        </el-form-item>
        <el-form-item label="产品库存">
          <el-input v-model="product.num" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addPro">
            保存
          </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogVisible2" title="修改临界值" width="500">
      <div></div>
      <div>
        临界值
        <el-input v-model="critical" />
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
import { getProPage, insertPro, updateC } from '@/api/modules/product'
import { onMounted, ref } from 'vue';

const product = ref({
  critical: 1000,
  id: "",
  name: "",
  num: 0,
  price: 0.0
})

const select = ref('pid')
const option = [
  {
    label: '产品编号',
    value: 'pid'
  }
]

const tableData = ref([])

//分页总数
const total = ref()
//初始页
const currentPage = ref(1)
//初始分页
const pageSize = ref(10)

//分页
async function getList(page, size) {
  const { data } = await getProPage(page, size)
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
const dialogVisible = ref(false)
async function addPro() {
  await insertPro(product.value)
  getList(currentPage.value, pageSize.value)
  dialogVisible.value = false
}
const dialogVisible2 = ref(false)
const pidOwner = ref()
const critical = ref()
async function change(val) {
  dialogVisible2.value = true
  pidOwner.value = val.id
  critical.value = val.critical
}
async function save() {
  await updateC(pidOwner.value, critical.value)
  dialogVisible2.value = false
  critical.value = ''
  getList(currentPage.value, pageSize.value)
}
onMounted(() => {
  getList(currentPage.value, pageSize.value)
})
</script>

<style lang='scss'>
/*输入框固定长度*/
.demo-form-inline .el-input {
  --el-input-width: 299px;
}

.tag {
  margin-right: 25px;
}

.tool {
  border-top: 1px $plan-color solid;
  padding: 10px 0px;
}

.foot {
  padding-bottom: 15px;
}
</style>