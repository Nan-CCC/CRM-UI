<template>
  <div>
    <el-dialog v-model="dialogVisible" destroy-on-close :title="title" width="500">
      <div>
        <el-form :model="customInfo" label-position="right" label-width="100px" style="max-width: 400px;">
          <el-form-item label="客户名称">
            <el-input v-model="customInfo.name" />
          </el-form-item>
          <el-form-item label="最近联系时间">
            <el-date-picker style="width: 300px;" v-model="customInfo.lastTime" type="datetime"
              placeholder="Select date and time" />
          </el-form-item>
          <el-form-item label="联系方式">
            <el-select v-model="customInfo.lastWay" :disabled="isdisable" filterable allow-create default-first-option
              :reserve-keyword="false">
              <el-option v-for="item in options" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱地址" v-if="title == '发送邮件'">
            <el-input v-model="customInfo.phone" />
          </el-form-item>
          <el-form-item label="邮箱主题" v-if="title == '发送邮件'">
            <el-input v-model="customInfo.title" />
          </el-form-item>
          <el-form-item label="联系电话" v-if="title == '发送短信'">
            <el-input v-model="customInfo.phone" />
          </el-form-item>
          <el-form-item label="内容" v-if="title == '发送邮件' || title == '发送短信'">
            <el-input v-model="customInfo.info" :rows="2" type="textarea" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save(title)">
            保存
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps } from 'vue';
import { getInfoById, setLastContact } from '@/api/modules/customer'
import { getTime } from '@/utils/common'
import { sendMail } from '@/api/mail'
const dialogVisible = ref(false)
//表单数据
const customInfo = reactive(
  {
    name: '',
    company: '',
    phone: '',
    email: '',
    title: '',
    info: '',
    lastWay: '',
    lastTime: ''
  }
)
//选中id
const cusId = ref(null)
//是否禁用
const isdisable = ref(false)
//弹窗标题
const title = ref(null)
async function handleOpen(visable, id, type) {
  dialogVisible.value = visable
  cusId.value = id
  const { data } = await getInfoById(id)
  for (let i in data) {
    customInfo[i] = data[i]
  }
  customInfo.lastWay = ''
  customInfo.lastTime = ''

  title.value = type
  isdisable.value = false
  if (type == '发送邮件') {
    customInfo.lastWay = '邮件'
    customInfo.lastTime = new Date()
    isdisable.value = true
  }
  if (type == '发送短信') {
    customInfo.lastWay = '短信'
    customInfo.lastTime = new Date()
    isdisable.value = true
  }
}
//联系方式
const options = ref([
  {
    label: '上门',
    value: '上门'
  },
  {
    label: '邮件',
    value: '邮件'
  },
  {
    label: '电话',
    value: '电话'
  },
  {
    label: '短信',
    value: '短信'
  },

])
//保存
const props = defineProps({
  reMount: Function
})
async function save(type) {
  if (type == '最近联系') {

  }
  if (type == '发送邮件') {
    await sendMail(customInfo.email, customInfo.title, customInfo.info)
  }
  if (type == '发送短信') {

  }
  const res = await setLastContact(customInfo.id, getTime(customInfo.lastTime), customInfo.lastWay)
  dialogVisible.value = false
  //父组件表格重载
  props.reMount()
}
defineExpose({
  handleOpen
});
</script>

<style scoped lang="scss"></style>