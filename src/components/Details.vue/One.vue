<template>
  <div>
    <div>
      <el-button size="small">导出Excel</el-button>
      <div class="fr">
        <el-select v-model="select" size="small" style="width: 90px">
          <el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-input v-model="input" style="width: 150px" size="small" />
        <el-button size="small" type="primary">搜索</el-button>
      </div>
    </div>

    <el-table :data="tableData" class="mt10">
      <el-table-column type="expand">
        <template #default="props">
          <div class="expand">
            <div class="title">经办员工-{{ props.row.userId }}-{{ props.row.user }}</div>
            <el-table :data="props.row.product">
              <el-table-column label="产品编号" prop="proId" />
              <el-table-column label="产品名称" prop="proName" />
              <el-table-column label="数量" prop="num" />
              <el-table-column label="单价" prop="price" />
            </el-table>
            <p class="fr fs20 total">共计：{{ 205.2 }}￥</p>
            <div class="mt15">
              <span>合同：</span>
              <el-button type="primary">点击下载</el-button>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="订单编号" width="180" />
      <el-table-column prop="address" label="订单地址" width="180" />
      <el-table-column prop="detail" label="地址详情" width="180" />
      <el-table-column prop="status" label="订单状态" width="180" />
      <el-table-column prop="user" label="经办员工" width="180" />
      <el-table-column prop="date" label="创建时间" />
    </el-table>
    <el-pagination style="margin-top:10px ;margin-left: 350px;" :page-size="20" :pager-count="11"
      layout="prev, pager, next" :total="1000" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

/**
 * 搜索框
 */
//条件
const select = ref('id');
const option = [
  {
    label: '订单编号',
    value: 'id'
  },
  {
    label: '经办员工',
    value: 'user'
  },
  {
    label: '订单时间',
    value: 'date'
  }
]

/**
 * 表格
 */
const tableData = [
  {
    id: 'DD00000001',
    conId: 'HT00000001',
    address: '江苏省/徐州市/鼓楼区',
    detail: '鼓楼路1号',
    status: '已签约',
    userId: 'YG000001',
    date: '2023-11-06 15:25:52',
    user: '叶翘',
    product: [
      {
        proId: 'CP000001',
        proName: '素驺纱',
        num: '3',
        price: '21.8'
      },
      {
        proId: 'CP000002',
        proName: '素驺纱',
        num: '3',
        price: '21.8'
      }

    ]
  }
]
</script>

<style scoped lang="scss">
.expand {
  padding: 10px 20px;

  .title {
    color: #b7cca3;
    font-size: 14px;
  }

  .total {
    color: #5e902f;
  }
}
</style>