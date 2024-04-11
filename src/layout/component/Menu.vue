<template>
  <div style="display: flex;height: 100%;">
    <el-menu :default-active="acticeIndex" active-text-color="yellow" class="el-menu-vertical-demo"
      background-color="#466c23" text-color="#ffffff" router unique-opened @select="getNow">
      <div class="logo">
        <img src="@/assets/icons/logo4.png" style="height:30px;" />
        <span class="title">EnterpriceCRM</span>
      </div>
      <template v-for="(item, index) in menuInfo">
        <el-menu-item :index="item.path" v-if="item.children.length == 0">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
        <!--此处的index看上去没啥用，但是！！！不写的话，点击菜单会全都打开 -->
        <el-sub-menu :index="item.path" v-else>
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item :index="item.path + '/' + i.path" v-for="(i, index2) in item.children" @click="goPage">
            <span>{{ i.name }}</span>
          </el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { ref, onMounted, } from 'vue'
import { useRoute, useRouter } from "vue-router"
import { useMenuStore } from '@/store/menu'
import { createNow } from '@/router/router'

const menuInfo = ref()
//获取数据库菜单信息
function getMenu() {
  const menuStore = useMenuStore()
  menuInfo.value = menuStore.menuInfo
}

const route = useRoute()
const router = useRouter()

//目前登录空白的解决
if (route.fullPath == '/') {
  router.push('/index')
}

//动态激活菜单
//本次是以路径为index
const acticeIndex = ref('')
//修改激活
function getNow(index) {
  acticeIndex.value = index
}
onMounted(() => {
  getMenu()
  //渲染时根据当前路由
  acticeIndex.value = route.fullPath
})

</script>

<style scoped lang="scss">
.logo {
  width: 225px;
  height: 48px;
  text-align: center;
  padding-top: 10px;
}

.title {
  font-size: 35px;
  font-family: French Script MT;
  color: $text-color;
  height: 45px;
  line-height: 25px;
}
</style>