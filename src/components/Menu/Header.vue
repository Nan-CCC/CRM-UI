<template>
  <div>
    <el-row class="box">
      <el-col :span="21" style="line-height: 40px;">
        <span v-for="(i, index) in breadList" class="title">
          <span>{{ i.meta.name }}</span>
          <span v-if="index < breadList.length - 1">></span>
          <router-link v-if="i.meta.name == '客户详情'" to="/data" class="return">返回</router-link>
        </span>
      </el-col>
      <el-col :span="1">
        <el-icon size="20" class="icon" @click="change2">
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
          <el-avatar @click="visible = !visible">临时</el-avatar>
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
import { useRoute } from "vue-router"
import { getUserInfoByToken } from "@/api/user"
let route = useRoute();
const breadList = ref('')
let getMatched = () => {
  breadList.value = route.matched.filter(item => item.meta && item.meta.name);
}

onMounted(() => {
  getMatched();
})
watch(() => route.path, (newValue, oldValue) => { //监听路由路径是否发生变化，之后更改面包屑
  breadList.value = route.matched.filter(item => item.meta && item.meta.name);
})

//通知的角标显示
const flag2 = ref(false)
function change2() {
  flag2.value = !flag2.value
}
//头像弹出框
const visible = ref(false)

function exit() {
  console.log("退退退");
}
</script>

<style scoped lang="scss">
.flex-grow {
  flex-grow: 1;
}

.box {
  margin: 8px -10px;
  color: $header-color;
  height: 35px;

  .icon {
    margin: 5px;
    padding: 5px;
    cursor: pointer;
  }

  .tip {
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 10px;
    position: absolute;
    margin-bottom: 13px;
    margin-left: 15px;
    // right: 183px;
    // z-index: 1;
  }

  span {
    span {
      margin-right: 10px;
    }
  }
}

.title {
  font-size: 14px;

  .return {
    color: $header-color ;
    text-decoration: none;

  }

  .return:active {
    color: $text-color;
  }
}

.el-avatar {
  --el-avatar-bg-color: #5e902f;
}
</style>