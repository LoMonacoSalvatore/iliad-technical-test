import { createRouter, createWebHistory } from 'vue-router'
import Users from '@/views/Users.vue'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/user/:id',
      name: 'user',
      component: Users,
    },
  ],
})

export default router
