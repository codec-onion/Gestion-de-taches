<template>
  <main>
    <form @submit.prevent="sendToServer">
      <div>
        <label for="employee">Sélectionnez un employé :</label>
        <select v-model="employeeAndTaskId.employeeId" id="employee">
          <option value="" disabled>Choisissez un employé.e</option>
          <option
            v-for="employee of employees"
            :key="employee._id"
            :value="employee._id"
          >
            {{ employee.firstName + ' ' + employee.lastName }}
          </option>
        </select>
      </div>
      <div>
        <label for="tache">Sélectionnez une tâche :</label>
        <select v-model="employeeAndTaskId.taskId" id="tache">
          <option value="" disabled>Choisissez une tâche</option>
          <option v-for="task of taskList" :key="task._id" :value="task._id">
            {{ task.wording }}
          </option>
        </select>
      </div>
      <button type="submit">Assigner la tâche</button>
    </form>
    <p>{{ errorMsg }}</p>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { getAllTasks, assignTask } from '../_services/task.services'
import { getAllEmployees } from '../_services/employee.service'

const employees = ref([])
const taskList = ref([])
const employeeAndTaskId = ref({
  employeeId: '',
  taskId: '',
})
const errorMsg = ref('')

getAllTasks()
  .then((res) => (taskList.value = res.data))
  .catch((error) => console.log(error.data.message))

getAllEmployees()
  .then((res) => {
    employees.value = res.data
  })
  .catch((error) => console.log(error.data.message))

const sendToServer = () => {
  assignTask(employeeAndTaskId.value)
    .then((res) => console.log(res.data))
    .catch((error) => (errorMsg.value = error.data.message))
}
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
