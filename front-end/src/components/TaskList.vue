<template>
  <table>
    <tr>
      <th scope="col" @click="sortByWording(taskList)">
        Libellé
        {{ sortOrderWording }}
      </th>
      <th scope="col" @click="sortByStartTime(taskList)">
        Heure de début {{ sortOrderStartTime }}
      </th>
      <th scope="col" @click="sortByEndTime(taskList)">
        Heure de fin {{ sortOrderEndTime }}
      </th>
    </tr>
    <template v-if="!sortedTaskList">
      <tr v-for="task in taskList" :key="task.id">
        <td>{{ task.wording }}</td>
        <td>{{ task.startTime }}</td>
        <td>{{ task.endTime }}</td>
      </tr>
    </template>
    <template v-else>
      <tr v-for="task in sortedTaskList" :key="task.id">
        <td>{{ task.wording }}</td>
        <td>{{ task.startTime }}</td>
        <td>{{ task.endTime }}</td>
      </tr>
    </template>
  </table>
</template>

<script setup>
import { ref } from 'vue'
import {
  sortedTaskList,
  sortOrderWording,
  sortOrderStartTime,
  sortOrderEndTime,
  sortByWording,
  sortByStartTime,
  sortByEndTime,
} from '../_helpers/sort-task-list'

const taskList = ref([])

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
</script>

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
  cursor: pointer;
}
.sort-button {
  display: flex;
  justify-content: center;
  margin-block: 20px;
}
.sort-button h3 {
  margin-right: 10px;
}
.reset {
  margin-bottom: 20px;
}
</style>
