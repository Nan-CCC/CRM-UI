<template>
  <div>
    <el-row class="m15">
      <el-col :span="10">
        <div class="bor mr10 " style="height: 140px;color: #5e902f;">
          <div style="border-bottom: 1px solid #ddd;padding: 10px;font-size: 20px;color: #5e902f;">目标</div>
          <div style="font-size: 18px;text-align: center;padding-top: 15px;">
            <span>本月期望数额：166667</span>
            <div style="height: 20px;float: right;position: relative;right: 120px;top: 2px;">
              <el-popover placement="top-start" trigger="hover" :width="160" :content=pop>
                <template #reference>
                  <el-icon size="20" v-if="flag">
                    <CircleCheck />
                  </el-icon>
                  <el-icon v-else size="20" color="rgb(255, 132, 0)">
                    <Warning />
                  </el-icon>
                </template>
              </el-popover>

            </div>
            <div style="font-size: 18px;text-align: center;padding-top: 15px;">
              <span>本季期望数额：500000</span>
              <div style="height: 20px;float: right;position: relative;right: 120px;top: 2px;">
                <el-popover placement="top-start" trigger="hover" :width="160" :content=pop2>
                  <template #reference>
                    <el-icon size="20" v-if="flag2">
                      <CircleCheck />
                    </el-icon>
                    <el-icon v-else size="20" color="rgb(255, 132, 0)">
                      <Warning />
                    </el-icon>
                  </template>
                </el-popover>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="bor mr10 num s1">
          <el-statistic :value="outputValue" />
          <div style="font-size: 14px;opacity: 0.4;">
            本月订单总额
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="bor mr10 num s2">
          <el-statistic :value="outputValue2" />
          <div style="font-size: 14px;opacity: 0.4;">
            本月成交订单个数
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="bor num s3">
          <el-statistic :value="outputValue3" />
          <div style="font-size: 14px;opacity: 0.4;">
            本月平均客单价
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="m15">
      <el-col :span="8">
        <div class="bor" style="margin-right: 10px;height: 400px;padding: 20px;">
          <el-input v-model="filterText" style="width: 100%;margin-bottom: 10px;" placeholder="Filter keyword" />
          <el-scrollbar height="360px">
            <el-tree ref="treeRef" class="filter-tree" :data="data" :props="defaultProps" default-expand-all
              :filter-node-method="filterNode" show-checkbox node-key="id" />
          </el-scrollbar>
        </div>

      </el-col>
      <el-col :span="16">
        <div class="bor" style="height: 440px;">
          <div id="line" style="width: 100%;height: 100%;"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useTransition } from '@vueuse/core'
import { ElTree } from 'element-plus'
import * as echarts from 'echarts';

//本月订单总额
const nowNum = ref(0)
const outputValue = useTransition(nowNum, {
  duration: 1500,
})
nowNum.value = 582000

//成交订单数（已完成订单）
const nowNum2 = ref(0)
const outputValue2 = useTransition(nowNum2, {
  duration: 1500,
})
nowNum2.value = 52

//平均成交价
const nowNum3 = ref(0)
const outputValue3 = useTransition(nowNum3, {
  duration: 1500,
})
nowNum3.value = 15250
//本月目标弹窗
//本季目标弹窗
const flag = ref(!true)
const pop = computed(() => {
  if (flag.value) {
    return '本月目标已完成'
  }
  else {
    return '本月目标还差19888'
  }
})
//本季目标弹窗
const flag2 = ref(true)
const pop2 = computed(() => {
  if (flag2.value) {
    return '本季目标已完成'
  }
  else {
    return '本季目标还差20000'
  }
})
/**
 * 树
 */
const defaultProps = {
  children: 'children',
  label: 'label',
}
const filterText = ref('')
const treeRef = ref()
watch(filterText, (val) => {
  treeRef.value.filter(val)
})
const filterNode = (value, data) => {
  if (!value) {
    return true
  }
  return data.label.includes(value)
}
const data = [

  {
    id: 1,
    label: '时间(近5年)',
    children: [
      {
        id: 5,
        label: '年',
        children: [
          {
            id: 6,
            label: '2024'
          },
          {
            id: 7,
            label: '2023'
          },
        ]
      },
      {
        id: 6,
        label: '季',
        children: [
          {
            id: 8,
            label: '春季'
          },
          {
            id: 9,
            label: '夏季'
          },
        ]
      },
      {
        id: 7,
        label: '月',
        children: [
          {
            id: '10',
            label: '1月'
          },
          {
            id: '10',
            label: '1月'
          },
          {
            id: '10',
            label: '1月'
          },
          {
            id: '10',
            label: '1月'
          },
          {
            id: '10',
            label: '1月'
          },
          {
            id: '10',
            label: '1月'
          },
          {
            id: '10',
            label: '1月'
          },
          {
            id: '10',
            label: '1月'
          },
          {
            id: '10',
            label: '1月'
          },
        ]
      }
    ],
  },
  {
    id: 2,
    label: '成交额',
  },
  {
    id: 3,
    label: '订单数量',
  },
  {
    id: 4,
    label: '客户数量',
  },

]
//树中选中的
// function handleCheckChange(data, checked, indeterminate) {
//   console.log(data);
//   console.log(checked);
//   console.log(indeterminate);
// }
//
function getCheckedNodes() {
  console.log(treeRef.value.getCheckedNodes(false, false))
}

onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('line'));
  // 绘制图表
  myChart.setOption({
    tooltip: {},
    xAxis: {
      data: ['一月', '二月', '三月', '四月', '五月', '六月']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  });
})
</script>

<style scoped lang="scss">
.num {
  height: 110px;
  text-align: center;
  padding-top: 30px;
}

.s1 {
  .el-statistic {
    --el-statistic-content-font-size: 28px;
    --el-statistic-content-color: rgb(255, 132, 0);
    --el-statistic-content-font-weight: 800;
  }
}

.s2 {
  .el-statistic {
    --el-statistic-content-font-size: 28px;
    --el-statistic-content-color: #9fbf12;
    --el-statistic-content-font-weight: 800;
  }
}

.s3 {
  .el-statistic {
    --el-statistic-content-font-size: 28px;
    --el-statistic-content-color: #00b4f5;
    --el-statistic-content-font-weight: 800;
  }
}
</style>
