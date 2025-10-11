<template>
  <div class="grid gap-4">
    <div v-if="!requests || requests.length === 0" class="text-gray-600">
      No tienes solicitudes aún.
    </div>

    <div
        v-for="r in requests"
        :key="r.id"
        class="bg-white shadow rounded-lg p-4 flex justify-between items-center"
    >
      <!-- Información principal -->
      <div>
        <p class="font-semibold">{{ r.propertyName }}</p>
        <p class="text-sm text-gray-500">Creada: {{ new Date(r.createdAt).toLocaleString() }}</p>
        <p class="text-sm mt-1">
          Estado: <span class="font-medium">{{ r.status }}</span>
        </p>
      </div>

      <!-- Acciones -->
      <div class="space-x-2 flex items-center">
        <!-- Botón pagar -->
        <button
            v-if="r.status === 'pendiente'"
            @click="emitPay(r)"
            class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
        >
          Pagar
        </button>

        <!-- Botón ir a inspección -->
        <router-link
            v-else-if="r.status === 'en inspección'"
            :to="`/dashboard/owner/inspection/${r.id}`"
            class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
        >
          Ir a inspección
        </router-link>

        <!-- Estado visual (cuando no aplica acción) -->
        <span
            v-else
            class="text-sm text-gray-600 px-3 py-1 border rounded"
        >
          {{ r.status }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  requests: { type: Array, default: () => [] },
})
const emit = defineEmits(['pay'])

const emitPay = (r) => {
  console.log('[RequestList] emitPay ->', r)
  emit('pay', r)
}
</script>
