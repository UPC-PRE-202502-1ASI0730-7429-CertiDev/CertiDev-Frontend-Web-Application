<template>
  <div class="report-container">
    <h1 class="report-title">📊 Reportes del Sistema</h1>
    <p class="report-description">Visualiza el resumen de actividad entre Propietarios y Compradores.</p>

    <div class="report-grid">
      <div class="report-card">
        <h2>Total de Certificados Generados</h2>
        <p>{{ totalCertificados }}</p>
      </div>

      <div class="report-card">
        <h2>Certificados Vigentes</h2>
        <p>{{ certificadosVigentes }}</p>
      </div>

      <div class="report-card">
        <h2>Certificados Revocados / Vencidos</h2>
        <p>{{ certificadosNoVigentes }}</p>
      </div>

      <div class="report-card">
        <h2>Certificados Validados por Compradores</h2>
        <p>{{ certificadosValidados }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getOwnerCertificates } from '../../services/ownerCertificatesApi.js'
import { getBuyerCertificates } from '../../services/buyerCertificatesApi.js'

const totalCertificados = ref(0)
const certificadosVigentes = ref(0)
const certificadosNoVigentes = ref(0)
const certificadosValidados = ref(0)

onMounted(async () => {
  try {
    // Certificados del propietario
    const ownerData = await getOwnerCertificates()
    totalCertificados.value = ownerData.length
    certificadosVigentes.value = ownerData.filter(c => c.estado === 'Vigente').length
    certificadosNoVigentes.value = ownerData.filter(c => c.estado !== 'Vigente').length

    // Validaciones hechas por compradores
    const buyerData = await getBuyerCertificates()
    certificadosValidados.value = buyerData.length
  } catch (error) {
    console.error('Error al cargar reportes:', error)
  }
})
</script>

<style scoped>
.report-container {
  padding: 2rem;
  background: #f5f6fa;
  min-height: 100vh;
}

.report-title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.report-description {
  color: #666;
  margin-bottom: 2rem;
}

.report-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.report-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.2s ease;
}

.report-card:hover {
  transform: scale(1.03);
}

.report-card h2 {
  font-size: 1.2rem;
  color: #444;
  margin-bottom: 0.5rem;
}

.report-card p {
  font-size: 2rem;
  color: #2d89ef;
  font-weight: bold;
}
</style>
