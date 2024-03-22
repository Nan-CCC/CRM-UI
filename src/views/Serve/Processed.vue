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
        <el-table-column label="类型">
          <template #default="props">
            <el-tag type="warning" v-if="props.row.type == '售后服务'">{{ props.row.type }}</el-tag>
            <el-tag type="danger" v-if="props.row.type == '客户投诉'">{{ props.row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="object" label="处理对象" />
        <el-table-column prop="time" label="处理时间" />
        <el-table-column label="评价" width="320">
          <template #default="props">
            <el-rate v-model="props.row.rate" disabled text-color="#ff9900" score-template="{value} points" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="320">
          <template #default="props">
            <el-button type="primary" size="small" @click="getInfo(props.row.type)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-drawer v-model="drawer" :title="title">
      <span>Hi there!</span>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const tableData = ref([
  {
    id: 'FW0000000025',
    type: '客户投诉',
    object: 'KH000025',
    // 处理时间（已解决的时间）
    time: '2024-03-22 09:11:02',
    rate: '5'
  },
  {
    id: 'FW0000000025',
    type: '售后服务',
    object: 'DD0020232526',
    // 处理时间（已解决的时间）
    time: '2024-03-22 09:11:02',
    rate: '3'
  },
  {
    id: 'FW0000000025',
    type: '客户投诉',
    object: 'KH002523',
    // 处理时间（已解决的时间）
    time: '2024-03-22 09:11:02',
    rate: '5'
  },
])

/**
 * 弹窗
 *
 */
const drawer = ref(false)
const title = ref()

function getInfo(val) {
  title.value = val + '详情'
  drawer.value = true
  //console.log();
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