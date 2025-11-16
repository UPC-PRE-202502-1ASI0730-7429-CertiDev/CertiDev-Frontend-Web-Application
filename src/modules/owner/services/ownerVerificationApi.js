
import api from '../../../shared/infrastructure/base-api.js'

export const getLegalVerifications = (userId) => api.get(`/legalVerifications?userId=${userId}`)

export const createLegalVerification = (data) => api.post('/legalVerifications', data)

export const updateLegalVerification = (id, data) => api.put(`/legalVerifications/${id}`, data)
