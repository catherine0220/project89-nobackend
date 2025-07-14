// utils/auth.js ✅ 只负责初始化 Pinia 的登录状态
import { useAuthStore } from '@/stores/auth'

export function useAuth() {
  const authStore = useAuthStore()
  authStore.initialize() // 初始化登录状态
}
