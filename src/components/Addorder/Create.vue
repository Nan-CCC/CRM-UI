<template>
  <div>
    <div class="flex-center">
      <el-form class="w mb" label-width="auto" ref="ruleFormRef" :rules="rules" :model="form">
        <el-form-item label="订单编号">
          <el-input disabled v-model="form.id" />
        </el-form-item>
        <el-form-item label="客户编号">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="订单地址">
          <elui-china-area-dht style="width: 600px;" @change="handleChange"
            v-model="form.address"></elui-china-area-dht>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="form.areaInfo" />
        </el-form-item>
        <el-form-item label="产品列表">
          <el-table :data="form.product" border highlight-current-row>
            <el-table-column label="产品编号">
              <template #default="props">
                <div v-if="props.row.proId">
                  {{ props.row.proId }}
                </div>
                <div v-else>
                  <el-input v-model="newProId" size="small" @blur="getInfoById(props.row)">
                  </el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="proName" label="产品名称"></el-table-column>
            <el-table-column prop="price" label="产品价格"></el-table-column>
            <el-table-column label="产品数量">
              <template #default="props">
                <div v-if="props.row.num">
                  {{ props.row.num }}
                </div>
                <div v-else>
                  <el-input v-model="newProNum" size="small"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column label=" 操作" width="61px">
              <template #default="props">
                <el-button v-if="props.row.proId" type="danger" plain size="small"
                  @click.prevent="deleteRow(props.$index)">
                  <el-icon>
                    <Minus />
                  </el-icon>
                </el-button>
                <el-button v-else type="success" plain size="small" @click="addPro(props.row)">
                  <el-icon>
                    <Check />
                  </el-icon>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button class="mt-4" style="width: 100%" type="primary" @click="onAddItem" :disabled="isAdd">增加</el-button>
        </el-form-item>
      </el-form>
    </div>

    <slot name="create"></slot>

  </div>
</template>

<script setup>

import { reactive, ref } from 'vue';
import { EluiChinaAreaDht } from 'elui-china-area-dht'
import { getError } from '@/utils/tips';

const ruleFormRef = ref()
const rules = reactive({

})
const form = reactive({
  id: '',
  name: '',
  address: [],
  areaInfo: '',
  product: [
    {
      proId: 'CP0220',
      proName: '绞丝纱',
      num: 3,
      price: 23.2
    },
  ],
})

//打印省市区 编码转文字
const chinaData = new EluiChinaAreaDht.ChinaArea().chinaAreaflat
function handleChange(val) {
  console.log(chinaData[val[0]]);
}
//产品列表增加
const newProId = ref()
const newProNum = ref()
const newProName = ref()
const newProPrice = ref()
//当插入过程未结束时，不能再次添加
const isAdd = ref(false)
const onAddItem = () => {
  isAdd.value = true
  newProId.value = ''
  newProNum.value = ''
  newProName.value = ''
  newProPrice.value = ''
  form.product.push({
    proId: '',
    proName: '',
    num: '',
    price: ''
  })
}
//删除产品行
const deleteRow = (index) => {
  //console.log(index)
  form.product.splice(index, 1)
}
//proid失去焦点根据id找名称和价格
function getInfoById(row) {
  if (newProId.value === '') {
    getError('产品编号数量不可为空')

  }
  else {
    newProName.value = '胶丝纱'
    newProPrice.value = 28.5
    row.proName = newProName.value
    row.price = newProPrice.value
    console.log(row);
  }
}
//添加到表格
function addPro(val) {
  if (newProId.value == '' || newProNum.value == '') {
    getError('产品编号数量不可为空')

  }
  else {
    val.proId = newProId.value
    val.num = newProNum.value
    isAdd.value = false
    console.log(val);
  }

}
</script>

<style scoped lang="scss">
.w {
  width: 600px;
}

.el-button.is-disabled,
.el-button.is-disabled:hover {
  background-color: $footer-color
}
</style>