<template>
  <div class="bor ml15 mr15">
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
    <el-table :data="tableData" border style="width: 100%" table-layout="fixed">
      <el-table-column prop="cusId" label="客户编号" />
      <el-table-column prop="orderId" label="订单编号" />
      <el-table-column prop="submitDate" label="提交时间" />
      <el-table-column prop="contact" label="合同">
        <template #default>
          <el-button type="primary" size="small">下载</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="conDate" label="签署时间" />
      <el-table-column prop="status" label="状态">
        <template #default="props">
          <div v-if="props.row.status == '待签约'">
            <el-button type="primary" size="small">{{ props.row.status }}</el-button>
            <el-button type="danger" size="small">删除</el-button>
          </div>
          <div v-if="props.row.status == '待发货'">
            <el-button type="warning" size="small">{{ props.row.status }}</el-button>
          </div>
          <div v-if="props.row.status == '已发货'">
            <el-button disabled size="small">{{ props.row.status }}</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="mt10 flex-center page" :page-size="20" :pager-count="11" layout="prev, pager, next"
      :total="1000" />
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const tableData = reactive([
  {
    cusId: 'HK000202',
    orderId: 'DD0000000001',
    submitDate: '2023-04-25 12:05:25',
    contact: '',
    conDate: '2023-04-27',
    status: '待发货'
  },

  {
    cusId: 'HK000202',
    orderI: 'DD0000000001',
    submitDate: '2023-04-25 12:05:25',
    contact: '',
    conDate: '2023-04-27',
    status: '待签约'
  },
  {
    cusId: 'HK000202',
    orderId: 'DD0000000001',
    submitDate: '2023-04-25 12:05:25',
    contact: '',
    conDate: '2023-04-27',
    status: '待发货'
  },

  {
    cusId: 'HK000202',
    orderI: 'DD0000000001',
    submitDate: '2023-04-25 12:05:25',
    contact: '',
    conDate: '2023-04-27',
    status: '待签约'
  },
  {
    cusId: 'HK000202',
    orderId: 'DD0000000001',
    submitDate: '2023-04-25 12:05:25',
    contact: '',
    conDate: '2023-04-27',
    status: '待发货'
  },
  {
    cusId: 'HK000202',
    orderI: 'DD0000000001',
    submitDate: '2023-04-25 12:05:25',
    contact: '',
    conDate: '2023-04-27',
    status: '待签约'
  },
  {
    cusId: 'HK000202',
    orderI: 'DD0000000001',
    submitDate: '2023-04-25 12:05:25',
    contact: '',
    conDate: '2023-04-27',
    status: '待签约'
  },
  {
    cusId: 'HK000202',
    orderI: 'DD0000000001',
    submitDate: '2023-04-25 12:05:25',
    contact: '',
    conDate: '2023-04-27',
    status: '待签约'
  },
  {
    cusId: 'HK000202',
    orderI: 'DD0000000001',
    submitDate: '2023-04-25 12:05:25',
    contact: '',
    conDate: '2023-04-27',
    status: '待签约'
  },
  {
    cusId: 'HK000202',
    orderI: 'DD0000000001',
    submitDate: '2023-04-25 12:05:25',
    contact: '',
    conDate: '2023-04-27',
    status: '待签约'
  },
])
</script>

<style scoped lang="scss">
.tool {
  border-top: 1px $plan-color solid;
  padding: 10px 0px;
}

.page {
  padding-bottom: 10px;
}
</style>