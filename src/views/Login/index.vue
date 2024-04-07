<template>
  <div id="building">
    <div class="login">
      <div class="box">
        <img src="@/assets/icons/logo3.png" class="logo" />
        <span class="title">EnterpriceCRM</span>
      </div>
      <el-form label-position="right" label-width="auto" v-model="loginForm" style="max-width: 360px;margin: 0 auto;">
        <el-form-item label="用户名">
          <el-input v-model="loginForm.user" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.password" type="password" />
        </el-form-item>
        <el-form-item label="验证码">
          <el-row style="width: 306px;">
            <el-col :span="18">
              <el-input v-model="loginForm.verify" />
            </el-col>
            <el-col :span="6">
              <div style="height:35px ;width: 100%;">
                <img :src="src" style="height: 100%;width: 100%;" @click="changeSrc" />
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button color="#5e902f" @click="toIndex" style="width: 80px;margin: 0 auto;">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router"
import { useUserStore } from '@/store/user'

const loginForm = ref({
  user: '',
  password: '',
  verify: ''
})
//点击修改验证码
var src = ref('/api/common/kaptcha')
function changeSrc() {
  src.value = '/api/common/kaptcha?t' + new Date().getTime();
}

const userStore = useUserStore()

const router = useRouter()

function toIndex() {
  userStore.getUserInfo(loginForm.value)
  //var user = sessionStorage.getItem("user")
  // userStore.userInfo.then((res) => {
  //   console.log(res);
  // })

}

</script>

<style scoped lang="scss">
#building {
  background: url("../../assets/icons/bg.jpg");
  background-size: 100% 100%;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
}

.login {
  width: 450px;
  background-color: #fff;
  box-shadow: 5px 5px 10px 0 rgba($color: #5c5c5c, $alpha: 0.6);
  opacity: 0.9;
  height: 300px;

  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -200px;
  margin-left: -230px;

  .box {
    text-align: center;
    padding: 10px 0;


    /* 高度自适应 */
    .logo {
      height: 45px;
    }

    .title {
      font-size: 45px;
      font-family: French Script MT;
      color: #6ea235;
      line-height: 45px;
    }
  }
}
</style>