<template>
  <table v-if="!!taskList && taskList.length > 0">
    <thead>
      <th scope="col" @click="sortByWordingDisplay">
        Libellé
        {{ sortOrderWording }}
      </th>
      <th scope="col" @click="sortByStartTimeDisplay">Début {{ sortOrderStartTime }}</th>
      <th scope="col" @click="sortByEndTimeDisplay">Fin {{ sortOrderEndTime }}</th>
      <th scope="col">Supprimer</th>
    </thead>
    <template v-if="!sortedTaskList">
      <tr v-for="task in taskList" :key="task._id" :class="task._id">
        <td>{{ task.wording }}</td>
        <td>{{ task.startTime }}</td>
        <td>{{ task.endTime }}</td>
        <td>
          <button :value="task._id" @click="deleteTaskEvent($event)">X</button>
        </td>
      </tr>
    </template>
    <template v-else>
      <tr v-for="task in sortedTaskList" :key="task._id" :class="task._id">
        <td>{{ task.wording }}</td>
        <td>{{ task.startTime }}</td>
        <td>{{ task.endTime }}</td>
        <td>
          <button :value="task._id" @click="deleteTaskEvent($event)">X</button>
        </td>
      </tr>
    </template>
  </table>
  <p v-else>Pas encore de tâches créées. Vous pouvez en créer une en cliquant sur "Enregistrer une tâche".</p>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { getAllTasks, deleteTask } from '../_services/task.services'
import { sortByWording, sortByStartTime, sortByEndTime } from '../_utils/sortTaskHelpers'

const taskList = ref([])
const sortedTaskList = ref(null)
const sortOrderWording = ref('')
const sortOrderStartTime = ref('')
const sortOrderEndTime = ref('')

onMounted(async () => {
  try {
    const res = await getAllTasks()
    taskList.value = res.data
  } catch (error) {
    console.log(error)
  }
})

watch(taskList, (newValue) => {
  for (let task of newValue) {
    task.startTime = task.startTime.split('T').join(' ')
    task.endTime = task.endTime.split('T').join(' ')
  }
})

const deleteTaskEvent = async (e) => {
  try {
    await deleteTask(e.target.value)
    const res = await getAllTasks()
    taskList.value = res.data
  } catch (error) {
    console.log(error)
  }
}

const sortByWordingDisplay = () => {
  const sorted = sortByWording(taskList.value)
  sortedTaskList.value = sorted.sortedTaskList
  sortOrderWording.value = sorted.sortOrderWording
  sortOrderStartTime.value = sorted.sortOrderStartTime
  sortOrderEndTime.value = sorted.sortOrderEndTime
}
const sortByStartTimeDisplay = () => {
  const sorted = sortByStartTime(taskList.value)
  sortedTaskList.value = sorted.sortedTaskList
  sortOrderWording.value = sorted.sortOrderWording
  sortOrderStartTime.value = sorted.sortOrderStartTime
  sortOrderEndTime.value = sorted.sortOrderEndTime
}
const sortByEndTimeDisplay = () => {
  const sorted = sortByEndTime(taskList.value)
  sortedTaskList.value = sorted.sortedTaskList
  sortOrderWording.value = sorted.sortOrderWording
  sortOrderStartTime.value = sorted.sortOrderStartTime
  sortOrderEndTime.value = sorted.sortOrderEndTime
}
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
th:last-child {
  width: 90px;
  cursor: auto;
}
</style>
