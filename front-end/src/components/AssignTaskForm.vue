<template>
  <div class="main">
    <form @submit.prevent="sendToServer">
      <div>
        <label for="employee">Sélectionnez un employé :</label>
        <select v-model="employeeAndTaskId.employeeId" id="employee">
          <option value="" disabled>Choisissez un employé</option>
          <option v-for="employee of employees" :key="employee._id" :value="employee._id">
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
    <p>{{ infoMsg }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { assignTask } from '../_services/task.services'

const { props } = defineProps(['taskList', 'employees'])

const employeeAndTaskId = ref({
  employeeId: '',
  taskId: '',
})
const infoMsg = ref('')

const sendToServer = async () => {
  try {
    const res = await assignTask(employeeAndTaskId.value)
    infoMsg.value = res.data.message
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  } catch (error) {
    infoMsg.value = error.data.message
  }
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
.main {
  margin-block: 30px;
}
</style>
