<template>
  <div class="bor m15 ">
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
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="客户名称" width="120px" />
      <el-table-column prop="company" label="所属公司" />
      <el-table-column prop="phone" label="联系电话" width="150px" />
      <el-table-column prop="email" label="邮箱地址" />
      <el-table-column prop="time" label="最近联系时间" width="170px" />
      <el-table-column label="联系方式">
        <template #default="props">
          <el-tag v-if="props.row.way">
            {{ props.row.way }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template #default="props">
          <el-button size="small" type="warning" plain @click="open(props.row.id, '编辑信息')">
            编辑
          </el-button>
          <el-button size="small" color="#6ea235" plain @click="open(props.row.id, '发送邮件')">
            邮件
          </el-button>
          <el-button size="small" color="#409eff" plain @click="open(props.row.id, '发送短信')">
            短信
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="mt10 flex-center page" :page-size="20" :pager-count="11" layout="prev, pager, next"
      :total="1000" />

    <Dialog ref="dialogRef"></Dialog>
  </div>
</template>

<script setup>
import Dialog from '@/components/Contact/Dialog.vue';
import { ref } from 'vue';

const tableData = ref([
  {
    id: 'KH000020',
    name: '王小明',
    company: '旺旺',
    phone: '15214521452',
    time: '2024-03-20 08:05:02',
    way: '手机',
    email: '1452145214@qq.com'
  },
  {
    id: 'KH000021',
    name: '王小明',
    company: '旺旺',
    phone: '15214521452',
    time: '2024-03-20 08:05:02',
    way: '邮箱',
    email: '1452145214@qq.com'
  },
  {
    id: 'KH005020',
    name: '王小明',
    company: '旺旺',
    phone: '15214521452',
    time: '2024-03-20 08:05:02',
    way: '微信',
    email: '1452145214@qq.com'
  },
  {
    id: 'KH000420',
    name: '王小明',
    company: '旺旺',
    phone: '15214521452',
    time: '',
    way: '',
    email: '1452145214@qq.com'
  },
  {
    id: 'KH000020',
    name: '王小明',
    company: '旺旺',
    phone: '15214521452',
    time: '2024-03-20 08:05:02',
    way: '邮箱',
    email: '1452145214@qq.com'
  },
  {
    id: 'KH000020',
    name: '王小明',
    company: '旺旺',
    phone: '15214521452',
    time: '2024-03-20 08:05:02',
    way: '上门',
    email: '1452145214@qq.com'
  },
  {
    id: 'KH000020',
    name: '王小明',
    company: '旺旺',
    phone: '15214521452',
    time: '2024-03-20 08:05:02',
    way: '上门',
    email: '1452145214@qq.com'
  },
  {
    id: 'KH000020',
    name: '王小明',
    company: '旺旺',
    phone: '15214521452',
    time: '2024-03-20 08:05:02',
    way: '上门',
    email: '1452145214@qq.com'
  },
  {
    id: 'KH000020',
    name: '王小明',
    company: '旺旺',
    phone: '15214521452',
    time: '2024-03-20 08:05:02',
    way: '上门',
    email: '1452145214@qq.com'
  },
  {
    id: 'KH000020',
    name: '王小明',
    company: '旺旺',
    phone: '15214521452',
    time: '2024-03-20 08:05:02',
    way: '上门',
    email: '1452145214@qq.com'
  },
])
//弹窗
const dialogRef = ref(null)
function open(id, type) {
  dialogRef.value.handleOpen(true, id, type)
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