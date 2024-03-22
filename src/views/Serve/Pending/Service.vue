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
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="类型" width="180">
          <template #default="props">
            <el-tag type="warning">{{ props.row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="create" label="创建时间" width="200" />
        <el-table-column prop="orderId" label="订单编号" width="180" />
        <el-table-column prop="content" label="内容" show-overflow-tooltip />
        <el-table-column label="操作" width="240">
          <template #default="props">
            <el-button type="primary" size="small" @click="call(props.row)">回复</el-button>
            <el-button type="warning" size="small">已解决</el-button>
            <el-button type="info" size="small">转处理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-drawer v-model="drawer" :title="title">
      <div style="border: 1px solid red;">Hi there!</div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const tableData = ref([
  {
    id: 'FW0000000025',
    type: '售后服务',
    create: '2024-03-22 08:11:02',
    orderId: 'DD0000002525',
    content: '在吗，我这批货的色差怎么这么大在吗，我这批货的色差怎么这么大在吗，我这批货的色差怎么这么大',
  },
  {
    id: 'FW00000000256',
    type: '售后服务',
    create: '2024-03-22 08:11:02',
    orderId: 'DD0000002525',
    content: '在吗，我这批货的色差怎么这么大',
  },
  {
    id: 'FW00000000257',
    type: '售后服务',
    create: '2024-03-22 08:11:02',
    orderId: 'DD0000002525',
    content: '在吗，我这批货的色差怎么这么大',
  },
  {
    id: 'FW00000000258',
    type: '售后服务',
    create: '2024-03-22 08:11:02',
    orderId: 'DD0000002525',
    content: '在吗，我这批货的色差怎么这么大',
  },
  {
    id: 'FW0000000025',
    type: '售后服务',
    create: '2024-03-22 08:11:02',
    orderId: 'DD0000002525',
    content: '在吗，我这批货的色差怎么这么大',
  },
  {
    id: 'FW0000000025',
    type: '售后服务',
    create: '2024-03-22 08:11:02',
    orderId: 'DD0000002525',
    content: '在吗，我这批货的色差怎么这么大',
  },
  {
    id: 'FW0000000025',
    type: '售后服务',
    create: '2024-03-22 08:11:02',
    orderId: 'DD0000002525',
    content: '在吗，我这批货的色差怎么这么大',
  },
  {
    id: 'FW0000000025',
    type: '售后服务',
    create: '2024-03-22 08:11:02',
    orderId: 'DD0000002525',
    content: '在吗，我这批货的色差怎么这么大',
  },
  {
    id: 'FW0000000025',
    type: '售后服务',
    create: '2024-03-22 08:11:02',
    orderId: 'DD0000002525',
    content: '在吗，我这批货的色差怎么这么大',
  },
  {
    id: 'FW0000000025',
    type: '售后服务',
    create: '2024-03-22 08:11:02',
    orderId: 'DD0000002525',
    content: '在吗，我这批货的色差怎么这么大',
  },
])
//回复弹窗
const drawer = ref(false)
const title = ref()
function call(val) {
  drawer.value = true
  title.value = val.id
}
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