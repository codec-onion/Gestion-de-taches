<template>
  <main>
    <form @submit.prevent="createTask">
      <div>
        <label for="wording">Libellé:</label>
        <input type="text" id="wording" v-model="task.wording" />
      </div>
      <div>
        <label for="start-time">Heure de début:</label>
        <input type="time" id="start-time" v-model="task.startTime" />
      </div>
      <div>
        <label for="end-time">Heure de fin:</label>
        <input type="time" id="end-time" v-model="task.endTime" />
      </div>
      <button type="submit">Créer une nouvelle tâche</button>
    </form>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const task = ref({
  wording: '',
  startTime: '',
  endTime: '',
})

const createTask = () => {
  const wordingRegex = /^[a-zA-Z0-9À-ÿ\s]+$/
  const timeRegex = /^\d{2}:\d{2}$/
  const wordingTest = wordingRegex.test(task.value.wording)
  const startTimeTest = timeRegex.test(task.value.startTime)
  const endTimeTest = timeRegex.test(task.value.endTime)
  const comparisonTime =
    parseInt(task.value.endTime.split(':').join('')) -
    parseInt(task.value.startTime.split(':').join(''))
  if (wordingTest && startTimeTest && endTimeTest && comparisonTime === 1) {
    console.log(task.value)
  } else {
    console.log('Regex refusée!')
  }
}
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
  text-align: center;
}
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
#wording {
  width: 60%;
}
</style>
