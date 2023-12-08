<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <div>
      <h1>Gestionnaire des tâches</h1>
      
      <nav>
        <RouterLink to="/">Tableau des tâches</RouterLink>
        <RouterLink to="/assigntasks">Affectation des tâches</RouterLink>
        <RouterLink to="/savetasks">Enregistrer une tâche</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>

header div{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 20px;
  background-color: #F0F0F0;
}

a {
  font-size: 25px;
}
a:not(:last-child) {
  margin-right: 20px;
}
</style>