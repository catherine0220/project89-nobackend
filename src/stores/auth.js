// stores/auth.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const user = ref(null)

  const login = (userData, password = '') => {
    isLoggedIn.value = true
    user.value = { ...userData, password } // 💡 把密码也一起存起来
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  const logout = () => {
    isLoggedIn.value = false
    user.value = null
    localStorage.removeItem('user')
  }

  const initialize = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      isLoggedIn.value = true
      user.value = JSON.parse(storedUser)
    }
  }

  return { isLoggedIn, user, login, logout, initialize }
})
