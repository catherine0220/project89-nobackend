// src/utils/captcha.js
/**
 * 纯前端验证码生成
 */
export const generateCaptcha = () => {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'
  const text = Array.from({ length: 4 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length)),
  ).join('')

  const svg = `
    <svg width="120" height="40" viewBox="0 0 120 40">
      <rect width="100%" height="100%" fill="#f5f5f5" rx="4"/>
      ${[...text]
        .map(
          (char, i) => `
        <text x="${20 + i * 25}" y="28" font-size="24"
              transform="rotate(${Math.random() * 15 - 7.5}, ${20 + i * 25}, 28)"
              fill="#${Math.floor(Math.random() * 0xaaaaaa + 0x555555).toString(16)}"
              font-weight="bold" font-family="Arial, sans-serif">
          ${char}
        </text>
      `,
        )
        .join('')}
      <line x1="0" y1="${Math.random() * 30 + 5}" x2="120" y2="${Math.random() * 30 + 5}" 
            stroke="#999" stroke-width="1" opacity="0.6"/>
    </svg>
  `

  return {
    svg,
    text: text.toLowerCase(),
    token: `mock_${Date.now()}`,
  }
}

/**
 * 获取验证码（自动区分环境）
 */
export const getCaptcha = async () => {
  if (import.meta.env.MODE === 'development') {
    return generateCaptcha()
  } else {
    try {
      const res = await fetch('/api/captcha')
      return await res.json()
    } catch {
      return generateCaptcha() // API失败时回退
    }
  }
}
