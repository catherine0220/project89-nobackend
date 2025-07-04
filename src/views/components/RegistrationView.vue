<template>
  <div class="registration-form-container">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
    >
      <!-- 特许经营账户 -->
      <el-form-item prop="accountName">
        <template #label>
          <div class="form-label">
            <i class="fas fa-star text-red-500 icon-opacity"></i>
            特许经营账户
          </div>
        </template>
        <div class="input-with-hint">
          <el-input v-model="ruleForm.accountName" class="input" />
          <span class="input-hint">
            2 到 15 个字符之间，必须以字母开头，<br />可以包括字母、数字和下划线。
          </span>
        </div>
      </el-form-item>

      <!-- 加盟商密码 -->
      <el-form-item prop="password">
        <template #label>
          <div class="form-label">
            <i class="fas fa-star text-red-500 icon-opacity"></i>
            加盟商密码
          </div>
        </template>
        <div class="input-with-hint">
          <el-input v-model="ruleForm.password" type="password" class="input" show-password />
          <span class="input-hint">请输入密码。</span>
        </div>
      </el-form-item>

      <!-- 确认密码 -->
      <el-form-item prop="confirmPassword">
        <template #label>
          <div class="form-label">
            <i class="fas fa-star text-red-500 icon-opacity"></i>
            确认密码
          </div>
        </template>
        <div class="input-with-hint">
          <el-input
            v-model="ruleForm.confirmPassword"
            type="password"
            class="input"
            show-password
          />
          <span class="input-hint">请确认您的密码。</span>
        </div>
      </el-form-item>

      <!-- 名字 -->
      <el-form-item prop="realName">
        <template #label>
          <div class="form-label">
            <i class="fas fa-star text-red-500 icon-opacity"></i>
            名字
          </div>
        </template>
        <div class="input-with-hint">
          <el-input v-model="ruleForm.realName" class="input" />
          <span class="input-hint">需与银行账户名称相同，否则无法提款。</span>
        </div>
      </el-form-item>

      <!-- 电报 -->
      <el-form-item prop="telegram">
        <template #label>
          <div class="form-label">
            <i class="fas fa-star text-red-500 icon-opacity"></i>
            电报
          </div>
        </template>
        <div class="input-with-hint">
          <el-input v-model="ruleForm.telegram" class="input" />
          <span class="input-hint">例如，A123456789</span>
        </div>
      </el-form-item>

      <!-- 银行 -->
      <el-form-item prop="bank">
        <template #label>
          <div class="form-label">
            <i class="fas fa-star text-red-500 icon-opacity"></i>
            选择银行
          </div>
        </template>
        <el-select v-model="ruleForm.bank" placeholder="请选择银行" class="input">
          <el-option label="中国建设银行" value="ccb" />
          <el-option label="中国工商银行" value="icbc" />
          <el-option label="中国银行" value="boc" />
          <el-option label="中国农业银行" value="abc" />
          <el-option label="招商银行" value="cmb" />
        </el-select>
      </el-form-item>

      <!-- 银行账号 -->
      <el-form-item prop="bankAccountNumber">
        <template #label>
          <div class="form-label">
            <i class="fas fa-star text-red-500 icon-opacity"></i>
            银行账号
          </div>
        </template>
        <div class="input-with-hint">
          <el-input v-model="ruleForm.bankAccountNumber" class="input" />
          <span class="input-hint">示例：6227002020690175526</span>
        </div>
      </el-form-item>

      <!-- 银行分行 -->
      <el-form-item prop="bankBranch">
        <template #label>
          <div class="form-label">
            <i class="fas fa-star text-red-500 icon-opacity"></i>
            银行分行
          </div>
        </template>
        <div class="input-with-hint">
          <el-input v-model="ruleForm.bankBranch" class="input" />
        </div>
      </el-form-item>

      <!-- 验证码 -->
      <el-form-item prop="verificationCode">
        <template #label>
          <div class="form-label">
            <i class="fas fa-star text-red-500 icon-opacity"></i>
            验证码
          </div>
        </template>
        <div class="input-with-hint w-[30%]">
          <el-input v-model="ruleForm.verificationCode" class="input">
            <template #suffix>
              <div class="captcha-code" v-html="captchaSvg" @click="refreshCaptcha"></div>
            </template>
          </el-input>
        </div>
      </el-form-item>

      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)" class="btn">
          立即注册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getCaptcha } from '@/utils/captcha'

const ruleFormRef = ref()

const ruleForm = reactive({
  accountName: '',
  password: '',
  confirmPassword: '',
  realName: '',
  telegram: '',
  bank: '',
  bankAccountNumber: '',
  bankBranch: '',
  verificationCode: '',
})

const rules = reactive({}) // 你可以按需要加入验证规则

const captchaSvg = ref('')
const captchaText = ref('')

// 初始化验证码
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

const submitForm = (formEl) => {
  if (!formEl) return
  ElMessage.success('注册成功')
  console.log('Form submitted:', ruleForm)
}

onMounted(refreshCaptcha)
</script>

<style scoped>
::v-deep(.el-input__wrapper) {
  padding-right: 0px;
}

::v-deep(.el-input .el-input__icon) {
  font-weight: bold;
  font-size: 20px;
  color: #333;
}

.registration-form-container {
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-ruleForm {
  width: 1000px;
}

.input {
  width: 688px;
  height: 34px;
}

.input-with-hint {
  display: flex;
  align-items: center;
  gap: 20px;
}

.input-hint {
  width: 307px;
  height: 40px;
  font-size: 14px;
  color: #fff;
  display: flex;
  align-items: center;
  line-height: 20px;
  margin-left: 10px;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  font-size: 14px;
  color: #fff;
  text-align: left;
  margin-right: 10px;
}

.icon-opacity {
  opacity: 0.7;
}

.btn {
  color: #333;
  background-color: #fff;
  border-color: #ccc;
  margin-left: 135px;
}

.btn:hover {
  color: #333;
  background-color: #d5d5d5;
  border-color: #ccc;
  margin-left: 135px;
}

.captcha-code {
  cursor: pointer;
  height: 100%;
  width: 98px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
