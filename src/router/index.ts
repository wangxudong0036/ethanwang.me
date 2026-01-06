import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/about',
      name: 'about',
      // 路由懒加载
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: '关于'
      }
    },
    {
      path: '/resume',
      name: 'resume',
      // 路由懒加载
      component: () => import('../views/ResumeView.vue'),
      meta: {
        title: '简历'
      }
    },
    {
      path: '/blog',
      name: 'blog',
      // 路由懒加载
      component: () => import('../views/BlogView.vue'),
      meta: {
        title: '博客'
      }
    },
    {
      path: '/blog/:id',
      name: 'blog-detail',
      // 路由懒加载
      component: () => import('../views/BlogDetailView.vue'),
      meta: {
        title: '博客详情'
      }
    }
  ]
})

// 全局前置守卫 - 设置页面标题
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = `个人博客 | ${to.meta.title || '我的在线空间'}`
  next()
})

export default router 