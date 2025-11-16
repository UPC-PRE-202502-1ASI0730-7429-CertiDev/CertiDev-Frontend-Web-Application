<template>
  <div class="emission-container">
    <h2>Emisión de Certificados</h2>

    <div class="section">
      <h3>Solicitudes disponibles para emisión</h3>
      <div v-if="requests.length">
        <div v-for="req in requests" :key="req.id" class="card">
          <p><strong>Propiedad:</strong> {{ req.propertyName }}</p>
          <p><strong>Estado:</strong> {{ req.status }}</p>
          <button @click="emitCertificate(req)" class="btn-primary">
            Emitir Certificado
          </button>
        </div>
      </div>
      <div v-else>
        <p>No hay solicitudes listas para emitir certificados.</p>
      </div>
    </div>

    <div class="section">
      <h3>Certificados emitidos</h3>
      <div v-if="certificates.length">
        <div v-for="cert in certificates" :key="cert.id" class="card">
          <p><strong>Propiedad:</strong> {{ cert.propertyName }}</p>
          <p><strong>Hash:</strong> {{ cert.hash }}</p>
          <p><strong>Estado:</strong> {{ cert.status }}</p>
          <p><strong>Emitido el:</strong> {{ new Date(cert.issuedAt).toLocaleString() }}</p>
        </div>
      </div>
      <div v-else>
        <p>No hay certificados emitidos aún.</p>
      </div>
    </div>

    <div v-if="successMessage" class="success">{{ successMessage }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getRequests } from '../services/ownerRequestsApi.js'
import { getAllCertificates, createCertificate } from '../services/ownerCertificatesApi.js'
import { authService } from '../../../auth/application/auth-service.js'

const requests = ref([])
const certificates = ref([])
const successMessage = ref('')

const user = authService.getUser()

onMounted(async () => {
  const allRequests = await getRequests()
  requests.value = allRequests.filter(
      (r) => r.ownerId === user.id && r.status === 'en inspección'
  )
  certificates.value = await getAllCertificates()
})

const emitCertificate = async (req) => {
  const newCert = {
    id: crypto.randomUUID(),
    hash: 'cert-' + Math.random().toString(36).substring(2, 8),
    propertyName: req.propertyName,
    ownerId: user.id,
    status: 'emitido',
    issuedAt: new Date().toISOString(),
  }

  await createCertificate(newCert)
  certificates.value.push(newCert)
  successMessage.value = `✅ Certificado emitido para ${req.propertyName}`
}
</script>

<style scoped>
.emission-container {
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
  background-color: #4caf50;
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
