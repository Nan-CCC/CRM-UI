<template>
  <div>
    <el-row class="m15">
      <el-col :span="18">
        <div class="bor mr10" style="height: 760px;">
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
            <el-table-column prop="cusName" label="客户名称" width="90" fixed />
            <el-table-column label="年龄段" width="80">
              <template #default="props">
                <el-tag> {{ props.row.age }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="company" label="所属公司" width="200" />
            <el-table-column prop="phone" label="联系电话" width="120" />
            <el-table-column prop="email" label="邮箱地址" width="180" />
            <el-table-column label="来源" width="200">
              <template #default="props">
                <el-tag type="warning">{{ props.row.from }}</el-tag>
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
          <el-pagination class="mt10 flex-center page" :page-size="20" :pager-count="11" layout="prev, pager, next"
            :total="1000" />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="bor mb10 top">
          <div class="toptitle">
            本月热销产品</div>
          <div v-for="(item, index) in 10" class="con">
            <div class="child1">
              {{ index + 1 }}
            </div>
            <span class="child2">混纺绞丝纱</span>
            <span class="child3">1202</span>
            <span class="child4">份订单</span>
          </div>
        </div>
        <div class="bor mb10 top">
          <div class="toptitle">
            本月咨询热搜
          </div>
          <div v-for="(item, index) in 10" class="con">
            <div class="child1">
              {{ index + 1 }}
            </div>
            <span class="child2">售后</span>
            <span class="child3">1202</span>
            <span class="child4">次</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <Dialog ref="DialogRef"></Dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import Dialog from '@/components/Chance/Dialog.vue';
const tableData = reactive([
  {
    id: 'KH000002',
    cusName: '王小红1',
    age: '20-30',
    company: '红太阳xxxx有限公司',
    phone: '14521452145',
    email: '1452145214@qq.com',
    from: '春日畅想',
  },
  {
    id: 'KH000003',
    cusName: '王小红2',
    age: '20-30',
    company: '红太阳xxxx有限公司',
    phone: '14521452145',
    email: '1452145214@qq.com',
    from: '春日畅想',
  },
  {
    id: 'KH000044',
    cusName: '王小红3',
    age: '20-30',
    company: '红太阳xxxx有限公司',
    phone: '14521452145',
    email: '1452145214@qq.com',
    from: '春日畅想',
  },
  {
    id: 'KH000055',
    cusName: '王小红',
    age: '20-30',
    company: '红太阳xxxx有限公司',
    phone: '14521452145',
    email: '1452145214@qq.com',
    from: '春日畅想',
  },
  {
    id: 'KH0000083',
    cusName: '王小红3',
    age: '20-30',
    company: '红太阳xxxx有限公司',
    phone: '14521452145',
    email: '1452145214@qq.com',
    from: '春日畅想',
  },
  {
    id: 'KH000012',
    cusName: '王小红44',
    age: '20-30',
    company: '红太阳xxxx有限公司',
    phone: '14521452145',
    email: '1452145214@qq.com',
    from: '春日畅想',
  },
  {
    id: 'KH0000022',
    cusName: '王小红21',
    age: '20-30',
    company: '红太阳xxxx有限公司',
    phone: '14521452145',
    email: '1452145214@qq.com',
    from: '春日畅想',
  },
  {
    id: 'KH000002',
    cusName: '王小红',
    age: '20-30',
    company: '红太阳xxxx有限公司',
    phone: '14521452145',
    email: '1452145214@qq.com',
    from: '春日畅想',
  },
  {
    id: 'KH000002',
    cusName: '王小红',
    age: '20-30',
    company: '红太阳xxxx有限公司',
    phone: '14521452145',
    email: '1452145214@qq.com',
    from: '春日畅想',
  },
  {
    id: 'KH000002',
    cusName: '王小红',
    age: '20-30',
    company: '红太阳xxxx有限公司',
    phone: '14521452145',
    email: '1452145214@qq.com',
    from: '春日畅想',
  },
  {
    id: 'KH000012',
    cusName: '王小红44',
    age: '20-30',
    company: '红太阳xxxx有限公司',
    phone: '14521452145',
    email: '1452145214@qq.com',
    from: '春日畅想',
  },
  {
    id: 'KH0000022',
    cusName: '王小红21',
    age: '20-30',
    company: '红太阳xxxx有限公司',
    phone: '14521452145',
    email: '1452145214@qq.com',
    from: '春日畅想',
  },
  {
    id: 'KH000002',
    cusName: '王小红',
    age: '20-30',
    company: '红太阳xxxx有限公司',
    phone: '14521452145',
    email: '1452145214@qq.com',
    from: '春日畅想',
  },
  {
    id: 'KH000002',
    cusName: '王小红',
    age: '20-30',
    company: '红太阳xxxx有限公司',
    phone: '14521452145',
    email: '1452145214@qq.com',
    from: '春日畅想',
  },
  {
    id: 'KH000002',
    cusName: '王小红',
    age: '20-30',
    company: '红太阳xxxx有限公司',
    phone: '14521452145',
    email: '1452145214@qq.com',
    from: '春日畅想',
  }
])
//弹窗组件
const visable = ref(false)
//弹窗主键
const DialogRef = ref(null)
//新建客户
function open() {
  DialogRef.value.handleOpen(true)
}
//编辑客户
function update(val) {
  DialogRef.value.handleOpen(true, val.id)
}
//删除客户
function deleteById(val, index) {
  tableData.splice(index, 1);
}
</script>

<style scoped lang="scss">
.tool {
  border-top: 1px $plan-color solid;
  padding: 10px 0px;
}

.top {
  height: 375px;
  text-align: center;

  .toptitle {
    border-bottom: 1px solid #ddd;
    padding: 5px;
    color: #5e902f;
  }

  .con {
    padding: 5px;
    font-weight: 100;
    opacity: 0.8;
    border-top: 1px #eee solid;
    line-height: 21px;

    .child1 {
      display: inline-block;
      font-weight: bolder;
      color: #5e902f;
      width: 30px;
    }

    .child2 {
      margin-right: 60px;
    }

    .child3 {
      color: #df6717;
      font-weight: 400;
    }

    .child4 {
      font-size: 12px;
      color: #aaa;
    }
  }
}
</style>