<template>
  <main>
    <h2>Liste des tâches</h2>

    <TaskList />
  </main>
</template>

<script setup>
import TaskList from '../components/TaskList.vue'
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
</style>
