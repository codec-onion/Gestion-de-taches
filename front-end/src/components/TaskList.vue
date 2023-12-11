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

const taskList = ref([])

async function fetchData() {
  try {
    const response = await fetch('http://localhost:5173/task-with-date.json')
    const data = await response.json()
    taskList.value = data
  } catch (error) {
    console.error(error)
  }
}

async function formatDate() {
  await fetchData()
  const date = new Date(taskList.value[0].startTime)
  console.log(date.toLocaleDateString('fr-FR'))
  for (let task of taskList.value) {
    task.startTime = task.startTime.split('T').join(' ')
    task.endTime = task.endTime.split('T').join(' ')
  }
}
formatDate()

const sortedTaskList = ref(null)
const sortOrderWording = ref('')
const sortOrderStartTime = ref('')
const sortOrderEndTime = ref('')

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
  sortedTaskList.value.startTime = sortedTaskList.value.startTime
    .split('T')
    .join(' ')
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
