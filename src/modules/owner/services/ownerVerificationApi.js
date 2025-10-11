// src/modules/owner/services/ownerVerificationApi.js
import api from '../../../shared/infrastructure/base-api.js'

// Obtiene todas las verificaciones legales del usuario actual
export const getLegalVerifications = (userId) => api.get(`/legalVerifications?userId=${userId}`)

// Crea una nueva solicitud de verificación (por si en el futuro se automatiza)
export const createLegalVerification = (data) => api.post('/legalVerifications', data)

export const updateLegalVerification = (id, data) => api.put(`/legalVerifications/${id}`, data)
