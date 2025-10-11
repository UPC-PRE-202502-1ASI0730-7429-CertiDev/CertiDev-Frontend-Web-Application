<template>
  <div class="bg-white p-4 rounded-xl shadow-md">
    <h3 class="text-lg font-semibold mb-2">Evidencias (Fotos/Videos)</h3>

    <input type="file" multiple accept="image/*,video/*" @change="handleUpload" class="mb-4" />

    <div class="grid grid-cols-2 gap-2">
      <div
          v-for="file in evidences"
          :key="file.id"
          class="border rounded p-2 text-sm text-gray-700"
      >
        📎 {{ file.filename }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { uploadEvidence, getEvidences } from '../services/ownerInspectionApi.js'

const props = defineProps({ requestId: String })
const emit = defineEmits(['uploaded'])
const evidences = ref([])

const handleUpload = async (e) => {
  const files = Array.from(e.target.files)
  for (const file of files) {
    await uploadEvidence(props.requestId, { filename: file.name, type: file.type })
  }
  await loadEvidences()
  emit('uploaded')
}

const loadEvidences = async () => {
  const { data } = await getEvidences(props.requestId)
  evidences.value = data
}

onMounted(loadEvidences)
</script>
