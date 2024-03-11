<template>
  <div class="base bor p10">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="客户编号">
        <el-input v-model="searchForm.id" clearable />
      </el-form-item>
      <el-form-item label="客户姓名">
        <el-input v-model="searchForm.name" clearable />
      </el-form-item>
      <el-form-item label="客户年龄">
        <el-select v-model="searchForm.age" clearable placeholder="请选择年龄范围" style="width: 299px">
          <el-option v-for="item in age" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="客户电话">
        <el-input v-model="searchForm.phone" clearable />
      </el-form-item>
      <el-form-item label="客户邮箱">
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
        <el-button type="primary" v-if="true">
          <el-icon size="18">
            <CirclePlus />
          </el-icon>
          <span>添加客户</span>
        </el-button>
        <el-button type="primary" v-else>
          <el-icon size="18">
            <Loading />
          </el-icon>
          <span>修改信息</span>
        </el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script setup>
import { ElInput } from 'element-plus'
import { ElMessage } from 'element-plus'
import { ref, reactive, nextTick } from 'vue'
const searchForm = reactive({
  id: '',
  name: '',
  age: '',
  company: '',
  phone: '',
  email: '',
  info: []
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
</script>

<style scoped lang="scss">
/*输入框固定长度*/
.demo-form-inline .el-input {
  --el-input-width: 299px;
}

.base {
  margin: 15px auto;
  width: 96%;

  .tag {
    margin-right: 25px;
  }
}
</style>