import api from '../../../../shared/infrastructure/base-api.js'

// Evidencias
export const uploadEvidence = (requestId, evidence) =>
    api.post('/evidences', { ...evidence, requestId })

export const getEvidences = async (requestId) => {
    const res = await api.get(`/evidences?requestId=${requestId}`)
    return { data: res.data || [] }
}

// Checklist
export const getChecklist = async (requestId) => {
    const res = await api.get(`/checklist?requestId=${requestId}`)
    return { data: res.data || [] }
}

export const saveChecklistData = async (requestId, data) => {
    await api.delete(`/checklist?requestId=${requestId}`) // limpia viejo
    for (const item of data) {
        await api.post('/checklist', { ...item, requestId })
    }
}
