<template>
  <div>
    <el-row class="box">
      <el-col :span="21" style="line-height: 40px;">
        <span v-for="(i, index) in breadList" class="title">
          <span>{{ i }}</span>
          <span v-if="index < breadList.length - 1">></span>
        </span>
      </el-col>
      <el-col :span="1">
        <el-icon size="20" class="icon" @click="change">
          <div class="tip" v-if="flag2 == true"></div>
          <BellFilled />
        </el-icon>
      </el-col>
      <el-col :span="1">
        <el-icon size="20" class="icon">
          <Tools />
        </el-icon>
      </el-col>
      <el-col :span="1">
        <el-tooltip placement="bottom" effect="light">
          <el-avatar @click="visible = !visible">{{ userStore.userInfo.name }}</el-avatar>
          <template #content>
            <div @click="exit" style="cursor: pointer;">
              退出
            </div>
          </template>
        </el-tooltip>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router"
import { useUserStore } from '@/store/user'
import { resetRouter } from '@/router/router'

let route = useRoute();
const router = useRouter()
const breadList = ref([])
function getMatched() {
  //判断数组中指定元素为空，此处的元素item.meta是对象，所以要判断对象为空
  let menuList = route.matched.filter(item => Object.keys(item.meta).length !== 0);
  menuList.forEach(item => {
    breadList.value.push(item.meta.title)
  })
}
//渲染后加载
onMounted(() => {
  getMatched();
})

//监听路由路径是否发生变化，之后更改面包屑
watch(() => route.path, (newValue, oldValue) => {
  breadList.value = []
  getMatched()
})

//通知的角标显示
const flag2 = ref(false)
function change() {
  flag2.value = !flag2.value
}

//头像弹出框（退出登录）
const visible = ref(false)
const userStore = useUserStore()
function exit() {
  //用户信息清空
  userStore.clearUserInfo()
  //session清空
  sessionStorage.clear()
  resetRouter(router)
  router.push('/login');
}
</script>

<style scoped lang="scss">
.box {
  margin-top: 8px;

  .icon {
    color: $header-color;
    margin-top: 10px;
  }
}

.title {
  color: $menu-color;
  font-size: 14px;
}

.el-avatar {
  --el-avatar-bg-color: #5e902f;
}
</style>