<template>
  <div class="container">
    <div class="panel-header">更改您的名称</div>
    <div class="panel-body">
      <div class="alert">
        <i class="fa fa-exclamation-circle mr-[10px]"></i>
        <span class="alert-text">{ User ID } 公司</span>
      </div>

      <!--<el-form
        ref="ruleFormRef"
        style="width: 820px"
        :model="ruleForm"
        :rules="rules"
        label-width="80px"
        label-position="top"
        class="demo-ruleForm"
        hide-required-asterisk
      >
         <el-form-item label="提现密码" prop="pass" class="mb-[15px] h-[60px] flex items-start">
          <el-input
            v-model="ruleForm.pass"
            type="password"
            show-password
            :clearable="false"
            autocomplete="off"
          />
          
          <template #error="{ error }">
            <div class="custom-error">
              <el-icon><WarnTriangleFilled /></el-icon>
              <span>{{ error }}</span>
            </div>
          </template>
        </el-form-item>

        <el-form-item
          label="确认提现密码"
          prop="checkPass"
          class="mb-[15px] h-[60px] flex items-start"
        >
          <el-input
            v-model="ruleForm.checkPass"
            type="password"
            show-password
            :clearable="false"
            autocomplete="off"
          />
        
          <template #error="{ error }">
            <div class="custom-error">
              <el-icon><WarnTriangleFilled /></el-icon>
              <span>{{ error }}</span>
            </div>
          </template>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn-default">
      <button type="submit" class="btn">发送</button> -->
      <button type="button" class="btn" @click="handleCancel">取消</button>
    </div>
  </div>
</template>

<script setup>
// import { ref } from 'vue'
// import { WarnTriangleFilled } from '@element-plus/icons-vue'

const emit = defineEmits(['cancel', 'go-back']) // 添加 go-back 事件

const handleCancel = () => {
  emit('go-back') // 发送返回事件
}

// const ruleFormRef = ref()

// const ruleForm = ref({
//   pass: '',
//   checkPass: '',
// })

// const rules = {
//   pass: [
//     { required: true, message: '请输入密码', trigger: 'blur' },
//     { min: 6, message: '密码至少为6位', trigger: 'blur' },
//   ],
//   checkPass: [
//     {
//       required: true,
//       message: '请再次输入密码',
//       trigger: 'blur',
//     },
//     {
//       validator: (rule, value, callback) => {
//         if (value !== ruleForm.value.pass) {
//           callback(new Error('两次输入密码不一致'))
//         } else {
//           callback()
//         }
//       },
//       trigger: 'blur',
//     },
//   ],
// }
</script>

<style scoped>
.btn-default {
  margin-left: 125px;
}

.btn {
  margin-right: 10px;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #ccc;
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 4px;
  color: #333;
  background-color: #fff;
}

.btn:hover {
  background-color: #e7e7e7;
}

::v-deep(.custom-error) {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #a94442 !important;
}

::v-deep(.custom-error .el-icon) {
  font-size: 16px;
  margin-right: 6px;
  color: #a94442 !important;
}

::v-deep(.el-form-item__icon) {
  display: none !important;
}

::v-deep(.el-icon) {
  font-size: 20px !important;
  font-weight: bold !important;
  color: #777777 !important;
}

::v-deep(.el-input__inner) {
  height: 34px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555555;
  background-color: #fff;
  border-radius: 4px;
}

::v-deep(.el-form-item__label) {
  color: #333;
  font-size: 14px;
  font-weight: 700;
  width: 100px !important;
}

.panel-body {
  height: 220px;
  padding: 15px;
  padding-bottom: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.alert {
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 14px;
  width: 810px !important;
  color: #8a6d3b;
  background-color: #fcf8e3;
  border-color: #faebcc;
}

.panel-header {
  color: #333333;
  background-color: #f5f5f5;
  border-color: #ddd;
  padding: 10px 15px;
  border-bottom: 1px solid transparent;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  font-size: 14px;
}

.container {
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  border-color: #ddd;
  height: 200px;
}
</style>
