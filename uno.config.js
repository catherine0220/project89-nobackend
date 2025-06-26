// uno.config.js
import {
  defineConfig,
  presetAttributify,
  presetWind,
  presetTypography,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  include: [/.*\/.*\.(vue|html|jsx|tsx)$/],
  presets: [presetAttributify(), presetWind(), presetTypography()],
  transformers: [
    transformerDirectives(), // 💡 启用 @apply 等指令
  ],
})
