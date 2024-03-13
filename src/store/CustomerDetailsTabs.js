import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
export const useTabsStore = defineStore('tab', () => {

  const isTab = ref([true, false, false, false])
  //计算属性 getter
  // const test=computed(()=>flag*2)

  function changeTab(val) {
    //v-if让tab每次切换都重新渲染
    for (var i in isTab) {
      if (i == val) {
        isTab[i].value = true
      }
      else {
        isTab[i].value = false
      }
    }
    console.log(isTab.value);
  }
  return { isTab, changeTab }

})