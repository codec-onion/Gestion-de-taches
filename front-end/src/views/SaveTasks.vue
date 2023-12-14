<template>
  <main>
    <h2>Formulaire de création de tâche</h2>
    <CreateTaskForm />
  </main>
</template>

<script setup>
import CreateTaskForm from '../components/CreateTaskForm.vue'
import { onMounted } from 'vue'
import { isLogged } from '../_services/user.services'

onMounted(() => {
  isLogged()
})
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
  text-align: center;
}
</style>
