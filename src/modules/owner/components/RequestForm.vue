<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-96">
      <h2 class="text-lg font-bold mb-4">Nueva Solicitud</h2>
      <form @submit.prevent="submitForm" class="space-y-3">
        <input v-model="propertyName" placeholder="Nombre de la propiedad" class="w-full border p-2 rounded" />
        <textarea v-model="details" placeholder="Detalles (observaciones, alcance)" class="w-full border p-2 rounded"></textarea>
        <div class="flex justify-end gap-2 mt-2">
          <button type="button" @click="close" class="px-3 py-1 border rounded">Cancelar</button>
          <button type="submit" class="px-3 py-1 bg-blue-600 text-white rounded">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['close', 'created'])

const propertyName = ref('')
const details = ref('')

const close = () => emit('close')

const submitForm = () => {
  if (!propertyName.value.trim()) {
    alert('Ingresa el nombre de la propiedad')
    return
  }
  const newReq = {
    propertyName: propertyName.value,
    details: details.value
  }
  emit('created', newReq)
}
</script>

<style scoped>
/* estilos mínimos */
</style>
