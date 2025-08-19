<template>
  <div class="about">


    <main class="content container-fluid">
      <h2 class="page-title">关于我</h2>
      <div class="about-content">
        <div class="profile-card">
          <div class="profile-image">
            <img src="https://picsum.photos/id/1005/300/300" alt="个人头像" class="avatar">
          </div>
          <div class="profile-info">
            <h3>你好，我是一名热爱技术的开发者</h3>
            <p>我热衷于前端开发，尤其喜欢Vue框架。这个博客是我分享学习心得、技术见解和生活点滴的地方。</p>
            <div class="skills">
              <h4>我的技能</h4>
              <div class="skill-tags">
                <span class="skill-tag">HTML5/CSS3</span>
                <span class="skill-tag">JavaScript/TypeScript</span>
                <span class="skill-tag">Vue.js</span>
                <span class="skill-tag">React</span>
                <span class="skill-tag">Node.js</span>
              </div>
            </div>
          </div>
        </div>

        <div class="timeline">
          <h3>我的经历</h3>
          <div class="timeline-item">
            <div class="timeline-date">2023 - 至今</div>
            <div class="timeline-content">
              <h4>高级前端开发工程师</h4>
              <p>负责公司核心产品的前端架构设计和开发，优化用户体验和性能。</p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-date">2020 - 2023</div>
            <div class="timeline-content">
              <h4>前端开发工程师</h4>
              <p>参与多个Web应用的开发，负责页面实现和交互逻辑。</p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-date">2016 - 2020</div>
            <div class="timeline-content">
              <h4>计算机科学与技术 学士</h4>
              <p>主修计算机科学与技术，辅修软件工程。</p>
            </div>
          </div>
        </div>

        <div class="contact-section">
          <h3>联系我</h3>
          <p>如果您有任何问题或合作意向，欢迎随时联系我。</p>
          <a href="mailto:example@example.com" class="btn btn-primary">发送邮件</a>
        </div>
      </div>
    </main>

    <FloatingActionsContainer :show-toggle="false" />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import FloatingActionsContainer from '../components/FloatingActionsContainer.vue'
</script>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9f9f9;
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

.content {
  flex: 1;
  padding: 2rem 0;
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

.about-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.profile-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.profile-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.profile-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1.5rem;
  border: 5px solid #f0f0f0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.profile-image:hover .avatar {
  transform: scale(1.1);
}

.profile-info h3 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1rem;
}

.profile-info p {
  color: #666;
  margin-bottom: 1.5rem;
  max-width: 700px;
}

.skills {
  margin-top: 1.5rem;
}

.skills h4 {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 1rem;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.skill-tag {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: transform 0.3s ease;
}

.skill-tag:hover {
  transform: translateY(-2px);
}

.timeline {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.timeline h3 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
}

.timeline-item {
  display: flex;
  margin-bottom: 1.5rem;
  position: relative;
  padding-left: 2rem;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(to bottom, #667eea, #764ba2);
}

.timeline-item::after {
  content: '';
  position: absolute;
  left: -8px;
  top: 5px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  z-index: 1;
}

.timeline-date {
  font-weight: bold;
  color: #764ba2;
  min-width: 120px;
}

.timeline-content h4 {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.timeline-content p {
  color: #666;
}

.contact-section {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: center;
}

.contact-section h3 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1rem;
}

.contact-section p {
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
  .page-title {
    font-size: 2rem;
  }

  .timeline-item {
    flex-direction: column;
    padding-left: 1.5rem;
  }

  .timeline-date {
    margin-bottom: 0.5rem;
  }
}
</style>