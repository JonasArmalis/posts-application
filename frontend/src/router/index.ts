import AuthorsPage from '@/views/AuthorsPage.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'
import PostDetailsPage from '@//views/PostDetailsPage.vue'
import PostsPage from '@/views/PostsPage.vue'
import UserLoginPage from '@/views/UserLoginPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/posts',
      alias: ['/'],
      children: [
        { 
          path: '',
          name: 'posts',
          component: PostsPage
        },
        { 
          path: 'posts/:id',
          name: 'post-details',
          component: PostDetailsPage,
          props: true
        }
      ]
    },
    {
      path: '/authors',
      name: 'authors',
      component: AuthorsPage
    },
    {
      path: '/login',
      name: 'login',
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
