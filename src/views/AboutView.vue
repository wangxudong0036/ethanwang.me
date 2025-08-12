<script setup lang="ts">
// 导入组件
import BaseCard from '../components/BaseCard.vue'
import BaseButton from '../components/BaseButton.vue'
</script>

<template>
  <div class="container mx-auto py-8">
    <div class="card w-full max-w-3xl mx-auto mb-8">
      <h1 class="text-3xl font-bold mb-4 text-secondary">关于我们</h1>
      <p class="text-base mb-6">
        这是一个使用Vue 3、TypeScript、Vue Router和Pinia构建的示例项目。
        现在我们添加了UnoCSS，一个高性能且灵活的原子化CSS引擎。
      </p>
      
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-3 text-secondary">项目使用的技术栈：</h2>
        <ul class="space-y-2 ml-4">
          <li class="flex items-center">
            <div class="i-logos-vue text-2xl mr-2"></div> 
            <span>Vue 3 - 渐进式JavaScript框架</span>
          </li>
          <li class="flex items-center">
            <div class="i-logos-typescript-icon text-2xl mr-2"></div>
            <span>TypeScript - 带类型的JavaScript超集</span>
          </li>
          <li class="flex items-center">
            <div class="i-logos-vue-router text-2xl mr-2"></div>
            <span>Vue Router - Vue.js官方路由管理器</span>
          </li>
          <li class="flex items-center">
            <div class="i-logos-pinia text-2xl mr-2"></div>
            <span>Pinia - Vue的状态管理库</span>
          </li>
          <li class="flex items-center">
            <div class="i-logos-unocss text-2xl mr-2"></div>
            <span>UnoCSS - 即时的原子化CSS引擎</span>
          </li>
          <li class="flex items-center">
            <div class="i-logos-sass text-2xl mr-2"></div>
            <span>Sass - CSS预处理器</span>
          </li>
        </ul>
      </div>
      
      <!-- 组件演示部分 -->
      <div class="mt-10">
        <h2 class="text-2xl font-bold mb-6 text-secondary after:content-[''] after:block after:w-12 after:h-1 after:bg-primary after:mt-2">组件演示</h2>
        
        <!-- 按钮组件演示 -->
        <div class="mb-8">
          <h3 class="text-lg font-semibold mb-3">BaseButton 组件</h3>
          <div class="flex flex-wrap gap-3 mb-4">
            <BaseButton type="primary">主要按钮</BaseButton>
            <BaseButton type="secondary">次要按钮</BaseButton>
            <BaseButton type="success">成功按钮</BaseButton>
            <BaseButton type="danger">危险按钮</BaseButton>
          </div>
          <div class="flex flex-wrap gap-3 mb-4">
            <BaseButton type="primary" outline>轮廓按钮</BaseButton>
            <BaseButton type="secondary" outline>轮廓按钮</BaseButton>
            <BaseButton type="primary" rounded>圆角按钮</BaseButton>
            <BaseButton type="secondary" size="sm">小型按钮</BaseButton>
            <BaseButton type="primary" size="lg">大型按钮</BaseButton>
          </div>
        </div>
        
        <!-- 卡片组件演示 -->
        <div>
          <h3 class="text-lg font-semibold mb-3">BaseCard 组件</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseCard 
              title="基础卡片" 
              subtitle="这是一个基础卡片组件"
            >
              <p>这是卡片的内容区域，可以通过插槽传入任意内容。</p>
            </BaseCard>
            
            <BaseCard 
              title="带颜色的卡片" 
              subtitle="使用color属性设置颜色"
              color="primary"
            >
              <p>这是卡片的内容区域，这个卡片使用了主题色。</p>
            </BaseCard>
            
            <BaseCard 
              title="带阴影的卡片" 
              withShadow
            >
              <p>这个卡片添加了阴影效果，使用withShadow属性。</p>
            </BaseCard>
            
            <BaseCard 
              title="组合功能" 
              subtitle="多个功能组合使用"
              color="success"
              withShadow
            >
              <div class="mt-2">
                <p class="mb-3">这个卡片组合了多个功能。</p>
                <BaseButton type="success" size="sm">操作按钮</BaseButton>
              </div>
            </BaseCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}
</style> 