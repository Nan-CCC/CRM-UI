<template>
  <div>
    <el-menu default-active="/index" active-text-color="yellow" class="el-menu-vertical-demo" background-color="#466c23"
      text-color="#ffffff" unique-opened="true" :router="true" @select="text">
      <el-menu-item index='1'>
        <template #>
          <div>
            <img src="@/assets/icons/logo4.png" style="height: 45px;" />
            <span class="title">EnterpriceCRM</span>
          </div>
        </template>
      </el-menu-item>
      <el-menu-item index="/index">
        <el-icon>
          <HomeFilled />
        </el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-sub-menu index="2">

        <template #title>
          <el-icon>
            <Avatar />
          </el-icon>
          <span>客户数据</span>
        </template>
        <el-menu-item index="/data" @click="text2">
          客户信息
        </el-menu-item>
        <el-menu-item index="2-2">
          客户分析
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3">

        <template #title>
          <el-icon>
            <DataAnalysis />
          </el-icon>
          <span>销售管理</span>
        </template>

        <el-menu-item index="3-1">
          增加订单
        </el-menu-item>
        <el-menu-item index="3-2">
          个人业绩
        </el-menu-item>
        <el-menu-item index="3-3">
          查看机会
        </el-menu-item>
        <el-menu-item index="3-4">
          联系客户
        </el-menu-item>
      </el-sub-menu>
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
      </el-sub-menu>
    </el-menu>

  </div>
</template>

<script setup>
import { ref } from 'vue'
// index: 选中菜单项的 index,
//   indexPath: 选中菜单项的 index path,
//   item: 选中菜单项,
//     routeResult: vue - router 的返回值（如果 router 为 true）
function text(index, indexPath, item, routeResult) {
  console.log(index)
  console.log(indexPath)
  console.log(item)
  console.log(routeResult)
}

//点击获取子菜单实例
function text2(item) {
  console.log(item)
}

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