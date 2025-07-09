<template>
  <div class="modal-container" :style="{ backgroundImage: `url(${sendMailBg})` }">
    <div class="modal-header">新诉讼函</div>
    <div class="modal-body">
      <div class="main-theme">
        <h3>主要主题</h3>
        <input type="text" class="theme-content" placeholder="请输入主题" v-model="theme" />
      </div>
      <div class="content-section">
        <h3>内容</h3>
        <textarea class="content-textarea" placeholder="请输入内容" v-model="content" />
      </div>
    </div>
    <div class="button-container">
      <div class="button-wrapper">
        <button class="send-button">发送</button>
        <button class="close-button" @click="closeModal">关闭</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import sendMailBg from '@/assets/images/sendmail.jpg'

const theme = ref('')
const content = ref('')
const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>

<style scoped>
.content-textarea {
  display: block;
  width: 715px;
  min-height: 150px;
  max-height: 300px;
  padding: 10px 12px;
  font-size: 14px;
  color: #555555;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  resize: vertical;
  text-align: left;
  line-height: 1.4;
  transition:
    border-color ease-in-out 0.15s,
    box-shadow ease-in-out 0.15s;
}

.content-textarea:focus {
  border-color: #66afe9;
  outline: 0;
  box-shadow:
    inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
}

.modal-container {
  width: 900px;
  height: auto;
  border: 1px solid #e0e0e0;
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-header {
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
  border-radius: 5px 5px 0 0;
  border-bottom: 1px solid #e5e5e5;
  color: #0080e3;
  font-weight: bold;
  font-size: 18px;
  text-align: left;
}

.modal-body {
  padding: 20px;
  flex: 1;
  align-items: center;
}

.main-theme h3 {
  margin-right: 10px;
}

.main-theme,
.content-section {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.content-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: right;
}

.main-theme h3,
.content-section h3 {
  color: #333;
  margin-bottom: 10px;
  font-size: 16px;
}

.theme-content,
.content-text {
  display: block;
  width: 640px;
  height: 20px;
  padding: 6px 12px;
  font-size: 14px;
  color: #555555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  transition:
    border-color ease-in-out 0.15s,
    box-shadow ease-in-out 0.15s;
}

.theme-content:focus {
  border-color: #66afe9;
  outline: 0;
  box-shadow:
    inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
}

.button-container {
  padding: 15px;
  width: 750px;
}

.button-wrapper {
  text-align: right;
}

.send-button {
  background-color: #0080e3;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

.send-button:hover {
  background-color: #006fc3;
}

.close-button {
  background-color: #fff;
  color: #333;
  border: 1px solid #ccc;
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.close-button:hover {
  background-color: #ebebeb;
}
</style>
