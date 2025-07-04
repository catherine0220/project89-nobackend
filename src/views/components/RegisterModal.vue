<template>
  <div class="register-modal" @click.self="handleClose">
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
          @validate="onFieldValidate"
        >
          <el-form-item prop="username" class="form-item-custom">
            <template #label>
              <i class="fas fa-star"></i>
              帐户名称
            </template>
            <el-input v-model="formData.username" @blur="validateField('username')" />
            <div v-if="fieldErrors.username === '请输入您的帐户名称'" class="custom-error">
              请输入您的帐户名称
            </div>
            <div v-else-if="fieldErrors.username === '帐户格式错误'" class="custom-error">
              帐户格式错误
            </div>
            <span class="desc">
              2 到 15 个字符之间，必须以字母开头，字母可以包括字母、数字和下划线。
            </span>
          </el-form-item>

          <el-form-item prop="password" class="form-item-custom">
            <template #label>
              <i class="fas fa-star"></i>
              会员密码
            </template>
            <el-input
              v-model="formData.password"
              type="password"
              show-password
              @blur="validateField('password')"
              @input="checkPasswordStrength"
            >
              <template #suffix>
                <div class="password-strength-indicator">
                  <div class="signal-bars">
                    <div class="signal-bar" :class="{ active: passwordStrength >= 1 }"></div>
                    <div class="signal-bar" :class="{ active: passwordStrength >= 2 }"></div>
                    <div class="signal-bar" :class="{ active: passwordStrength >= 3 }"></div>
                    <div class="signal-bar" :class="{ active: passwordStrength >= 4 }"></div>
                  </div>
                  <span class="strength-text">{{ strengthText }}</span>
                </div>
              </template>
            </el-input>
            <div v-if="fieldErrors.password" class="custom-error">
              密码格式错误，长度必须至少为 6 个字符，并且必须包含字母和数字
            </div>
            <span class="desc">超过 6 个字符必须包含字母和数字。</span>
          </el-form-item>

          <el-form-item prop="confirmPassword" class="form-item-custom">
            <template #label>
              <i class="fas fa-star"></i>
              确认密码
            </template>
            <el-input
              v-model="formData.confirmPassword"
              type="password"
              show-password
              @blur="validateField('confirmPassword')"
            />
            <div v-if="fieldErrors.confirmPassword" class="custom-error">密码和确认密码不正确</div>
            <span class="desc">请再次确认您的密码。</span>
          </el-form-item>

          <el-form-item prop="realName" class="form-item-custom">
            <template #label>
              <i class="fas fa-star"></i>
              真实姓名
            </template>
            <el-input v-model="formData.realName" @blur="validateField('realName')" />
            <div v-if="fieldErrors.realName" class="custom-error">请输入大写字母，不含重音符号</div>
            <span class="desc">
              它应与银行账户名称相同。否则，无法提款。写下您的全名，大写字母，不要重音。
            </span>
          </el-form-item>

          <el-form-item prop="captcha" class="form-item-custom">
            <template #label>
              <i class="fas fa-star"></i>
              验证码
            </template>
            <el-input
              v-model="formData.captcha"
              @blur="validateField('captcha')"
              class="captcha-input"
            >
              <template #suffix>
                <div class="captcha-code" v-html="captchaSvg" @click="refreshCaptcha"></div>
              </template>
            </el-input>
            <div v-if="fieldErrors.captcha" class="custom-error">
              {{ isDev ? '验证码错误' : '验证码无效或已过期' }}
            </div>
            <span class="desc">
              {{ isDev ? '请输入验证码。' : '请输入验证码。' }}
            </span>
          </el-form-item>
          <el-form-item prop="agreement" class="form-item-agreement">
            <el-checkbox v-model="formData.agreement">
              我已年满18周岁并同意<a href="#" class="agreement">用户注册协议</a>
            </el-checkbox>
            <div v-if="fieldErrors.agreement" class="custom-error">请同意用户协议</div>
          </el-form-item>

          <el-form-item class="mb-30px">
            <el-button type="primary" class="submit-btn" @click="handleSubmit" :loading="loading">
              立即注册
            </el-button>
            <el-button class="reset-btn" @click="handleReset"> 重置 </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="modal-b-content">
        <div style="display: flex; align-items: center">
          <h2 class="modal-b-title">您准备好创建帐户了吗?</h2>
          <button class="new-button">立即咨询</button>
        </div>

        <a href="#" class="modal-b-link" style="display: flex; align-items: center">
          <img src="@/assets/images/register.png" alt="客服" class="register-img" />
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
import zxcvbn from 'zxcvbn'
import { getCaptcha } from '@/utils/captcha'
import { register } from '@/api/auth'

const emit = defineEmits(['close', 'registered'])

// 表单数据
const formRef = ref()
const formData = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  realName: '',
  captcha: '',
  agreement: false,
})

// 错误信息
const fieldErrors = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  realName: '',
  captcha: '',
  agreement: '',
})

// 密码强度
const passwordStrength = ref(0)
const strengthText = ref('')

// 验证码
const captchaSvg = ref('')
const captchaText = ref('')
const isDev = import.meta.env.MODE === 'development'

// 加载状态
const loading = ref(false)

// 表单验证规则
const formRules = {
  username: [
    { required: true, message: '请输入您的帐户名称', trigger: 'blur' },
    {
      pattern: /^[A-Za-z][A-Za-z0-9_]{1,14}$/,
      message: '帐户格式错误',
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d).{6,}$/,
      message: '密码格式错误',
      trigger: 'blur',
    },
  ],
  confirmPassword: [{ required: true, message: '请确认密码', trigger: 'blur' }],
  realName: [
    {
      required: true,
      pattern: /^[A-Z\s]+$/,
      message: '请输入大写字母，不含重音符号',
      trigger: 'blur',
    },
  ],
  captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
  agreement: [
    {
      validator: (_, value, callback) => {
        if (!value) {
          callback(new Error('请同意用户协议'))
        } else {
          callback()
        }
      },
      trigger: 'change',
    },
  ],
}

// 字段验证方法
const validateField = async (prop) => {
  try {
    await formRef.value.validateField(prop)
    fieldErrors[prop] = '' // 验证通过时清空错误
  } catch (error) {
    fieldErrors[prop] = error[0]?.message || '验证失败'
  }
}

// 密码强度检测
const checkPasswordStrength = () => {
  if (!formData.password) {
    passwordStrength.value = 0
    strengthText.value = ''
    return
  }
  const result = zxcvbn(formData.password)
  passwordStrength.value = result.score
  strengthText.value = ['弱', '一般', '强', '非常强'][result.score] || ''
}

// 刷新验证码
const refreshCaptcha = async () => {
  try {
    const { svg, text } = await getCaptcha()
    captchaSvg.value = svg
    captchaText.value = text
  } catch (error) {
    console.error('验证码加载失败:', error)
    ElMessage.error('验证码加载失败')
  }
}

// 提交表单
const handleSubmit = async () => {
  try {
    // 1. 触发整体表单验证
    await formRef.value.validate()

    // 2. 验证确认密码
    if (formData.password !== formData.confirmPassword) {
      fieldErrors.confirmPassword = '两次输入的密码不一致'
      ElMessage.error('两次输入的密码不一致')
      return
    }

    // 3. 验证用户协议
    if (!formData.agreement) {
      fieldErrors.agreement = '请同意用户协议'
      ElMessage.error('请同意用户协议')
      return
    }

    // 4. 准备发送给后端的数据
    const payload = new URLSearchParams()
    payload.append('username', formData.username)
    payload.append('password', formData.password)
    payload.append('real_name', formData.realName)
    payload.append('captcha', formData.captcha)
    // 如果有captcha_key，也添加进去
    if (captchaText.value) {
      payload.append('captcha_key', captchaText.value)
    }

    // 5. 发送注册请求
    loading.value = true
    const res = await register(payload)

    // 6. 处理响应
    if (res.success) {
      ElMessage.success(res.message || '注册成功')
      emit('registered', res.data || res)
      emit('close')
    } else {
      // 处理字段级错误
      if (res.errors) {
        Object.entries(res.errors).forEach(([field, msg]) => {
          if (fieldErrors[field] !== undefined) {
            fieldErrors[field] = msg
          }
        })
      }
      ElMessage.error(res.message || '注册失败')
      refreshCaptcha()
    }
  } catch (error) {
    // 同步表单验证错误到 fieldErrors
    if (error.fields) {
      Object.entries(error.fields).forEach(([field, errors]) => {
        fieldErrors[field] = errors[0]?.message || ''
      })
    }
    // 显示网络或其他错误
    const errorMsg = error.message || error.response?.data?.message || '网络错误'
    ElMessage.error(errorMsg)
    refreshCaptcha()
  } finally {
    loading.value = false
  }
}

// 重置表单
const handleReset = () => {
  formRef.value.resetFields()
  Object.keys(fieldErrors).forEach((key) => {
    fieldErrors[key] = ''
  })
}

// 关闭模态框
const handleClose = () => {
  emit('close')
}

// 初始化验证码
onMounted(refreshCaptcha)
</script>
