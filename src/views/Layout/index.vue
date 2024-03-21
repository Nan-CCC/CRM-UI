<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="225px" style="box-shadow: 1px 1px 10px #888;z-index: 1; ">
        <Menu></Menu>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-scrollbar class="main">
          <el-main>
            <router-view />
            <p class="footer">enterprisecrm@2024-01-01</p>
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

.el-header {
  border-bottom: 1px $hr-color solid;
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

.el-aside::-webkit-scrollbar {
  display: none;
}

.main {
  background-color: $contain-color;
}

.footer {
  color: $footer-color;
  height: 50px;
  text-align: center;
}
</style>
