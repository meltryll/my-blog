import { ref, computed } from 'vue'

// 初始化主题，优先从localStorage读取，否则使用系统偏好
const savedTheme = localStorage.getItem('theme')
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
const currentTheme = ref(savedTheme || systemTheme)

// 切换主题
const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', currentTheme.value)
  updateDocumentTheme()
}

// 更新文档主题
const updateDocumentTheme = () => {
  document.documentElement.setAttribute('data-theme', currentTheme.value)
}

// 初始更新文档主题
updateDocumentTheme()

// 导出可组合函数
export function useThemeStore() {
  return {
    currentTheme: computed(() => currentTheme.value),
    toggleTheme
  }
}