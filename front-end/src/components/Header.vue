<template>
  <header>
    <h1>Gestionnaire des tâches</h1>

    <nav>
      <RouterLink to="/">Enregistrer une tâche </RouterLink>
      <RouterLink to="/taskboard">Tableau des tâches</RouterLink>
      <RouterLink to="/assigntasks">Affectation des tâches</RouterLink>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 20px;
  background-color: #f0f0f0;
}

a {
  font-size: 20px;
}
a:not(:last-child) {
  margin-right: 20px;
}
</style>
