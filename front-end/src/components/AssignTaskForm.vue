<template>
  <main>
    <form @submit.prevent="sendToServer">
      <div>
        <label for="employee">Sélectionnez un employé :</label>
        <select v-model="employeeAndTaskId.employeeId" id="employee">
          <option value="" disabled>Choisissez un employé.e</option>
          <option
            v-for="employee of employees"
            :key="employee.id"
            :value="employee.id"
          >
            {{ employee.firstName + ' ' + employee.lastName }}
          </option>
        </select>
      </div>
      <div>
        <label for="tache">Sélectionnez une tâche :</label>
        <select v-model="employeeAndTaskId.taskId" id="tache">
          <option value="" disabled>Choisissez une tâche</option>
          <option v-for="task of taskList" :key="task.id" :value="task.id">
            {{ task.wording }}
          </option>
        </select>
      </div>
      <button type="submit">Assigner la tâche</button>
    </form>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const employees = ref([])

const taskList = ref([])

const employeeAndTaskId = ref({
  employeeId: '',
  taskId: '',
})

async function fetchDataTask() {
  try {
    const response = await fetch('http://localhost:5173/tasks.json')
    const data = await response.json()
    taskList.value = data
  } catch (error) {
    console.error(error)
  }
}

async function fetchDataEmployees() {
  try {
    const response = await fetch('http://localhost:5173/employees.json')
    const data = await response.json()
    employees.value = data
  } catch (error) {
    console.error(error)
  }
}

const sendToServer = () => {
  console.log(employeeAndTaskId.value)
}

fetchDataEmployees()
fetchDataTask()
</script>

<style scoped>
form {
  width: 300px;
  margin-inline: auto;
}
form div {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}
form div label {
  text-align: left;
  margin-right: 5px;
}
#tache {
  width: 170px;
}
</style>
