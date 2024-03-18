<template>
  <div style="border: 1px red solid;" class="m15">
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
              饼图
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="bor" style="height:395px">

            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <div class="bor" style="height: 800px;margin-left: 10px;"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTransition } from '@vueuse/core'
//现有客户数
const nowNum = ref(0)
const outputValue = useTransition(nowNum, {
  duration: 1500,
})
nowNum.value = 582

//年度增长
const nowNum2 = ref(0)
const outputValue2 = useTransition(nowNum2, {
  duration: 1500,
})
nowNum2.value = 137

//年度流失
const nowNum3 = ref(0)
const outputValue3 = useTransition(nowNum3, {
  duration: 1500,
})
nowNum3.value = 23
</script>

<style scoped lang="scss">
.el-statistic {
  --el-statistic-content-font-size: 28px;
  --el-statistic-content-color: rgb(255, 132, 0);
  --el-statistic-content-font-weight: 800;
}
</style>