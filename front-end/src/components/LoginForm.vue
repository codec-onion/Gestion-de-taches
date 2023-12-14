<template>
  <div>
    <form @submit.prevent="">
      <div class="email">
        <label for="email">Identifiants</label>
        <input type="email" id="email" v-model="user.email" />
      </div>
      <div class="password">
        <label for="password">Mot de passe</label>
        <input type="password" id="password" v-model="user.password" />
      </div>
      <button type="button" class="login" @click="sendLogin">Se connecter</button>
      <button type="button" @click="sendRegister">S'enregistrer</button>
    </form>
    <p>{{ errMsg }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '@/router'
import { login, register } from '../_services/user.services'

const user = ref({
  email: '',
  password: '',
})
const errMsg = ref('')

const sendLogin = () => {
  login(user.value)
    .then((res) => {
      localStorage.setItem('token', res.data.token)
      router.push('/')
    })
    .catch((error) => (errMsg.value = error.data.message))
}

const sendRegister = async () => {
  try {
    await register(user.value)
    const res = await login(user.value)
    localStorage.setItem('token', res.data.token)
    router.push('/')
  } catch (error) {
    errMsg.value = error.data.message
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
.login {
  margin-right: 10px;
}
</style>
