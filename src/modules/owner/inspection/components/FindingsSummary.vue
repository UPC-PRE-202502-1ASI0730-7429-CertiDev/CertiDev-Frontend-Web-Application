<template>
  <div class="bg-white p-4 rounded-xl shadow-md">
    <h3 class="text-lg font-semibold mb-2">Hallazgos</h3>

    <ul v-if="findings.length">
      <li v-for="f in findings" :key="f.key" class="text-red-600">⚠️ {{ f.label }}</li>
    </ul>

    <p v-else class="text-green-600">✅ No se encontraron observaciones.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getChecklist } from '../services/ownerInspectionApi.js'

const props = defineProps({ requestId: String })
const findings = ref([])

const loadFindings = async () => {
  const { data } = await getChecklist(props.requestId)
  findings.value = data.filter(i => !i.checked)
}

onMounted(loadFindings)
</script>
