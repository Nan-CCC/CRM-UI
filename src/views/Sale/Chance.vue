<template>
  <div>
    <el-row class="m15">
      <el-col :span="18">
        <div class="bor mr10" style="height: 565px;">
          <div class="tool">
            <el-button size="small" type="primary" @click="open">新建客户</el-button>
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
            <el-table-column prop="name" label="客户名称" width="90" fixed />
            <el-table-column label="年龄段" width="80">
              <template #default="props">
                <el-tag> {{ props.row.age }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="company" label="所属公司" width="200" />
            <el-table-column prop="phone" label="联系电话" width="120" />
            <el-table-column prop="email" label="邮箱地址" width="180" />
            <el-table-column label="活动来源" width="200">
              <template #default="props">
                <div v-if="props.row.mid == '' || props.row.mid == null"></div>
                <el-tag v-else type="warning">{{ props.row.mid }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="平台来源" width="200">
              <template #default="props">
                <div v-if="props.row.pid == '' || props.row.pid == null"></div>
                <el-tag v-else type="warning">{{ props.row.pid }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="205">
              <template #default="props">
                <el-button size="small" type="warning" @click="update(props.row)">
                  编辑
                </el-button>
                <el-button size="small" type="danger" @click="deleteById(props.row.id, props.$index)">
                  删除
                </el-button>
                <el-button size="small" type="primary">
                  转客户
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination class="mt15 flex-center" :pager-count="11" layout="prev, pager, next,total,sizes"
            v-model:current-page="currentPage" v-model:page-size="pageSize" :total="total"
            :page-sizes="[10, 20, 30, 40, 50]" @size-change="getListSize" @current-change="getListCurrent" />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="bor mb10 top">
          <div class="toptitle">
            本月热销产品</div>

          <div v-for="(item, index) in top" class="con">
            <el-row>
              <el-col :span="5">
                <div class="child1">
                  {{ index + 1 }}
                </div>
              </el-col>
              <el-col :span="13">
                <span class="child2">{{ item.name }}</span>
              </el-col>
              <el-col :span="6">
                <span class="child3">{{ item.num }}</span>
                <span class="child4">元</span>
              </el-col>
            </el-row>



          </div>
        </div>
      </el-col>
    </el-row>
    <Dialog ref="dialogRef"></Dialog>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import Dialog from '@/components/Chance/Dialog.vue';
import { getCustomer } from '@/api/modules/customer';
import { getPlatform } from '@/api/modules/platform';
const top = [
  {
    "id": "CP000001",
    "name": "竹纤维纱",
    "price": 22,
    "num": 20512
  },
  {
    "id": "CP000004",
    "name": "天丝纱",
    "price": 30,
    "num": 18230
  },
  {
    "id": "CP000003",
    "name": "粘胶纱",
    "price": 26,
    "num": 16825
  },
  {
    "id": "CP000007",
    "name": "丝光棉染色纱",
    "price": 26,
    "num": 13320
  },
  {
    "id": "CP000013",
    "name": "强捻纱",
    "price": 30,
    "num": 985
  },
  {
    "id": "CP000014",
    "name": "粗支纱",
    "price": 22,
    "num": 896
  },
  {
    "id": "CP000021",
    "name": "阻燃纱",
    "price": 32,
    "num": 623
  },
  {
    "id": "CP000010",
    "name": "缝纫线",
    "price": 19.5,
    "num": 563
  },
  {
    "id": "CP000015",
    "name": "混纺纱",
    "price": 25,
    "num": 250
  },
  {
    "id": "CP000009",
    "name": "水溶纱",
    "price": 28,
    "num": 234
  },
  {
    "id": "CP000012",
    "name": "反捻纱",
    "price": 28,
    "num": 228
  },
  {
    "id": "CP000017",
    "name": "包芯纱",
    "price": 26,
    "num": 186
  },
  {
    "id": "CP000025",
    "name": "赛络纺纱",
    "price": 33.5,
    "num": 165.5
  },
  {
    "id": "CP000026",
    "name": "涡流纺纱",
    "price": 34,
    "num": 155
  },
  {
    "id": "CP000016",
    "name": "竹节纱",
    "price": 23.5,
    "num": 121
  },

]
const tableData = ref([])
//分页总数
const total = ref()
//初始页
const currentPage = ref(1)
//初始分页
const pageSize = ref(10)
//分页
async function getList(page, size) {
  const { data } = await getCustomer(page, size, "0")
  let userList = data.records
  total.value = data.total
  tableData.value = userList
}
async function getListSize(val) {
  pageSize.value = val
  getList(currentPage.value, val)
}

async function getListCurrent(val) {
  currentPage.value = val
  getList(val, pageSize.value)
}


//弹窗组件
const dialogRef = ref(null)
//新建客户
function open() {
  dialogRef.value.handleOpen(true)
}
//编辑客户
function update(val) {
  dialogRef.value.handleOpen(true, val.id)
}
//删除客户
function deleteById(val, index) {
  tableData.splice(index, 1);
}
onMounted(() => {
  getList(currentPage.value, pageSize.value)
})
</script>

<style scoped lang="scss">
.tool {
  border-top: 1px $plan-color solid;
  padding: 10px 0px;
}

.top {
  height: 565px;
  text-align: center;

  .toptitle {
    border-bottom: 1px solid #ddd;
    padding: 15px;
    color: #5e902f;
  }

  .con {
    padding: 5px;
    font-weight: 100;
    opacity: 0.8;
    border-top: 1px #eee solid;
    line-height: 21px;
    font-size: 14px;

    .child1 {
      display: inline-block;
      font-weight: 900;
      color: #f14c05;
      width: 40px;

    }

    .child2 {
      margin-right: 60px;
    }

    .child3 {
      color: #2384b8;
      font-weight: 400;
    }

    .child4 {
      font-size: 12px;
      color: #aaa;
    }
  }
}

.page {
  padding-bottom: 10px;
}
</style>