import api from '../../shared/infrastructure/base-api.js';

export const authApi = {
    async register(user) {
        const endpoint = user.role === 'owner' ? '/owners' : '/buyers';
        const { data } = await api.post(endpoint, user);
        return data;
    },

    async login(email, password) {
        const roles = ['owners', 'buyers'];
        for (const role of roles) {
            const { data } = await api.get(`/${role}?email=${email}&password=${password}`);
            if (data.length) return { ...data[0], role: role === 'owners' ? 'owner' : 'buyer' };
        }
        throw new Error('Credenciales inválidas');
    }
};
