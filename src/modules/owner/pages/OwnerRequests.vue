<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Mis Solicitudes</h1>

      <div class="flex gap-2">
        <button
            @click="showForm = true"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Nueva Solicitud
        </button>

        <!-- BOTÓN DE PRUEBA: abre el modal con la primera solicitud pendiente -->
        <button
            @click="openPaymentTest"
            class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
            title="Abrir modal de pago para la primera solicitud pendiente (test)"
        >
          Abrir Modal de Pago (test)
        </button>
      </div>
    </div>

    <RequestList :requests="requests" @pay="openPayment" />

    <RequestForm v-if="showForm" @close="showForm = false" @created="addRequest" />
    <PaymentModal
        v-if="showPayment"
        :request="selectedRequest"
        @close="closePayment"
        @paid="onPaid"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getRequests, createRequest } from '../services/ownerRequestsApi.js'
import RequestList from '../components/RequestList.vue'
import RequestForm from '../components/RequestForm.vue'
import PaymentModal from '../components/PaymentModal.vue'
import { authService } from '@/auth/application/auth-service.js'

const requests = ref([])
const showForm = ref(false)
const showPayment = ref(false)
const selectedRequest = ref(null)

const user = authService.getUser()

// ✅ Cargar solicitudes correctamente
const loadRequests = async () => {
  try {
    const res = await getRequests()
    // 🔹 getRequests ya devuelve las solicitudes del usuario actual
    requests.value = Array.isArray(res) ? res : []
    console.log('[OwnerRequests] loadRequests ->', requests.value)
  } catch (err) {
    console.error('Error cargando solicitudes', err)
    requests.value = []
  }
}

// ✅ Crear solicitud correctamente
const addRequest = async (data) => {
  try {
    const payload = {
      propertyName: data.propertyName,
      details: data.details,
      status: 'pendiente',
      createdAt: new Date().toISOString(),
      ownerId: user.id
    }
    const res = await createRequest(payload)
    console.log('[OwnerRequests] createRequest ->', res)
    showForm.value = false
    await loadRequests()
  } catch (err) {
    console.error('Error creando solicitud', err)
  }
}

const openPayment = (req) => {
  console.log('[OwnerRequests] openPayment ->', req)
  selectedRequest.value = req
  showPayment.value = true
}

const openPaymentTest = () => {
  const first = requests.value.find(r => r.status === 'pendiente')
  console.log('[OwnerRequests] openPaymentTest ->', first)
  if (first) {
    openPayment(first)
  } else {
    alert('No hay solicitudes pendientes para probar.')
  }
}

const closePayment = async () => {
  showPayment.value = false
  selectedRequest.value = null
  await loadRequests()
}

const onPaid = async () => {
  console.log('[OwnerRequests] onPaid -> recargando solicitudes')
  await loadRequests()
}

onMounted(loadRequests)
</script>
