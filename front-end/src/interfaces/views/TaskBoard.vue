<script setup>
import { ref, watch } from 'vue'
import { TaskListManager } from '../../domain/usecases/TaskListManager'

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
const sortAscendingOrderByWording = () => {
  sortedTaskList.value = TaskListManager.sortAscendingOrderByWording(
    taskList.value
  )
}
const sortAscendingOrderByStartTime = () => {
  sortedTaskList.value = TaskListManager.sortAscendingOrderByStartTime(
    taskList.value
  )
}
const sortAscendingOrderByEndTime = () => {
  sortedTaskList.value = TaskListManager.sortAscendingOrderByEndTime(
    taskList.value
  )
}
const reset = () => {
  sortedTaskList.value = null
}
</script>

<template>
  <main>
    <h2>Liste des tâches</h2>

    <div class="sort-button">
      <h3>Trie par ordre croissant :</h3>
      <button @click="sortAscendingOrderByWording(taskList)">
        par libellé
      </button>
      <button @click="sortAscendingOrderByStartTime">par heure de début</button>
      <button @click="sortAscendingOrderByEndTime">par heure de fin</button>
    </div>

    <div class="sort-button">
      <h3>Tri par ordre décroissant :</h3>
      <button @click="sortByWording">par libellé</button>
      <button @click="sortByStartTime">par heure de début</button>
      <button @click="sortByEndTime">par heure de fin</button>
    </div>
    <button @click="reset" class="reset">Réinitialiser</button>

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
.sort-button {
  display: flex;
  justify-content: center;
  margin-block: 20px;
}
.sort-button h2 {
  margin-right: 10px;
}
.reset {
  margin-bottom: 20px;
}
</style>
