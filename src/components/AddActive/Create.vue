<template>
  <div class="flex-center mt15">
    <el-form :model="formData" label-position="right" label-width="70" class="form">
      <el-form-item label="活动名称">
        <el-input v-model="formData.name" maxlength="20" show-word-limit clearable />
      </el-form-item>
      <el-form-item label="活动详情">
        <el-button type="primary" style="width: 80px;">
          <el-icon>
            <UploadFilled />
          </el-icon>
          &nbsp;上传
        </el-button>
        <span class="ml10 tips">仅限pdf/word</span>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-date-picker v-model="formData.time" type="daterange" unlink-panels range-separator="To"
          start-placeholder="Start date" end-placeholder="End date" />
      </el-form-item>
      <el-form-item label="策划人">
        <el-select v-model="formData.users" multiple placeholder="Select" filterable default-first-option clearable
          multiple-limit="4" :reserve-keyword="false">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="活动预算">
        <el-input-number v-model="formData.budget" :step="1000" />
      </el-form-item>
      <el-form-item label="投放平台">
        <el-checkbox-group v-model="formData.platform">
          <el-checkbox v-for="item in optionsPlat" :label="item.label" :value="item.value">
            {{ item.label }}
          </el-checkbox>

          <el-select v-if="!flag" v-model="addPlat" filterable allow-create placeholder="Select" style="width: 60px"
            @keyup.enter="add()" @blur="add()" size="small" class="ml15 mb15">
            <el-option v-for="item in optionsPlat2" :label="item.label" :value="item.value" />
          </el-select>

          <el-button v-else size="small" class="ml15 mb15" @click="flag = false" color="#5e902f" plain>
            <el-icon>
              <Plus />
            </el-icon>
          </el-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-tiem>
        <div style="text-align: center;" class="mb15">
          <el-button>
            保存
          </el-button>
          <el-button type="primary" @click="next">
            下一步
          </el-button>
        </div>
      </el-form-tiem>
    </el-form>

  </div>
</template>

<script setup>
import { reactive, ref, defineEmits, computed } from 'vue';

const formData = reactive({
  name: '',
  content: '',
  time: '',
  users: '',
  platform: [],
  budget: '10000'
})
//员工多选
const options = [
  {
    label: '王小明',
    value: 'YG000020'
  },
  {
    label: '王小明2',
    value: 'YG0000201'
  },
  {
    label: '王小明3',
    value: 'YG0000202'
  },
  {
    label: '王小明4',
    value: 'YG0000203'
  },
  {
    label: '王小明5',
    value: 'YG0000204'
  },
  {
    label: '王小明6',
    value: 'YG0000205'
  },
  {
    label: '王小明7',
    value: 'YG0000206'
  },

]
/**
 * 平台复选
 */
//建议常用前5(3年)
const optionsPlat = ref([
  {
    label: 'b站',
    value: 'PT000001'
  },
  {
    label: '抖音',
    value: 'PT000003'
  },
  {
    label: '小红书',
    value: 'PT000004'
  },
])
//添加按钮
const flag = ref(true)

//平台下拉框
const optionsPlat2 = ref([
  {
    label: 'b站2',
    value: 'PT000008'
  },
  {
    label: '抖音3',
    value: 'PT000005'
  },
  {
    label: '小红书4',
    value: 'PT000006'
  },
])
//新增平台绑定
const addPlat = ref()
function add() {
  //判断多选绑定值是否在平台多选框数组中
  let x = optionsPlat2.value.some(i => i.value === addPlat.value)
  if (x) {
    let lable = optionsPlat2.value.filter(i => i.value === addPlat.value)
    optionsPlat.value.push({
      label: lable[0].label,
      value: lable[0].value
    },)
  }
  else {
    //创建新平台
    if (addPlat.value) {
      optionsPlat.value.push({
        label: addPlat.value,
      },)
    }
  }
  flag.value = true
  addPlat.value = ''
  // console.log(optionsPlat);
}
//控制父元素active状态
const emit = defineEmits(['changeActive'])
function next() {
  console.log(formData);
  emit('changeActive', 1)
}
</script>

<style scoped lang="scss">
.form {
  max-width: 700px;
  width: 500px;

  .tips {
    font-size: 12px;
    opacity: 0.6;
  }
}
</style>