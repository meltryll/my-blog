<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 分类数据
const categories = [
  { id: 1, name: '技术', count: 12 },
  { id: 2, name: '生活', count: 8 },
  { id: 3, name: '旅行', count: 5 },
  { id: 4, name: '美食', count: 3 },
  { id: 5, name: '读书', count: 7 }
]

// 热门标签
const tags = [
  { name: 'Vue', count: 24 },
  { name: 'JavaScript', count: 18 },
  { name: '前端', count: 15 },
  { name: 'CSS', count: 12 },
  { name: 'HTML', count: 10 },
  { name: 'React', count: 8 },
  { name: 'TypeScript', count: 7 }
]

const router = useRouter()

// 导航到分类页面
const navigateToCategory = (category) => {
  router.push({ path: '/blog', query: { category } })
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-section">
      <h3 class="sidebar-title">博客分类</h3>
      <ul class="category-list">
        <li v-for="category in categories" :key="category.id" class="category-item">
          <button @click="navigateToCategory(category.name)" class="category-link">
            {{ category.name }}
            <span class="category-count">({{ category.count }})</span>
          </button>
        </li>
      </ul>
    </div>

    <div class="sidebar-section">
      <h3 class="sidebar-title">热门标签</h3>
      <div class="tag-cloud">
        <span v-for="tag in tags" :key="tag.name" class="tag">
          {{ tag.name }} <span class="tag-count">({{ tag.count }})</span>
        </span>
      </div>
    </div>

    <div class="sidebar-section">
      <h3 class="sidebar-title">关于我</h3>
      <div class="about-me">
        <p>热爱技术和分享的前端开发者，热衷于探索新技术和解决问题。</p>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 100%;
  max-width: 300px;
  padding: 1.5rem;
  background-color: var(--color-background);
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  height: fit-content;
}

.sidebar-section {
  margin-bottom: 2rem;
}

.sidebar-title {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--color-primary);
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--color-primary-light);
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  margin-bottom: 0.5rem;
}

.category-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
  background-color: var(--color-background-light);
  border-radius: 4px;
  border: none;
  text-align: left;
  color: var(--color-text);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.category-link:hover {
  background-color: var(--color-background-alt);
  color: var(--color-primary);
}

.category-count {
  font-size: 0.8rem;
  color: var(--color-text-light);
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.3rem 0.6rem;
  background-color: var(--color-background-light);
  border-radius: 16px;
  font-size: 0.85rem;
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.3s ease;
}

.tag:hover {
  background-color: var(--color-primary-light);
  color: var(--color-primary);
}

.tag-count {
  font-size: 0.7rem;
  color: var(--color-text-light);
}

.about-me {
  padding: 1rem;
  background-color: var(--color-background-light);
  border-radius: 4px;
}

@media (max-width: 992px) {
  .sidebar {
    max-width: 100%;
    margin-bottom: 2rem;
  }
}
</style>