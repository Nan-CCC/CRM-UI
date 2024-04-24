<template>
  <div class="bor ml15 mr15">
    <el-steps style="padding-top: 20px;margin-bottom: 20px;" :active="active" process-status="process"
      finish-status="success" align-center>
      <el-step title="创建" description="创建一个新的订单" />
      <el-step title="签约" description="提交合同信息" />
      <el-step title="完成" description="等待仓库发货" />
    </el-steps>
    <Create v-if="active === 0" ref="createRef" v-model:active="active">
      <template #create>
        <div class="setSolt">
          <el-button @click="save">保存</el-button>
          <el-button type="primary" @click="createNext">下一步</el-button>
        </div>
      </template>
    </Create>
    <Sign v-if="active === 2" ref="signRef" v-model:active="active">
      <template #sign>
        <div class="setSolt">
          <el-button @click="toBefore">上一步</el-button>
          <el-button type="primary" @click="signNext">下一步</el-button>
        </div>
      </template>
    </Sign>
    <Delivery v-if="active === 3">
      <template #del>
        <div class="setSolt">
          <el-button @click="clear">创建新订单</el-button>
          <el-button @click="end">已发货</el-button>
        </div>
      </template>
    </Delivery>
  </div>
</template>

<script setup>
import Create from '@/components/Addorder/Create.vue';
import Sign from '@/components/Addorder/Sign.vue';
import Delivery from '@/components/Addorder/Delivery.vue';
import { onMounted, ref, watch } from 'vue'
import { useNowOrderStore } from '@/store/nowOrder';
import { updateStatus } from '@/api/modules/contract'
import { useRoute } from 'vue-router';

const active = ref()
/**
 * 待创建
 */
const nowOrderStore = useNowOrderStore()
//保存订单
const createRef = ref(null)
function save() {
  //未签约
  nowOrderStore.changeStatus('10')
  createRef.value.getOrder()
}

function createNext() {
  //草稿
  nowOrderStore.changeStatus('00')
  createRef.value.next()
  //createRef.value.getOrder('next')
}
/**
 * 合同
 */
const signRef = ref(null)
//上一步
function toBefore() {
  active.value = 0
}

//下一步
function signNext() {
  signRef.value.getContract()
}

/**
 * 完成
 */
//创建新订单
function clear() {
  active.value = 0
  nowOrderStore.clearOrder()
  // console.log('闪闪闪');
  // sessionStorage.removeItem('noworder')
}
//已收货
async function end() {
  const { code } = await updateStatus(nowOrderStore.oid, '20')
  if (code == 200) {
    active.value = 0
    nowOrderStore.clearOrder()
    sessionStorage.removeItem('noworder')
  }
}


//监听active，变化时改变session
watch(active, (newValue, oldValue) => {
  sessionStorage.setItem('active', newValue)
})

onMounted(() => {
  //防止刷新页面数据归零
  if (sessionStorage.getItem('active') != null) {
    active.value = parseInt(sessionStorage.getItem('active'))
  }
  else {
    active.value = 0
    sessionStorage.setItem('active', 0)
  }
  //重新获取order
  if (sessionStorage.getItem('noworder') == null) {
    nowOrderStore.clearOrder()
  }
})

</script>

<style scoped lang="scss">
.setSolt {
  text-align: center;
  padding-bottom: 30px;
}
</style>