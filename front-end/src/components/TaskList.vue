<template>
  <table>
    <thead>
      <th scope="col" @click="sortByWording(taskList)">
        Libellé
        {{ sortOrderWording }}
      </th>
      <th scope="col" @click="sortByStartTime(taskList)">
        Début {{ sortOrderStartTime }}
      </th>
      <th scope="col" @click="sortByEndTime(taskList)">
        Fin {{ sortOrderEndTime }}
      </th>
      <th scope="col">Supprimer</th>
    </thead>
    <template v-if="!sortedTaskList">
      <tr v-for="task in taskList" :key="task._id" :class="task._id">
        <td>{{ task.wording }}</td>
        <td>{{ task.startTime }}</td>
        <td>{{ task.endTime }}</td>
        <td><button :value="task._id" @click="test($event)">X</button></td>
      </tr>
    </template>
    <template v-else>
      <tr v-for="task in sortedTaskList" :key="task._id" :class="task._id">
        <td>{{ task.wording }}</td>
        <td>{{ task.startTime }}</td>
        <td>{{ task.endTime }}</td>
        <td><button :value="task._id" @click="test($event)">X</button></td>
      </tr>
    </template>
  </table>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getAllTasks } from '../_services/task.services'

const taskList = ref([])
const sortedTaskList = ref(null)
const sortOrderWording = ref('')
const sortOrderStartTime = ref('')
const sortOrderEndTime = ref('')

getAllTasks()
  .then((res) => (taskList.value = res.data))
  .catch((error) => console.log(error))

watch(taskList, (newValue) => {
  for (let task of newValue) {
    task.startTime = task.startTime.split('T').join(' ')
    task.endTime = task.endTime.split('T').join(' ')
  }
})

const test = (e) => {
  console.log(e.target.value)
}

const sortByWording = (taskList) => {
  sortOrderStartTime.value = sortOrderEndTime.value = ''
  sortedTaskList.value = JSON.parse(JSON.stringify(taskList))
  if (sortOrderWording.value === '') {
    sortOrderWording.value = '(ordre croissant)'
    sortedTaskList.value.sort((a, b) => {
      return a.wording.localeCompare(b.wording)
    })
  } else if (sortOrderWording.value === '(ordre croissant)') {
    sortOrderWording.value = '(ordre décroissant)'
    sortedTaskList.value.sort((a, b) => {
      return b.wording.localeCompare(a.wording)
    })
  } else {
    sortOrderWording.value = ''
    sortedTaskList.value = null
  }
}

const sortByStartTime = (taskList) => {
  sortOrderWording.value = sortOrderEndTime.value = ''
  sortedTaskList.value = JSON.parse(JSON.stringify(taskList))
  if (sortOrderStartTime.value === '') {
    sortOrderStartTime.value = '(ordre croissant)'
    sortedTaskList.value.sort((a, b) => {
      return new Date(a.startTime) - new Date(b.startTime)
    })
  } else if (sortOrderStartTime.value === '(ordre croissant)') {
    sortOrderStartTime.value = '(ordre décroissant)'
    sortedTaskList.value.sort((a, b) => {
      return new Date(b.startTime) - new Date(a.startTime)
    })
  } else {
    sortOrderStartTime.value = ''
    sortedTaskList.value = null
  }
}

const sortByEndTime = (taskList) => {
  sortOrderWording.value = sortOrderStartTime.value = ''
  sortedTaskList.value = JSON.parse(JSON.stringify(taskList))
  if (sortOrderEndTime.value === '') {
    sortOrderEndTime.value = '(ordre croissant)'
    sortedTaskList.value.sort((a, b) => {
      return new Date(a.endTime) - new Date(b.endTime)
    })
  } else if (sortOrderEndTime.value === '(ordre croissant)') {
    sortOrderEndTime.value = '(ordre décroissant)'
    sortedTaskList.value.sort((a, b) => {
      return new Date(b.endTime) - new Date(a.endTime)
    })
  } else {
    sortOrderEndTime.value = ''
    sortedTaskList.value = null
  }
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
