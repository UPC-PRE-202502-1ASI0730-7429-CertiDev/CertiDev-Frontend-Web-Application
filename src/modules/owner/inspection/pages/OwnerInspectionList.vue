<template>
  <div class="p-8 bg-white shadow rounded-md">
    <h1 class="text-2xl font-semibold text-indigo-600 mb-4">Inspecciones Técnicas</h1>
    <p class="text-gray-600 mb-6">
      Aquí puedes revisar las solicitudes que ya se encuentran en fase de inspección técnica.
    </p>

    <div v-if="loading" class="text-gray-500">Cargando inspecciones...</div>

    <div v-else-if="inspectionRequests.length === 0" class="text-gray-600">
      No hay solicitudes en inspección técnica aún.
    </div>

    <ul v-else class="divide-y divide-gray-200">
      <li v-for="r in inspectionRequests" :key="r.id" class="py-4 flex justify-between items-center">
        <div>
          <p class="font-medium text-lg">{{ r.propertyName }}</p>
          <p class="text-sm text-gray-500">
            Estado: <span class="font-semibold">{{ r.status }}</span> ·
            Creada: {{ new Date(r.createdAt).toLocaleDateString() }}
          </p>
        </div>

        <router-link
            :to="`/dashboard/owner/inspection/${r.id}`"
            class="bg-indigo-600 text-white px-3 py-1.5 rounded hover:bg-indigo-700 transition"
        >
          Ir a inspección
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getRequests } from '../../services/ownerRequestsApi.js' // ✅ ruta y nombre corregidos

const requests = ref([])
const loading = ref(true)

const inspectionRequests = computed(() =>
    requests.value.filter(r => r.status === 'en inspección')
)

onMounted(async () => {
  try {
    const res = await getRequests() // ✅ devuelve array directo
    requests.value = Array.isArray(res) ? res : []
  } catch (err) {
    console.error('❌ Error cargando solicitudes de inspección:', err)
  } finally {
    loading.value = false
  }
})
</script>
