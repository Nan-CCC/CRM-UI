<template>
  <div class="base bor p10">
    <el-form :model="searchForm" :rules="rules" ref="rulesRef" :inline="true" class="demo-form-inline">
      <el-form-item label="客户编号">
        <el-input v-model="searchForm.id" clearable disabled />
      </el-form-item>
      <el-form-item label="客户姓名">
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
        <el-tag v-for="tag in searchForm.info" :key="tag" closable :disable-transitions="false"
          @close="handleClose(tag)" type="primary" size="large" class="tag">
          {{ tag }}
        </el-tag>
        <el-input v-if="inputVisible" v-model="inputValue" @keyup.enter="handleInputConfirm" @blur="handleInputConfirm"
          style="width: 100px;" />
        <el-button v-else class="button-new-tag" @click="showInput">
          + New Tag
        </el-button>
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
          <el-button type="primary">
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
        <el-input size="small" v-model="search" style="width: 150px;"></el-input>
        <el-button size="small" type="primary">搜索</el-button>
      </div>
    </div>
    <el-table :data="tableData" border @row-click="getData">
      <el-table-column prop="name" label="客户姓名" width="120" />
      <el-table-column prop="age" label="客户年龄" width="120">
      </el-table-column>
      <el-table-column prop="phone" label="手机号码" width="180" />
      <el-table-column prop="email" label="电子邮箱" width="200" />
      <el-table-column prop="company" label="所属公司" width="200" show-overflow-tooltip />
      <el-table-column label="备注">
        <template #default="scope">
          <el-tag type="primary" v-for=" item  in  scope.row.info " class="mr10">{{ item }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="详情" width="100">
        <template #default="props">
          <el-button type="warning" size="small" @click="toDetail(props.row.id)">
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="mt10 flex-center" :page-size="20" :pager-count="11" layout="prev, pager, next"
      :total="1000" />
  </div>
</template>

<script setup>
import { ElInput } from 'element-plus'
import { ElMessage } from 'element-plus'
import { ref, reactive, nextTick } from 'vue'
import { isPhone } from '@/utils/validator.js'
import { useRouter, useRoute } from "vue-router"
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
  info: []
})
//表单名称
const rulesRef = ref()
//校验规则
const rules = reactive({
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
 * 备注标签(最多5个)
 */
//输入框内容
const inputValue = ref('')
//输入框显示
const inputVisible = ref(false)
//删除标签
const handleClose = (tag) => {
  searchForm.info.splice(searchForm.info.indexOf(tag), 1)
}
//显示输入框
const showInput = () => {
  if (searchForm.info.length == 5) {
    ElMessage({
      message: '标签最多添加5个',
      type: 'warning',
    })
  }
  else {
    inputVisible.value = true
  }

}
//增加标签
const handleInputConfirm = () => {
  if (inputValue.value) {
    searchForm.info.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
/**
 * 添加客户
 */
const add = (val) => {
  val.validate((valid) => {
    //valid==true校验通过
    if (valid) {
      ElMessage({
        type: 'success',
        message: '添加成功'
      })
      //清空对象
      for (var i in searchForm) {
        searchForm[i] = null
      }

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
const select = ref('id')
const option = [
  {
    value: 'id',
    label: '客户编号'
  },
  {
    value: 'name',
    label: '客户姓名'
  },
  {
    value: 'age',
    label: '电子邮箱'
  },
  {
    value: 'phone',
    label: '手机号码'
  },
  {
    value: 'email',
    label: '电子邮箱'
  },
  {
    value: 'company',
    label: '所属公司'
  },
]
//搜索框
const search = ref('')

/**
 * 表格
 */
//表格数据
const tableData = [
  {
    id: 'KH000001',
    name: '花大头',
    age: '20-',
    phone: '14521452145',
    email: '145214521@qq.com',
    company: 'xxx有限公司',
    info: ['经理', '性格好', '大客户']
  },
  {
    id: 'KH000002',
    name: '花二头',
    age: '20-30',
    phone: '14521452145',
    email: '145214521@qq.com',
    company: 'xxx有限公司xxx有限公司xxx有限公司xxx有限公司',
    info: ['经理', '性格好', '大客户']
  },
  {
    id: 'KH000003',
    name: '花大头',
    age: '60+',
    phone: '14521452145',
    email: '145214521@qq.com',
    company: 'xxx有限公司',
    info: ['经理', '性格好', '大客户']
  },
  {
    id: 'KH000004',
    name: '花二头',
    age: '20-',
    phone: '14521452145',
    email: '145214521@qq.com',
    company: 'xxx有限公司',
    info: ['经理', '性格好', '大客户']
  }, {
    id: 'KH000005',
    name: '花大头',
    age: '20-',
    phone: '14521452145',
    email: '145214521@qq.com',
    company: 'xxx有限公司',
    info: ['经理', '性格好', '大客户']
  },
  {
    id: 'KH000006',
    name: '花二头',
    age: '20-',
    phone: '14521452145',
    email: '145214521@qq.com',
    company: 'xxx有限公司',
    info: ['经理', '性格好', '大客户']
  }, {
    id: 'KH000007',
    name: '花大头',
    age: '20-',
    phone: '14521452145',
    email: '145214521@qq.com',
    company: 'xxx有限公司',
    info: ['经理', '性格好', '大客户']
  },
  {
    id: 'KH000008',
    name: '花二头',
    age: '20-',
    phone: '14521452145',
    email: '145214521@qq.com',
    company: 'xxx有限公司',
    info: ['经理', '性格好', '大客户']
  }, {
    id: 'KH000009',
    name: '花大头',
    age: '20-',
    phone: '14521452145',
    email: '145214521@qq.com',
    company: 'xxx有限公司',
    info: ['经理', '性格好', '大客户']
  },
  {
    id: 'KH000001',
    name: '花二头',
    age: '20-',
    phone: '14521452145',
    email: '145214521@qq.com',
    company: 'xxx有限公司',
    info: ['经理', '性格好', '大客户']
  },

]
// //根据数组值找下表（表格中年龄显示）
// const switchAge = (val) => {
//   var x = age.map(item => item.value).indexOf('20-')
//   console.log(val);
//   return val
// }
//获取一行数据
const getData = (row, column, event) => {
  change.value = false
  for (var i in row) {
    searchForm[i] = row[i]
  }
}

//跳转查看详情
const router = useRouter()
const toDetail = (val) => {
  router.push({
    name: 'Details',
    params: {
      id: val
    }
  })
}
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
</style>