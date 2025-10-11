<template>
  <div class="p-8 bg-white shadow rounded-md">
    <h1 class="text-2xl font-semibold text-indigo-600 mb-4">Inspecciones Técnicas</h1>
    <p class="text-gray-600 mb-6">
      Aquí puedes revisar las solicitudes que ya se encuentran en fase de inspección técnica.
    </p>

    <!-- Estado de carga -->
    <div v-if="loading" class="text-gray-500">Cargando inspecciones...</div>

    <!-- Si no hay resultados -->
    <div v-else-if="inspectionRequests?.length === 0" class="text-gray-600">
      No hay solicitudes en inspección técnica aún.
    </div>

    <!-- Lista de inspecciones -->
    <ul v-else class="divide-y divide-gray-200">
      <li
          v-for="r in inspectionRequests"
          :key="r.id"
          class="py-4 flex justify-between items-center"
      >
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
import { getRequests } from '../../services/ownerRequestsApi.js' // ✅ Usa la función correcta
import { useRouter } from 'vue-router'

const router = useRouter()
const requests = ref([]) // ✅ Siempre inicializar vacío
const loading = ref(true)

// 🔹 Computed: filtra solo las solicitudes "en inspección"
const inspectionRequests = computed(() => {
  return requests.value?.filter(r => r.status === 'en inspección') || []
})

onMounted(async () => {
  try {
    // ✅ Usa la función getRequests que trae las solicitudes del propietario actual
    const { data } = await getRequests()
    requests.value = data || []
  } catch (err) {
    console.error('❌ Error cargando solicitudes de inspección:', err)
  } finally {
    loading.value = false
  }
})

// 🔹 Navegación (por si lo necesitas en botones)
const goToInspection = (id) => {
  router.push(`/dashboard/owner/inspection/${id}`)
}
</script>
