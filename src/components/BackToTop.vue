<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// 控制组件显示状态
const isVisible = ref(false)

// 滚动监听函数
const handleScroll = () => {
  // 当滚动超过300px时显示回到顶部按钮
  isVisible.value = window.scrollY > 300
}

// 回到顶部函数
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// 注册滚动事件
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

// 清理事件监听
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <button
    class="back-to-top"
    :class="{ 'visible': isVisible }"
    @click="scrollToTop"
    aria-label="回到顶部"
    v-show="isVisible"
  >
    <i class="fas fa-arrow-up"></i>
  </button>
</template>

<style scoped>
.back-to-top {
  width: 40px;
  height: 40px;
  border-radius: 12px; /* 改为圆角矩形 */
  background-color: var(--color-primary);
  color: white;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
}

.back-to-top.visible {
  opacity: 1;
  transform: translateY(0);
}

.back-to-top:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-3px);
}
</style>