import AuthorsPage from '@/components/views/AuthorsPage.vue'
import PostDetailPage from '@/components/views/PostDetailPage.vue'
import PostsPage from '@/components/views/PostsPage.vue'
import UserLoginPage from '@/components/views/UserLoginPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: ['/posts'],
      name: 'home',
      component: PostsPage
    },
    {
      path: '/post-details',
      name: 'post detail page',
      component: PostDetailPage
    },
    {
      path: '/authors',
      name: 'author page',
      component: AuthorsPage
    },
    {
      path: '/login',
      name: 'user login page',
      component: UserLoginPage
    }
  ]
})

export default router
