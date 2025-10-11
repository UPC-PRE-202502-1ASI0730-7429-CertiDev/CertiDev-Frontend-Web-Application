<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-96 text-center">
      <h2 class="text-lg font-bold mb-4">Pago de Solicitud</h2>
      <p class="mb-2">Solicitud: <strong>{{ request?.propertyName }}</strong></p>
      <p class="mb-4">Estado actual: <strong>{{ request?.status }}</strong></p>

      <div class="flex justify-center gap-2">
        <button @click="confirmPayment" :disabled="loading" class="bg-green-600 text-white px-4 py-2 rounded">
          {{ loading ? 'Procesando...' : 'Confirmar Pago' }}
        </button>
        <button @click="onClose" :disabled="loading" class="px-4 py-2 border rounded">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { updateRequest } from '../services/ownerRequestsApi.js'
import { createLegalVerification } from '../services/ownerVerificationApi.js'

const props = defineProps({ request: Object })
const emit = defineEmits(['close', 'paid'])
const loading = ref(false)

const onClose = () => {
  emit('close')
}

const confirmPayment = async () => {
  if (!props.request || !props.request.id) {
    alert('Solicitud inválida (falta id)')
    console.error('[PaymentModal] request inválida:', props.request)
    return
  }

  loading.value = true
  try {
    console.log('[PaymentModal] confirmPayment -> request:', props.request)
    const updated = { ...props.request, status: 'en inspección' }

    // 1) PUT /requests/:id
    const putRes = await updateRequest(props.request.id, updated)
    console.log('[PaymentModal] updateRequest response ->', putRes?.data || putRes)

    // 2) POST /legalVerifications
    const postRes = await createLegalVerification({
      userId: updated.ownerId,
      propertyName: updated.propertyName,
      type: 'Consulta SUNARP',
      entity: 'SUNARP',
      status: 'Pendiente',
      observations: 'Esperando evidencias del propietario'
    })
    console.log('[PaymentModal] createLegalVerification ->', postRes?.data || postRes)

    // 3) Emitir al padre para que recargue datos
    emit('paid')
    emit('close')
  } catch (err) {
    console.error('[PaymentModal] Error en confirmPayment:', err)
    alert('Error al procesar el pago. Revisa la consola/Network.')
  } finally {
    loading.value = false
  }
}
</script>
