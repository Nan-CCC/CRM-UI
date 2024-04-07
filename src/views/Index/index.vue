<template>
  <div style="overflow:hidden;">
    <div class="base bor info fs18">
      <p>欢迎回来，<span>{{ userInfo.name }}</span></p>
      <p>您目前所属：<span>{{ userInfo.department }}</span></p>
      <p>{{ state.date.toLocaleString() }}</p>
    </div>

    <div class="base bor calendar">
      <el-calendar ref="calendar" class="mt10">
        <template #header="{ date }">
          <span>{{ date }}</span>
          <el-button-group>
            <el-button size="small" @click="selectDate('prev-year')">
              上一年
            </el-button>
            <el-button size="small" @click="selectDate('prev-month')">
              上月
            </el-button>
            <el-button size="small" @click="selectDate('today')">今天</el-button>
            <el-button size="small" @click="selectDate('next-month')">
              下月
            </el-button>
            <el-button size="small" @click="selectDate('next-year')">
              下一年
            </el-button>
          </el-button-group>
        </template>
        <template #date-cell="{ data }">
          <div :class="data.isSelected ? 'is-selected' : ''" @dblclick="addPlan(data.day)" class="con">
            {{ data.day.split('-').slice(2).join('-') }}
            <div class="mt10 mark" v-if="planDate.includes(data.day)">
              <el-icon size="20">
                <StarFilled />
              </el-icon>
            </div>
          </div>

        </template>
      </el-calendar>
    </div>
    <div class="base bor plan">
      <div>
        <div v-if="true" class="none">
          今日暂无日程
        </div>
        <div v-else class="exist">
          <div class="title fs20">
            今日日程安排
          </div>
          <div class="content fs16">
            {{ planData }}
          </div>
        </div>
      </div>

    </div>
    <div class="base bor notice">
      <div class="title fs20">通知</div>
      <el-table :data="tableData" height="355">
        <el-table-column prop="info" lable="11" />
        <el-table-column prop="time" width="200px" />
      </el-table>
    </div>
  </div>
  <el-dialog v-model="visable" width="500">
    <template #header>
      <div class="dialog-title mb10 fs20">
        {{ clickDate }}- 添加日程
      </div>
    </template>

    <el-form-item>
      <el-input class="fs16" v-model="planData" maxlength="90" placeholder="请输入日程安排..." show-word-limit autosize
        type="textarea" />
    </el-form-item>

    <template #footer>
      <div>
        <el-button @click="visable = false">取消</el-button>
        <el-button type="primary" @click="visable = false">
          保存
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getUserInfoByToken } from '@/api/user'
/**
 * 日程安排
 */
//备注内容限90个字
const planData =
  ref('今天要啦啦哦哦哦哦哦今天要啦啦哦哦哦哦哦今天要啦啦哦哦哦哦哦今天要啦啦哦哦哦哦哦今天要啦啦哦哦哦哦哦今天要啦啦哦哦哦哦哦今天要啦啦哦哦哦哦哦今天要啦啦哦哦哦哦哦今天要啦啦哦哦哦哦哦')

/**
 * 日历
 */

//日历 日期前后移动
const calendar = ref(null)
const selectDate = (val) => {
  if (!calendar.value) return
  calendar.value.selectDate(val)
}
//标记有备注的日期
const planDate = ref(['2024-03-05', '2024-03-07', '2024-04-16'])
//备注弹窗
const visable = ref(false)
//当前日期
const clickDate = ref('')
//点击日历时间
const addPlan = (val) => {
  clickDate.value = val;
  visable.value = true;
}

/**
 * 时间显示
 */
const state = reactive({
  date: new Date()
})

// 每秒更新时间
const updateTime = () => {
  state.date = new Date();
};

const userInfo = ref({})
function getUser() {
  let token = JSON.parse(sessionStorage.getItem('user')).userInfo
  getUserInfoByToken(token).then((res) => {
    userInfo.value = res.data
  })
}

onMounted(() => {
  setInterval(updateTime, 1000);
  getUser()
});

const tableData = [
  {
    info: 'xxxx增加了一条客户数据',
    time: '2021-03-08 9:45:48'
  },
  {
    info: 'xxxx增加了一条客户数据',
    time: '2021-03-08 9:45:48'
  },
  {
    info: 'xxxx增加了一条客户数据',
    time: '2021-03-08 9:45:48'
  },
  {
    info: 'xxxx增加了一条客户数据',
    time: '2021-03-08 9:45:48'
  },
  {
    info: 'xxxx增加了一条客户数据',
    time: '2021-03-08 9:45:48'
  },
  {
    info: 'xxxx增加了一条客户数据',
    time: '2021-03-08 9:45:48'
  },
  {
    info: 'xxxx增加了一条客户数据',
    time: '2021-03-08 9:45:48'
  },
  {
    info: 'xxxx增加了一条客户数据',
    time: '2021-03-08 9:45:48'
  },
  {
    info: 'xxxx增加了一条客户数据',
    time: '2021-03-08 9:45:48'
  },
  {
    info: 'xxxx增加了一条客户数据',
    time: '2021-03-08 9:45:48'
  },
  {
    info: 'xxxx增加了一条客户数据',
    time: '2021-03-08 9:45:48'
  },
  {
    info: 'xxxx增加了一条客户数据',
    time: '2021-03-08 9:45:48'
  },
  {
    info: 'xxxx增加了一条客户数据',
    time: '2021-03-08 9:45:48'
  },
  {
    info: 'xxxx增加了一条客户数据',
    time: '2021-03-08 9:45:48'
  },
  {
    info: 'xxxx增加了一条客户数据',
    time: '2021-03-08 9:45:48'
  },
  {
    info: 'xxxx增加了一条客户数据',
    time: '2021-03-08 9:45:48'
  },
]


</script>

<style scoped lang="scss">
.base {
  margin-top: 15px;
  margin-left: 15px;
  margin-bottom: 15px;
}

.info {
  width: 46%;
  height: 150px;
  float: left;
  text-align: center;
  font-weight: 300;
  color: $header-color;

  span {
    color: rgb(145, 60, 0);
  }
}

.calendar {
  width: 50%;
  height: 670px;
  float: left;

  .mark {
    color: $hr-color;
  }

  .con {
    height: 70px;
    text-align: center;
  }
}

.plan {
  width: 46%;
  height: 200px;
  float: left;
  margin-top: -520px;

  .none {
    text-align: center;
    font-size: 50px;
    font-weight: bolder;
    color: $plan-color;
    margin: 60px 0px;
  }

  .exist {
    .title {
      padding: 20px;
      font-weight: 100;
      color: $header-color;
      background-color: #e3f0d8;
      border-bottom: 1px rgb(200, 200, 200) solid;
    }

    .content {
      height: 92px;
      background-color: #e3f0d8;
      padding: 20px;
      color: rgb(118, 102, 83);
      line-height: 30px;
    }
  }


}

.notice {
  width: 46%;
  height: 400px;
  float: left;
  margin-top: -305px;

  .title {
    margin-top: 20px;
    margin-left: 20px;
    font-weight: 100;
    color: $header-color;
  }
}

.dialog-title {
  color: $menu-color;
}
</style>