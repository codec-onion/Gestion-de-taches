<template>
  <main>
    <h2>Connexion</h2>
    <p>
      Vous devez vous connecter pour accéder aux fonctionnalités de cette
      application.
    </p>
    <LoginForm />
  </main>
</template>

<script setup>
import LoginForm from '../components/LoginForm.vue'
</script>

<style scoped>
p {
  margin-bottom: 20px;
  color: crimson;
}
</style>
