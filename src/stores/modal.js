// stores/modal.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const showLoginModal = ref(false)
  const afterLoginRedirect = ref(false)

  // 新增：用于记录跳转路径
  const redirectPath = ref('/')

  const openLoginModal = () => {
    showLoginModal.value = true
    afterLoginRedirect.value = true
  }

  const closeLoginModal = () => {
    showLoginModal.value = false
  }

  const setRedirectPath = (path) => {
    redirectPath.value = path
  }

  const clearRedirectPath = () => {
    redirectPath.value = '/'
  }

  const clearRedirectFlag = () => {
    afterLoginRedirect.value = false
  }

  return {
    showLoginModal,
    openLoginModal,
    closeLoginModal,
    afterLoginRedirect,
    clearRedirectFlag,
    redirectPath, // ✅ 记得 return
    setRedirectPath, // ✅ 记得 return
    clearRedirectPath, // ✅ 记得 return
  }
})
