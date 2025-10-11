import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000', // ⚠️ debe coincidir con el puerto del json-server
    headers: { 'Content-Type': 'application/json' },
});

export default api;
