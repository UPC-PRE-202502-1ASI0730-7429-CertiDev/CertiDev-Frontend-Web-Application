<template>
  <div>
    <header class="toolbar">
      <h2>CertiHome</h2>
      <button @click="logout">Cerrar sesión</button>
    </header>

    <main>
      <slot />
    </main>

    <FooterBar />
  </div>
</template>

<script setup>
import FooterBar from './FooterBar.vue';
import { useRouter } from 'vue-router';
import { authService } from '../auth/application/auth-service.js';

const router = useRouter();

const logout = () => {
  authService.logout();
  router.push('/login');
};
</script>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #4caf50;
  color: white;
  padding: 10px 20px;
}
main {
  padding: 20px;
  min-height: 80vh;
}
</style>
