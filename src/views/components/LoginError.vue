<template>
  <!-- Not connected yet to 客服 -->
  <div class="auth-login-box" @click.self="handleClose">
    <div class="auth-container">
      <div class="auth-header">
        <h2 class="auth-title">gợi Ý</h2>
        <el-icon class="close-icon" @click="handleClose">
          <CloseBold />
        </el-icon>
      </div>

      <div class="auth-body">
        <el-form
          ref="formRef"
          :model="formData"
          :rules="formRules"
          label-width="120px"
          label-position="top"
        >
          <el-form-item prop="username" class="auth-form-item">
            <el-input
              v-model="formData.username"
              placeholder="662F81DFG126AF79E2626"
              @blur="validateField('username')"
            />
          </el-form-item>

          <el-form-item prop="password" class="auth-form-item">
            <el-input
              v-model="formData.password"
              type="password"
              show-password
              placeholder="Vui lòng nhập mật khẩu"
              @blur="validateField('password')"
            />
            <div class="forgot-password">
              <a href="#" @click.prevent="handleForgotPassword">Quên mật khẩu?</a>
            </div>
          </el-form-item>

          <el-form-item prop="captcha" class="auth-form-item captcha-item">
            <el-input
              v-model="formData.captcha"
              placeholder="xác nhận"
              @blur="validateField('captcha')"
              class="captcha-input"
            >
              <template #suffix>
                <div class="captcha-code" v-html="captchaSvg" @click="refreshCaptcha"></div>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item class="auth-action-item">
            <el-button
              type="primary"
              class="auth-submit-btn"
              @click="handleSubmit"
              :loading="loading"
            >
              Đăng nhập
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="auth-footer">
        <div class="auth-footer-row">
          <h2 class="auth-footer-title">Không có tài khoản?</h2>
          <button class="auth-switch-btn" @click="switchToRegister">DĂNG KÝ</button>
        </div>

        <a href="#" class="auth-service-link">
          <img src="@/assets/images/register.png" alt="客服" class="service-icon" />
          在线客服
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { CloseBold } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getCaptcha } from '@/utils/captcha'
import { login } from '@/api/auth'

const emit = defineEmits(['close', 'login-success', 'show-register'])

// 表单数据
const formRef = ref()
const formData = reactive({
  username: '',
  password: '',
  captcha: '',
})

// 验证码
const captchaSvg = ref('')
const captchaText = ref('')
const isDev = import.meta.env.MODE === 'development'

// 加载状态
const loading = ref(false)

const formRules = {
  username: [
    { required: true, trigger: 'blur' },
    {
      pattern: /^[A-Za-z][A-Za-z0-9_]{1,14}$/,
      trigger: 'blur',
    },
  ],
  password: [{ required: true, trigger: 'blur' }],
  captcha: [{ required: true, trigger: 'blur' }],
}

// 显示错误弹窗
const showErrorAlert = (message) => {
  ElMessageBox.alert(message, '错误', {
    confirmButtonText: '确定',
    type: 'error',
    customClass: 'error-alert',
  })
}

// 初始化验证码
const refreshCaptcha = async () => {
  try {
    const { svg, text } = await getCaptcha()
    captchaSvg.value = svg
    captchaText.value = text
  } catch (error) {
    console.error('验证码加载失败:', error)
    showErrorAlert('验证码加载失败')
  }
}

// 字段验证方法
const validateField = async (prop) => {
  try {
    await formRef.value.validateField(prop)
  } catch (error) {
    showErrorAlert(error[0]?.message || '输入有误')
  }
}

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value.validate()

    const payload = {
      username: formData.username,
      password: formData.password,
      captcha: formData.captcha,
      captcha_key: captchaText.value,
    }

    loading.value = true
    const res = await login(payload)

    if (res.code === 200) {
      ElMessage.success(res.message || '登录成功')
      emit('login-success', res.data)
      emit('close')
    } else {
      showErrorAlert(res.message || '登录失败')
      refreshCaptcha()
    }
  } catch (error) {
    console.error('登录错误:', error)
    if (error.response?.data) {
      showErrorAlert(error.response.data.message || '请求失败')
    } else {
      showErrorAlert('网络错误，请稍后重试')
    }
    refreshCaptcha()
  } finally {
    loading.value = false
  }
}

const handleClose = () => {
  emit('close')
}

const handleForgotPassword = () => {
  ElMessageBox.alert('请联系在线客服重置密码', '忘记密码', {
    confirmButtonText: '确定',
  })
}

const switchToRegister = () => {
  emit('close')
  emit('show-register')
}

// 初始化
onMounted(refreshCaptcha)
</script>

<style scoped>
.auth-login-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.auth-container {
  background-color: #fff;
  border-radius: 8px;
  width: 450px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.auth-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f7fa;
}

.auth-title {
  margin: 0;
  font-size: 18px;
  color: #333;
  font-weight: bold;
}

.close-icon {
  cursor: pointer;
  color: #999;
  font-size: 20px;
}

.close-icon:hover {
  color: #666;
}

.auth-body {
  padding: 20px;
}

.auth-form-item {
  margin-bottom: 20px;
}

.captcha-input {
  width: 100%;
}

.captcha-code {
  cursor: pointer;
  height: 32px;
  display: flex;
  align-items: center;
  margin-right: 8px;
}

.auth-submit-btn {
  width: 100%;
  margin-top: 10px;
  background-color: #409eff;
  border-color: #409eff;
}

.auth-submit-btn:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
}

.auth-footer {
  padding: 20px;
  background-color: #f5f7fa;
  border-top: 1px solid #eee;
}

.auth-footer-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.auth-footer-title {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.auth-switch-btn {
  background-color: #409eff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.auth-switch-btn:hover {
  background-color: #66b1ff;
}

.auth-service-link {
  color: #409eff;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.auth-service-link:hover {
  color: #66b1ff;
}

.service-icon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.forgot-password {
  text-align: right;
  margin-top: 5px;
}

.forgot-password a {
  color: #999;
  font-size: 12px;
  text-decoration: none;
}

.forgot-password a:hover {
  color: #666;
}

.auth-action-item {
  margin-bottom: 0;
}

:deep(.el-input__inner) {
  height: 40px;
}

:deep(.el-form-item__content) {
  margin-left: 0 !important;
}
</style>

<style>
.error-alert {
  width: 80%;
  max-width: 400px;
}

.error-alert .el-message-box__content {
  padding: 20px;
}

.error-alert .el-message-box__status.el-icon-error {
  font-size: 24px;
}
</style>
