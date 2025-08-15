<template>
  <div class="blog">

    <main class="content container-fluid">
      <h2 class="page-title">博客文章</h2>

      <div class="blog-filters">
        <div class="category-filter">
          <label>分类:</label>
          <select v-model="selectedCategory" class="category-select">
            <option value="all">全部</option>
            <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
          </select>
        </div>
      </div>

      <div class="posts-grid">
        <div class="post-card" v-for="post in currentPagePosts" :key="post.id">
          <div class="post-card-inner">
            <div class="post-image">
              <img :src="`https://picsum.photos/id/${1000 + post.id}/600/400`" :alt="post.title" class="post-img">
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

      <div class="pagination" v-if="totalPages > 1">
        <button @click="prevPage" :disabled="currentPage === 1" class="pagination-btn prev-btn">&laquo; 上一页</button>
        <span class="pagination-info">第 {{ currentPage }} 页 / 共 {{ totalPages }} 页</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-btn next-btn">下一页 &raquo;</button>
      </div>
    </main>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getPosts, getCategories } from '../api/postApi'

// 博客文章数据
const posts = ref([])

// 分类数据
const categories = ref([])

// 当前选中的分类
const selectedCategory = ref('all')

// 当前页码
const currentPage = ref(1)

// 每页显示的文章数量
const postsPerPage = ref(2)

// 加载状态
const loading = ref(true)

// 获取文章数据
onMounted(async () => {
  loading.value = true
  try {
    const postsData = await getPosts()
    const categoriesData = await getCategories()
    posts.value = postsData
    categories.value = categoriesData
  } catch (error) {
    console.error('Failed to fetch data:', error)
  } finally {
    loading.value = false
  }
})

// 计算总页数
const totalPages = computed(() => {
  return Math.ceil(filteredPosts.value.length / postsPerPage.value)
})

// 根据分类筛选文章
const filteredPosts = computed(() => {
  if (selectedCategory.value === 'all') {
    return posts.value
  }
  return posts.value.filter(post => post.category === selectedCategory.value)
})

// 计算当前页显示的文章
const currentPagePosts = computed(() => {
  const startIndex = (currentPage.value - 1) * postsPerPage.value
  return filteredPosts.value.slice(startIndex, startIndex + postsPerPage.value)
})

// 上一页
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// 下一页
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
</script>

<style scoped>
.blog {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9f9f9;
}

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.content {
  flex: 1;
  padding: 2rem 0;
}

.container-fluid {
  width: 100%;
  max-width: 100%;
  padding: 0 1rem;
  margin: 0 auto;
}

.page-title {
  font-size: 2.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  padding-bottom: 0.5rem;
}

.page-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
}

.blog-filters {
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  display: flex;
  justify-content: flex-end;
}

.category-filter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.category-filter label {
  font-weight: 500;
  color: #333;
}

.category-select {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: white;
  font-size: 1rem;
  color: #333;
  transition: border-color 0.3s ease;
}

.category-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
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
  background-color: white;
}

.post-card:hover .post-card-inner {
  transform: rotateY(5deg) translateY(-10px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.post-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.post-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.post-card:hover .post-img {
  transform: scale(1.05);
}

.post-card-content {
  padding: 1.5rem;
  height: calc(100% - 200px);
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

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.pagination-btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pagination-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(118, 75, 162, 0.4);
  background: linear-gradient(45deg, #5a6fe5, #6a4099);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.pagination-info {
  color: #333;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .posts-grid {
    grid-template-columns: 1fr;
  }

  .blog-filters {
    justify-content: center;
  }
}
.container-fluid {
  width: 80%;
  max-width: 80%;
  padding: 0 1rem;
  margin: 0 auto;
}

</style>