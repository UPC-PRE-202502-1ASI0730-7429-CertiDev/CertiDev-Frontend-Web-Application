<template>
  <div class="bg-white p-8 rounded-md shadow">
    <h1 class="text-2xl font-semibold text-indigo-600 mb-4">Gestión de Versiones</h1>
    <p class="text-gray-600 mb-6">
      Consulta el historial de versiones y el estado actual de los certificados validados.
    </p>

    <div v-if="loading" class="text-gray-500">Cargando historial...</div>

    <ul v-else class="divide-y divide-gray-200">
      <li
          v-for="c in certificates"
          :key="c.id"
          class="py-4 flex justify-between items-center"
      >
        <div>
          <p class="font-medium">{{ c.propertyName }}</p>
          <p class="text-sm text-gray-500">
            Versión: {{ c.version }} — Estado: {{ c.status }}
          </p>
        </div>
        <span
            class="px-3 py-1 rounded text-sm"
            :class="c.status === 'vigente' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'"
        >
          {{ c.status }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getBuyerCertificates } from '../../services/buyerCertificatesApi.js'

const loading = ref(true)
const certificates = ref([])

onMounted(async () => {
  try {
    certificates.value = await getBuyerCertificates()
  } catch (err) {
    console.error('Error cargando historial:', err)
  } finally {
    loading.value = false
  }
})
</script>
