<template>
  <div class="home">
    <div class="container-full">
      <div class="content-wrapper">
        <main class="main-content">
          <section class="hero" ref="heroSection">
            <div class="hero-overlay"></div>
            <div class="hero-background"></div>
            <div class="hero-content">
              <h2 class="hero-title">欢迎访问我的个人博客</h2>
              <p class="hero-subtitle">分享我的学习心得、技术见解和生活点滴</p>
              <router-link to="/blog" class="btn btn-primary">查看博客</router-link>
            </div>
          </section>

          <section class="features parallax-section" ref="featuresSection">
            <div class="container-full">
              <h3 class="section-title">我的专长</h3>
              <div class="features-grid">
                <div class="feature-card" v-for="feature in features" :key="feature.id">
                  <div class="feature-icon"><i :class="feature.icon"></i></div>
                  <h4 class="feature-title">{{ feature.title }}</h4>
                  <p class="feature-description">{{ feature.description }}</p>
                </div>
              </div>
            </div>
          </section>

          <section class="latest-posts">
            <h3 class="section-title">最新文章</h3>
            <div class="posts-grid">
              <div class="post-card" v-for="post in latestPosts" :key="post.id">
                <div class="post-card-inner">
                  <div class="post-card-image">
                    <img :src="`https://picsum.photos/seed/${post.id}/400/200`" alt="${post.title}" class="post-image">
                  </div>
                  <div class="post-card-content">
                    <router-link :to="{ name: 'blogPost', params: { id: post.id } }" class="post-title">{{ post.title }}</router-link>
                    <p class="post-excerpt">{{ post.excerpt }}</p>
                    <div class="post-meta">
                      <span class="post-date">{{ post.date }}</span>
                      <span class="post-category">{{ post.category }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <aside class="sidebar-container" :class="{ 'sidebar-open': sidebarOpenLocal, 'sidebar-closed': !sidebarOpenLocal && isSmallScreen }">
          <Sidebar />
        </aside>

        <FloatingActionsContainer
          :sidebar-open="sidebarOpenLocal"
          :show-toggle="true"
          @toggle-sidebar="toggleSidebar"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineProps, watch } from 'vue'
import { getPosts } from '../api/postApi'
import Sidebar from '../components/Sidebar.vue'
import FloatingActionsContainer from '../components/FloatingActionsContainer.vue'

const props = defineProps({
  sidebarOpen: {
    type: Boolean,
    required: true
  },
  isSmallScreen: {
    type: Boolean,
    required: true
  }
})

// 侧边栏状态管理
const sidebarOpenLocal = ref(props.sidebarOpen)

// 监听props变化
watch(() => props.sidebarOpen, (newValue) => {
  sidebarOpenLocal.value = newValue
})

// 切换侧边栏
const toggleSidebar = () => {
  sidebarOpenLocal.value = !sidebarOpenLocal.value
}

// 最新文章数据
const latestPosts = ref([])
const loading = ref(true)

// 特色内容数据
const features = ref([
  { id: 1, title: 'Web开发', icon: 'fas fa-code', description: '精通HTML、CSS和JavaScript，专注于构建响应式和交互式网站。' },
  { id: 2, title: 'Vue.js', icon: 'fab fa-vuejs', description: '熟练使用Vue.js框架开发单页应用，熟悉Composition API和Vuex。' },
  { id: 3, title: 'UI/UX设计', icon: 'fas fa-paint-brush', description: '注重用户体验，能够创建美观且功能完善的界面设计。' }
])

// 视差效果 refs
const heroSection = ref(null)
const featuresSection = ref(null)

// 初始化和清理事件监听
onMounted(() => {
})

onBeforeUnmount(() => {
})

// 视差滚动处理函数
const handleParallax = () => {
  if (heroSection.value && featuresSection.value) {
    const scrollY = window.scrollY
    
    // 英雄区域视差
    const heroBg = heroSection.value.querySelector('.hero-background')
    heroBg.style.transform = `translateY(${scrollY * 0.5}px)`
    
    // 特色区域视差
    const featuresOffset = featuresSection.value.offsetTop
    const featuresDistance = scrollY - featuresOffset
    if (featuresDistance > -300 && featuresDistance < 600) {
      featuresSection.value.style.backgroundPositionY = `${featuresDistance * 0.3}px`
    }
  }
}

// 注册滚动事件
onMounted(() => {
  window.addEventListener('scroll', handleParallax)
})

// 清理事件监听
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleParallax)
})

// 获取最新文章
onMounted(async () => {
  loading.value = true
  try {
    const postsData = await getPosts()
    // 按日期排序并取前3篇
    latestPosts.value = postsData
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3)
  } catch (error) {
    console.error('Failed to fetch latest posts:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* 基础布局 */
.home {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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

.content-wrapper {
  display: flex;
  gap: 2rem;
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
}

.sidebar-container {
  width: 300px;
  flex-shrink: 0;
  transition: transform 0.3s ease, width 0.3s ease, visibility 0.3s ease, opacity 0.3s ease;
}

.sidebar-closed {
  width: 0;
  transform: translateX(300px);
  overflow: hidden;
  visibility: hidden;
  opacity: 0;
}

.sidebar-open {
  transform: translateX(0);
  visibility: visible;
  opacity: 1;
}

@media (max-width: 992px) {
  .content-wrapper {
    gap: 0;
  }

  .sidebar-container {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    z-index: 900;
    background-color: var(--color-background);
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    padding-top: 60px;
    transform: translateX(300px);
    visibility: hidden;
    opacity: 0;
  }

  .sidebar-container.sidebar-open {
    transform: translateX(0);
    visibility: visible;
    opacity: 1;
  }
}

.main-content {
  flex: 1;
  min-width: 0;
}

/* 头部样式 */
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;
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

/* 英雄区域样式 */
.hero {
  position: relative;
  height: 70vh;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
} 

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120%;
  background: linear-gradient(135deg, var(--color-primary) 0%, #764ba2 100%);
  z-index: 0;
  transform: translateY(0);
  transition: transform 0.1s ease-out;
} 

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');
  z-index: 1;
} 

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  padding: 2rem;
  animation: fadeIn 1s ease-out, slideUp 0.8s ease-out 0.2s both;
  max-width: 800px;
  margin: 0 auto;
} 

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
} 

@keyframes slideUp {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  padding: 2rem;
  animation: fadeIn 1s ease-out;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.hero-subtitle {
  font-size: 1.3rem;
  margin-bottom: 2rem;
}

.btn {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: white;
  color: var(--color-primary);
}

.btn-primary:hover {
  background-color: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.features {
  padding: 6rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  background-attachment: fixed;
  position: relative;
}

.parallax-section {
  overflow: hidden;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
}

.feature-card {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.feature-icon {
  font-size: 3rem;
  color: var(--color-primary);
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1) rotate(5deg);
}

.feature-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--color-text);
}

.feature-description {
  color: #666;
  line-height: 1.6;
}

.latest-posts {
  padding: 6rem 0;
  background-color: var(--color-background);
}

.section-title {
  font-size: 2rem;
  margin-bottom: 2.5rem;
  text-align: center;
  color: var(--color-primary);
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
}

.post-card {
  background-color: var(--color-background);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.post-card-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.post-card-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.post-card:hover .post-image {
  transform: scale(1.05);
}

.post-card-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.post-title {
  font-size: 1.4rem;
  margin-bottom: 0.8rem;
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.3s ease;
}

.post-title:hover {
  color: var(--color-primary);
}

.post-excerpt {
  color: var(--color-text-light);
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: var(--color-text-light);
}

.post-date {
  display: flex;
  align-items: center;
}

.post-date::before {
  content: '\f073';
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  margin-right: 0.5rem;
}

.post-category {
  display: flex;
  align-items: center;
}

.post-category::before {
  content: '\f02b';
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  margin-right: 0.5rem;
}

.sidebar-container {
  width: 100%;
  max-width: 320px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 992px) {
  .content-wrapper {
    flex-direction: column;
  }

  .sidebar-container {
    max-width: 100%;
    order: -1;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .posts-grid {
    grid-template-columns: 1fr;
  }
}

.hero-title {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.8s ease-out;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.9;
  animation: slideUp 0.8s ease-out 0.2s both;
}

.btn {
  display: inline-block;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-primary {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 4px 15px rgba(118, 75, 162, 0.4);
  border: none;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(118, 75, 162, 0.6);
  background: linear-gradient(45deg, #5a6fe5, #6a4099);
}

.btn-primary:active {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(118, 75, 162, 0.5);
}

/* 最新文章区域样式 */
.latest-posts {
  padding: 4rem 0;
}

.section-title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #333;
  position: relative;
  padding-bottom: 1rem;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.post-card {
  perspective: 1000px;
  height: 100%;
}

.post-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.post-card:hover .post-card-inner {
  transform: rotateY(5deg) translateY(-10px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.post-card-content {
  padding: 1.5rem;
  background-color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.post-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
}

.post-title:hover {
  color: #764ba2;
}

.post-excerpt {
  color: #666;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #999;
}

.post-date,
.post-category {
  display: flex;
  align-items: center;
}

.post-date::before,
.post-category::before {
  content: '';
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #764ba2;
  margin-right: 0.5rem;
}

/* 底部样式 */
.footer {
  background-color: #333;
  color: white;
  padding: 2rem 0;
  text-align: center;
}

.footer p {
  margin: 0;
  opacity: 0.8;
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .posts-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .btn {
    padding: 0.6rem 1.5rem;
  }
}
</style>