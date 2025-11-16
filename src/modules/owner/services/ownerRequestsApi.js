import api from '../../../shared/infrastructure/base-api.js'

/**
 * Obtiene todas las solicitudes del propietario autenticado.
 */
export const getRequests = async () => {
    try {
        const user =
            JSON.parse(localStorage.getItem('user')) ||
            JSON.parse(localStorage.getItem('certi_user'))

        const userId = user?.id
        if (!userId) {
            console.error('❌ No hay usuario autenticado o falta el id.')
            return []
        }

        const res = await api.get('/requests')
        const allRequests = Array.isArray(res.data) ? res.data : []

        // 🔹 Filtrar solo las del propietario autenticado
        return allRequests.filter(req => req.ownerId === userId)
    } catch (err) {
        console.error('❌ Error al obtener solicitudes:', err)
        return []
    }
}

/**
 * Crea una nueva solicitud
 */
export const createRequest = async (data) => {
    const user =
        JSON.parse(localStorage.getItem('user')) ||
        JSON.parse(localStorage.getItem('certi_user'))
    const userId = user?.id

    if (!userId) throw new Error('No se puede crear solicitud sin usuario autenticado')

    const payload = { ...data, ownerId: userId }
    const res = await api.post('/requests', payload)
    return res.data
}

/**
 * Actualiza una solicitud existente
 */
export const updateRequest = async (id, data) => {
    const res = await api.put(`/requests/${id}`, data)
    return res.data
}

/**
 * Elimina una solicitud por ID
 */
export const deleteRequest = async (id) => {
    const res = await api.delete(`/requests/${id}`)
    return res.data
}

/**
 * Obtiene una solicitud por su ID
 */
export const getRequestById = async (id) => {
    const res = await api.get(`/requests/${id}`)
    return res.data
}

/**
 * Obtiene todas las solicitudes (sin filtrar por propietario)
 */
export const getAllRequests = async () => {
    try {
        const res = await api.get('/requests')
        return Array.isArray(res.data) ? res.data : []
    } catch (err) {
        console.error('Error al obtener todas las solicitudes', err)
        return []
    }
}
