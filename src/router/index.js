import { createRouter, createWebHistory } from 'vue-router'
import Chat from '../views/Chat.vue'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Detail from '../views/Detail.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/chat',
    name: 'chat',
    component: Chat,
  },
  {
    path: '/user',
    name: 'user',
    component: User,
  },
  {
    path: '/detail',
    name: 'detail',
    component: Detail,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
