<template>
  <main>
    <h2>Connexion</h2>
    <p>
      Vous devez vous connecter pour accéder aux fonctionnalités de cette
      application.
    </p>
    <form @submit.prevent="login">
      <div class="username">
        <label for="username">Identifiants</label>
        <input type="text" id="username" v-model="user.username" />
      </div>
      <div class="password">
        <label for="password">Mot de passe</label>
        <input type="password" id="password" v-model="user.password" />
      </div>
      <button type="submit">Se connecter</button>
    </form>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import router from '@/router'

const user = ref({
  username: '',
  password: '',
})
const login = () => {
  localStorage.setItem('token', 'je suis un token')
  console.log(user.value)
  router.push('/')
}
</script>

<style scoped>
form {
  width: 280px;
  margin-inline: auto;
}
form div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
p {
  margin-bottom: 20px;
  color: crimson;
}
</style>
