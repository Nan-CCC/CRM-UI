<template>
  <div style="overflow:hidden;">
    <!-- 当前员工信息 -->
    <div class="base bor info fs18">
      <p>欢迎回来，<span>{{ userInfo.name }}</span></p>
      <p v-if="userStore.userInfo.authority == 0">您当前所属：<span>{{
        userInfo.department }}</span></p>
      <p v-else>您当前所属：<span>管理员</span></p>
      <p>{{ state.date.toLocaleString() }}</p>
    </div>
    <!-- 日历 -->
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
            <div class="mt10" v-if="scheduleListDate.map(item => item.date).includes(data.day)">
              <el-icon size="20"
                :style="scheduleListDate.find(item => item.date == data.day).status ? 'color:#5e902f' : 'color:#e6a23c'">
                <StarFilled />
              </el-icon>
            </div>
          </div>

        </template>
      </el-calendar>
      <div>
        <div class="cfoot">
          <el-icon size="20" class="cicon" style="color:#5e902f;">
            <StarFilled />
          </el-icon>
          <span>----已完成</span>
        </div>
        <div class="cfoot">
          <el-icon size="20" class="cicon">
            <StarFilled />
          </el-icon>
          <span>---未完成</span>
        </div>
      </div>
    </div>
    <!-- 日程 -->
    <div class="base bor plan">
      <div>
        <div v-if="!todaySchedule.content" class="none">
          今日暂无日程
        </div>
        <div v-else class="exist">
          <div class="title fs20">
            <span style="padding-right: 70%;">今日日程安排</span>
            <el-button v-if="!flag" :icon="Document" circle type="warning" plain size="small"
              @click="updateTodayStatus(1)" />
            <el-button v-else :icon="Check" circle size="small" @click="updateTodayStatus(0)" />
          </div>
          <div class="content fs16">
            {{ todaySchedule.content }}
          </div>
        </div>
      </div>

    </div>
    <div class="base bor notice">
      <div class="title fs20">通知</div>
      <el-table height="280" :data="logTable">
        <el-table-column>
          <template #default="props">
            <span v-if="props.row.businessType == 1">添加</span>
            <span v-if="props.row.businessType == 2">删除</span>
            <span v-if="props.row.businessType == 3">修改</span>
            <span v-if="props.row.businessType == 4">其他操作</span>
            -
            <span>{{ props.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column width="200px">
          <template #default="props">
            <span style="color: #aaa;">{{ props.row.time }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <el-dialog v-model="visable" width="500">
    <template #header>
      <div class="dialog-title mb10 fs20">
        {{ schedule.date }}- {{ title }}
      </div>
    </template>
    <el-form-item>
      <el-input class="fs16" v-model="schedule.content" maxlength="90" placeholder="请输入日程安排..." show-word-limit autosize
        type="textarea" />
    </el-form-item>

    <template #footer>
      <div>
        <el-button @click="visable = false">取消</el-button>
        <el-button type="primary" @click="save">
          保存
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useUserStore } from '@/store/user';
import { addSchedule, getOneDay, queryAllSchedule, updateOneDay, daleteOneDay, updateStatus } from '@/api/modules/schedule'
import { Check, Document } from '@element-plus/icons-vue';
import { selectLast } from '@/api/modules/log'
import { time } from 'echarts';
/**
 * 获取用户信息
 */
const userInfo = ref()
const userStore = useUserStore()
userInfo.value = userStore.userInfo
//当前时间
const state = reactive({
  date: new Date()
})

// 每秒更新时间
const updateTime = () => {
  state.date = new Date();
};

/**
 * 日历
 */
//日历 日期前后移动
const calendar = ref(null)
const selectDate = (val) => {
  if (!calendar.value) return
  calendar.value.selectDate(val)
}

/**
 * 日程安排
 */
//今天日期
let dayjs = require('dayjs')
let today = dayjs().format('YYYY-MM-DD')
//新增内容
const schedule = reactive({
  user: '',
  content: '',
  date: ''
})

//获取当前用户今天的日程
//状态flag
const flag = ref()
const todaySchedule = ref({})
async function getTodaySchedule() {
  const { data } = await getOneDay(userInfo.value.id, today)
  if (data) {
    todaySchedule.value = data
    flag.value = data.status
  }
  else {
    todaySchedule.value = {}
  }

}

//修改今日计划状态
async function updateTodayStatus(val) {
  await updateStatus(todaySchedule.value.id, val)
  flag.value = val
  await getAllSchedule()
}

//全部日程日期
const scheduleListDate = ref([])
async function getAllSchedule() {
  const { data } = await queryAllSchedule(userInfo.value.id)
  scheduleListDate.value = data
}

//点击日历时间
//新增/修改弹窗
const visable = ref(false)
//弹窗标题
const title = ref('')
const addPlan = async (val) => {
  if (scheduleListDate.value.map(item => item.date).includes(val)) {
    title.value = '修改日程'
    const { data } = await getOneDay(userInfo.value.id, val)
    schedule.content = data.content
  }
  else {
    title.value = '新增日程'
    schedule.content = ''
  }
  schedule.user = userInfo.value.id
  schedule.date = val;

  visable.value = true;
}

async function save() {
  visable.value = false
  if (schedule.content) {
    if (title.value == '新增日程') {
      await addSchedule(schedule)
    }
    else {
      await updateOneDay(userInfo.value.id, schedule.date, schedule.content)
    }
  } else {
    const { data } = await getOneDay(userInfo.value.id, schedule.date)
    if (data.content) {
      await daleteOneDay(userInfo.value.id, schedule.date)
    }
  }
  if (schedule.date == today) {
    await getTodaySchedule()
  }

  //刷新日期列表
  await getAllSchedule()

}
const logTable = ref([])
async function getLog() {
  logTable.value = []
  const { data } = await selectLast()
  for (let i in data) {
    logTable.value[i] = data[i]
  }
}
onMounted(() => {
  setInterval(updateTime, 1000);
  getTodaySchedule()
  getAllSchedule()
  getLog()
});
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
  height: 640px;
  float: left;

  .con {
    height: 70px;
    text-align: center;
  }

  .cfoot {
    float: right;
    color: #aaa;
    margin-right: 20px;

    .cicon {
      color: #e6a23c;
      position: relative;
      top: 4px;
    }
  }
}

.plan {
  width: 46%;
  height: 200px;
  float: left;
  margin-top: -490px;

  .none {
    text-align: center;
    font-size: 50px;
    font-weight: bolder;
    color: $plan-color;
    margin: 60px 0px;
  }

  .exist {
    background-color: #e3f0d8;

    .title {
      padding: 20px;
      font-weight: 100;
      color: $header-color;
      border-bottom: 1px rgb(200, 200, 200) solid;
    }

    .content {
      height: 95px;

      padding: 20px;
      color: rgb(118, 102, 83);
      line-height: 30px;
    }
  }


}

.notice {
  width: 46%;
  height: 350px;
  float: left;
  margin-top: -275px;
  background-color: white;

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