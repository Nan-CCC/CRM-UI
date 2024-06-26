import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import { initRouter, createNow } from '@/router/router';
import { isToken } from "@/api/modules/user";
import { routes } from './static'
import { getError } from '@/utils/tips'
import { useMenuStore } from "@/store/menu"
/**
 * 本系统跳转逻辑：
 *  根目录是layout框架
 *  路由守卫 无token跳转到/login
 *  
 *  根目录不能重定向到/index  这样设置登录会有404，刷新才能正常显示，很迷
 *  目前解决方法是在Menu中设置 路径为 / 时跳转到 /index
 */

//创建
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

//在这里添加，刷新不会消失
let menu = sessionStorage.getItem('menu')
if (menu) {
  let menuInfo = JSON.parse(menu).menuInfo
  const routers = initRouter(menuInfo);
  routers.forEach(item => {
    router.addRoute('Home', item)
  })
}
//使用pinia存储但不等直接取出，这里会报错，路由守卫中可以取出但刷新会消失
// const menuStore = useMenuStore()
// const menu = menuStore.menuInfo
// const routers = initRouter(menu)
// routers.forEach(item => {
//   router.addRoute('Home', item)
// })

//守卫
router.beforeEach(async (to, from) => {
  const menuStore = useMenuStore()
  const menu = menuStore.menuInfo
  const routers = initRouter(menu)
  routers.forEach(item => {
    router.addRoute('Home', item)
  })
  let nowPath = to.fullPath
  let oldPath = from.fullPath

  if (nowPath != "/login") {
    var token = sessionStorage.getItem("token")
    if (!token) {
      getError("无token,请登录")
      return { name: 'Login' }
    }
    else {
      //警告从request.js中发出
      let res = await isToken(token)
      //token过期
      if (res.code == 401) {
        return { name: 'Login' }
      }
    }
    //createNow(router)
  }
  //从登录->首页，加载动态路由
  if (oldPath == '/login' && nowPath == '/') {
    let menu = sessionStorage.getItem('menu')
    if (menu) {
      let menuInfo = JSON.parse(menu).menuInfo
      const routers = initRouter(menuInfo);
      routers.forEach(item => {
        router.addRoute('Home', item)
      })
    }
  }

  //从新增订单-->其他 删除session
  if (oldPath == '/sale/myorder/addOrder') {
    if (sessionStorage.getItem('active')) {
      sessionStorage.removeItem('active')
    }
    if (sessionStorage.getItem('noworder')) {
      sessionStorage.removeItem('noworder')
    }
  }
  // //从我的订单-->其他
  if (oldPath.includes('sale/myorder') && !nowPath.includes('sale/myorder')) {
    if (sessionStorage.getItem('tab')) {
      sessionStorage.removeItem('tab')
    }
  }

  //从新增活动-->其他 删除session
  if (oldPath == '/market/addActive' && !nowPath.includes("market/addActive")) {
    if (sessionStorage.getItem('active')) {
      sessionStorage.removeItem('active')
    }
  }

})

export default router