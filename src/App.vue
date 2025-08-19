<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'

  // 侧边栏状态管理
  const sidebarOpen = ref(false)
  const isSmallScreen = ref(window.innerWidth < 993)

  // 监听窗口大小变化
  const handleResize = () => {
    isSmallScreen.value = window.innerWidth < 993
    // 在大屏幕上自动打开侧边栏
    if (!isSmallScreen.value) {
      sidebarOpen.value = true
    }
  }

  // 初始化和清理事件监听
  onMounted(() => {
    window.addEventListener('resize', handleResize)
    // 初始化侧边栏状态
    sidebarOpen.value = !isSmallScreen.value
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
  })

  // 切换侧边栏功能已移至各页面组件中实现
// 全局应用入口
</script>

<template>
  <div class="app">
    <Header />
    <main class="main-content">
      <router-view v-slot="{ Component }">
          <transition name="page-transition" mode="out-in">
            <component 
              :is="Component"
              :key="$route.fullPath"
              :sidebar-open="sidebarOpen"
              :is-small-screen="isSmallScreen"
            />
          </transition>
        </router-view>
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.app {
  font-family: 'Inter', 'system-ui', -apple-system, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background);
  width: 100%;
  max-width: 100%;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* 页面过渡动画 */
.page-transition-enter-active,
.page-transition-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.page-transition-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-transition-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* 全局滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}

/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--color-background);
  color: var(--color-text);
  line-height: 1.6;
}
</style>
