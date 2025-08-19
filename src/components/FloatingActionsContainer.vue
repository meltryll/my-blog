<script setup>
import BackToTop from './BackToTop.vue'
import FloatingSidebarToggle from './FloatingSidebarToggle.vue'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  sidebarOpen: {
    type: Boolean,
    required: false,
    default: false
  },
  showToggle: {
    type: Boolean,
    required: false,
    default: true
  }
})

const emit = defineEmits(['toggleSidebar'])

const handleToggleSidebar = () => {
  emit('toggleSidebar')
}
</script>

<template>
  <div class="floating-actions-container">
    <template v-if="showToggle">
      <FloatingSidebarToggle
        :is-open="sidebarOpen"
        @toggle="handleToggleSidebar"
      />
    </template>
    <BackToTop />
  </div>
</template>

<style scoped>
.floating-actions-container {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column-reverse;
  gap: 0.5rem;
  z-index: 1000;
}

@media (min-width: 993px) {
  .floating-actions-container {
    flex-direction: row;
  }
}
</style>