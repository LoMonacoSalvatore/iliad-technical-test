import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
      meta: {
        layout: AppLayout,
      },
    },
    {
      path: '/user/:id',
      name: 'user',
      component: () => import('../views/Users.vue'),
      meta: {
        layout: AppLayout,
      },
    },
    {
      path: '/posts/:id',
      name: 'posts',
      component: () => import('../views/Posts.vue'),
      meta: {
        layout: AppLayout,
      },
    },
  ],
})

export default router
