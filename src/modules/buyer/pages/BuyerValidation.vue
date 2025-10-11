<template>
  <div class="bg-white p-8 rounded-md shadow">
    <h1 class="text-2xl font-semibold text-indigo-600 mb-4">Validar Certificado</h1>
    <p class="text-gray-600 mb-6">Ingresa el código o escanea el QR del certificado que deseas validar.</p>

    <div class="space-y-4">
      <input
          v-model="hash"
          type="text"
          placeholder="Código o Hash del certificado"
          class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-400"
      />

      <button
          @click="validateCertificate"
          class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        Validar
      </button>
    </div>

    <div v-if="result" class="mt-6 border-t pt-4">
      <h2 class="font-semibold text-lg mb-2">Resultado:</h2>
      <p class="text-gray-700"><strong>Propiedad:</strong> {{ result.propertyName }}</p>
      <p class="text-gray-700"><strong>Estado:</strong> {{ result.status }}</p>
      <p class="text-gray-700"><strong>Vigencia:</strong> {{ result.validUntil }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { validateCertificateByHash } from '../services/buyerCertificatesApi.js'

const hash = ref('')
const result = ref(null)

async function validateCertificate() {
  try {
    result.value = await validateCertificateByHash(hash.value)
  } catch (err) {
    console.error('Error validando certificado:', err)
    alert('Certificado no encontrado o inválido.')
  }
}
</script>
