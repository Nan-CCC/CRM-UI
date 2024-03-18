<template>
  <div class="bor ml15 mr15">
    <el-steps style="padding-top: 20px;margin-bottom: 20px;" :active="active" process-status="process"
      finish-status="success" align-center>
      <el-step title="待创建" description="创建一个新订单" />
      <el-step title="待签约" description="提交合同信息" />
      <el-step title="已发货" description="尚未发货" />
    </el-steps>
    <Create v-if="active === 0">
      <template #create>
        <div class="setSolt">
          <el-button>保存</el-button>
          <el-button type="primary" @click="next">下一步</el-button>
        </div>
      </template>
    </Create>
    <Sign v-if="active === 1">
      <template #sign>
        <div class="setSolt">
          <el-button @click="toZero">上一步</el-button>
          <el-button type="primary" @click="next">下一步</el-button>
        </div>
      </template>
    </Sign>
    <Delivery v-if="active === 2">
      <template #del>
        <div class="setSolt">
          <el-button>返回</el-button>
          <el-button @click="next">已发货</el-button>
        </div>
      </template>
    </Delivery>
    <End v-if="active === 3">
      <template #end>
        <div class="setSolt">
          <el-button @click="next">创建新订单</el-button>
        </div>
      </template>
    </End>
  </div>
</template>

<script setup>
import Create from '@/components/Addorder/Create.vue';
import Sign from '@/components/Addorder/Sign.vue';
import Delivery from '@/components/Addorder/Delivery.vue';
import End from '@/components/Addorder/End.vue';
import { ref } from 'vue'

const active = ref(0)

const next = () => {
  if (active.value++ > 2) {
    active.value = 0
  }
}


function toZero() {
  active.value = 0
}
</script>

<style scoped lang="scss">
.el-step__head.is-success {
  color: rgb(248, 25, 25);
  border-color: red;
}

.setSolt {
  text-align: center;
  padding-bottom: 30px;
}
</style>