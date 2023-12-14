<template>
  <h2>Voir les tâches assignées à un employé</h2>
  <label for="employee">Sélectionnez un employé :</label>
  <select v-model="employeeId" id="employee" @change="getTasksForEmployee">
    <option value="" disabled>Choisissez un employé</option>
    <option v-for="employee of employees" :key="employee._id" :value="employee._id">
      {{ employee.firstName + ' ' + employee.lastName }}
    </option>
  </select>
  <table v-if="taskListForEmployee.length > 0">
    <thead>
      <th scope="col" @click="sortByWordingDisplay">
        Libellé
        {{ sortOrderWording }}
      </th>
      <th scope="col" @click="sortByStartTimeDisplay">Début {{ sortOrderStartTime }}</th>
      <th scope="col" @click="sortByEndTimeDisplay">Fin {{ sortOrderEndTime }}</th>
    </thead>
    <template v-if="!sortedTaskList">
      <tr v-for="task in taskListForEmployee" :key="task._id" :class="task._id">
        <td>{{ task.wording }}</td>
        <td>{{ task.startTime }}</td>
        <td>{{ task.endTime }}</td>
      </tr>
    </template>
    <template v-else>
      <tr v-for="task in sortedTaskList" :key="task._id" :class="task._id">
        <td>{{ task.wording }}</td>
        <td>{{ task.startTime }}</td>
        <td>{{ task.endTime }}</td>
      </tr>
    </template>
  </table>
  <p v-if="taskListForEmployee.length === 0">Pas de tâches assignées à cet employé.</p>
</template>

<script setup>
import { ref } from 'vue'
import { sortByWording, sortByStartTime, sortByEndTime } from '../_utils/sortTaskHelpers'

const { taskList, employees } = defineProps(['taskList', 'employees'])
const employeeId = ref('')
const taskListForEmployee = ref([])
const sortedTaskList = ref(null)
const sortOrderWording = ref('')
const sortOrderStartTime = ref('')
const sortOrderEndTime = ref('')

const getTasksForEmployee = () => {
  taskListForEmployee.value = taskList.filter((task) => task.employeeId.includes(employeeId.value))
}

const sortByWordingDisplay = () => {
  const sorted = sortByWording(taskListForEmployee.value)
  sortedTaskList.value = sorted.sortedTaskList
  sortOrderWording.value = sorted.sortOrderWording
  sortOrderStartTime.value = sorted.sortOrderStartTime
  sortOrderEndTime.value = sorted.sortOrderEndTime
}
const sortByStartTimeDisplay = () => {
  const sorted = sortByStartTime(taskListForEmployee.value)
  sortedTaskList.value = sorted.sortedTaskList
  sortOrderWording.value = sorted.sortOrderWording
  sortOrderStartTime.value = sorted.sortOrderStartTime
  sortOrderEndTime.value = sorted.sortOrderEndTime
}
const sortByEndTimeDisplay = () => {
  const sorted = sortByEndTime(taskListForEmployee.value)
  sortedTaskList.value = sorted.sortedTaskList
  sortOrderWording.value = sorted.sortOrderWording
  sortOrderStartTime.value = sorted.sortOrderStartTime
  sortOrderEndTime.value = sorted.sortOrderEndTime
}
</script>

<style scoped>
h2 {
  margin-block: 20px;
}
select {
  margin-bottom: 20px;
}
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
</style>
