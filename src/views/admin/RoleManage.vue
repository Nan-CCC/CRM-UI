<template>
  <div class="base bor pad">
    <div class="tool">
      <el-button type="primary" size="small" @click="add">
        新增角色
      </el-button>
      <el-button size="small" @click="getExcel">导出Excel</el-button>

    </div>
    <el-table :data="tableData" border>
      <el-table-column prop="name" label="角色名称" />
      <el-table-column label="状态">
        <template #default="props">
          <el-tag v-if="props.row.rstatus == 1" type="success">启用</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template #default="props">
          <el-button type="warning" size="small" @click="update(props.row)">
            修改
          </el-button>
          <el-button type="danger" size="small" @click="delect(props.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" destroy-on-close :title="title" width="500" @close="getList">
      <div>
        <el-form :model="roleInfo" label-position="right" label-width="100px" style="max-width: 400px;">
          <el-form-item label="角色名称">
            <el-input v-model="roleInfo.name" />
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="roleInfo.rstatus" style="margin-top: -5px;">
              <el-radio value="1" size="large">启用</el-radio>
              <el-radio value="0" size="large">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="菜单权限">
            <el-scrollbar height="300px" style="width: 400px;">
              <el-tree ref="treeRef" :data="menuTree" default-expand-all node-key="id" highlight-current
                :props="defaultProps" :default-checked-keys="roleInfo.menus" show-checkbox />
            </el-scrollbar>

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
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { roleList, addRole, updateRole, deleteRole } from '@/api/modules/role'
import { getMenuById, getMenuAll, getMenuListById } from '@/api/menu'
//用户表
const tableData = ref([])
//弹窗
const dialogVisible = ref(false)
const title = ref('')
const roleInfo = ref({
  id: '',
  name: '',
  rstatus: '1',
  menus: [],
})

async function getList() {
  const { data } = await roleList()
  tableData.value = data

  roleInfo.value.id = ''
  roleInfo.value.name = ''
  roleInfo.value.rstatus = '1'
  roleInfo.value.menus = []
}


const treeRef = ref()
const defaultProps = {
  children: 'children',
  label: 'name',
}
const menuTree = ref([])
async function getMenuList() {
  const { data } = await getMenuAll()
  menuTree.value = data
}
//修改
async function update(val) {
  dialogVisible.value = true
  title.value = '修改权限'
  roleInfo.value = val
  roleInfo.value.rstatus = val.rstatus.toString()
  const { data } = await getMenuById(val.id)
  roleInfo.value.menus = data
  console.log(roleInfo.value);

}
//新增
async function add() {
  dialogVisible.value = true
  title.value = '新增角色'
  console.log(roleInfo.value);
}
//删除
async function delect(val) {
  await deleteRole(val)
  getList()
}
async function save() {
  let ids = treeRef.value.getCheckedNodes().map(item => {
    return item.id
  })
  if (title.value == '修改权限') {
    const res = await updateRole(roleInfo.value, ids)
  }
  else {
    const res = await addRole(roleInfo.value, ids)
  }
  console.log(ids);
  dialogVisible.value = false
}
async function tosearch() {
  if (searchtext.value == '') {
    getList()
  }
  else {
    // const { data } = await selectPartUser(select.value, searchtext.value)
    // tableData.value = data
  }
}

onMounted(() => {
  getList()
  getMenuList()
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