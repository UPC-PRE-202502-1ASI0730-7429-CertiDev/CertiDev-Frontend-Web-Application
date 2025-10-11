<template>
  <div class="p-6 bg-white shadow rounded-md">
    <h1 class="text-2xl font-semibold text-indigo-600 mb-4">Detalles de Inspección</h1>

    <div v-if="loading" class="text-gray-500">Cargando datos...</div>

    <div v-else-if="request">
      <p><strong>ID de solicitud:</strong> {{ request.id }}</p>
      <p><strong>Propietario:</strong> {{ request.ownerName }}</p>
      <p><strong>Estado:</strong> {{ request.status }}</p>
      <p><strong>Fecha:</strong> {{ request.date }}</p>
    </div>

    <div v-else class="text-red-500">No se encontró la solicitud.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getRequestById } from '../../services/ownerRequestsApi.js'

const route = useRoute()
const requestId = route.params.requestId
const request = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    request.value = await getRequestById(requestId)
  } catch (err) {
    console.error('Error cargando solicitud:', err)
  } finally {
    loading.value = false
  }
})
</script>
