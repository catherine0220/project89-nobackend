<template>
  <div class="container">
    <li>
      <button class="btn-link" type="button" @click="navigateTo('change-password')">
        <i class="fas fa-key"></i>
        <span>更改您的密码</span>
      </button>
    </li>
    <li>
      <button class="btn-link" type="button" @click="navigateTo('change-money-password')">
        <i class="fa-solid fa-lock"></i>
        <span>更改您的提款密码</span>
      </button>
    </li>
    <li>
      <button class="btn-link" type="button" @click="navigateTo('name-settings')">
        <span class="icon-security mb-[10px]"></span>
        <span>名称设置</span>
      </button>
    </li>
  </div>
</template>

<script setup>
const emit = defineEmits(['navigate-to'])

function navigateTo(page) {
  emit('navigate-to', page)
}
</script>

<style scoped>
.icon-security {
  width: 50px;
  height: 52px;
  display: inline-block;
  background-color: #444;
  -webkit-mask-image: url('@/assets/images/security1.svg');
  mask-image: url('@/assets/images/security1.svg');
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
}

.fa-key,
.fa-lock {
  display: block;
  font-size: 50px;
  margin-bottom: 10px;
  font-weight: 900;
  color: #444;
}

.container span {
  font-size: 16px;
  color: #444;
}

.container li {
  display: inline-block;
  width: 26%;
  vertical-align: top;
  margin: 10px 3%;
  background: #444;
  border-radius: 5px;
  cursor: pointer;
}

.btn-link {
  width: 100%;
  min-height: 150px;
  padding: 25px 0 15px;
  color: #fff; /* 改为白色文字提高对比度 */
  background: #7e7e7e; /* 添加按钮背景色 */
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  letter-spacing: 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: none;
}

.btn-link:hover {
  background: #bebebe; /* 悬停时颜色变亮 */
}

.container {
  display: flex;
  justify-content: center;
  list-style: none;
  margin: 0 auto;
}
</style>
