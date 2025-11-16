<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-2xl font-bold text-indigo-600 mb-4">
      Detalles de Inspección
    </h1>

    <div v-if="loading" class="text-gray-500">Cargando datos...</div>

    <div v-else-if="!request" class="text-red-500">No se encontró la solicitud.</div>

    <div v-else class="space-y-8">
      <!-- 🧾 Información general -->
      <div class="bg-white shadow p-4 rounded-lg">
        <p><strong>Propiedad:</strong> {{ request.propertyName }}</p>
        <p><strong>Estado:</strong> {{ request.status }}</p>
        <p><strong>Fecha:</strong> {{ formatDate(request.createdAt) }}</p>
      </div>

      <!-- ✅ Checklist técnico -->
      <div class="bg-white shadow p-4 rounded-lg">
        <h2 class="text-lg font-semibold mb-3">Checklist técnico</h2>

        <div v-for="(item, i) in checklist" :key="i" class="flex items-center gap-2 mb-2">
          <input type="checkbox" v-model="item.checked" />
          <input
              v-model="item.label"
              placeholder="Descripción"
              class="flex-1 border-b border-gray-300 text-sm px-2 py-1 focus:outline-none"
          />
        </div>

        <button
            @click="addChecklistItem"
            class="text-blue-600 text-sm hover:underline mr-2"
        >
          + Añadir ítem
        </button>

        <button
            @click="saveChecklist"
            class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
        >
          💾 Guardar checklist
        </button>
      </div>

      <!-- 📎 Evidencias -->
      <div class="bg-white shadow p-4 rounded-lg">
        <h2 class="text-lg font-semibold mb-3">Evidencias</h2>

        <div
            v-if="evidences.length"
            class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4"
        >
          <div
              v-for="(ev, i) in evidences"
              :key="i"
              class="border p-2 rounded text-sm text-gray-700 bg-gray-50"
          >
            📄 {{ ev.title || 'Sin título' }}
            <p class="text-xs text-gray-400">{{ formatDate(ev.date) }}</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <input
              v-model="newEvidence"
              placeholder="Título de evidencia"
              class="border rounded px-2 py-1 text-sm flex-1"
          />
          <button
              @click="uploadEvidenceItem"
              class="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
          >
            📤 Subir
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {getRequestById} from "@/modules/owner/services/ownerRequestsApi.js";
import {getChecklist} from "@/modules/owner/inspection/services/ownerInspectionApi.js";
import {saveChecklistData} from "@/modules/owner/inspection/services/ownerInspectionApi.js";
import {getEvidences} from "@/modules/owner/inspection/services/ownerInspectionApi.js";
import {uploadEvidence} from "@/modules/owner/inspection/services/ownerInspectionApi.js";
//getChecklist,
  //saveChecklistData,
  //getEvidences,
  //uploadEvidence
//} from '../services/ownerInspectionApi.js'

const route = useRoute()
const requestId = route.params.requestId
const request = ref(null)
const loading = ref(true)
const checklist = ref([])
const evidences = ref([])
const newEvidence = ref('')

onMounted(async () => {
  try {
    request.value = await getRequestById(requestId)

    const [chRes, evRes] = await Promise.all([
      getChecklist(requestId),
      getEvidences(requestId)
    ])

    checklist.value = chRes.data || []
    evidences.value = evRes.data || []
  } catch (err) {
    console.error('❌ Error cargando inspección:', err)
  } finally {
    loading.value = false
  }
})

const formatDate = (d) => new Date(d).toLocaleString('es-PE', {
  day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
})

const addChecklistItem = () => {
  checklist.value.push({ label: '', checked: false })
}

const saveChecklist = async () => {
  try {
    await saveChecklistData(requestId, checklist.value)
    alert('✅ Checklist guardado correctamente')
  } catch (err) {
    alert('❌ Error guardando checklist')
  }
}

const uploadEvidenceItem = async () => {
  if (!newEvidence.value) {
    alert('Por favor, ingresa un título para la evidencia')
    return
  }

  const ev = { title: newEvidence.value, date: new Date().toISOString() }
  await uploadEvidence(requestId, ev)
  evidences.value.push(ev)
  newEvidence.value = ''
}
</script>
