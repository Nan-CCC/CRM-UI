<template>
  <div class="mt15 ml15 mr15 bor">
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
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="活动名称" width="300" />
      <el-table-column label="活动内容">
        <template #default>
          <el-button type="primary" size="small">下载</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="start" label="开始时间" />
      <el-table-column prop="end" label="结束时间" />
      <el-table-column prop="status" label="活动状态">
        <template #default="props">
          <el-tag v-if="props.row.status == '草稿' || props.row.status == '未开始'">{{ props.row.status }}</el-tag>
          <el-tag v-if="props.row.status == '待审核'" type="warning">{{ props.row.status }}</el-tag>
          <el-tag v-if="props.row.status == '进行中'" color="#ebf2f8" style="color:#1481bb">{{ props.row.status
            }}</el-tag>
          <el-tag v-if="props.row.status == '已结束'" type="info">{{ props.row.status }}</el-tag>
          <el-tag v-if="props.row.status == '未通过'" type="danger">{{ props.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template #default="props">
          <el-button size="small" type="primary" plain>
            查看详情
          </el-button>
          <el-button size="small" v-if="props.row.status === '进行中' || props.row.status === '已结束'">
            数据分析
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="mt10 flex-center page" :page-size="20" :pager-count="11" layout="prev, pager, next"
      :total="1000" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const tableData = ref([
  {
    id: 'YX000001',
    name: '春日畅想计划春日畅想计划春日畅想计划',
    content: 'C:/',
    start: '2024-03-21',
    end: '2024-05-21',
    status: '草稿',
  },
  {
    id: 'YX000002',
    name: '春日畅想计划春日畅想',
    content: 'C:/',
    start: '2024-03-21',
    end: '2024-05-21',
    status: '待审核',
  },
  {
    id: 'YX000001',
    name: '春日畅想计划',
    content: 'C:/',
    start: '2024-03-21',
    end: '2024-05-21',
    status: '未开始',
  },
  {
    id: 'YX000001',
    name: '春日畅想计划',
    content: 'C:/',
    start: '2024-03-21',
    end: '2024-05-21',
    status: '进行中',
  },
  {
    id: 'YX000001',
    name: '春日畅想计划',
    content: 'C:/',
    start: '2024-03-21',
    end: '2024-05-21',
    status: '进行中',
  },
  {
    id: 'YX000004',
    name: '春日畅想计划',
    content: 'C:/',
    start: '2024-03-21',
    end: '2024-05-21',
    status: '已结束',
  },
  {
    id: 'YX000004',
    name: '春日畅想计划',
    content: 'C:/',
    start: '2024-03-21',
    end: '2024-05-21',
    status: '未通过',
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