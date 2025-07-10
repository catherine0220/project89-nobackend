// utils/auth.js
import { ref } from 'vue'

const isLoggedIn = ref(false)
const user = ref(null)

export function useAuth() {
  const login = (userData) => {
    isLoggedIn.value = true
    user.value = userData
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    isLoggedIn.value = false // 确保这里是直接赋值
    user.value = null
    localStorage.removeItem('user')
    console.log('Logged out, isLoggedIn:', isLoggedIn.value) // 调试
  }

  // 初始化时检查本地存储
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    isLoggedIn.value = true
    user.value = JSON.parse(storedUser)
  }

  return {
    isLoggedIn,
    user,
    login,
    logout,
  }
}
