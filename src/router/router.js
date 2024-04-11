
import { routes } from './static'
//初始化后端菜单
export function initRouter(routerTree) {
  let routerList = []
  routerTree.forEach((item) => {
    routerList.push({
      name: item.pagePath ? item.pagePath : '',
      path: item.path ? item.path : '',
      meta: { title: item.name },
      children: item.children ? initRouter(item.children) : [],
      component: item.local ? () => import('../views' + item.local + '.vue') : ''
    })
  });

  return routerList;
}

export function createNow(router) {
  //动态菜单
  //此处是将pinia的菜单信息持久化，数据会加入session
  //如果直接从pinia中拿菜单，要写在路由守卫里面，可能会有问题
  let menu = sessionStorage.getItem('menu')
  //session中的菜单信息不为空是创建动态菜单
  //否则登录时会报错，因为此时session中的menu为空
  if (menu) {
    let menuInfo = JSON.parse(menu).menuInfo
    const routers = initRouter(menuInfo);
    //此处遍历菜单做Home(框架)的子菜单，即使打印也不能明显的看到菜单结构，要自行感觉
    routers.forEach(item => {
      router.addRoute('Home', item)
    })
  }
}

//清空路由
export function resetRouter(router) {
  let routers = router.getRoutes()
  let whiteList = routes.map(item => item.path)
  routers.map(item => {
    if (!whiteList.includes(item.path)) {
      router.removeRoute(item.name)
    }
  })
}
