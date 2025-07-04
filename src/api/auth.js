import axios from 'axios'

export const register = (data) => {
  return axios
    .post('http://192.168.0.122/silver/user/user_register.php', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((response) => {
      // 根据API响应格式调整
      if (response.data.success) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || '注册成功',
        }
      } else {
        return {
          success: false,
          message: response.data.message || '注册失败',
          errors: response.data.errors || {},
        }
      }
    })
    .catch((error) => {
      // 处理网络错误或服务器错误
      return {
        success: false,
        message: error.response?.data?.message || error.message || '网络错误',
        errors: error.response?.data?.errors || {},
      }
    })
}
