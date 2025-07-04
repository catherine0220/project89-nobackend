<template>
  <div class="registration-container">
    <h2>账户注册</h2>

    <el-form :model="form" label-width="120px" class="registration-form">
      <el-form-item label="姓名">
        <el-input v-model="form.name" placeholder="请输入您的姓名" />
      </el-form-item>

      <el-form-item label="联系方式">
        <el-input v-model="form.contact" placeholder="请输入电话或邮箱" />
      </el-form-item>

      <el-form-item label="推荐人ID">
        <el-input v-model="form.referrer" placeholder="选填" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">提交申请</el-button>
        <el-button @click="router.back()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const form = ref({
  name: '',
  contact: '',
  referrer: '',
})

const submitForm = () => {
  if (!form.value.name || !form.value.contact) {
    ElMessage.warning('请填写姓名和联系方式')
    return
  }

  ElMessage.success('注册申请已提交，我们的营销专家将尽快联系您！')
  router.push('/')
}
</script>

<style scoped>
.registration-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.registration-form {
  margin-top: 30px;
}
</style>
