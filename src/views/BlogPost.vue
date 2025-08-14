<template>
  <div class="blog-post">
    <Header />

    <main class="content container">
      <div v-if="post" class="post">
        <div class="post-header">
          <h2 class="post-title">{{ post.title }}</h2>
          <div class="post-meta">
            <span class="post-date">{{ post.date }}</span>
            <span class="post-category">{{ post.category }}</span>
          </div>
        </div>

        <div class="post-featured-image">
          <img :src="`https://picsum.photos/id/${1000 + post.id}/1200/600`" :alt="post.title" class="featured-img">
        </div>

        <div class="post-content" v-html="parsedContent"></div>

        <div class="post-navigation">
          <div v-if="prevPost" class="prev-post">
            <span class="nav-label">上一篇</span>
            <router-link :to="{ name: 'blogPost', params: { id: prevPost.id } }" class="nav-link">{{ prevPost.title }}</router-link>
          </div>
          <div v-if="nextPost" class="next-post">
            <span class="nav-label">下一篇</span>
            <router-link :to="{ name: 'blogPost', params: { id: nextPost.id } }" class="nav-link">{{ nextPost.title }}</router-link>
          </div>
        </div>

        <div class="comments-section">
          <h3 class="comments-title">评论</h3>
          <div class="comment-form">
            <textarea placeholder="写下你的评论..." v-model="commentText" class="comment-input"></textarea>
            <button @click="submitComment" class="btn btn-primary">提交评论</button>
          </div>

          <div class="comments-list" v-if="comments.length > 0">
            <div class="comment-item" v-for="comment in comments" :key="comment.id">
              <div class="comment-avatar">
                <img :src="`https://picsum.photos/id/${1010 + comment.id}/100/100`" alt="评论者头像" class="avatar">
              </div>
              <div class="comment-content">
                <div class="comment-header">
                  <span class="comment-author">{{ comment.author }}</span>
                  <span class="comment-date">{{ comment.date }}</span>
                </div>
                <p class="comment-text">{{ comment.text }}</p>
              </div>
            </div>
          </div>
          <p v-else class="no-comments">暂无评论，来抢沙发吧！</p>
        </div>
      </div>

      <div v-else class="not-found">
        <div class="not-found-content">
          <h2 class="not-found-title">文章未找到</h2>
          <p class="not-found-message">抱歉，请求的文章不存在。</p>
          <router-link to="/blog" class="btn btn-primary">返回博客列表</router-link>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { marked } from 'marked'
import { getPostById, getPosts } from '../api/postApi'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

const route = useRoute()
const router = useRouter()
const post = ref(null)
const parsedContent = ref('')
const loading = ref(true)
const allPosts = ref([])
const prevPost = ref(null)
const nextPost = ref(null)
const commentText = ref('')
const comments = ref([
  { id: 1, author: '游客', date: '2023-10-01', text: '这篇文章写得真好！' },
  { id: 2, author: 'Vue爱好者', date: '2023-10-02', text: '学习了，感谢分享！' }
])

onMounted(async () => {
  loading.value = true
  try {
    // 根据路由参数获取文章
    const postId = parseInt(route.params.id)
    const foundPost = await getPostById(postId)
    const postsData = await getPosts()
    allPosts.value = postsData

    if (foundPost) {
      post.value = foundPost
      parsedContent.value = marked.parse(foundPost.content || '')
      // 查找上一篇和下一篇文章
      const postIndex = allPosts.value.findIndex(p => p.id === postId)
      if (postIndex > 0) {
        prevPost.value = allPosts.value[postIndex - 1]
      }
      if (postIndex < allPosts.value.length - 1) {
        nextPost.value = allPosts.value[postIndex + 1]
      }
    } else {
      post.value = null
    }
  } catch (error) {
    console.error('Failed to fetch post:', error)
    post.value = null
  }
  loading.value = false
})

// 提交评论
const submitComment = () => {
  if (commentText.value.trim()) {
    const newComment = {
      id: comments.value.length + 1,
      author: '当前用户',
      date: new Date().toISOString().split('T')[0],
      text: commentText.value.trim()
    }
    comments.value.unshift(newComment)
    commentText.value = ''
  }
}
</script>

<style scoped>
.blog-post {
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

.post {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 2rem;
}

.post-header {
  margin-bottom: 2rem;
}

.post-title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.post-meta {
  display: flex;
  gap: 1.5rem;
  font-size: 0.9rem;
  color: #777;
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

.post-featured-image {
  width: 100%;
  height: 400px;
  overflow: hidden;
  margin-bottom: 2rem;
  border-radius: 8px;
}

.featured-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.post:hover .featured-img {
  transform: scale(1.02);
}

.post-content {
  color: #333;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.post-content h2,
.post-content h3 {
  color: #222;
  margin: 1.5rem 0 1rem;
}

.post-content p {
  margin-bottom: 1rem;
}

.post-content img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1rem 0;
}

.post-content a {
  color: #667eea;
  text-decoration: none;
  transition: color 0.3s ease;
}

.post-content a:hover {
  color: #764ba2;
  text-decoration: underline;
}

.post-navigation {
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;
  padding: 1.5rem 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.prev-post,
.next-post {
  max-width: 45%;
}

.nav-label {
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 0.5rem;
  display: block;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  display: block;
}

.nav-link:hover {
  color: #764ba2;
}

.comments-section {
  margin-top: 3rem;
}

.comments-title {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;
}

.comments-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
}

.comment-form {
  margin-bottom: 2rem;
}

.comment-input {
  width: 100%;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: vertical;
  min-height: 120px;
  font-size: 1rem;
  margin-bottom: 1rem;
  transition: border-color 0.3s ease;
}

.comment-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
}

.comments-list {
  margin-top: 2rem;
}

.comment-item {
  display: flex;
  gap: 1rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid #eee;
}

.comment-item:last-child {
  border-bottom: none;
}

.comment-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.comment-author {
  font-weight: 600;
  color: #333;
}

.comment-date {
  font-size: 0.8rem;
  color: #999;
}

.comment-text {
  color: #555;
  line-height: 1.6;
}

.no-comments {
  color: #777;
  text-align: center;
  padding: 2rem 0;
}

.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.not-found-content {
  text-align: center;
  padding: 2rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.not-found-title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
}

.not-found-message {
  color: #666;
  margin-bottom: 1.5rem;
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

@media (max-width: 768px) {
  .post {
    padding: 1.5rem;
  }

  .post-title {
    font-size: 2rem;
  }

  .post-featured-image {
    height: 250px;
  }

  .post-navigation {
    flex-direction: column;
    gap: 2rem;
  }

  .prev-post,
  .next-post {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .post-title {
    font-size: 1.8rem;
  }

  .post-featured-image {
    height: 200px;
  }
}
</style>