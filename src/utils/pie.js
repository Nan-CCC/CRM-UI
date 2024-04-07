import * as echarts from 'echarts';
var myChart = null

var pieChart = document.getElementById('pie')

var streetData = [
  {
    name: 'A等级',
    value: 12
  },
  {
    name: 'B等级',
    value: 23
  },
  {
    name: 'C等级',
    value: 234
  },
  {
    name: 'D等级',
    value: 45
  },
  {
    name: 'M等级',
    value: 345
  },
]
//企业总数
var sum = 0
streetData.forEach(item => {
  sum += Number(item.value)
})

// 构建饼图图图表信息
function getPieData(data) {
  return {
    color: [
      '#e7768c',
      '#2ac4dd',
      '#e3c187',
      '#32bdb4',
      '#5298ef'
    ],
    legend: {
      show: true,
      orient: 'vertical',
      top: "center",
      right: "0%",
      icon: "circle",
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 13,
      textStyle: {
        color: "#fff",
      },
      formatter(name) {
        let than = this.streetData;
        let tarValue;
        for (let i = 0, l = than.length; i < l; i++) {
          if (than[i].name == name) {
            tarValue = than[i].value;
          }
        }
        const arr = [
          `{name|${name}}{value|${tarValue}}`
        ];
        return arr.join('')
      },
      textStyle: {
        color: '#FFF',
        rich: {
          name: {
            fontSize: 14,
            width: 100,
            padding: [0, 0, 0, 10],
          },
          value: {
            fontSize: 14,
            width: 30,
            textAlign: 'center',
            padding: [0, 0, 0, 10]
          },
        }
      },
    },
    title: {
      text: `{primary|企业总数}\n{sum|${sum}}{primary|家}`,
      left: '15%',
      top: 'center',
      textStyle: {
        rich: {
          primary: {
            color: '#ffffff',
            fontWeight: 100,
            fontSize: 16,
            lineHeight: 30,
          },
          sum: {
            fontSize: 28,
            fontWeight: 800,
            color: '#ffffff',
          }
        }
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['70%', '90%'],
        center: ['25%', '50%'],
        label: {
          show: false,
          position: 'left'
        },
        data: data
      },
      {
        type: "pie",
        radius: ['99%', '100%'],
        center: ['25%', '50%'],
        // radius: '90%',
        hoverAnimation: false,
        clockWise: false,

        itemStyle: {
          normal: {
            color: "#fff",
          },
        },
        label: {
          show: false,
        },
        data: [0],
      },
    ]
  }
}

//根据类型加载数据信息
function initChartData(val) {
  myChart = echarts.init(pieChart);
  myChart.setOption(getPieData(streetData));
}

// 使用刚指定的配置项和数据显示图表。
initChartData()
