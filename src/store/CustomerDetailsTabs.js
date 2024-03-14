import { defineStore } from "pinia";

export const useOrderStore = defineStore('orderInfo', {
  state: () => {
    return {
      nowOrderId: ''
    }
  },
  actions: {
    transferOrder(val) {
      this.nowOrderId = val
    }
  }
})

