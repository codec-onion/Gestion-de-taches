<template>
  <main>
    <form @submit.prevent="send">
      <div>
        <label for="wording">Libellé:</label>
        <input type="text" id="wording" v-model="task.wording" />
      </div>
      <div>
        <label for="start-time">Début:</label>
        <input type="datetime-local" id="start-time" v-model="task.startTime" />
      </div>
      <div>
        <label for="end-time">Fin:</label>
        <input type="datetime-local" id="end-time" v-model="task.endTime" />
      </div>
      <button type="submit">Créer une nouvelle tâche</button>
    </form>
    {{ infoMsg }}
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { createTask } from '../_services/task.services'

const task = ref({
  wording: '',
  startTime: '',
  endTime: '',
})
const infoMsg = ref('')

const send = () => {
  createTask(task.value)
    .then((res) => (infoMsg.value = res.data.message))
    .catch((error) => {
      infoMsg.value = error.data.message
    })
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
  margin-bottom: 20px;
}
form div label {
  text-align: left;
  margin-right: 5px;
}
#wording {
  width: 60%;
}
</style>
