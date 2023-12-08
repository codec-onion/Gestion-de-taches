import { createRouter, createWebHistory } from 'vue-router'
import TaskBoard from '../views/TaskBoard.vue'
import AssignTasks from '../views/AssignTasks.vue'
import SaveTasks from '../views/SaveTasks.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Task board',
      component: TaskBoard
    },
    {
      path: '/assigntasks',
      name: 'Assign tasks',
      component: AssignTasks
    },
    {
      path: '/savetasks',
      name: 'Save tasks',
      component: SaveTasks
    }
  ]
})

export default router
