import { addOrder } from "@/api/modules/order";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
//存储新建订单的情况
export const useNowOrderStore = defineStore('noworder', () => {
  const oid = ref('')
  const orderInfo = reactive({
    status: '',
    province: '',
    city: '',
    district: '',
    address: '',
    uid: '',
    cid: '',
    proList: [],
    form: {}
  })

  //新增订单
  const getAddOrder = async () => {
    const { data } = await addOrder(orderInfo)
    oid.value = data
  }

  //修改订单状态
  const changeStatus = (data) => {
    orderInfo.status = data
  }

  //获取订单信息
  const getOrderInfo = (data1, data2) => {
    for (let key in data1) {
      orderInfo[key] = data1[key]
    }
    orderInfo.proList = data2
  }

  //清除订单信息
  const clearOrder = () => {
    //删除 oid使用默认上次的值
    //sessionStorage.removeItem('noworder')
    oid.value = ''
    orderInfo.status = ''
    orderInfo.province = ''
    orderInfo.city = ''
    orderInfo.district = ''
    orderInfo.address = ''
    orderInfo.uid = ''
    orderInfo.cid = ''
    orderInfo.proList = []
    orderInfo.form = {}

  }

  return { oid, orderInfo, getAddOrder, changeStatus, getOrderInfo, clearOrder }

}, {
  persist: {
    enabled: true,
  }
})

