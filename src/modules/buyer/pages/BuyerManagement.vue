<template>
  <div class="bg-white p-8 rounded-md shadow">
    <h1 class="text-2xl font-semibold text-indigo-600 mb-4">Mis Solicitudes</h1>
    <p class="text-gray-600 mb-6">
      Aquí puedes ver las propiedades que están siendo inspeccionadas o ya cuentan con certificado.
    </p>

    <div v-if="loading" class="text-gray-500">Cargando solicitudes...</div>

    <ul v-else-if="requests.length" class="divide-y divide-gray-200">
      <li
          v-for="r in requests"
          :key="r.id"
          class="py-4 flex justify-between items-center"
      >
        <div>
          <p class="font-medium">{{ r.propertyName }}</p>
          <p class="text-sm text-gray-500">
            Estado: {{ r.status }}
          </p>
        </div>
        <span
            class="px-3 py-1 rounded text-sm"
            :class="r.status === 'en inspección'
            ? 'bg-yellow-100 text-yellow-700'
            : 'bg-green-100 text-green-700'"
        >
          {{ r.status }}
        </span>
      </li>
    </ul>

    <p v-else class="text-gray-500">No hay solicitudes en inspección o con certificado.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getBuyerRequests } from '../services/buyerRequestsApi.js'

const loading = ref(true)
const requests = ref([])

onMounted(async () => {
  try {
    requests.value = await getBuyerRequests()
  } catch (err) {
    console.error('Error cargando solicitudes:', err)
  } finally {
    loading.value = false
  }
})
</script>
