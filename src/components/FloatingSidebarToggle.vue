<script setup>
import { defineProps, defineEmits } from 'vue'

// export default {
// 移除多余的默认导出，因为使用了 <script setup>，可直接在 <script setup> 顶部添加 name
// 原代码中 `export default` 块移除，不保留任何内容，此处留空
// }

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['toggle'])

const handleToggle = () => {
  emit('toggle')
}
</script>

<template>
  <button 
    class="floating-sidebar-toggle"
    @click="handleToggle"
    :class="{ 'is-open': isOpen }"
    aria-label="{{ isOpen ? '关闭侧边栏' : '打开侧边栏' }}"
  >
    <i :class="isOpen ? 'fas fa-x' : 'fas fa-align-left'"></i>
  </button>
</template>

<style scoped>
.floating-sidebar-toggle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
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
}

.floating-sidebar-toggle:hover {
  background-color: var(--color-primary-dark);
  transform: scale(1.05);
}

.floating-sidebar-toggle.is-open {
  background-color: #e74c3c;
}

@media (min-width: 993px) {
  .floating-sidebar-toggle {
    display: none;
  }
}
</style>