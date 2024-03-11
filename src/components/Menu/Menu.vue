<template>
  <div style="display: flex;height: 100%;">
    <el-menu :default-active="acticeIndex" active-text-color="yellow" class="el-menu-vertical-demo"
      background-color="#466c23" text-color="#ffffff" unique-opened="true" router="true" @select="getNow"
      :router="true">
      <el-menu-item>
        <template #>
          <div>
            <img src="@/assets/icons/logo4.png" style="height: 45px;" />
            <span class="title">EnterpriceCRM</span>
          </div>
        </template>
      </el-menu-item>
      <template v-for="(item, index) in getRouter">
        <el-menu-item v-if="index >= 2 && item.children.length <= 1" :index="index" @click="goPage(item.path)">
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.name }}</span>
        </el-menu-item>
        <el-sub-menu :index="index" v-if="index >= 2 && item.children.length > 1">
          <template #title>
            <el-icon>
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.name }}</span>
          </template>
          <el-menu-item v-for="(i, index2) in item.children" @click="goPage(i.path)" :index="index + '-' + index2"
            :disabled="i.path == 'details'">
            <span>{{ i.meta.name }}</span>
          </el-menu-item>
        </el-sub-menu>
      </template>
      <!-- 
      <el-sub-menu index="4">

        <template #title>
          <el-icon>
            <Calendar />
          </el-icon>
          <span>营销活动</span>
        </template>
        <el-menu-item index="4-1">
          市场分析
        </el-menu-item>
        <el-menu-item index="4-2">
          增加活动
        </el-menu-item>
        <el-menu-item index="4-3">
          进行中活动
        </el-menu-item>
        <el-menu-item index="4-4">
          已结束活动
        </el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="5">

        <template #title>
          <el-icon>
            <Headset />
          </el-icon>
          <span>客户服务</span>
        </template>
        <el-menu-item index="5-1">
          待处理服务
        </el-menu-item>
        <el-menu-item index="5-2">
          已处理服务
        </el-menu-item>
        <el-menu-item index="5-3">
          服务分析
        </el-menu-item>
      </el-sub-menu> -->
    </el-menu>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from "vue-router"


const router = useRouter()
//获取路由列表
const getRouter = router.options.routes
//（路径，父菜单，子菜单）
const goPage = (path) => {
  //菜单跳转
  router.push(path)
  //console.log(path);
}

//动态激活菜单
const acticeIndex = ref(2)
function getNow(index) {
  // console.log(index, indexPath, item, routeResult)
  acticeIndex.value = index
}

//刷新菜单激活项不变(没出来)

</script>

<style scoped lang="scss">
.title {
  font-size: 30px;
  font-family: French Script MT;
  color: $text-color;
  height: 45px;
  line-height: 25px;
}
</style>