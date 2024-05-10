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
            <el-tag type="warning">售后服务</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column label="内容" show-overflow-tooltip>
          <template #default="props">
            {{ getContentOne(props.row.id) }}
          </template>
        </el-table-column> -->
        <el-table-column prop="oid" label="订单编号" />
        <el-table-column prop="cid" label="客户编号" />
        <el-table-column prop="screate" label="创建时间" />
        <el-table-column label="操作">
          <template #default="props">
            <el-button type="primary" size="small" @click="call(props.row)">回复</el-button>
            <el-button type="warning" size="small" @click="change(props.row.id, '1')">已解决</el-button>
            <el-button type="info" size="small" @click="change(props.row.id, '2')">转处理</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="mt15 flex-center foot" :pager-count="11" layout="prev, pager, next,total,sizes"
        v-model:current-page="currentPage" v-model:page-size="pageSize" :total="total"
        :page-sizes="[10, 20, 30, 40, 50]" @size-change="getListSize" @current-change="getListCurrent" />
    </div>
    <el-drawer v-model="drawer" :title="title">
      <el-scrollbar height="560px" class="scroll" ref="scrollRef">
        <div ref="box">
          <div v-for="item in contentList">
            <div :style="item.cid == null || item.cid == '' ? 'text-align : right; margin-bottom: 20px;' : ''">
              <div>
                <span style="font-size: 12px;color: #aaa;margin-bottom: 5px;">{{ item.changeTime }}</span>
              </div>
              <div style="border-bottom: #e3f0d8 1px solid;margin-bottom: 5px;padding-bottom: 5px;">
                <span class="user" v-if="item.cid == null || item.cid == ''">{{ item.uid
                  }}</span>
                <span class="user" v-else>{{ item.cid }}</span>
              </div>
              <div style="color: #555;">{{ item.content }}</div>
            </div>
          </div>
        </div>
      </el-scrollbar>

      <div>
        <el-input v-model="input" style="width: 340px" placeholder="Please input" />
        <el-button @click="addContent" type="primary">发送</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { selectAll, updateById, getContent, addSContent } from '@/api/modules/service'
import { ElScrollbar } from 'element-plus'
import { useUserStore } from '@/store/user';
const select = ref('oid')
const option = [
  {
    label: '订单编号',
    value: 'oid'
  }
]
const userStore = useUserStore()
const tableData = ref([])
/**
 * 分页
 */
//分页总数
const total = ref()
//初始页
const currentPage = ref(1)
//初始分页
const pageSize = ref(10)
//分页
async function getList(page, size) {
  const { data } = await selectAll(page, size, userStore.userInfo.id, '0')
  let order = data.records
  total.value = data.total
  tableData.value = order
}

async function getListSize(val) {
  pageSize.value = val
  getList(currentPage.value, val)
}

async function getListCurrent(val) {
  currentPage.value = val
  getList(val, pageSize.value)
}
//初始列表
async function getOrder() {
  const { data } = await selectAll(1, 10, userStore.userInfo.id, '0')
  total.value = data.total
  tableData.value = data.records
}

//改变状态
async function change(val, status) {
  await updateById(val, status)
  await getList(currentPage.value, pageSize.value)

}

//回复弹窗
const drawer = ref(false)
const title = ref()
const contentList = ref()
const input = ref()
const scrollRef = ref()
const box = ref()
async function call(val) {
  await updateById(val.id, userStore.userInfo.id)
  drawer.value = true
  title.value = val.id
  contentList.value = []
  await getContentList()
  scrollRef.value.setScrollTop(box.value.clientHeight)
  console.log();
}
async function getContentList() {
  const { data } = await getContent(title.value)
  contentList.value = data
}
async function addContent() {
  await addSContent(title.value, userStore.userInfo.id, input.value)
  await getContentList()
  input.value = ''
  scrollRef.value.setScrollTop(box.value.clientHeight)
}
onMounted(() => {
  getOrder()
})
</script>

<style scoped lang="scss">
.tool {
  border-top: 1px $plan-color solid;
  padding: 10px 0px;
}

.page {
  padding-bottom: 10px;
}

.foot {
  padding-bottom: 15px;
}

.scroll {
  margin-bottom: -20px;
  margin-top: -20px;
}

.user {
  font-size: 14px;
  color: #6ea235;
}
</style>