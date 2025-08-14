<template>
  <footer class="footer">
    <div class="container">
      <p>&copy; {{ new Date().getFullYear() }} 个人博客. 保留所有权利.</p>
      <div class="social-links">
        <a href="#" class="social-link"><i class="fab fa-github"></i></a>
        <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
        <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #333;
  color: white;
  padding: 2rem 0;
  text-align: center;
  margin-top: 2rem;
}

.footer p {
  margin: 0 0 1rem 0;
  opacity: 0.8;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.social-link {
  color: white;
  font-size: 1.2rem;
  transition: color 0.3s ease, transform 0.3s ease;
}

.social-link:hover {
  color: #667eea;
  transform: translateY(-3px);
}

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>