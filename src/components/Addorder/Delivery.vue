<template>
  <div>
    <div class="flex-center font">
      <!-- 发货时间 -->
      <h2>此订单预计于{{ delivery }}前发货</h2>
    </div>
    <slot name="del"></slot>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useNowOrderStore } from '@/store/nowOrder';

const orderStore = useNowOrderStore()
const delivery = orderStore.orderInfo.status

</script>

<style scoped lang="scss">
.font {
  color: $header-color;
}
</style>