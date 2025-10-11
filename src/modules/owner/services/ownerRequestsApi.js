// src/modules/owner/services/ownerRequestsApi.js
import api from '../../../shared/infrastructure/base-api.js'

// 🔹 Obtener solicitudes solo del propietario autenticado
export const getRequests = async () => {
    const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(localStorage.getItem('certi_user'))
    const userId = user?.id

    if (!userId) {
        console.error('❌ No hay usuario autenticado o falta el id.')
        return { data: [] }
    }

    const res = await api.get('/requests')
    // Filtrar las solicitudes que pertenecen a este propietario
    const filtered = res.data.filter(req => req.ownerId === userId)
    return { data: filtered }
}

// 🔹 Crear una nueva solicitud asignada al propietario actual
export const createRequest = async (data) => {
    const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(localStorage.getItem('certi_user'))
    const userId = user?.id

    if (!userId) {
        throw new Error('No se puede crear solicitud sin usuario autenticado')
    }

    const payload = { ...data, ownerId: userId }
    return api.post('/requests', payload)
}

export const updateRequest = (id, data) => {
    console.log('📤 PUT /requests/' + id, data)
    return api.put(`/requests/${id}`, data)
}

export const deleteRequest = (id) => api.delete(`/requests/${id}`)

// 🔹 Obtener una solicitud por ID
export const getRequestById = async (id) => {
    const res = await api.get(`/requests/${id}`)
    return res.data
}

// 🔹 Obtener todas las solicitudes (para vistas generales)
export const getAllRequests = async () => {
    try {
        const res = await api.get('/requests')
        return res.data || []
    } catch (err) {
        console.error('Error al obtener todas las solicitudes', err)
        return []
    }
}
