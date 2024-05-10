import { defineStore } from "pinia";
import { insert } from "@/api/modules/market";
export const useNowMarketStore = defineStore('nowMarket', () => {
  const marketInfo = {
    //编号
    id: "",
    //
    name: "",
    //路径
    info: "",
    //预算
    cost: 0,
    //开始时间
    start: "",
    //结束
    end: "",
    //状态
    status: "",
    //审批人
    approver: "",
    //评价
    notes: "",
    //通过时间
    pass: "",
    //提交时间
    submit: "",
    pidList: [],
    uidList: []
  }

  const setInfo = async (data) => {
    for (let item in data) {
      marketInfo[item] = data[item]
    }
  }

  const getAddMarket = async () => {
    const { data } = await insert(marketInfo)
    marketInfo.id = data
  }

  const clear = () => {
    marketInfo.id = ""
    marketInfo.name = ""
    marketInfo.info = ""
    marketInfo.cost = 0
    marketInfo.start = ""
    marketInfo.end = ""
    marketInfo.status = ""
    marketInfo.submit = ""
    marketInfo.pidList = []
    marketInfo.uidList = []
  }

  return { marketInfo, setInfo, getAddMarket, clear }
}, {
  persist: {
    enabled: true
  }
})