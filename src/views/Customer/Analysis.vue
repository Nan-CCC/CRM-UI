<template>
  <div class="m15">
    <el-row>
      <el-col :span="16">
        <el-row>
          <el-col :span="8">
            <div class="bor" style="height: 110px;text-align: center;padding-top: 15px;margin-bottom: 10px;">
              <el-statistic :value="outputValue" />
              <div style="font-size: 14px;opacity: 0.4;">
                客户总数
              </div>
            </div>

            <div class="bor" style="height: 110px;text-align: center;padding-top: 15px;margin-bottom: 10px;">
              <el-statistic :value="outputValue2" class="font" />
              <div style="font-size: 14px;opacity: 0.4;">
                年度增长人数
              </div>
            </div>

            <div class="bor" style="height: 110px;text-align: center;padding-top: 15px;margin-bottom: 10px;">
              <el-statistic :value="outputValue3" />
              <div style="font-size: 14px;opacity: 0.4;">
                年度流失人数
              </div>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="bor" style="height: 395px;margin-left: 10px;">
              <div ref="pieRef" style="width: 100%;height: 100%;"></div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="bor" style="height:395px">
              <div ref="lineRef" style="width: 100%;height: 100%;"></div>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <div class="bor" style="height: 800px;margin-left: 10px;">
          <div style="padding: 15px;color: #6ea235; font-size: 20px;border-bottom: 1px solid #5e902f;">
            热销商品榜</div>
          <div style="margin-top: 15px;margin-left: 15px;margin-right: 15px;" v-for="(item, index) in top">
            <el-row>
              <el-col :span="5">
                <span style="color: #5e902f;font-size: 16px;font-weight: 600;">{{ index + 1 }}</span>
              </el-col>
              <el-col :span="13">
                <span style="color: #555;font-size: 16px;width: 300px;">{{ item.name }}</span>
              </el-col>
              <el-col :span="6">
                <span style="color: #e0943c;font-size: 16px">{{ item.num }}</span>
                <span style="color: #aaa;font-size: 12px;">份订单</span>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useTransition } from '@vueuse/core'
import { getCustomerList, getNoOrder, getPieData } from '@/api/modules/customer'
import { getAll } from "@/api/modules/platform"
import { useUserStore } from '@/store/user';
import { getCustomerTop } from '@/api/modules/product'
import * as echarts from 'echarts';
const userStore = useUserStore()
//客户总表
const list = ref()
async function getCustomer() {
  const { data } = await getCustomerList(userStore.userInfo.id)
  list.value = data
  nowNum.value = list.value.length
}

async function getNoOrderNum() {
  const { data } = await getNoOrder(userStore.userInfo.id)
  nowNum3.value = nowNum.value - data
}
//现有客户数
const nowNum = ref(0)
const outputValue = useTransition(nowNum, {
  duration: 1500,
})

//年度增长
const nowNum2 = ref(0)
const outputValue2 = useTransition(nowNum2, {
  duration: 1500,
})
nowNum2.value = 17

//年度流失
const nowNum3 = ref(0)
const outputValue3 = useTransition(nowNum3, {
  duration: 1500,
})

const pieRef = ref(null)
const pieData = ref([])
async function getData() {
  const { data } = await getAll()
  let plaform = data
  for (let i in plaform) {
    const { data } = await getPieData(userStore.userInfo.id, plaform[i].id)
    pieData.value[i] = {
      value: data,
      name: plaform[i].name
    }
  }
  if (true) {
    const { data } = await getPieData(userStore.userInfo.id, "")
    pieData.value.push({ value: data, name: '其他' })
  }
  console.log(pieData.value);
}

async function init() {
  let linechart = echarts.init(pieRef.value)
  let option = {
    title: {
      text: '客户来源分布',
      left: 'center',
      top: 'center'
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['50%', '70%'],//实现圆心和半径
        center: ['50%', '50%'],//实现图表显示位置（左右，上下）
        avoidLabelOverlap: false,
        hoverAnimation: false,
        clockwise: false,
        label: {
          normal: {
            formatter: params => {
              if (params.name == '国家级') {
                return (
                  '{name|' + params.name + '}\n{hr|}\n{value1|' + params.value + '处}'
                );
              } else if (params.name == '市县级') {
                return (
                  '{name|' + params.name + '}\n{hr|}\n{value2|' + params.value + '处}'
                );
              } else if (params.name == '省级') {
                return (
                  '{name|' + params.name + '}\n{hr|}\n{value3|' + params.value + '处}'
                );
              } else {
                return (
                  '{name|' + params.name + '}\n{hr|}\n{value4|' + params.value + '处}'
                );
              }
            },
            padding: [2, 0, 0, 0],
            rich: {
              name: {
                fontSize: 12,
                padding: [0, -40, 0, -50],
                color: '#000'
              },
              value1: {
                fontSize: 12,
                padding: [0, -40, 0, -30],
                fontWeight: 700,
                color: '#B5DDD8'
              },
              value2: {
                fontSize: 12,
                padding: [0, -40, 0, -30],
                fontWeight: 700,
                color: '#5FA7A4'
              },
              value3: {
                fontSize: 12,
                padding: [0, -40, 0, -50],
                fontWeight: 700,
                color: '#FFDC7B'
              },
              value4: {
                fontSize: 12,
                padding: [0, -40, 0, -30],
                fontWeight: 700,
                color: '#E37C3E'
              },
            }
          }
        },
        // 牵引线
        labelLine: {
          normal: {
            show: true,
            length: 15,
            length2: 75,
          }
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        data: pieData.value
      },
      //外边框
      {
        name: '外边框',
        type: 'pie',
        clockWise: false, //顺时加载
        hoverAnimation: false, //鼠标移入变大
        center: ['50%', '50%'],
        radius: ['75%', '75%'],
        label: {
          normal: {
            show: false
          }
        },
        data: [{
          value: 0,
          name: '',
          itemStyle: {
            normal: {
              borderWidth: 3,
              borderColor: 'rgba(181,221,216,.38)'
            }
          }
        }]
      },
      //内边框（虚线框）
      {
        type: 'gauge',
        radius: '55%',
        clockwise: true,
        startAngle: '90', //重要，删除就没效果
        endAngle: '-269.9999', //重要，删除就没效果
        splitNumber: 90, //线的条数
        pointer: {
          show: false
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          length: 4,
          lineStyle: {
            color: '#B5DDD8',
            width: 1
          }
        },
        axisLabel: {
          show: false
        }
      },
    ]
  }
  linechart.setOption(option)
}

const lineRef = ref(null)
async function initLine() {
  let linechart = echarts.init(lineRef.value)
  let option = {
    xAxis: {
      data: ['第一季度', '第二季度', '第三季度', '第四季度']
    },
    yAxis: {},
    series: [
      {
        data: [10, 8, 0, 0],
        type: 'line',
        areaStyle: {}
      },
      {
        data: [14, 11, 0, 0, 0],
        type: 'line',
        areaStyle: {

          opacity: 0.5
        }
      }
    ]
  };
  linechart.setOption(option)
}

const top = ref([])
async function getTop() {
  const { data } = await getCustomerTop()
  top.value = data
}

onMounted(async () => {
  getCustomer()
  getNoOrderNum()
  await getData()
  await init()
  await initLine()
  getTop()
})
</script>
<style scoped lang="scss">
.el-statistic {
  --el-statistic-content-font-size: 28px;
  --el-statistic-content-color: rgb(255, 132, 0);
  --el-statistic-content-font-weight: 800;
}
</style>