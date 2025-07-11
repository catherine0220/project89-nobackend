import axios from 'axios'

export const getGameList = (params = {}) => {
  // 设置默认参数（status默认为1）
  const defaultParams = { status: 1 }
  const requestParams = { ...defaultParams, ...params }

  return axios
    .get('http://192.168.0.122/silver/user/game_list.php', {
      params: requestParams,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response.data.success) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || '获取游戏列表成功',
        }
      } else {
        return {
          success: false,
          message: response.data.message || '获取游戏列表失败',
          errors: response.data.errors || {},
        }
      }
    })
    .catch((error) => {
      return {
        success: false,
        message: error.response?.data?.message || error.message || '网络错误',
        errors: error.response?.data?.errors || {},
      }
    })
}
