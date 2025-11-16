<template>
  <div class="validation-container">
    <h2>Validación de Certificados</h2>

    <div class="section">
      <h3>Certificados publicados</h3>
      <div v-if="certificates.length">
        <div
            v-for="cert in certificates"
            :key="cert.id"
            class="card"
        >
          <p><strong>Propiedad:</strong> {{ cert.propertyName }}</p>
          <p><strong>Propietario ID:</strong> {{ cert.ownerId }}</p>
          <p><strong>Hash:</strong> {{ cert.hash }}</p>
          <p><strong>Estado:</strong> {{ cert.status }}</p>
          <p><strong>Publicado el:</strong> {{ formatDate(cert.publishedAt) }}</p>
        </div>
      </div>
      <div v-else>
        <p>No hay certificados publicados disponibles.</p>
      </div>
    </div>

    <div class="section">
      <h3>Verificar un certificado por hash</h3>
      <input
          v-model="searchHash"
          type="text"
          placeholder="Ingresa el hash del certificado"
          class="input"
      />
      <button @click="verifyHash" class="btn-primary">Verificar</button>

      <div v-if="foundCertificate" class="result-card">
        <p><strong>Propiedad:</strong> {{ foundCertificate.propertyName }}</p>
        <p><strong>Estado:</strong> {{ foundCertificate.status }}</p>
        <p><strong>Emitido el:</strong> {{ formatDate(foundCertificate.issuedAt) }}</p>
        <p><strong>Publicado el:</strong> {{ formatDate(foundCertificate.publishedAt) }}</p>
      </div>

      <div v-if="notFoundMessage" class="error">{{ notFoundMessage }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getBuyerCertificates } from '../services/buyerCertificatesApi.js'


const certificates = ref([])
const searchHash = ref('')
const foundCertificate = ref(null)
const notFoundMessage = ref('')

onMounted(async () => {
  certificates.value = await getBuyerCertificates()
})

const verifyHash = async () => {
  foundCertificate.value = null
  notFoundMessage.value = ''
  if (!searchHash.value.trim()) {
    notFoundMessage.value = 'Por favor ingresa un hash válido.'
    return
  }
  const result = await verifyCertificateByHash(searchHash.value.trim())
  if (result) {
    foundCertificate.value = result
  } else {
    notFoundMessage.value = '❌ No se encontró ningún certificado con ese hash.'
  }
}

const formatDate = (date) => {
  return date ? new Date(date).toLocaleString() : '—'
}
</script>

<style scoped>
.validation-container {
  padding: 2rem;
}
.section {
  margin-top: 1.5rem;
}
.card, .result-card {
  background: #f6f6f6;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
}
.btn-primary {
  background-color: #2196F3;
  color: white;
  padding: 0.4rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.input {
  padding: 0.4rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-right: 0.5rem;
}
.error {
  margin-top: 1rem;
  color: red;
}
</style>
