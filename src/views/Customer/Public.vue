<template>
  <div class="base bor p1510">
    <el-form :model="searchForm" :rules="rules" ref="rulesRef" :inline="true" class="demo-form-inline">
      <el-form-item label="客户编号">
        <el-input v-model="searchForm.id" clearable disabled />
      </el-form-item>
      <el-form-item label="客户姓名" prop="name" style="margin-left: -11px;">
        <el-input v-model="searchForm.name" clearable />
      </el-form-item>
      <el-form-item label="客户年龄">
        <el-select v-model="searchForm.age" clearable placeholder="请选择年龄范围" style="width: 299px">
          <el-option v-for="item in age" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="searchForm.phone" clearable />
      </el-form-item>
      <el-form-item label="电子邮箱" prop="email">
        <el-input v-model="searchForm.email" clearable />
      </el-form-item>
      <el-form-item label="所属公司">
        <el-input v-model="searchForm.company" clearable />
      </el-form-item>
      <el-form-item label="备注" style="margin-left: 28px;">
        <el-input v-model="searchForm.info" clearable />
      </el-form-item>
      <el-form-item style="float: right;margin-right: 35px;">
        <div v-if="change">
          <el-button type="primary" @click="add(rulesRef)">
            <el-icon size="18">
              <CirclePlus />
            </el-icon>
            <span>添加客户</span>
          </el-button>
        </div>
        <div v-else>
          <el-button @click="cancel">
            <span>取消修改</span>
          </el-button>
          <el-button type="primary" @click="update(rulesRef)">
            <el-icon size="18">
              <Loading />
            </el-icon>
            <span>修改信息</span>
          </el-button>
        </div>
      </el-form-item>
    </el-form>
    <div class="tool">
      <el-button size="small">导出Excel</el-button>
      <div class="fr">
        <el-select v-model="select" size="small" style="width: 90px">
          <el-option size="small" v-for=" item  in  option " :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
        <el-input v-model="searchtext" size="small" style="width: 150px;"></el-input>
        <el-button size="small" type="primary" @click="tosearch">搜索</el-button>
      </div>
    </div>
    <el-table :data="tableData" border @row-click="getData">
      <el-table-column prop="name" label="客户姓名" width="120" />
      <el-table-column label="客户年龄" width="120">
        <template #default="props">
          {{ age.map(item => item.label)[age.map(item => item.value).indexOf(props.row.age)] }}
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号码" width="180" />
      <el-table-column prop="email" label="电子邮箱" width="200" />
      <el-table-column prop="company" label="所属公司" width="200" show-overflow-tooltip />
      <el-table-column prop="info" label="备注" show-overflow-tooltip />
      <el-table-column label="详情" width="190">
        <template #default="props">
          <el-button type="warning" size="small" @click.stop="toOwner(props.row.id)">
            转为客户
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="mt15 flex-center" :pager-count="11" layout="prev, pager, next,total,sizes"
      v-model:current-page="currentPage" v-model:page-size="pageSize" :total="total" :page-sizes="[10, 20, 30, 40, 50]"
      @size-change="getListSize" @current-change="getListCurrent" />
  </div>
</template>

<script setup>
import { ElInput } from 'element-plus'
import { getSuccess } from '@/utils/tips'
import { ref, reactive, onMounted } from 'vue'
import { isPhone } from '@/utils/validator.js'
import { getCustomer, addCustomer, updateCustomer, updateOwner, search } from '@/api/modules/customer'
import { getUserInfoByToken } from '@/api/modules/user'

/**
 * 表单
 */
//表单绑定对象
const searchForm = reactive({
  id: '',
  name: '',
  age: '',
  company: '',
  phone: '',
  email: '',
  info: ''
})
//表单名称
const rulesRef = ref()
//校验规则
const rules = reactive({
  name: [{
    required: true,
    message: '请输入客户姓名',
    trigger: 'blur'
  }],
  phone: [{
    validator: isPhone,
    message: '请输入正确的手机格式',
    trigger: 'blur'
  }],
  email: [{
    type: 'email',
    message: '请输入正确的邮箱号码',
    trigger: 'blur'
  }]
})
//年龄段
const age = [
  {
    value: '20-',
    label: '20岁以下'
  },
  {
    value: '20-30',
    label: '20岁-30岁'
  },
  {
    value: '30-40',
    label: '30岁-40岁'
  },
  {
    value: '40-50',
    label: '40岁-50岁'
  },
  {
    value: '50-60',
    label: '50岁-60岁'
  },
  {
    value: '60+',
    label: '60岁以上'
  },
]

//增加/修改按钮
const change = ref(true)
/**
 * 添加客户
 */
const add = (val) => {
  val.validate((valid) => {
    //valid==true校验通过
    if (valid) {
      let costomer = {}
      for (var i in searchForm) {
        costomer[i] = searchForm[i]
      }
      addCustomer(costomer).then((res) => {
        if (res.code == 200) {
          getSuccess('添加成功')
          getList(currentPage.value, pageSize.value)
        }
      })
      //清空对象
      for (var i in searchForm) {
        searchForm[i] = null
      }
    }
  })
}
/**
 * 修改客户
 */
const update = (val) => {
  val.validate((valid) => {
    //valid==true校验通过
    if (valid) {
      let costomer = {}
      for (var i in searchForm) {
        costomer[i] = searchForm[i]
      }
      updateCustomer(costomer).then((res) => {
        if (res.code == 200) {
          getSuccess('修改成功')
          getList(currentPage.value, pageSize.value)
        }
      })
      //清空对象
      for (var i in searchForm) {
        searchForm[i] = null
      }
      change.value = true
    }
  })
}
//取消修改
const cancel = () => {
  for (var i in searchForm) {
    searchForm[i] = null
  }
  change.value = true
}
/**
 * 根据条件搜索
 */
//条件
const select = ref('c_id')
const option = [
  {
    value: 'c_id',
    label: '客户编号'
  },
  {
    value: 'c_name',
    label: '客户姓名'
  },
  {
    value: 'c_phone',
    label: '手机号码'
  },
  {
    value: 'c_email',
    label: '电子邮箱'
  },
  {
    value: 'c_company',
    label: '所属公司'
  },
]

/**
 * 表格
 */
//表格数据
const tableData = ref([])

//获取一行数据
const getData = (row, column, event) => {
  change.value = false
  for (var i in row) {
    searchForm[i] = row[i]
  }
}
//分页总数
const total = ref()
//初始页
const currentPage = ref(1)
//初始分页
const pageSize = ref(10)

//分页
async function getList(page, size) {
  const { data } = await getCustomer(page, size, 0)
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
/**
 * 搜索
 */
//搜索框
const searchtext = ref('')
async function tosearch() {
  if (searchtext.value == '') {
    //初始分页
    pageSize.value = 10
    getList(currentPage.value, pageSize.value)
  }
  else {
    currentPage.value = 1
    const { data } = await search(1, pageSize.value, select.value, searchtext.value, 0)
    tableData.value = data.records
    total.value = data.total
  }
}
//转为客户
function toOwner(val) {
  let userId = ''
  let cusId = val
  let token = JSON.parse(sessionStorage.getItem('user')).userInfo
  getUserInfoByToken(token).then((res) => {
    userId = res.data.id
    if (userId !== '') {
      updateOwner(cusId, userId).then((res) => {
        if (res.code == 200) {
          getList(currentPage.value, pageSize.value)
        }
      })
    }
  })

}
onMounted(() => {
  getList(currentPage.value, pageSize.value)
})


</script>

<style scoped lang="scss">
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
</style>@/api/modules/customer