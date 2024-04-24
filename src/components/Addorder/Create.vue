<template>
  <div>
    <div class="flex-center">
      <el-form class="w mb" label-width="auto" ref="ruleFormRef" :model="form" :rules="rules">
        <el-form-item label="客户编号" prop="cid">
          <el-input v-model="form.cid" clearable />
        </el-form-item>
        <el-form-item label="订单地址" prop="address">
          <elui-china-area-dht style="width: 600px;" v-model="form.address"></elui-china-area-dht>
        </el-form-item>
        <el-form-item label="详细地址" prop="areaInfo">
          <el-input v-model="form.areaInfo" />
        </el-form-item>
        <el-form-item label="产品列表">
          <el-table :data="form.product" border highlight-current-row>
            <el-table-column label="产品">
              <template #default="props">
                <div v-if="props.row.proId">
                  {{ props.row.proId }}
                </div>
                <div v-else>
                  <el-select v-model="newPro" size="small" filterable remote reserve-keyword placeholder="编号-名称"
                    :remote-method="remoteMethod" :loading="loading" @blur="getInfoById(props.row)">
                    <el-option v-for="item in optionPro" :key="item.id" :label="item.id + '-' + item.name"
                      :value="item.id" />
                  </el-select>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="price" label="价格"></el-table-column>
            <el-table-column label="数量">
              <template #default="props">
                <div v-if="props.row.num">
                  {{ props.row.num }}
                </div>
                <div v-else>
                  <el-input v-model="newProNum" size="small" :placeholder="inventory" @blur="getInfoByNum"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="61px">
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
import { reactive, ref, onMounted } from 'vue';
import { EluiChinaAreaDht } from 'elui-china-area-dht'
import { getError, getWarning } from '@/utils/tips';
import { isCustomer } from '@/utils/validator'
import { useUserStore } from '@/store/user'
import { getAllProduct, getProductById } from '@/api/modules/product'
import { useNowOrderStore } from '@/store/nowOrder'
const ruleFormRef = ref()
const rules = reactive({
  cid: [{
    required: true,
    validator: isCustomer,
    trigger: 'blur'
  }],
  address: [{
    required: true,
    message: '订单地址不能为空',
    trigger: 'blur'
  }],
  areaInfo: [{
    required: true,
    message: '地址详情不能为空',
    trigger: 'blur'
  }]

})
const form = reactive({
  cid: '',
  address: [],
  areaInfo: '',
  product: [
    // {
    //   proId: '',
    //   name: '',
    //   num: 0,
    //   price: 0.0
    // },
  ],
})

//打印省市区 编码转文字
// const chinaData = new EluiChinaAreaDht.ChinaArea().chinaAreaflat
// function handleChange(val) {
//   console.log(chinaData[val[0]]);
// }

//产品列表
const optionPro = ref()
async function getProduct() {
  const { data } = await getAllProduct()
  optionPro.value = data
}

//产品列表增加
const newPro = ref()
const newProName = ref()
const newProNum = ref()
const newProPrice = ref()
//库存
const inventory = ref()
//当插入过程未结束时，不能再次添加
const isAdd = ref(false)
const onAddItem = () => {
  isAdd.value = true
  newPro.value = ''
  newProName.value = ''
  newProNum.value = ''
  newProPrice.value = ''
  inventory.value = ''
  form.product.push({
    proId: '',
    num: '',
    price: ''
  })
}
//删除产品行
const deleteRow = (index) => {
  form.product.splice(index, 1)
}
//proid失去焦点根据id找名称和价格
async function getInfoById(row) {
  if (newPro.value === '') {
    getError('产品编号数量不可为空')
  }
  else {
    const { data } = await getProductById(newPro.value)
    newProPrice.value = data.price
    newProName.value = data.name
    inventory.value = data.num
    row.price = newProPrice.value
    row.name = newProName.value
  }
}
//proNum失焦
function getInfoByNum() {
  if (newPro.value !== '' && newProNum.value === '') {
    getError('产品编号数量不可为空')
  }
  else {
    if (inventory.value < newProNum.value) {
      getWarning('超出库存')
    }
  }
}

//添加到表格
function addPro(val) {
  if (newPro.value == '' || newProNum.value == '') {
    getError('产品编号数量不可为空')
  }
  else {
    if (form.product.map(item => item.proId).includes(newPro.value)) {
      getError('同一订单产品不可重复')
    }
    else {
      val.proId = newPro.value
      val.num = newProNum.value
      isAdd.value = false
    }
  }
}

/**
 * 保存 / 下一步
 */
const userStore = useUserStore()
const orderStore = useNowOrderStore()
//获取订单信息
const orderInfo = reactive({
  province: '',
  city: '',
  district: '',
  address: '',
  uid: userStore.userInfo.id,
  cid: '',
})
//产品信息
const proList = ref([])

//控制active
let props = defineProps({
  active: Number
})

let emit = defineEmits(["update:active"])
//保存
function getOrder() {
  if (!isAdd.value) {
    ruleFormRef.value.validate(async (valid) => {
      if (valid) {
        orderInfo.province = form.address[0]
        orderInfo.city = form.address[1]
        orderInfo.district = form.address[2]
        orderInfo.address = form.areaInfo
        orderInfo.cid = form.cid
        if (form.product.length) {
          for (let item in form.product) {
            proList.value.push({
              pid: form.product[item].proId,
              num: form.product[item].num
            })
          }
          orderStore.getOrderInfo(orderInfo, proList.value)
          await orderStore.getAddOrder()
          form.cid = ''
          form.address = []
          form.areaInfo = ''
          form.product = []
          proList.value = []
          orderStore.clearOrder()
        }
        else {
          getError('订单产品不能为空')
        }
      }
    })
  }
  else {
    getError('增加产品未完成')
  }
}
//下一步
function next() {
  if (!isAdd.value) {
    ruleFormRef.value.validate(async (valid) => {
      if (valid) {
        orderInfo.form = form
        orderInfo.province = form.address[0]
        orderInfo.city = form.address[1]
        orderInfo.district = form.address[2]
        orderInfo.address = form.areaInfo
        orderInfo.cid = form.cid
        if (form.product.length) {
          for (let item in form.product) {
            proList.value.push({
              pid: form.product[item].proId,
              num: form.product[item].num
            })
          }
          orderStore.getOrderInfo(orderInfo, proList.value)
          emit("update:active", 2)
        }
        else {
          getError('订单产品不能为空')
        }
      }
    })
  }
  else {
    getError('增加产品未完成')
  }
}

defineExpose({
  getOrder,
  next
});
onMounted(() => {
  getProduct()
  if (orderStore.orderInfo.form) {
    for (let item in orderStore.orderInfo.form) {
      form[item] = orderStore.orderInfo.form[item]
    }
  }
})
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