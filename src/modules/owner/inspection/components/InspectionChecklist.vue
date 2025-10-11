<template>
  <div class="bg-white p-4 rounded-xl shadow-md">
    <h3 class="text-lg font-semibold mb-2">Checklist Técnico</h3>

    <div v-for="item in checklist" :key="item.key" class="flex justify-between items-center py-1">
      <span>{{ item.label }}</span>
      <input type="checkbox" v-model="item.checked" />
    </div>

    <button
        class="bg-blue-600 text-white px-3 py-1 mt-3 rounded hover:bg-blue-700"
        @click="saveChecklist"
    >
      Guardar Checklist
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getChecklist, saveChecklistData } from '../services/ownerInspectionApi.js'

const props = defineProps({ requestId: String })
const emit = defineEmits(['completed'])
const checklist = ref([])

const loadChecklist = async () => {
  const { data } = await getChecklist(props.requestId)
  checklist.value = data.length
      ? data
      : [
        { key: 'estructura', label: 'Estructura segura', checked: false },
        { key: 'agua', label: 'Instalaciones de agua correctas', checked: false },
        { key: 'electricidad', label: 'Instalaciones eléctricas correctas', checked: false },
        { key: 'documentos', label: 'Documentos disponibles', checked: false }
      ]
}

const saveChecklist = async () => {
  await saveChecklistData(props.requestId, checklist.value)
  emit('completed')
}

onMounted(loadChecklist)
</script>
