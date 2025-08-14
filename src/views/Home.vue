<template>
  <div class="home">
    <Header />

    <main class="content">
      <section class="hero">
        <div class="hero-overlay"></div>
        <div class="hero-content container">
          <h2 class="hero-title">欢迎访问我的个人博客</h2>
          <p class="hero-subtitle">分享我的学习心得、技术见解和生活点滴</p>
          <router-link to="/blog" class="btn btn-primary">查看博客</router-link>
        </div>
      </section>

      <section class="latest-posts container">
        <h3 class="section-title">最新文章</h3>
        <div class="posts-grid">
          <div class="post-card" v-for="post in latestPosts" :key="post.id">
            <div class="post-card-inner">
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

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getPosts } from '../api/postApi'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

// 最新文章数据
const latestPosts = ref([])
const loading = ref(true)

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

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
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
  height: 60vh;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('https://picsum.photos/id/1068/1920/1080') center/cover no-repeat;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7));
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  padding: 2rem;
  animation: fadeIn 1s ease-out;
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