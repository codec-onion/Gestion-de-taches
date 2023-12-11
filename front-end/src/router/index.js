import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Login.vue'

import TaskBoard from '../views/TaskBoard.vue'
import AssignTasks from '../views/AssignTasks.vue'
import SaveTasks from '../views/SaveTasks.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/',
      name: 'Save tasks',
      component: SaveTasks,
    },
    {
      path: '/taskboard',
      name: 'Task board',
      component: TaskBoard,
    },
    {
      path: '/assigntasks',
      name: 'Assign tasks',
      component: AssignTasks,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authToken = localStorage.getItem('token')
  if (!authToken && to.name !== 'login') {
    router.push('/login')
  }
  next()
})

export default router
