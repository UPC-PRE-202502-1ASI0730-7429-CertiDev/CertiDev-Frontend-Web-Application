<template>
  <div class="publication-container">
    <h2>Publicación de Certificados</h2>

    <div class="section">
      <h3>Certificados emitidos</h3>
      <div v-if="certificates.length">
        <div v-for="cert in certificates" :key="cert.id" class="card">
          <p><strong>Propiedad:</strong> {{ cert.propertyName }}</p>
          <p><strong>Hash:</strong> {{ cert.hash }}</p>
          <p><strong>Estado actual:</strong> {{ cert.status }}</p>
          <button
              v-if="cert.status === 'emitido'"
              @click="publish(cert)"
              class="btn-primary"
          >
            Publicar certificado
          </button>
        </div>
      </div>
      <div v-else>
        <p>No hay certificados emitidos para publicar.</p>
      </div>
    </div>

    <div v-if="successMessage" class="success">{{ successMessage }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAllCertificates, updateCertificate } from '../services/ownerCertificatesApi.js'

const certificates = ref([])
const successMessage = ref('')

onMounted(async () => {
  const all = await getAllCertificates()
  certificates.value = all.filter((c) => c.status === 'emitido')
})

const publish = async (cert) => {
  cert.status = 'vigente'
  cert.publishedAt = new Date().toISOString()
  await updateCertificate(cert)
  successMessage.value = `✅ Certificado publicado: ${cert.hash}`
}
</script>

<style scoped>
.publication-container {
  padding: 2rem;
}
.section {
  margin-top: 1.5rem;
}
.card {
  background: #f6f6f6;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
}
.btn-primary {
  background-color: #2196f3;
  color: white;
  padding: 0.4rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.success {
  margin-top: 1rem;
  color: green;
}
</style>
