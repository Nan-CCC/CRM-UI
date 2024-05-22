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
        <el-icon size="20" class="icon" @click="open">
          <el-badge :is-dot="flag" class="item">
            <BellFilled />
          </el-badge>
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

    <el-dialog v-model="dialogVisible" destroy-on-close title="通知" width="500">
      <div>
        <div style="margin: 10px 0;">{{ info.content }}</div>
        <div style="font-size: 12px;color: #aaa;text-align: right;">来自：{{ fromUser }}</div>
        <div style="font-size: 12px;color: #aaa;text-align: right;">{{ info.createTime }}</div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="changeInfo">
            已读
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router"
import { useUserStore } from '@/store/user'
import { resetRouter } from '@/router/router'
import { selectInfo, getUser, updateInfo } from "@/api/modules/user";
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

//监听路由路径是否发生变化，之后更改面包屑
watch(() => route.path, (newValue, oldValue) => {
  breadList.value = []
  getMatched()
})

const flag = ref(false)
const info = ref({})
const fromUser = ref('')
async function getInfo() {
  const res = await selectInfo(userStore.userInfo.id)
  if (res.data !== undefined) {
    flag.value = true
    info.value = res.data
    const { data } = await getUser(res.data.uid)
    fromUser.value = data.name
  }
}
const dialogVisible = ref(false)

async function open() {

  dialogVisible.value = true

}

async function changeInfo() {
  await updateInfo(userStore.userInfo.id)
  dialogVisible.value = false
  flag.value = false
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

//渲染后加载
onMounted(() => {
  getMatched();
  getInfo()
})
</script>

<style scoped lang="scss">
.box {
  margin-top: 8px;

  .icon {
    color: $header-color;
    margin-top: 10px;
    cursor: pointer;
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