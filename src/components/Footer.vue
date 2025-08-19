<script setup>
import { useThemeStore } from '../store/themeStore'

// 引入主题存储
const { currentTheme } = useThemeStore()
</script>

<template>
  <footer class="footer" :class="currentTheme">
    <div class="container-full">
      <div class="footer-content">
        <div class="footer-left">
          <div class="footer-info">
            <h3 class="footer-title">个人博客</h3>
            <p class="footer-description">分享我的知识、经验和见解</p>
          </div>
        </div>
        <div class="footer-right">
          <div class="social-links">
            <a href="#" class="social-link"><i class="fab fa-github"></i></a>
            <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>
      <p class="copyright">&copy; {{ new Date().getFullYear() }} 个人博客. 保留所有权利.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--color-background-alt);
  color: var(--color-text);
  padding: 2.5rem 0;
  margin-top: 2rem;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  width: 100%;
}

.footer-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.footer-right {
  display: flex;
  gap: 1.2rem;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 1.5rem;
  }

  .footer-left,
  .footer-right {
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  .footer-info {
    text-align: center;
  }
}

.footer-info {
  flex: 1;
  min-width: 200px;
}

.footer-title {
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
  color: var(--color-primary);
}

.footer-description {
  margin: 0;
  color: var(--color-text-light);
}

.social-links {
  display: flex;
  gap: 1.2rem;
}

.social-link {
  color: var(--color-text);
  font-size: 1.3rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--color-background);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: color 0.3s ease, transform 0.3s ease, background-color 0.3s ease;
}

.social-link:hover {
  color: var(--color-primary);
  transform: translateY(-3px);
  background-color: var(--color-background);
}

.copyright {
  margin: 0;
  text-align: center;
  color: var(--color-text-light);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
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

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>