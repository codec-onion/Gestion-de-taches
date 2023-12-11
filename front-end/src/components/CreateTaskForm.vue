<template>
  <main>
    <form @submit.prevent="createTask">
      <div>
        <label for="wording">Libellé:</label>
        <input type="text" id="wording" v-model="task.wording" />
      </div>
      <div>
        <label for="start-time">Heure de début:</label>
        <input type="datetime-local" id="start-time" v-model="task.startTime" />
      </div>
      <div>
        <label for="end-time">Heure de fin:</label>
        <input type="datetime-local" id="end-time" v-model="task.endTime" />
      </div>
      <button type="submit">Créer une nouvelle tâche</button>
    </form>
    {{ errMsg }}
  </main>
</template>

<script setup>
import { ref } from 'vue'

const task = ref({
  wording: '',
  startTime: '',
  endTime: '',
})

const errMsg = ref('')

const createTask = () => {
  const wordingRegex = /^[a-zA-Z0-9À-ÿ\s]+\S$/
  const wordingIsValid = wordingRegex.test(task.value.wording)
  const comparisonTime =
    new Date(task.value.endTime) - new Date(task.value.startTime)
  if (Math.sign(comparisonTime) === 1 && wordingIsValid) {
    console.log(task.value)
    errMsg.value = ''
  } else if (!wordingIsValid) {
    errMsg.value =
      "Le nom ne doit pas contenir de caractères spéciaux ni d'espace à la fin."
  } else {
    errMsg.value = 'La date de fin doit se situer après la date de début.'
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
