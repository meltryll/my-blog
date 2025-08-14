<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
const isHovered = ref(false)
</script>

<template>
  <div class="hello-world-container">
    <h1 class="hello-title">{{ msg }}</h1>

    <!-- <div class="card" :class="{ 'card-hover': isHovered }
         @mouseenter="isHovered = true"
         @mouseleave="isHovered = false">
      <button type="button" @click="count++" class="count-button">
        count is {{ count }}
      </button>
      <p class="edit-instructions">
        Edit
        <code>components/HelloWorld.vue</code> to test HMR
      </p>
    </div> -->

    <div class="links-container">
      <p class="link-item">
        Check out
        <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank" class="external-link">
          create-vue
        </a>, the official Vue + Vite starter
      </p>
      <p class="link-item">
        Learn more about IDE Support for Vue in the
        <a
          href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
          target="_blank"
          class="external-link"
        >
          Vue Docs Scaling up Guide
        </a>.
      </p>
    </div>

    <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
  </div>
</template>

<style scoped>
.hello-world-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.hello-title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
}

.card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.card-hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.count-button {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
}

.count-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(118, 75, 162, 0.4);
  background: linear-gradient(45deg, #5a6fe5, #6a4099);
}

.count-button:active {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(118, 75, 162, 0.4);
}

.edit-instructions {
  color: #666;
  font-size: 1rem;
  margin: 0;
}

code {
  background-color: #f5f5f5;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: monospace;
  color: #764ba2;
}

.links-container {
  margin-bottom: 2rem;
  text-align: left;
}

.link-item {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.external-link {
  color: #667eea;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
}

.external-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 0;
  background-color: #764ba2;
  transition: width 0.3s ease;
}

.external-link:hover {
  color: #764ba2;
}

.external-link:hover::after {
  width: 100%;
}

.read-the-docs {
  color: #888;
  font-size: 0.9rem;
  margin-top: 2rem;
}
</style>
