import api from '../../../shared/infrastructure/base-api.js'

// 🔹 Obtener todos los certificados (emitidos, publicados, etc.)
export const getAllCertificates = async () => {
    const response = await api.get('/certificates')
    return response.data
}

// 🔹 Crear nuevo certificado (emisión)
export const createCertificate = async (certificateData) => {
    const response = await api.post('/certificates', certificateData)
    return response.data
}

// 🔹 Actualizar un certificado existente
export const updateCertificate = async (certificate) => {
    const response = await api.put(`/certificates/${certificate.id}`, certificate)
    return response.data
}

// 🔹 Publicar un certificado emitido
export const publishCertificate = async (certificate) => {
    try {
        const updatedCert = {
            ...certificate,
            status: 'vigente',
            publishedAt: new Date().toISOString(),
        }
        await api.put(`/certificates/${certificate.id}`, updatedCert)
        return updatedCert
    } catch (error) {
        console.error('Error al publicar certificado:', error)
        throw error
    }
}

// 🔹 Alias para compatibilidad con componentes antiguos
export const getCertificates = getAllCertificates
