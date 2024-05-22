<template>
  <div class="base bor pad">
    <div class="tool">
      <el-button type="primary" size="small" @click="add">
        新增用户
      </el-button>
      <el-button size="small" @click="getExcel">导出Excel</el-button>
      <div class="fr">
        <el-select v-model="select" size="small" style="width: 90px">
          <el-option size="small" v-for=" item  in  option " :key="item.value" :label="item.lable"
            :value="item.value" />
        </el-select>
        <el-input v-model="searchtext" size="small" style="width: 150px;"></el-input>
        <el-button size="small" type="primary" @click="tosearch">搜索</el-button>
      </div>
    </div>
    <el-table :data="tableData" border>
      <el-table-column prop="id" label="员工编号" />
      <el-table-column prop="name" label="员工姓名" />
      <el-table-column prop="department" label="所属部门" />
      <el-table-column prop="target" label="本月目标" />
      <el-table-column label="当前角色">
        <template #default="props">
          {{ roles.map(item => item.name)[roles.map(item => item.id).indexOf(props.row.authority)] }}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template #default="props">
          <el-tag v-if="props.row.ustatus == 1" type="success">启用</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="200px">
        <template #default="props">
          <el-button type="primary" size="small" @click="check(props.row.id)">
            通知
          </el-button>
          <el-button type="warning" size="small" @click="update(props.row)">
            修改
          </el-button>
          <el-button type="danger" size="small" @click="delect(props.row.id)" v-if="props.row.authority != '1'">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" destroy-on-close :title="title" width="500" @close="getList">
      <div>
        <el-form :model="userInfo" label-position="right" label-width="100px" style="max-width: 400px;">
          <el-form-item label="员工编号">
            <el-input v-model="userInfo.id" disabled />
          </el-form-item>
          <el-form-item label="员工姓名">
            <el-input v-model="userInfo.name" />
          </el-form-item>
          <el-form-item label="密码" v-if="title == '新增用户'">
            <el-input type="password" v-model="userInfo.password" show-password />
          </el-form-item>
          <el-form-item label="所属部门" v-if="userInfo.id != 'YG000001'">
            <el-select v-model="userInfo.department" filterable>
              <el-option v-for="item in departs" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="本月目标" v-if="userInfo.id != 'YG000001'">
            <el-input v-model="userInfo.target" />
          </el-form-item>
          <el-form-item label="权限" v-if="userInfo.id != 'YG000001'">
            <el-select v-model="userInfo.authority" filterable>
              <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="状态" v-if="userInfo.id != 'YG000001'">
            <el-radio-group v-model="userInfo.ustatus" style="margin-top: -5px;">
              <el-radio value="1" size="large">启用</el-radio>
              <el-radio value="0" size="large">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save">
            保存
          </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogVisible2" destroy-on-close :title="title2" width="500">
      <div>
        <el-input v-model="info.content" :rows="2" type="textarea" />
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取消</el-button>
          <el-button type="primary" @click="save2">
            保存
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { getAllUser, deleteUser, updateUser, insertUser, selectPartUser } from '@/api/modules/user'
import { computed, onMounted, ref } from 'vue';
import { roleList } from '@/api/modules/role'
import { insertInfo, selectInfo } from '@/api/modules/user'
import { useUserStore } from '@/store/user';
import { getTime } from '@/utils/common'
const userStore = useUserStore()
//用户表
const tableData = ref([])
async function getList() {
  const { data } = await getAllUser()
  tableData.value = data
  userInfo.value.id = ''
  userInfo.value.name = ''
  userInfo.value.password = ''
  userInfo.value.authority = ''
  userInfo.value.department = ''
  userInfo.value.target = ''
  userInfo.value.ustatus = '1'
}
//角色表
const roles = ref([])
async function getRole() {
  const { data } = await roleList()
  roles.value = data
}
//部门
const departs = ['销售部', '市场部', '客服部']
//弹窗
const dialogVisible = ref(false)
const title = ref()
const userInfo = ref({
  id: '',
  name: '',
  password: '',
  authority: '',
  department: '',
  target: '',
  ustatus: '1'
})
//通知

const dialogVisible2 = ref(false)
const title2 = ref('通知')
const info = ref({
  content: "",
  createTime: "",
  status: "0",
  toid: "",
  uid: userStore.userInfo.id
})

async function check(val) {
  dialogVisible2.value = true
  info.value.toid = val
}
async function save2() {
  info.value.createTime = getTime(new Date())
  await insertInfo(info.value)
  dialogVisible2.value = false
  info.value.content = ""
  info.value.createTime = ""
  info.value.status = "0"
  info.value.toid = ""
  info.value.uid = userStore.userInfo.id
}
//修改
async function update(val) {
  dialogVisible.value = true
  title.value = '修改用户'
  userInfo.value = val
  userInfo.value.ustatus = val.ustatus.toString()
}
//新增

async function add() {
  dialogVisible.value = true
  title.value = '新增用户'

}
//删除
async function delect(val) {
  await deleteUser(val)
  getList()
}
async function save() {
  if (title.value == '修改用户') {
    await updateUser(userInfo.value)
  }
  else {
    await insertUser(userInfo.value);
  }
  dialogVisible.value = false
  userInfo.value = {}
}
//搜索
const option = [
  {
    lable: '员工编号',
    value: 'u_id'
  },
  {
    lable: '员工姓名',
    value: 'u_name'
  },
  {
    lable: '所属部门',
    value: 'department'
  },
]
const select = ref('u_id')
const searchtext = ref('')

async function tosearch() {
  if (searchtext.value == '') {
    getList()
  }
  else {
    const { data } = await selectPartUser(select.value, searchtext.value)
    tableData.value = data
  }
}

onMounted(() => {
  getList()
  getRole()
})
</script>

<style scoped lang='scss'>
.tag {
  margin-right: 25px;
}

.pad {
  padding: 0 10px;
  padding-bottom: 15px;
}

.tool {
  border-top: 1px $plan-color solid;
  padding: 10px 0px;
}
</style>