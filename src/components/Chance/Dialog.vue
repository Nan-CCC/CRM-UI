<template>
  <div>
    <el-dialog v-model="dialogVisible" destroy-on-close :title="cusId ? '修改客户信息' : '新建客户信息'" width="600">
      <div>
        <el-form :model="customInfo" label-position="right" label-width="80px">
          <el-form-item label="客户名称">
            <el-input v-model="customInfo.name" />
          </el-form-item>
          <el-form-item label="年龄段">
            <el-select v-model="customInfo.age">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label" />
            </el-select>
          </el-form-item>
          <el-form-item label="所属公司">
            <el-input v-model="customInfo.company" />
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="customInfo.phone" />
          </el-form-item>
          <el-form-item label="邮箱地址">
            <el-input v-model="customInfo.email" />
          </el-form-item>
          <el-form-item label="来源">
            <el-select v-model="customInfo.from" filterable allow-create default-first-option :reserve-keyword="false">
              <el-option v-for="item in optionsFrom" :label="item.label" :value="item.value" />
            </el-select>
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
import { ref, reactive, defineProps } from 'vue';

const dialogVisible = ref(false)
//表单数据
const customInfo = reactive(
  {
    name: '',
    age: '',
    company: '',
    phone: '',
    email: '',
    from: '',
  }
)
//编辑选中id
const cusId = ref(null)
function handleOpen(visable, id) {
  dialogVisible.value = visable
  cusId.value = id
  console.log(cusId.value);
}
//年龄选择
const options = [
  {
    label: '20岁以下',
    value: '20-',
  },
  {
    label: '20岁-30岁',
    value: '20-30',
  },
  {
    label: '30岁-40岁',
    value: '30-40',
  },
  {
    label: '40岁-50岁',
    value: '40-50',
  },
  {
    label: '50岁-60岁',
    value: '50-60',
  },
  {
    label: '60岁以上',
    value: '60+',
  },
]
//来源选择
const optionsFrom = [
  {
    label: '微博',
    value: '微博'
  },
  {
    label: '抖音',
    value: '抖音'
  },
  {
    label: '百度',
    value: '百度'
  },
  {
    label: '春日畅想',
    value: '春日畅想'
  }
]
//保存
function save() {
  console.log(customInfo);
}
defineExpose({
  handleOpen
});
</script>

<style scoped lang="scss"></style>