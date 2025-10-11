// src/modules/buyer/services/buyerCertificatesApi.js
import api from '../../../shared/infrastructure/base-api.js'

// 🔹 Validar un certificado por hash (o código)
export const validateCertificateByHash = async (hash) => {
    if (!hash) throw new Error('No se proporcionó código de certificado')

    const res = await api.get(`/certificates?hash=${hash}`)
    if (!res.data || res.data.length === 0) {
        throw new Error('Certificado no encontrado')
    }

    // Devolvemos el primer resultado (simulando coincidencia única)
    return res.data[0]
}

// 🔹 Obtener historial de certificados validados por el comprador autenticado
export const getBuyerCertificates = async () => {
    const user =
        JSON.parse(localStorage.getItem('user')) ||
        JSON.parse(localStorage.getItem('certi_user'))

    if (!user?.id) {
        console.error('No hay comprador autenticado.')
        return []
    }

    const res = await api.get(`/buyerCertificates?buyerId=${user.id}`)
    return res.data || []
}
