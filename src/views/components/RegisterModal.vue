<template>
  <div class="register" @click.self="handleClose">
    <div class="modal">
      <div class="modal-header">
        <h2 class="modal-title">注册账户</h2>
        <el-icon class="close-icon" @click="handleClose">
          <CloseBold />
        </el-icon>
      </div>

      <div class="modal-content">
        <el-form
          ref="formRef"
          :model="formData"
          :rules="formRules"
          label-width="120px"
          label-position="top"
        >
          <el-form-item label="帐户名称" prop="username" style="position: relative">
            <el-input
              v-model="formData.username"
              @mouseenter="hoverField = 'username'"
              @mouseleave="onMouseLeave('username')"
            />
            <div v-if="formError.username" class="custom-error">
              {{ formError.username }}
            </div>
            <span class="desc">
              2 到 15 个字符之间，必须以字母开头，字母可以包括字母、数字和下划线。
            </span>
          </el-form-item>

          <el-form-item label="密码" prop="password" style="position: relative">
            <el-input
              v-model="formData.password"
              type="password"
              show-password
              @mouseenter="hoverField = 'password'"
              @mouseleave="onMouseLeave('password')"
            />
            <div v-if="formError.password" class="custom-error">
              {{ formError.password }}
            </div>
            <span class="desc">超过 6 个字符必须包含字母和数字。</span>
          </el-form-item>

          <el-form-item label="确认密码" prop="confirmPassword" style="position: relative">
            <el-input
              v-model="formData.confirmPassword"
              type="password"
              show-password
              @mouseenter="hoverField = 'confirmPassword'"
              @mouseleave="onMouseLeave('confirmPassword')"
            />
            <div v-if="formError.confirmPassword" class="custom-error">
              {{ formError.confirmPassword }}
            </div>
            <span class="desc">请再次确认您的密码。</span>
          </el-form-item>

          <el-form-item label="真实姓名" prop="username">
            <el-input v-model="formData.username" />
            <span class="desc">
              <div v-if="formError.username" class="custom-error">
                {{ formError.username }}
              </div>
              它应与银行账户名称相同。否则，无法提款。写下您的全名，大写字母，不要重音。
            </span>
          </el-form-item>

          <el-form-item label="验证码" prop="password">
            <el-input v-model="formData.password" type="password" show-password />
            <div v-if="formError.username" class="custom-error">
              {{ formError.username }}
            </div>
            <span class="desc"> 请输入验证码。 </span>
          </el-form-item>

          <el-form-item prop="agreement">
            <el-checkbox v-model="formData.agreement">
              我已年满18周岁并同意<a href="#">用户协议</a>
            </el-checkbox>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" class="submit-btn" @click="handleSubmit">
              立即注册
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { CloseBold } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['close'])

const formRef = ref()
const hoverField = ref('')

// 表单数据
const formData = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  agreement: false,
})

const formError = reactive({
  username: '',
  password: '',
  confirmPassword: '',
})

// 鼠标移开校验
const onMouseLeave = (field) => {
  if (hoverField.value === field) {
    formRef.value.validateField(field, (message) => {
      formError[field] = message || ''
    })
  }
}

// 验证规则
const validatePassword = (rule, value, callback) => {
  if (!value) return callback(new Error('请输入密码'))
  if (!/^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(value)) {
    return callback(new Error('至少6位且包含字母和数字'))
  }
  callback()
}

const validateConfirm = (rule, value, callback) => {
  if (!value) return callback(new Error('请再次输入密码'))
  if (value !== formData.password) return callback(new Error('两次输入密码不一致'))
  callback()
}

const formRules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      pattern: /^[A-Za-z][A-Za-z0-9_]{1,14}$/,
      message: '2 到 15 个字符，字母开头，可包含字母、数字、下划线',
      trigger: 'blur',
    },
  ],
  password: [{ validator: validatePassword, trigger: 'blur' }],
  confirmPassword: [{ validator: validateConfirm, trigger: 'blur' }],
  agreement: [
    {
      validator: (_, value, cb) => (value ? cb() : cb(new Error('请同意用户协议'))),
      trigger: 'change',
    },
  ],
})

const handleSubmit = () => {
  Object.keys(formError).forEach((key) => (formError[key] = ''))
  formRef.value.validate((valid, fields) => {
    if (!valid) {
      for (const key in fields) {
        if (fields[key]?.[0]?.message) {
          formError[key] = fields[key][0].message
        }
      }
      return
    }
    ElMessage.success('注册成功')
    emit('close')
  })
}

const handleClose = () => {
  emit('close')
}
</script>

<style>
.custom-error {
  position: absolute;
  bottom: 100%;
  right: 15px;
  height: 30px;
  padding: 0px 10px;
  color: #fff;
  font-size: 12px;
  background: #b20000;
  line-height: 29px;
  border-radius: 4px 4px 0 0;
  white-space: nowrap;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-bottom: none;
}

.el-form-item__error {
  display: none;
}

.el-input__wrapper {
  display: block;
  float: none;
  width: 100%;
  height: 34px;
  text-align: left;
}

.el.input__inner {
  display: block;
  padding: 6px 12px;
  font-size: 14px;
  color: #555555;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  transition:
    border-color ease-in-out 0.15s,
    box-shadow ease-in-out 0.15s;
}

.el-form-item--label-top .el-form-item__label,
.desc {
  font-size: 14px !important;
  color: #333 !important;
}

.el-form-item--label-top .el-form-item__label {
  font-weight: 700 !important;
  margin-bottom: 0px !important;
}

.desc {
  font-size: 14px;
  color: #333;
  height: 27px;
  padding-top: 7px;
  text-transform: capitalize;
  text-align: left;
}

.section {
  min-height: 50vh;
  max-height: 60vh;
  padding: 10px 30px;
  background: #fff;
  border-bottom: 1px solid #000;
}

.close-icon {
  position: absolute !important;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  width: 23px !important;
  height: 23px !important;
  background: #ffffff;
  color: #333 !important;
  border-radius: 50%;
  display: flex;
  align-items: center !important;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: 0.2s ease;
}

.close-icon:hover {
  background: #ffd630;
  color: #000;
}

.modal {
  position: relative;
  background-color: #fff;
  width: 680px;
  height: 700px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  position: relative;
  height: 58px;
  background-color: #5d5d5d;
  border-radius: 10px 10px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-title {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  margin: 0;
  text-transform: uppercase;
  line-height: 58px;
  text-align: center;
}

.modal-content {
  flex: 1;
  overflow-x: auto;
  overflow-y: auto;
  padding: 20px 30px;
  background: #fff;
  width: 100%;
  box-sizing: border-box;
}

.register {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  inset: 0;
  z-index: 50;
}

/* 仅添加必要的样式补丁 */
.el-form-item {
  margin-bottom: 15px;
}
</style>
