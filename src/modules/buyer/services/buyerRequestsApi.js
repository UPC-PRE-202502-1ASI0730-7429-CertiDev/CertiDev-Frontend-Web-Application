import api from '../../../shared/infrastructure/base-api.js'

/**
 * Obtiene las solicitudes que ya están en inspección o más allá.
 * Esto simula las propiedades que el comprador puede ver.
 */
export const getBuyerRequests = async () => {
    try {
        const res = await api.get('/requests')
        return res.data.filter(
            r => r.status === 'en inspección' || r.status === 'certificado emitido'
        )
    } catch (err) {
        console.error('❌ Error al obtener solicitudes del comprador:', err)
        return []
    }
}
