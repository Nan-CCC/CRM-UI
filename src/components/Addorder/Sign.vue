<template>
  <div>
    <div class="flex-center">
      <div>
        <el-form class="mb" label-width="auto" :model="form">
          <el-form-item label="员工编号">
            <el-input disabled v-model="form.userId" />
          </el-form-item>
          <el-form-item label="客户编号">
            <el-input disabled v-model="form.cusId" />
          </el-form-item>
          <el-form-item label="合同上传">
            <el-button type="primary">上传</el-button>
          </el-form-item>
          <el-form-item label="签约时间">
            <el-date-picker v-model="form.date" type="date" />
          </el-form-item>

        </el-form>
      </div>

    </div>
    <slot name="sign"></slot>
  </div>
</template>

<script setup>
import { reactive } from 'vue';


const form = reactive({
  userId: 'YG000001',
  cusId: 'KH000004',
  file: '',
  date: ''

})
</script>

<style scoped lang="scss"></style>