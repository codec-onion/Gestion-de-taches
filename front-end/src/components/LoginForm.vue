<template>
  <main>
    <form @submit.prevent="sendLogin">
      <div class="email">
        <label for="email">Identifiants</label>
        <input type="email" id="email" v-model="user.email" />
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
import { login } from '../_services/user.services'

const user = ref({
  email: '',
  password: '',
})

const sendLogin = () => {
  login(user.value)
    .then((res) => {
      localStorage.setItem('token', res.data.token)
      router.push('/')
    })
    .catch((error) => console.log(error))
}

// const login = () => {
//   localStorage.setItem('token', 'je suis un token')
//   console.log(user.value)
//   router.push('/')
// }
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
</style>
