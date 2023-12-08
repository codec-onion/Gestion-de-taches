<script setup>
import { RouterLink } from 'vue-router'
import Padlock from './icons/Padlock.vue'
</script>

<template>
  <header>
    <h1>Gestionnaire des tâches</h1>

    <nav>
      <RouterLink to="/">Tableau des tâches</RouterLink>
      <RouterLink to="/assigntasks">Affectation des tâches</RouterLink>
      <RouterLink to="/savetasks">Enregistrer une tâche <Padlock /></RouterLink>
    </nav>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 20px;
  background-color: #f0f0f0;
}

a {
  font-size: 25px;
}
a:not(:last-child) {
  margin-right: 20px;
}
</style>
