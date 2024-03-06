<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="230px" class="menu">
        <Menu></Menu>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-scrollbar class="main">
          <el-main>
            <router-view />
            <span class="footer">enterprisecrm@2024-01-01</span>
          </el-main>
        </el-scrollbar>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Menu from "@/components/Menu/Menu.vue";
import Header from "@/components/Menu/Header.vue";
</script>

<style lang="scss">
body {
  margin: 0px;
}

.el-main {
  padding: 0px;
}

.common-layout {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  .el-container {
    height: 100%;
  }
}



.menu {
  background-color: $menu-color;
}

.main {
  background-color: $contain-color;
  padding-bottom: 50px;
  text-align: center;
}

.footer {
  color: $footer-color;
}
</style>
