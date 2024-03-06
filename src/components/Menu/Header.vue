<template>
  <div>
    <el-row class="base">
      <el-col :span="19" style="line-height: 40px;">
        <span v-for="i in 3" class="title">
          <span>首页</span>
          <span v-if="i != 3">></span>
        </span>
      </el-col>
      <el-col :span="1">
        <el-icon size="20" class="icon">
          <Comment />
        </el-icon>
      </el-col>
      <el-col :span="1">
        <el-icon size="20" class="icon">
          <Calendar />
        </el-icon>
      </el-col>
      <el-col :span="1">
        <el-icon size="20" class="icon">
          <BellFilled />
        </el-icon>
      </el-col>
      <el-col :span="1">
        <el-icon size="20" class="icon">
          <Tools />
        </el-icon>
      </el-col>
      <el-col :span="1">
        <el-avatar> 客 </el-avatar>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.base {
  margin: 8px -10px;
  color: $header-color;

  .icon {
    margin: 10px;
  }
}

.title {
  font-size: 14px;

  span {
    margin: 3px;
  }
}

.el-avatar {
  --el-avatar-bg-color: #5e902f;
}
</style>