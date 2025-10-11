<template>
  <div>
    <h2 class="text-2xl font-semibold mb-6 text-gray-800">Verificación Legal</h2>

    <div v-if="loading" class="text-gray-500 text-center py-8">Cargando verificaciones...</div>

    <div v-else>
      <div v-if="verifications.length === 0" class="text-gray-500 text-center py-8">
        No hay verificaciones legales registradas.
      </div>

      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <OwnerVerificationCard
            v-for="verification in verifications"
            :key="verification.id"
            :verification="verification"
        />
      </div>

      <!-- 📤 Simulación de subir evidencia -->
      <div class="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-800 mb-3">Subir evidencia</h3>
        <input v-model="evidence" placeholder="Descripción o archivo (simulado)" class="border p-2 w-full rounded mb-3"/>
        <button
            @click="submitEvidence"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Enviar evidencia
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getLegalVerifications, updateLegalVerification } from '../services/ownerVerificationApi.js'
import { authService } from '@/auth/application/auth-service.js'
import OwnerVerificationCard from '../components/OwnerVerificationCard.vue'

const verifications = ref([])
const loading = ref(true)
const evidence = ref('')
const user = authService.getUser()

const loadVerifications = async () => {
  const { data } = await getLegalVerifications(user.id)
  verifications.value = data
}

const submitEvidence = async () => {
  if (!evidence.value.trim()) return alert('Agrega una descripción o archivo')

  const target = verifications.value.find(v => v.status === 'Pendiente')
  if (!target) return alert('No hay verificaciones pendientes')

  // ✅ Actualiza el registro de verificación con evidencia
  await updateLegalVerification(target.id, {
    ...target,
    status: 'En revisión',
    observations: evidence.value
  })

  evidence.value = ''
  await loadVerifications()
  alert('Evidencia enviada correctamente')
}

onMounted(async () => {
  await loadVerifications()
  loading.value = false
})
</script>
