<template>
  <div class="base bor pad">
    <div class="chart">
      <div ref="lineRef" style="width: 100%;height: 100%;"></div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
import { NumByService } from '@/api/modules/service'
//售后
const service1 = ref([])
//投诉
const service2 = ref([])
async function getService() {
  const { data } = await NumByService(0)
  service1.value = data
  const res = await NumByService(1)
  service2.value = res.data
}

function getDataY(val) {
  let num = val.map(item => parseInt(item.sCreate.slice(5, 7)))
  let y = []
  for (let i = 0; i <= 11; i++) {
    if (num.includes(i + 1)) {
      let a = num.filter(item => {
        return item == i + 1
      })
      y[i] = a.length
    } else {
      y[i] = 0
    }
  }
  return y
}
const lineRef = ref(null)
async function init() {
  let linechart = echarts.init(lineRef.value)
  let option = {
    grid: {
      left: '1%',
      right: '1%',
      top: '28%',
      bottom: '1%',
      containLabel: true
    },
    title: {
      text: "年度产品服务趋势图",
      top: "3%",
      left: "39%",
      textStyle: {
        color: "#35598d",
        fontSize: 22,
        fontWeight: 'normal'
      }
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        lineStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(0, 255, 233,0)",
              },
              {
                offset: 1,
                color: "rgba(0, 255, 233,0)",
              },
            ],
            global: false,
          },
        },
      },
    },
    legend: {
      top: "15%",
      right: "35%",
      itemWidth: 16,
      itemHeight: 10,
      itemGap: 30,
      textStyle: {
        fontSize: 14,
        padding: [0, 0, 0, 4],
      },
    },
    xAxis: {
      data: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",],
      axisLabel: {
        interval: 0,
        show: true,
        fontSize: 14,
      },
      axisLine: {
        show: true,
        lineStyle: {
          show: true,
        },
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      name: '次'
    },
    series: [
      {
        name: '售后服务',
        data: getDataY(service1.value),
        type: 'line', showSymbol: true,
        symbolSize: 8,
        symbol: "circle",

        areaStyle: {}
      },
      {
        name: '客户投诉',
        data: getDataY(service2.value),
        type: 'line',
        showSymbol: true,
        symbol: "circle",
        symbolSize: 8,

        areaStyle: {

        }
      }
    ]
  };
  linechart.setOption(option)
}
onMounted(async () => {
  await getService()
  await init()
})
</script>

<style scoped lang='scss'>
.chart {
  width: 800px;
  height: 450px;
  margin: 0 auto;
  padding-bottom: 10px;
}
</style>