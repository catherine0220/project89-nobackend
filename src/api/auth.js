// src/api/auth.js
import api from './index'

export const register = (data) =>
  api.post('/api/Api/Register', {
    username: data.username,
    password: data.password,
    real_name: data.realName,
    invitation_code: data.invitationCode || '',
  })

// Add this login export
export const login = (data) =>
  api.post('/api/Api/Login', {
    username: data.username,
    password: data.password,
  })
