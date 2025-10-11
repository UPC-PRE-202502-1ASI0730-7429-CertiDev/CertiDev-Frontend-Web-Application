<template>
  <div class="publication-container">
    <h2>Generar Certificado</h2>

    <p>Confirma que toda la información de la inspección está correcta antes de publicar.</p>

    <button @click="generateCertificate" class="btn-primary">Generar Certificado</button>

    <div v-if="successMessage" class="success">{{ successMessage }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { publishCertificate } from '../services/ownerCertificatesApi.js'

const successMessage = ref('')

const generateCertificate = async () => {
  try {
    const newCertificate = {
      id: crypto.randomUUID(),
      hash: 'certi-' + Math.random().toString(36).substring(2, 8),
      propertyName: 'Casa Miraflores', // esto luego puede venir dinámico
      ownerId: '1e8c',
      status: 'vigente',
      observations: 'Certificado generado sin observaciones',
      publishedAt: new Date().toISOString(),
    }

    await publishCertificate(newCertificate)
    successMessage.value = `✅ Certificado generado con hash: ${newCertificate.hash}`
  } catch (error) {
    console.error('Error al generar certificado:', error)
  }
}
</script>

<style scoped>
.publication-container {
  padding: 2rem;
}
.btn-primary {
  background-color: #4CAF50;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.success {
  margin-top: 1rem;
  color: green;
}
</style>
