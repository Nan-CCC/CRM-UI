import * as echarts from 'echarts';
export async function setChart(dataX, data) {
  if (data != undefined) {
    console.log(data);
    console.log(data.length);
  }
  // 绘制图表
  let option = {
    tooltip: {},
    xAxis: {
      data: dataX.value
    },
    yAxis: {},
    series: [
      {
        data: [12, 15],
        type: 'line',
        stack: 'x'
      },
    ],
  }
  return option
}