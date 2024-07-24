import AuthorsPage from '@/components/views/AuthorsPage.vue'
import NotFoundPage from '@/components/views/NotFoundPage.vue'
import PostDetailsPage from '@/components/views/PostDetailsPage.vue'
import PostsPage from '@/components/views/PostsPage.vue'
import UserLoginPage from '@/components/views/UserLoginPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/posts',
      alias: ['/'],
      children: [
        { path: '', name: 'posts page', component: PostsPage },
        { path: 'posts/:id', name: 'post details page', component: PostDetailsPage, props: true }
      ]
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
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundPage
    }
  ]
})

export default router
