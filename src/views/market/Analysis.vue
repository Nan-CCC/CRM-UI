<template>
  <div class="mt15 ml15 mr15" style="overflow: hidden;">
    <div style="float: left;">
      <div style="overflow: hidden;width: 500px;">
        <div class="bor s1 num mr10" style="width: 240px;float: left;">
          <el-statistic :value="outputValue" />
          <div style="font-size: 14px;opacity: 0.4;">
            机会客户增长数量
          </div>
        </div>
        <div class="bor s1 num " style="width: 240px;float: left;">
          <el-statistic :value="outputValue2" precision="2">
            <template #suffix>
              %
            </template>
          </el-statistic>
          <div style="font-size: 14px;opacity: 0.4;">
            客户转化率
          </div>
        </div>
        <div class="bor s1 num mt10 mr10" style="width: 240px;float: left;">
          <el-statistic :value="outputValue3" />
          <div style="font-size: 14px;opacity: 0.4;">
            营销总支出
          </div>
        </div>
        <div class="bor s1 num mt10" style="width: 240px;float: left;">
          <el-statistic :value="outputValue4" />
          <div style="font-size: 14px;opacity: 0.4;">
            平均客单价
          </div>
        </div>
      </div>
      <div class="bor mt10 mb10" style="width: 490px;height: 400px;">
        饼图
      </div>
    </div>
    <div style="width: 725px;float: right;">
      <div class="bor" style="width: 100%;height: 180px;">
        坐标条件
      </div>
      <div class="bor mt10" style="width: 100%;height: 460px;">
        图
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTransition } from '@vueuse/core'
const nowNum = ref(0)
const outputValue = useTransition(nowNum, {
  duration: 1500,
})
nowNum.value = 15201

const nowNum2 = ref(0)
const outputValue2 = useTransition(nowNum2, {
  duration: 1500,
})
nowNum2.value = 18.61

const nowNum3 = ref(0)
const outputValue3 = useTransition(nowNum3, {
  duration: 1500,
})
nowNum3.value = 205400

const nowNum4 = ref(0)
const outputValue4 = useTransition(nowNum4, {
  duration: 1500,
})
nowNum4.value = 8965
</script>

<style scoped lang="scss">
.num {
  height: 105px;
  text-align: center;
  padding-top: 10px;
}

.s1 {
  .el-statistic {
    --el-statistic-content-font-size: 24px;
    --el-statistic-content-color: rgb(255, 132, 0);
    --el-statistic-content-font-weight: 800;
  }
}
</style>