<template>
  <div class="bg-white p-8 rounded-md shadow">
    <h1 class="text-2xl font-semibold text-indigo-600 mb-4">Certificados Publicados</h1>
    <p class="text-gray-600 mb-6">
      Aquí puedes ver los certificados vigentes emitidos por los propietarios.
    </p>

    <div v-if="loading" class="text-gray-500">Cargando certificados...</div>

    <ul v-else-if="certificates.length" class="divide-y divide-gray-200">
      <li
          v-for="c in certificates"
          :key="c.id"
          class="py-4 flex justify-between items-center"
      >
        <div>
          <p class="font-medium">{{ c.propertyName }}</p>
          <p class="text-sm text-gray-500">
            Estado: {{ c.status }}
          </p>
          <p class="text-xs text-gray-400">Hash: {{ c.hash }}</p>
        </div>
        <span
            class="px-3 py-1 rounded text-sm bg-green-100 text-green-700"
        >
          {{ c.status }}
        </span>
      </li>
    </ul>

    <p v-else class="text-gray-500">No hay certificados vigentes o publicados.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getBuyerCertificates } from '../services/buyerCertificatesApi.js'

const loading = ref(true)
const certificates = ref([])

onMounted(async () => {
  try {
    certificates.value = await getBuyerCertificates()
  } catch (err) {
    console.error('Error cargando certificados:', err)
  } finally {
    loading.value = false
  }
})
</script>
