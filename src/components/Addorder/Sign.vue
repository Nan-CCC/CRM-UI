<template>
  <div>
    <div class="flex-center">
      <div>
        <el-form label-width="auto" :model="form" style="width: 320px;">
          <el-form-item label="员工编号">
            <el-input disabled v-model="form.userId" />
          </el-form-item>
          <el-form-item label="客户编号">
            <el-input disabled v-model="form.cusId" />
          </el-form-item>
          <el-form-item label="合同上传">
            <el-upload ref="upload" action="" :http-request="toRequest" :limit="1" :on-exceed="handleExceed"
              :on-change="handleChange" :auto-upload="false">
              <template #>
                <el-button type="primary">上传</el-button>
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item label="签约时间">
            <el-date-picker style="width:300px;" v-model="form.date" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
              type="date" />
          </el-form-item>
          <el-form-item label="发货时间">
            <el-radio-group v-model="form.delivery" @change="getDelivery">
              <el-radio :value="3">默认时间</el-radio>
              <el-radio :value="1001">
                <template #>
                  <div v-if="!true">其他</div>
                  <div v-else>
                    <el-input-number v-model="delivery" :min="1" :max="100" size="small" @blur="getNum" />
                  </div>
                </template>
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>

    </div>
    <slot name="sign"></slot>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useUserStore } from '@/store/user';
import { useNowOrderStore } from '@/store/nowOrder';
import { addContract } from '@/api/modules/contract'
import { getError } from '@/utils/tips';
import { addDate } from '@/utils/common'
//上传 
const upload = ref({})
//上传文件超过1个，清除已上传的重新上传
const handleExceed = (files) => {
  upload.value.clearFiles()
  upload.value.handleStart(files[0])
}
//文件
const file = ref()
//获取文件
const handleChange = (rawFile) => {
  file.value = rawFile.raw
}

const userStore = useUserStore()
const orderStore = useNowOrderStore()
//表单
const form = reactive({
  userId: userStore.userInfo.id,
  cusId: orderStore.orderInfo.cid,
  date: '',
  delivery: 3
})
//发货日期 其他选中转换日期选择器

const delivery = ref(3)
function getNum(val) {
  console.log(delivery.value);
  console.log(val);
}

function getDelivery() {
  //console.log(form.delivery);
  //console.log(delivery.value);
}
//控制active
let props = defineProps({
  active: Number
})
let emit = defineEmits(["update:active"])
//获取合同
async function getContract() {
  if (form.delivery == 1001) {
    form.delivery = delivery.value
  }
  if (!form.date) {
    getError('日期不能为空')
  }
  else if (!file.value) {
    getError('请上传合同')
  }
  else {
    await orderStore.getAddOrder()
    if (orderStore.oid) {
      let newDate = addDate(form.date, form.delivery)
      orderStore.changeStatus(newDate)
      let formData = new window.FormData()
      formData.append('file', file.value)
      const { code } = await addContract(formData, orderStore.oid, form.date, newDate)
      if (code == 200) {
        upload.value.clearFiles()
        form.date = ''
        emit("update:active", 3)
      }
    }
  }

}
defineExpose({
  getContract
});
</script>

<style scoped lang="scss"></style>