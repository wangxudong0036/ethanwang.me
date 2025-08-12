<script setup lang="ts">
// 个人简历页面
</script>

<template>
  <div class="container mx-auto py-8">
    <!-- 个人资料头部 -->
    <header class="text-center mb-12 pb-8 border-b border-gray-200">
      <div class="mb-6">
        <img 
          src="https://placehold.co/200x200" 
          alt="个人头像" 
          class="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg mx-auto" 
        />
      </div>
      <h1 class="text-4xl font-bold mt-2 mb-1 text-gray-900 dark:text-white">你的名字</h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 mb-4">职业头衔 | 个人标签</p>
      <div class="flex justify-center space-x-6">
        <a href="#" target="_blank" class="text-gray-600 hover:text-primary transition-colors">
          <div class="i-mdi-github text-2xl"></div>
          <span class="sr-only">GitHub</span>
        </a>
        <a href="#" target="_blank" class="text-gray-600 hover:text-primary transition-colors">
          <div class="i-mdi-email text-2xl"></div>
          <span class="sr-only">Email</span>
        </a>
      </div>
    </header>

    <!-- 关于我 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-6 text-secondary relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-primary after:mt-2 pb-2">关于我</h2>
      <div class="text-gray-700 dark:text-gray-300 space-y-4">
        <p>
          这里是你的个人简介。你可以介绍你的背景、经历、技能和兴趣等信息。
          让访问者快速了解你是谁，你做什么，以及你的专业领域。
        </p>
        <p>
          这段文字应当展现你的个性和专业能力，同时保持简洁明了。
          考虑包含一些关键词，以便于搜索引擎优化。
        </p>
      </div>
    </section>

    <!-- 专业技能 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-6 text-secondary relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-primary after:mt-2 pb-2">专业技能</h2>
      <div class="space-y-6">
        <div class="mb-6">
          <h3 class="text-xl font-medium mb-3 text-secondary">前端开发</h3>
          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 bg-primary/10 text-primary rounded hover:bg-primary hover:text-white transition-all">HTML5</span>
            <span class="px-3 py-1 bg-primary/10 text-primary rounded hover:bg-primary hover:text-white transition-all">CSS3</span>
            <span class="px-3 py-1 bg-primary/10 text-primary rounded hover:bg-primary hover:text-white transition-all">JavaScript</span>
            <span class="px-3 py-1 bg-primary/10 text-primary rounded hover:bg-primary hover:text-white transition-all">Vue.js</span>
            <span class="px-3 py-1 bg-primary/10 text-primary rounded hover:bg-primary hover:text-white transition-all">React</span>
          </div>
        </div>
        
        <div class="mb-6">
          <h3 class="text-xl font-medium mb-3 text-secondary">后端开发</h3>
          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 bg-primary/10 text-primary rounded hover:bg-primary hover:text-white transition-all">Node.js</span>
            <span class="px-3 py-1 bg-primary/10 text-primary rounded hover:bg-primary hover:text-white transition-all">Python</span>
            <span class="px-3 py-1 bg-primary/10 text-primary rounded hover:bg-primary hover:text-white transition-all">Java</span>
            <span class="px-3 py-1 bg-primary/10 text-primary rounded hover:bg-primary hover:text-white transition-all">数据库</span>
          </div>
        </div>
        
        <div>
          <h3 class="text-xl font-medium mb-3 text-secondary">其他技能</h3>
          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 bg-primary/10 text-primary rounded hover:bg-primary hover:text-white transition-all">UI/UX 设计</span>
            <span class="px-3 py-1 bg-primary/10 text-primary rounded hover:bg-primary hover:text-white transition-all">项目管理</span>
            <span class="px-3 py-1 bg-primary/10 text-primary rounded hover:bg-primary hover:text-white transition-all">DevOps</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 工作经历 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-6 text-secondary relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-primary after:mt-2 pb-2">工作经历</h2>
      <div class="space-y-8">
        <div class="md:grid md:grid-cols-[120px_1fr] gap-4">
          <div class="text-primary font-bold mb-2 md:mb-0">2020 - 至今</div>
          <div>
            <h3 class="text-lg font-medium mb-1 text-gray-800 dark:text-gray-200">公司/机构名称</h3>
            <p class="text-gray-600 dark:text-gray-400 italic mb-2">职位名称</p>
            <p class="text-gray-700 dark:text-gray-300">
              在这里简要描述你的工作职责、成就和贡献。突出你的关键成果和所学技能。
            </p>
          </div>
        </div>
        
        <div class="md:grid md:grid-cols-[120px_1fr] gap-4">
          <div class="text-primary font-bold mb-2 md:mb-0">2018 - 2020</div>
          <div>
            <h3 class="text-lg font-medium mb-1 text-gray-800 dark:text-gray-200">公司/机构名称</h3>
            <p class="text-gray-600 dark:text-gray-400 italic mb-2">职位名称</p>
            <p class="text-gray-700 dark:text-gray-300">
              在这里简要描述你的工作职责、成就和贡献。突出你的关键成果和所学技能。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 教育背景 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-6 text-secondary relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-primary after:mt-2 pb-2">教育背景</h2>
      <div class="space-y-8">
        <div class="md:grid md:grid-cols-[120px_1fr] gap-4">
          <div class="text-primary font-bold mb-2 md:mb-0">2014 - 2018</div>
          <div>
            <h3 class="text-lg font-medium mb-1 text-gray-800 dark:text-gray-200">大学名称</h3>
            <p class="text-gray-600 dark:text-gray-400 italic mb-2">学位 · 专业</p>
            <p class="text-gray-700 dark:text-gray-300">
              在这里简要描述你的学习经历、参与的项目和获得的荣誉等。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系方式 -->
    <section>
      <h2 class="text-2xl font-bold mb-6 text-secondary relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-primary after:mt-2 pb-2">联系方式</h2>
      <div>
        <p class="text-gray-700 dark:text-gray-300 mb-4">如果您对我的工作感兴趣，或者有任何问题，欢迎通过以下方式联系我：</p>
        <ul class="space-y-3">
          <li class="flex items-center text-gray-700 dark:text-gray-300">
            <div class="i-mdi-email text-xl text-primary mr-2"></div>
            邮箱：your.email@example.com
          </li>
          <li class="flex items-center text-gray-700 dark:text-gray-300">
            <div class="i-mdi-wechat text-xl text-primary mr-2"></div>
            微信：your_wechat_id
          </li>
          <li class="flex items-center text-gray-700 dark:text-gray-300">
            <div class="i-mdi-linkedin text-xl text-primary mr-2"></div>
            LinkedIn：your_linkedin_profile
          </li>
        </ul>
      </div>
    </section>

    <!-- 简历下载 -->
    <div class="mt-12 text-center">
      <a href="#" class="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium">
        <div class="i-mdi-download inline-block mr-2"></div>
        下载完整简历
      </a>
    </div>
  </div>
</template> 