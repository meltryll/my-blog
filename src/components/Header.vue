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
  { path: '/', label: '首页', icon: 'fas fa-home' },
  { path: '/about', label: '关于我', icon: 'fas fa-user' },
  { path: '/blog', label: '博客', icon: 'fas fa-blog' }
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
      <div class="header-left">
        <div class="blog-logo-title">
          <i class="fas fa-feather-alt blog-icon"></i>
          <h1 class="blog-title">个人博客</h1>
        </div>
        <p class="blog-tagline">分享知识，记录生活</p>
      </div>

      <div class="header-right">
        <!-- 主题切换按钮 -->
        <button class="theme-toggle" @click="toggleTheme" aria-label="切换主题">
          <i :class="currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun'"></i>
        </button>

        <!-- 移动端菜单按钮 -->
        <button class="menu-toggle" @click="drawerOpen = !drawerOpen" aria-label="打开菜单">
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </div>

    <!-- 抽屉导航 -->
    <div class="drawer" :class="{ 'drawer-open': drawerOpen }">
      <div class="drawer-content">
        <div class="drawer-header">
          <h2 class="drawer-title">导航菜单</h2>
          <button class="close-drawer" @click="drawerOpen = false" aria-label="关闭菜单">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <nav class="mobile-nav">
          <ul class="nav-list">
            <li v-for="item in menuItems" :key="item.path" class="nav-item">
              <button @click="navigateTo(item.path)" class="nav-link">
                <i :class="item.icon"></i>
                <span>{{ item.label }}</span>
              </button>
            </li>
          </ul>
        </nav>
        <div class="drawer-footer">
          <p class="copyright">&copy; {{ new Date().getFullYear() }} 个人博客</p>
        </div>
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
  display: block;
}

/* 抽屉导航 */
.drawer {
  position: fixed;
  top: 0;
  right: -300px;
  width: 300px;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  box-shadow: -5px 0 20px rgba(0, 0, 0, 0.15);
  transition: right 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 500;
  overflow: hidden;
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

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.drawer-title {
  font-size: 1.5rem;
  margin: 0;
  background: linear-gradient(to right, #764ba2, #667eea);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 700;
}

.close-drawer {
  align-self: flex-end;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: var(--color-text);
  cursor: pointer;
  padding: 0.5rem;
  transition: transform 0.3s ease, color 0.3s ease;
}

.close-drawer:hover {
  transform: rotate(90deg);
  color: #764ba2;
}

.drawer-footer {
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
}

.drawer-footer .copyright {
  font-size: 0.9rem;
  color: #666;
  text-align: center;
  margin: 0;
  padding: 1rem 0;
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
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.mobile-nav .nav-link i {
  margin-right: 10px;
  font-size: 1.2rem;
  width: 24px;
  text-align: center;
}

.mobile-nav .nav-link span {
  position: relative;
  z-index: 1;
}

.mobile-nav .nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background-color: rgba(118, 75, 162, 0.1);
  transition: left 0.3s ease;
}

.mobile-nav .nav-link:hover {
  color: #764ba2;
  transform: translateX(5px);
}

.mobile-nav .nav-link:hover::before {
  left: 0;
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
    display: block;
  }

  .overlay {
    display: block;
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
  padding: 0 1.5rem;
}

.header-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.blog-logo-title {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.blog-icon {
  font-size: 1.8rem;
  color: #fff;
  opacity: 0.9;
}

.blog-tagline {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.85);
  margin: 0.3rem 0 0 0;
  font-weight: 300;
}

@media (max-width: 768px) {
  .header-left {
    align-items: center;
    text-align: center;
  }
}

.header-right {
  display: flex;
  gap: 1rem;
  align-items: center;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }

  .header-left,
  .header-right {
    width: 100%;
    justify-content: center;
    align-items: center;
  }
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