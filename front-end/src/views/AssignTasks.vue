<template>
  <main>
    <h2>Affectation des tâches</h2>

    <AssignTaskForm :taskList="taskList" :employees="employees" />
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import { getAllTasks } from '../_services/task.services'
import { getAllEmployees } from '../_services/employee.service'

import AssignTaskForm from '../components/AssignTaskForm.vue'

const taskList = ref([])
const employees = ref([])

onMounted(async () => {
  try {
    const res = await getAllTasks()
    taskList.value = res.data
  } catch (error) {
    console.error(error.message)
  }

  try {
    const res = await getAllEmployees()
    employees.value = res.data
  } catch (error) {
    console.error(error.message)
  }
})
</script>

<style scoped></style>
