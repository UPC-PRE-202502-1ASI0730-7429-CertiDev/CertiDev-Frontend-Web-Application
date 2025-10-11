import api from '../../../shared/infrastructure/base-api.js'

// Crear un nuevo certificado publicado por el propietario
export const publishCertificate = async (certificateData) => {
    try {
        const response = await api.post('/certificates', certificateData)
        return response.data
    } catch (error) {
        console.error('Error al publicar el certificado:', error)
        throw error
    }
}
