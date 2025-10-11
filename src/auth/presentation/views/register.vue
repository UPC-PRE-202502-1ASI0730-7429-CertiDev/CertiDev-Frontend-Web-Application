<template>
  <div class="auth-container">
    <h1>Registrarse</h1>
    <form @submit.prevent="handleRegister">
      <input v-model="user.name" placeholder="Nombre" required />
      <input v-model="user.dni" placeholder="DNI" required />
      <input v-model="user.email" type="email" placeholder="Correo" required />
      <input v-model="user.phone" placeholder="Teléfono" required />
      <input v-model="user.password" type="password" placeholder="Contraseña" required />

      <div class="role-buttons">
        <button type="button" :class="{ active: user.role === 'owner' }" @click="user.role = 'owner'">
          Soy propietario
        </button>
        <button type="button" :class="{ active: user.role === 'buyer' }" @click="user.role = 'buyer'">
          Soy comprador
        </button>
      </div>

      <button class="primary" type="submit">Registrarse</button>
    </form>

    <p class="switch">
      ¿Ya tienes una cuenta?
      <router-link to="/login">Inicia sesión</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { authService } from '../../application/auth-service.js';
import { useRouter } from 'vue-router';

const router = useRouter();

const user = ref({
  name: '',
  dni: '',
  email: '',
  phone: '',
  password: '',
  role: ''
});

const handleRegister = async () => {
  try {
    if (!user.value.role) {
      alert('Selecciona un tipo de usuario');
      return;
    }
    await authService.register(user.value);
    alert('Registro exitoso. Inicia sesión.');
    await router.push('/login');
  } catch (error) {
    alert('Error al registrar: ' + error.message);
  }
};
</script>

<style scoped>
.auth-container {
  max-width: 350px;
  margin: 80px auto;
  text-align: center;
}
.role-buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
button {
  padding: 8px 10px;
  margin: 5px;
}
.active {
  background-color: #4caf50;
  color: white;
}
.primary {
  background-color: #4caf50;
  color: white;
  border: none;
}
.switch {
  margin-top: 15px;
}
</style>
