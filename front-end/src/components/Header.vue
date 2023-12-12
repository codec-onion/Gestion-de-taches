<template>
  <header>
    <h1>Gestionnaire des tâches</h1>

    <nav>
      <RouterLink to="/">Enregistrer une tâche </RouterLink>
      <RouterLink to="/taskboard">Tableau des tâches</RouterLink>
      <RouterLink to="/assigntasks">Affectation des tâches</RouterLink>
      <button
        v-if="router.currentRoute.value.fullPath !== '/login'"
        @click="logout"
        class="logout"
      >
        Se déconnecter
      </button>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import router from '@/router'

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>
header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 30px;
  background-color: #f0f0f0;
}

a {
  font-size: 20px;
}
a:not(:nth-child(3)) {
  margin-right: 20px;
}
.logout {
  position: absolute;
  bottom: 5px;
  right: 5px;
}
@media all and (max-width: 1000px) {
  header {
    flex-direction: column;
  }
  h1 {
    font-size: 26px;
  }
  a {
    font-size: 16px;
  }
}
@media all and (max-width: 562px) {
  nav {
    display: flex;
    flex-direction: column;
  }
}
</style>
