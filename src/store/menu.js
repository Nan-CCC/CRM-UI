import { getMenuAPI } from "@/api/menu"
import { defineStore } from "pinia";
import { ref, reactive } from 'vue'

export const useMenuStore = defineStore('menu', () => {
  //数据库菜单数据
  const menuInfo = ref([])
  // 定义获取接口数据的action函数
  const getMenuInfo = async () => {
    const res = await getMenuAPI()
    menuInfo.value = res.data
  }
  // 以对象的形式把state和action return出去
  return { menuInfo, getMenuInfo }
},
  {
    //持久化
    persist: {
      enabled: true,
    },
  }
)
