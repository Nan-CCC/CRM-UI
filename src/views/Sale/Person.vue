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
      <el-col :span="5">
        <div class="bor" style="margin-right: 10px;height: 400px;padding: 20px;">
          <el-input v-model="filterText" style="width: 100%;margin-bottom: 10px;" placeholder="请选择横坐标条件" />
          <el-scrollbar height="360px">
            <el-tree ref="treeRef" class="filter-tree" :data="data" :props="defaultProps" default-expand-all
              :filter-node-method="filterNode" show-checkbox node-key="id" @check="getDataX" />
          </el-scrollbar>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="bor" style="margin-right: 10px;height: 400px;padding: 20px;">
          <el-input v-model="filterText2" style="width: 100%;margin-bottom: 10px;" placeholder="请选择纵坐标条件" />
          <el-scrollbar height="360px">
            <el-tree ref="treeRef2" class="filter-tree" :data="data2" :props="defaultProps2" default-expand-all
              :filter-node-method="filterNode2" show-checkbox node-key="id" @check="getDataY" />
          </el-scrollbar>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="bor" style="height: 440px;">
          <div ref="chartRef" style="width: 100%;height: 100%;"></div>
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
import { getProList, getDataByLine } from '@/api/modules/order'
import { getOrderSumPrice, getOrderSumNum } from '@/utils/common'
import { useUserStore } from '@/store/user';
import { setChart } from '@/utils/chart'

const UserStore = useUserStore()

//本月订单总额
const sumPrice = ref(0)
const outputValue = useTransition(sumPrice, {
  duration: 1500,
})

//成交订单数（已完成订单）
const sumNum = ref(0)
const outputValue2 = useTransition(sumNum, {
  duration: 1500,
})

//平均成交价
const avg = ref(0)
const outputValue3 = useTransition(avg, {
  duration: 1500,
})

async function getData() {
  const { data } = await getProList(new Date(), UserStore.userInfo.id)
  sumPrice.value = getOrderSumPrice(data)
  sumNum.value = getOrderSumNum(data)
  avg.value = sumPrice.value / sumNum.value
}
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
    id: 'year',
    label: '年',
    children: [
      {
        id: '2024',
        label: '2024年'
      },
      {
        id: '2023',
        label: '2023年'
      },
      {
        id: '2022',
        label: '2022年'
      }
    ]
  },
  {
    id: 'season',
    label: '季',
    children: [
      {
        id: 's1',
        label: '第一季度'
      },
      {
        id: 's2',
        label: '第二季度'
      },
      {
        id: 's3',
        label: '第三季度'
      },
      {
        id: 's4',
        label: '第四季度'
      },
    ]
  },
  {
    id: 'month',
    label: '月',
    children: [
      {
        id: 1,
        label: '1月'
      },
      {
        id: 2,
        label: '2月'
      },
      {
        id: 3,
        label: '3月'
      },
      {
        id: 4,
        label: '4月'
      },
      {
        id: 5,
        label: '5月'
      },
      {
        id: 6,
        label: '6月'
      },
      {
        id: 7,
        label: '7月'
      },
      {
        id: 8,
        label: '8月'
      },
      {
        id: 9,
        label: '9月'
      },
      {
        id: 10,
        label: '10月'
      },
      {
        id: 11,
        label: '11月'
      },
      {
        id: 12,
        label: '12月'
      },
    ]
  }
]
const listX = ref([])
const nowdataX = ref([])
const nowdataY = ref([])
async function getDataX() {
  //x条件
  let dataX = []
  //获取已选择的
  let checked = treeRef.value.getCheckedKeys()
  //年/季节/月 数组
  let yearList = []
  let seasonList = []
  let monthList = []
  //优先年>季度>月
  if (checked.includes("year")) {
    dataX = data[0].children.map(item => {
      return item.id
    })
  }
  else if (checked.includes("season")) {
    dataX = data[1].children.map(item => {
      return item.id
    })
  }
  else if (checked.includes("month")) {
    dataX = data[2].children.map(item => {
      return item.id
    })
  }
  else {
    checked.map(item => {
      if (item.length == 4) {
        yearList.push(item)
      }
      else if (item.length == 2) {
        seasonList.push(item)
      }
      else if (typeof item == 'number') {
        monthList.push(item)
      }
    })
  }
  if (dataX.length == 0) {
    if (yearList.length == 0) {
      if (seasonList.length == 0) {
        dataX = monthList

      }
      else {
        dataX = seasonList
      }
    }
    else {
      dataX = yearList
    }
  }
  nowdataX.value = dataX
  listX.value = []
  dataX.map(item => {
    data.map(i => {
      i.children.find(obj => {
        if (obj.id == item) {
          let find = obj.label
          listX.value.push(find)
        }
      })
    })
  })
  await getChartData(dataX, nowdataY.value)
}

const defaultProps2 = {
  children: 'children',
  label: 'label',
}
const filterText2 = ref('')
const treeRef2 = ref()
watch(filterText2, (val) => {
  treeRef2.value.filter(val)
})
const filterNode2 = (value, data) => {
  if (!value) {
    return true
  }
  return data.label.includes(value)
}
const data2 = [
  {
    id: "price",
    label: '成交额',
  },
  {
    id: "count",
    label: '订单数量',
  },
  {
    id: "cNum",
    label: '客户数量',
  },
]
const listY = ref([])
async function getDataY() {

  //获取已选择的
  listY.value = []
  let checked = treeRef2.value.getCheckedKeys()
  nowdataY.value = checked
  checked.map(item => {
    data2.find(obj => {
      if (obj.id == item) {
        let find = obj.label
        listY.value.push(find)
      }
    })
  })
  await getChartData(nowdataX.value, checked)
}

//echart
const chartRef = ref(null)

async function getChartData(valx, valy) {
  if (valx.length == 0 || valy.length == 0) {
  }
  else {
    let chartData = []
    for (let item in valy) {
      const { data } = await getDataByLine(valx, valy[item], UserStore.userInfo.id)
      chartData.push(data)
    }
    await init(chartData)
  }
}
async function init(val) {
  let linechart = echarts.init(chartRef.value)
  let option = {
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      data: listX.value
    },
    yAxis: {},
    series: [
      {
        name: listY.value.length > 0 ? listY.value[0] : '1',
        data: val.length > 0 ? val[0] : [],
        type: 'line',
        barMinHeight: 3,
        areaStyle: {}
      },
      {
        name: listY.value.length > 1 ? listY.value[1] : '2',
        data: val.length > 1 ? val[1] : [],
        type: 'line',
        barMinHeight: 3,
        areaStyle: {}
      },
      {
        name: listY.value.length > 2 ? listY.value[2] : '3',
        data: val.length > 2 ? val[2] : [],
        type: 'line',
        barMinHeight: 3,
        areaStyle: {}
      }
    ],
  }
  linechart.setOption(option)
}
onMounted(() => {
  getData()
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
