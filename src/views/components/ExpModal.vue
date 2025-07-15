<template>
  <div class="gameexp-model">
    <div class="gameexp-content">
      <span
        class="close-icon"
        :style="{ backgroundImage: `url(${closeIcon})` }"
        @click="handleClose"
      ></span>

      <div class="gamexpbg">
        <div class="gamexp-center">
          <h3 class="gameexp-title">注册模拟账户</h3>
          <img src="@/assets/images/logo.png" alt="logo" class="gameexp-logo" />

          <el-form-item prop="captcha">
            <el-input
              v-model="formData.captcha"
              placeholder="验证码"
              class="custom-input captcha-input"
            >
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>

              <template #suffix>
                <div class="captcha-code" v-html="captchaSvg" @click="refreshCaptcha"></div>
              </template>
            </el-input>
          </el-form-item>

          <el-button type="primary" class="submit-btn" @click="handleSubmit" :loading="loading">
            立即试用
          </el-button>
        </div>
      </div>
    </div>
    <!-- 导航菜单放在 gamexpbg 下方 -->
    <div class="trial-nav">
      <li
        v-for="(item, index) in navItems"
        :key="index"
        class="nav-item-container"
        @mouseenter="activeIndex = index"
        @mouseleave="activeIndex = -1"
      >
        <div
          class="nav-bg"
          :style="{
            backgroundImage: `url(${navBg})`,
            backgroundPosition: activeIndex === index ? '0 -80px' : '0 0',
            backgroundSize: '80px 160px',
          }"
        >
          <img :src="item.icon" alt="icon" class="nav-icon" />
        </div>
        <h6 class="nav-label">{{ item.label }}</h6>
      </li>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Lock } from '@element-plus/icons-vue'
import { getCaptcha } from '@/utils/captcha'

const closeIcon = new URL('@/assets/images/expcloseicon.png', import.meta.url).href
const navBg = new URL('@/assets/images/gameexp2.png', import.meta.url).href

// 表单数据
const formData = reactive({
  captcha: '',
})

// 当前激活的导航项索引
const activeIndex = ref(-1)

// 导航菜单项
const navItems = ref([
  {
    label: '捕鱼',
    icon: new URL('@/assets/images/expicon1.png', import.meta.url).href,
  },
  {
    label: '电子',
    icon: new URL('@/assets/images/expicon2.png', import.meta.url).href,
  },
  {
    label: '纸牌游戏',
    icon: new URL('@/assets/images/expicon3.png', import.meta.url).href,
  },
  {
    label: '赌场',
    icon: new URL('@/assets/images/expicon4.png', import.meta.url).href,
  },
  {
    label: '运动',
    icon: new URL('@/assets/images/expicon5.png', import.meta.url).href,
  },
  {
    label: '抽奖',
    icon: new URL('@/assets/images/expicon6.png', import.meta.url).href,
  },
])

// 验证码
const captchaSvg = ref('')
const captchaText = ref('')
const loading = ref(false)

// 初始化验证码
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

// 提交表单
const handleSubmit = async () => {
  try {
    if (!formData.captcha) {
      ElMessage.error('请输入验证码')
      return
    }
    loading.value = true
    // 这里添加实际的提交逻辑
    ElMessage.success('验证成功')
    refreshCaptcha()
  } catch (error) {
    ElMessage.error(error.message || '提交失败')
  } finally {
    loading.value = false
  }
}

// 组件挂载时刷新验证码
onMounted(refreshCaptcha)

const emit = defineEmits(['close'])

const handleClose = () => {
  emit('close')
}
</script>

<style scoped>
/* 保持原有样式不变 */
.gameexp-model {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.gameexp-content {
  position: relative;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.close-icon {
  position: absolute;
  top: -30px;
  right: -40px;
  width: 30px;
  height: 30px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  cursor: pointer;
  z-index: 10;
}

.el-icon {
  margin-right: 6px;
  font-size: 18px;
  color: black;
}

.gamexpbg {
  width: 100%;
  height: 310px;
  background-image: url('@/assets/images/gamexp1.png');
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  padding: 50px;
  padding-top: 0;
  box-sizing: border-box;
  margin-bottom: 40px;
}

.gamexp-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.gameexp-title {
  color: #000;
  font-size: 24px;
  margin-top: 8px;
  margin-bottom: 40px;
}

.gameexp-logo {
  height: 45px;
  margin-bottom: 40px;
}

/* 修改导航菜单样式 */
.trial-nav {
  display: flex;
  justify-content: space-between;
  width: 640px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.nav-item-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 1;
}

.nav-icon-wrapper {
  position: relative;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-bg {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: 90px 160px;
  background-position: 0 0;
}

.nav-icon {
  width: 70px !important;
  height: 70px !important;
  z-index: 2;
  position: relative;
}

.nav-label {
  margin-top: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  text-align: center;
}

/* 保持原有其他样式不变 */
.custom-input :deep(.el-input__wrapper) {
  width: 100%;
  height: 40px;
  padding: 0 10px;
  border: none;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: none;
}

.captcha-input :deep(.el-input__wrapper) {
  padding-right: 1px;
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
  padding: 2px;
  background-color: #f5f5f5;
}

.captcha-code svg {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.el-form-item {
  margin-bottom: 0px;
  width: 100%;
}

.submit-btn {
  width: 100%;
  height: 40px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  background: #e4004f;
  border: none;
  margin-top: 10px;
  transition: all 0.3s;
}

.submit-btn:hover {
  background: #c30042;
  transform: translateY(-2px);
}

.submit-btn:active {
  transform: translateY(0);
}
</style>
