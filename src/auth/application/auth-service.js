// src/modules/auth/application/auth-service.js
import api from '../../shared/infrastructure/base-api.js';

export const authService = {
    async register(userData) {
        try {
            // Determina la colección según el rol
            const endpoint = userData.role === 'owner' ? '/owners' : '/buyers';
            const response = await api.post(endpoint, userData);
            return response.data;
        } catch (error) {
            console.error('Error en register:', error);
            throw new Error('No se pudo registrar el usuario');
        }
    },

    async login(email, password) {
        try {
            // Buscar tanto en owners como en buyers
            const [ownersRes, buyersRes] = await Promise.all([
                api.get(`/owners?email=${email}&password=${password}`),
                api.get(`/buyers?email=${email}&password=${password}`)
            ]);

            const owner = ownersRes.data[0];
            const buyer = buyersRes.data[0];

            // 🔹 Si encuentra un usuario, lo guarda automáticamente en localStorage
            if (owner) {
                this.saveUser(owner);
                return owner;
            }
            if (buyer) {
                this.saveUser(buyer);
                return buyer;
            }

            throw new Error('Credenciales incorrectas');
        } catch (error) {
            console.error('Error en login:', error);
            throw new Error('Error al iniciar sesión');
        }
    },

    saveUser(user) {
        // 🔹 Guardamos solo los datos esenciales
        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };
        localStorage.setItem('user', JSON.stringify(userData));
    },

    getUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    logout() {
        localStorage.removeItem('user');
    }
};
