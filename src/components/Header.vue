<script setup>
import { useThemeStore } from '../store/themeStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 引入主题存储
const { currentTheme, toggleTheme } = useThemeStore()
const router = useRouter()
const drawerOpen = ref(false)

// 菜单数据
const menuItems = [
  { path: '/', label: '首页' },
  { path: '/about', label: '关于我' },
  { path: '/blog', label: '博客' }
]

// 导航到指定路径
const navigateTo = (path) => {
  router.push(path)
  drawerOpen.value = false
}
</script>

<template>
  <header class="header">
    <div class="header-content container-full">
      <h1 class="blog-title">个人博客</h1>

      <!-- 桌面导航 -->
      <nav class="nav desktop-nav">
        <ul class="nav-list">
          <li v-for="item in menuItems" :key="item.path" class="nav-item">
            <router-link :to="item.path" class="nav-link">{{ item.label }}</router-link>
          </li>
        </ul>
      </nav>

      <!-- 主题切换按钮 -->
      <button class="theme-toggle" @click="toggleTheme" aria-label="切换主题">
        <i :class="currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun'"></i>
      </button>

      <!-- 移动端菜单按钮 -->
      <button class="menu-toggle" @click="drawerOpen = !drawerOpen" aria-label="打开菜单">
        <i class="fas fa-bars"></i>
      </button>
    </div>

    <!-- 抽屉导航 -->
    <div class="drawer" :class="{ 'drawer-open': drawerOpen }">
      <div class="drawer-content">
        <button class="close-drawer" @click="drawerOpen = false" aria-label="关闭菜单">
          <i class="fas fa-times"></i>
        </button>
        <nav class="mobile-nav">
          <ul class="nav-list">
            <li v-for="item in menuItems" :key="item.path" class="nav-item">
              <button @click="navigateTo(item.path)" class="nav-link">{{ item.label }}</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- 遮罩层 -->
    <div class="overlay" :class="{ 'overlay-visible': drawerOpen }" @click="drawerOpen = false"></div>
  </header>
</template>

<style scoped>
.header {
  background: linear-gradient(135deg, var(--color-primary) 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 100;
}

/* 主题切换按钮 */
.theme-toggle {
  background: transparent;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.theme-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: rotate(15deg);
}

/* 移动端菜单按钮 */
.menu-toggle {
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  display: none;
}

/* 抽屉导航 */
.drawer {
  position: fixed;
  top: 0;
  right: -300px;
  width: 300px;
  height: 100vh;
  background-color: var(--color-card);
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  z-index: 500;
}

.drawer-open {
  right: 0;
}

.drawer-content {
  padding: 2rem 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.close-drawer {
  align-self: flex-end;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: var(--color-text);
  cursor: pointer;
  padding: 0.5rem;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 400;
}

.overlay-visible {
  opacity: 1;
  visibility: visible;
}

.mobile-nav {
  margin-top: 2rem;
}

.mobile-nav .nav-list {
  flex-direction: column;
  gap: 1rem;
}

.mobile-nav .nav-link {
  color: var(--color-text);
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.8rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.mobile-nav .nav-link:hover {
  background-color: var(--color-background-alt);
  transform: none;
}

.mobile-nav .nav-link::after {
  display: none;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .menu-toggle {
    display: block;
  }
}

@media (min-width: 769px) {
  .drawer {
    display: none;
  }

  .overlay {
    display: none;
  }
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 100%;
  padding: 0 1rem;
}

.container-full {
  width: 90%;
  max-width: 90%;
  padding: 0 1rem;
  margin: 0 auto;
}

.container-fluid {
  width: 80%;
  max-width: 80%;
  padding: 0 1rem;
  margin: 0 auto;
}

.blog-title {
  margin: 0;
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.blog-title:hover {
  transform: scale(1.03);
}

.nav-list {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 1.5rem;
  margin: 0;
}

.nav-item {
  position: relative;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: all 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: white;
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: #f0f0f0;
  transform: translateY(-2px);
}

.nav-link:hover::after {
  width: 100%;
}

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
}
</style>