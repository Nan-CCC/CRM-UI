<template>
  <div>
    <div>
      <el-button size="small">导出Excel</el-button>
      <div class="fr">
        <el-select v-model="select" size="small" style="width: 90px">
          <el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-input v-model="search" style="width: 150px" size="small" clearable />
        <el-button size="small" type="primary">搜索</el-button>
      </div>
    </div>
    <el-table :data="tableData" class="mt10">
      <el-table-column type="expand">
        <template #default="props">
          <div class="expand">
            <div class="title mb20">服务编号：{{ props.row.id }}</div>
            <el-timeline style="max-width: 600px">
              <el-timeline-item v-for="(item, index) in  props.row.body " :key="index" :timestamp="item.time"
                placement="top" :color="item.color">
                {{ item.content }}
              </el-timeline-item>
            </el-timeline>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="order" label="订单编号" />
      <el-table-column prop="user" label="客服人员" />
      <el-table-column prop="date" label="发起时间" />
      <el-table-column label="操作">
        <template #default="prpos">
          <el-button type="primary" size="small" @click="toOrder(prpos.row.order)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex-center mt10 mb10">
      <el-pagination :page-size="20" :pager-count="11" layout="prev, pager, next" :total="10" />
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import { useOrderStore } from '@/store/CustomerDetailsTabs'
const select = ref('id');
const option = [
  {
    label: '售后编号',
    value: 'id'
  },
  {
    label: '经办员工',
    value: 'user'
  },
  {
    label: '售后时间',
    value: 'date'
  }
]
const search = ref()
/**
 * 售后
 */
//模拟数据
//时间戳颜色
//客服 （绿）
//客户 （灰）
const tableData = [
  {
    id: 'FW0000000001',
    date: '2024-03-02 15:48:52',
    order: 'DD0000000111',
    user: 'YG000002',
    body: [
      {
        role: '客户',
        content: '这批纱怎么有色差',
        time: '2024-03-02 15:48:52',
        color: '#e0e0e0',
      },
      {
        role: 'YG000002',
        content: '亲，这是正常现象，因为您的订单数量较大，所以调了三批货，每批染的颜色可能会有所不同哦',
        time: '2024-03-02 15:50:52',
        color: '#c8e1b1',
      },
      {
        role: '客户',
        content: '我要退货！！',
        time: '2024-03-02 15:55:52',
        color: '#e0e0e0',
      },
      {
        role: 'YG000002',
        content: '好的，将为您转接售后中心',
        time: '2024-03-02 15:50:52',
        color: '#c8e1b1',
      },
    ],

  }
]
//查看详情（订单id）
//子传父
const emit = defineEmits(['getOrder'])
//当前订单
//将详情对应订单传到历史订单
const useOrder = useOrderStore()
const toOrder = (val) => {
  useOrder.transferOrder(val)
  emit('getOrder')

}


</script>

<style scoped lang="scss">
@import '@/assets/scss/customDetails.scss';
</style>