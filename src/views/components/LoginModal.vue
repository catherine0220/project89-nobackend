<template>
  <div class="login-modal" @click.self="handleClose">
    <div class="modal">
      <div class="modal-header">
        <h2 class="modal-title">登录账户</h2>
        <el-icon class="close-icon" @click="handleClose">
          <CloseBold />
        </el-icon>
      </div>

      <div class="modal-content">
        <el-form ref="formRef" :model="formData" :rules="formRules" label-position="top">
          <el-form-item prop="username">
            <el-input v-model="formData.username" placeholder="帐户名称" class="custom-input" />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="formData.password"
              type="password"
              show-password
              placeholder="会员密码"
              class="custom-input"
            />
          </el-form-item>

          <el-form-item prop="captcha">
            <el-input
              v-model="formData.captcha"
              placeholder="验证码"
              class="custom-input captcha-input"
            >
              <template #suffix>
                <div class="captcha-code" v-html="captchaSvg" @click="refreshCaptcha"></div>
              </template>
            </el-input>
          </el-form-item>

          <div class="forgot-password">
            <a href="#" @click.prevent="handleForgotPassword">Forget password?</a>
          </div>

          <el-button type="primary" class="submit-btn" @click="handleSubmit" :loading="loading">
            登录
          </el-button>
        </el-form>
      </div>

      <div class="modal-footer">
        <div class="footer-row">
          <span>还没有账户？</span>
          <button class="register-btn" @click="switchToRegister">注册</button>
        </div>
        <a href="#" class="customer-service" @click.prevent="handleCustomerService">
          <img src="@/assets/images/register.png" alt="客服" />
          在线客服
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { CloseBold } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { getCaptcha } from '@/utils/captcha'
import { login } from '@/api/auth'
import { useRouter } from 'vue-router'
import { useAuth } from '@/utils/auth'

const emit = defineEmits(['close', 'login-success', 'show-register'])
const router = useRouter()
const auth = useAuth()

const formRef = ref()
const formData = reactive({
  username: '',
  password: '',
  captcha: '',
})

const captchaSvg = ref('')
const captchaText = ref('')
const loading = ref(false)

const formRules = {
  username: [
    { required: true, message: '请输入帐户名称', trigger: 'blur' },
    { pattern: /^[A-Za-z][A-Za-z0-9_]{1,14}$/, message: '帐户格式错误', trigger: 'blur' },
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
}

const refreshCaptcha = async () => {
  try {
    const { svg, text } = await getCaptcha()
    captchaSvg.value = svg
    captchaText.value = text
  } catch (error) {
    const msg = error?.response?.data?.message || '网络错误'
    ElMessage.error(msg)
  }
}

const handleSubmit = async () => {
  try {
    await formRef.value.validate()
    loading.value = true

    // 调用登录API
    const res = await login({
      username: formData.username,
      password: formData.password,
    })

    if (res.success) {
      ElMessage.success(res.message || '登录成功')
      // 存储用户信息到本地
      localStorage.setItem('user', JSON.stringify(res.data))
      auth.login(res.data)
      emit('login-success', res.data)
      emit('close')
      router.push('/home')
    } else {
      ElMessage.error(res.message || '登录失败')
      refreshCaptcha()
    }
  } catch (error) {
    console.error('Login error:', error)
    ElMessage.error(error.message || '请检查登录信息是否正确')
    refreshCaptcha()
  } finally {
    loading.value = false
  }
}

const handleClose = () => emit('close')
const handleForgotPassword = () => ElMessage.info('忘记密码功能即将开放')
const handleCustomerService = () => ElMessage.info('正在为您连接在线客服...')
const switchToRegister = () => {
  emit('close')
  emit('show-register')
}

onMounted(refreshCaptcha)
</script>

<style scoped>
.login-modal {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal {
  width: 420px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.modal-header {
  position: relative;
  height: 58px;
  background-color: #5d5d5d;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-title {
  margin: 0;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
}

.close-icon {
  position: absolute;
  right: 20px;
  width: 23px;
  height: 23px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.close-icon:hover {
  background: #ffd630;
}

.modal-content {
  padding: 30px;
}

.el-form .el-form-item {
  margin-bottom: 15px;
}

.el-form .el-form-item:nth-last-of-type(1) {
  margin-bottom: 0 !important;
}

.custom-input :deep(.el-input__wrapper) {
  width: 100%;
  height: 40px;
  padding: 0 10px;
  border: none;
  border-radius: 4px;
  background-color: #e0e0e0;
}

.custom-input :deep(.el-input__inner) {
  height: 40px;
  padding: 0 10px;
}

.captcha-input :deep(.el-input__wrapper) {
  padding-right: 1px; /* 避免被 suffix 内部 padding 挤压 */
}

.captcha-code {
  height: 34px !important;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;
  padding: 2px; /* ✅ 给内部 SVG 一点空隙 */
  background-color: #f5f5f5; /* ✅ 背景色统一一点 */
}

/* 如果验证码是 SVG 的话加这个 */
.captcha-code svg {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.submit-btn {
  width: 100%;
  height: 48px;
  background-color: #ffd630;
  color: #000;
  font-size: 18px;
  border: none;
  border-radius: 4px;
  margin-top: 20px;
}

.submit-btn:hover {
  background-color: #fbcd15;
  opacity: 0.9;
  color: #000;
}

.modal-footer {
  padding: 20px 50px;
  background-color: #fff;
  border-top: 1px solid #333;
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%; /* 确保宽度100% */
  box-sizing: border-box; /* 包含padding */
}

.footer-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-width: 0; /* 关键修复：允许内容收缩 */
}

.footer-row span {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  color: #333;
  padding-right: 10px; /* 给按钮留出空间 */
}

.register-btn {
  width: 110px;
  height: 32px;
  margin-left: 15px;
  color: #fff;
  text-align: center;
  border: none;
  border-radius: 16px;
  background-color: #f81123;
  cursor: pointer;
}

.register-btn:hover {
  background-color: #f75b68;
}

.customer-service {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  gap: 5px;
  font-size: 16px;
  font-weight: normal;
  margin: 0;
  color: #333;
}

.customer-service:hover {
  color: #66b1ff;
}

.customer-service img {
  width: 20px;
  height: 20px;
}

.forgot-password {
  text-align: right;
}

.forgot-password a {
  color: #262626;
  cursor: pointer;
  font-size: 12px;
  text-decoration: none;
}

.forgot-password a:hover {
  color: #337ab7;
  text-decoration: underline;
}
</style>
