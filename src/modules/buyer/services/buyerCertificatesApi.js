import api from '../../../shared/infrastructure/base-api.js'

/**
 * Obtiene los certificados vigentes o publicados (visibles para el comprador)
 */
export const getBuyerCertificates = async () => {
    try {
        const res = await api.get('/certificates')
        return res.data.filter(
            c => c.status === 'vigente' || c.status === 'publicado'
        )
    } catch (err) {
        console.error('❌ Error al obtener certificados publicados:', err)
        return []
    }
}

/**
 * Verifica un certificado por su hash
 */
export const verifyCertificateByHash = async (hash) => {
    try {
        const res = await api.get(`/certificates?hash=${hash}`)
        if (Array.isArray(res.data) && res.data.length > 0) {
            return res.data[0]
        }
        return null
    } catch (err) {
        console.error('❌ Error al verificar certificado:', err)
        return null
    }
}



