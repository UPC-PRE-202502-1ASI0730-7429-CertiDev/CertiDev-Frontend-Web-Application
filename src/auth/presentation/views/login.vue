<template>
  <div class="auth-container">
    <h1>Iniciar Sesión</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Correo" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <button class="primary" type="submit">Ingresar</button>
    </form>

    <p class="switch">
      ¿Aún no tienes cuenta?
      <router-link to="/register">Regístrate</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { authService } from '../../application/auth-service.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');

const handleLogin = async () => {
  try {
    const user = await authService.login(email.value, password.value);
    authService.saveUser(user);

    alert(`Bienvenido, ${user.name}`);
    if (user.role === 'owner') router.push('/dashboard/owner');
    else router.push('/dashboard/buyer');
  } catch (error) {
    alert(error.message);
  }
};
</script>

<style scoped>
.auth-container {
  max-width: 350px;
  margin: 80px auto;
  text-align: center;
}
.primary {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 10px;
}
.switch {
  margin-top: 15px;
}
</style>
