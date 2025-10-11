<template>
  <div
      class="bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition"
  >
    <h3 class="text-lg font-semibold text-indigo-600 mb-2">
      {{ verification.propertyName }}
    </h3>
    <p class="text-sm text-gray-600 mb-1">
      <strong>Tipo de verificación:</strong> {{ verification.type }}
    </p>
    <p class="text-sm text-gray-600 mb-1">
      <strong>Entidad:</strong> {{ verification.entity }}
    </p>
    <p class="text-sm mb-4" :class="verification.status === 'Limpio' ? 'text-green-600' : 'text-red-600'">
      <strong>Resultado:</strong> {{ verification.status }}
    </p>

    <div v-if="verification.observations" class="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm">
      <strong>Observaciones:</strong> {{ verification.observations }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  verification: {
    type: Object,
    required: true
  }
})
</script>
