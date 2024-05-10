<template>
  <div class="box">
    <div class="title">
      等待管理员审核
    </div>
    <div class="but">
      <el-button @click="delect">撤销</el-button>
    </div>
  </div>
</template>

<script setup>
import { useNowMarketStore } from '@/store/marketing';
import { getSuccess } from '@/utils/tips';
import { defineEmits, onMounted } from 'vue';
import { deleteMarket } from '@/api/modules/market'

const emit = defineEmits(['toZero'])

const nowMartke = useNowMarketStore()
//撤销
async function delect() {
  console.log(nowMartke.marketInfo.id);
  const { code } = await deleteMarket(nowMartke.marketInfo.id)
  if (code == 200) {
    getSuccess("撤销成功")
  }
  emit('toZero')
}
</script>

<style scoped lang="scss">
.box {
  text-align: center;

  .title {
    font-size: 40px;
    font-weight: 700;
    color: #5e902f;
  }

  .but {
    padding-top: 15px;
    padding-bottom: 20px;
  }
}
</style>