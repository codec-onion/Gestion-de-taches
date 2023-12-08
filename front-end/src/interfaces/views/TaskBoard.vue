<script setup>
import { ref, watch } from 'vue'
import TaskListManager from '../../domain/usecases/TaskListManager'

const taskList = ref([])
const sortedTaskList = ref(null)
async function fetchData() {
  try {
    const response = await fetch('http://localhost:5173/tasks.json')
    const data = await response.json()
    taskList.value = data
  } catch (error) {
    console.error(error)
  }
}
fetchData()
const sortByWording = () => {
  sortedTaskList.value = TaskListManager.sortByWording(taskList.value)
}
const sortByStartTime = () => {
  sortedTaskList.value = TaskListManager.sortByStartTime(taskList.value)
}
const sortByEndTime = () => {
  sortedTaskList.value = TaskListManager.sortByEndTime(taskList.value)
}
const reset = () => {
  sortedTaskList.value = null
}
</script>

<template>
  <main>
    <h2>Liste des tâches</h2>
    <button @click="sortByWording">Trie croissant par libellé</button>
    <button @click="sortByStartTime">Trie croissant par heure de début</button>
    <button @click="sortByEndTime">Trie croissant par heure de fin</button>
    <button @click="reset">Réinitialiser</button>
    <table>
      <tr>
        <th scope="col">Libellé</th>
        <th scope="col">Heure de début</th>
        <th scope="col">Heure de fin</th>
      </tr>
      <template v-if="!sortedTaskList">
        <tr v-for="task in taskList" :key="task.id">
          <td>{{ task.libelle }}</td>
          <td>{{ task.heureDebut }}</td>
          <td>{{ task.heureFin }}</td>
        </tr>
      </template>
      <template v-else>
        <tr v-for="task in sortedTaskList" :key="task.id">
          <td>{{ task.libelle }}</td>
          <td>{{ task.heureDebut }}</td>
          <td>{{ task.heureFin }}</td>
        </tr>
      </template>
    </table>
  </main>
</template>

<style scoped>
table {
  margin-inline: auto;
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  border: 3px solid purple;
}
th,
td {
  border: 1px solid purple;
  padding: 10px;
}
th {
  border-bottom: 2px solid purple;
}
</style>
